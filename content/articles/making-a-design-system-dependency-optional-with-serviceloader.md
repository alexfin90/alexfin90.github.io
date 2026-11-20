---
title: "How I Made a Design System Dependency Optional with ServiceLoader (Without Touching the Consumer Apps)"
description: A blur library added 24.6 KB to every app using our Compose design system. Moving it into an optional module discovered with ServiceLoader made it opt-in with zero changes in consumer code.
date: 2026-11-21
series: What Broke in Android - Engineering Notes
issue: 6
tags: [Jetpack Compose, Design System, Gradle, R8, Modularization]
cover: cover.jpg
coverAlt: "Make it optional: ServiceLoader turns a design system dependency into a plug-in module. A designsystem module with no blur dependency, an optional glass module discovered through ServiceLoader, and an app that turns blur on just by adding the module."
---

## Context

In a Compose design system used by several apps, a pull request introduced real blur in the `Navbar`, using the [Haze](https://github.com/chrisbanes/haze) library.

The problem: **every consumer app** now had Haze on its classpath, even apps that never used blur, or used a theme with `blur = 0.dp`.

Measured impact: **+24.6 KB** on the release APK, with R8 enabled, even for apps that never called `.surfaceBlur()`.

The requirements were strict:

- `AppTheme` and every existing `.surfaceBlur()` call had to stay **exactly the same**
- **zero code changes** in the consumer apps
- the only switch: whether a Gradle module is on the classpath or not

## Why the “obvious” solutions didn’t work

### 1. Two extension functions with the same name

A no-op `surfaceBlur()` in the design system and a real one in a separate `:glass` module? It doesn’t work.

Kotlin extension functions are resolved statically, at compile time. `Navbar.kt` is compiled inside the design system module, so its call to `surfaceBlur()` is bound to the design system’s own function. Nothing added later to the app classpath can change that bytecode. And in app code, having both functions visible would only give you an ambiguous call, not a runtime choice.

### 2. A separate `GlassTheme`

Apps could switch from `AppTheme` to a `GlassTheme`. Technically sound, but it breaks the requirement: it means changing code in every app that wants blur.

## The solution: an optional plugin discovered with ServiceLoader

### What ServiceLoader is

`java.util.ServiceLoader` is the standard Java mechanism for discovering implementations of an interface at runtime (SPI, Service Provider Interface), and it is available on Android.

The pattern has three parts:

1. **Base module:** defines an interface and a no-op fallback.
2. **Optional module:** implements the interface and registers the implementation in a `META-INF/services/<fully qualified interface name>` file.
3. **Runtime:** `ServiceLoader.load(Interface::class.java, ...)` finds the implementations on the classpath.

Discovery happens at runtime, so the base module has no dependency on the optional one.

### Architecture

```text
designsystem              (no Haze dependency)
└── BlurProvider interface + NoOpBlurProvider (default)
└── lazy lookup through ServiceLoader

glass                     (optional: depends on designsystem + Haze)
└── HazeBlurProvider : BlurProvider   (real implementation)
└── META-INF/services/<package>.BlurProvider → HazeBlurProvider

app
└── implementation(project(":glass"))   ← the whole on/off switch
```

`BlurExt.kt` in the design system:

```kotlin
interface BlurProvider {
    @Composable fun Modifier.surfaceBlurSource(key: Any?, zIndex: Float): Modifier
    @Composable fun Modifier.surfaceBlur(sourceKey: Any?, blurRadiusFraction: Float): Modifier
    @Composable fun Modifier.surfaceBlurElevated(sourceKey: Any?, blurRadiusFraction: Float): Modifier
}

private object NoOpBlurProvider : BlurProvider {
    @Composable override fun Modifier.surfaceBlurSource(key: Any?, zIndex: Float) = this
    @Composable override fun Modifier.surfaceBlur(sourceKey: Any?, blurRadiusFraction: Float) = this
    @Composable override fun Modifier.surfaceBlurElevated(sourceKey: Any?, blurRadiusFraction: Float) = this
}

private val blurProvider: BlurProvider by lazy {
    ServiceLoader.load(BlurProvider::class.java, BlurProvider::class.java.classLoader)
        .firstOrNull() ?: NoOpBlurProvider
}

fun Modifier.surfaceBlur(sourceKey: Any? = null, blurRadiusFraction: Float = 1f): Modifier = composed {
    with(blurProvider) { surfaceBlur(sourceKey, blurRadiusFraction) }
}
// surfaceBlurElevated() and surfaceBlurSource() follow the same pattern
```

The provider needs to be composable: the real implementation reads the theme’s blur tokens, the current `View` and remembered state.

`AppTheme` goes back to exactly what it was before blur was introduced: no `HazeState`, no `CompositionLocal` for it.

### The `:glass` module

It follows the existing module conventions (Android library, Kotlin, the shared Compose convention plugin) and contains two things:

- `HazeBlurProvider`, a public class with a no-argument constructor that implements `BlurProvider` with Haze 2.0 (`hazeSource` for sources, and `hazeBlur` with a `HazeBlurStyle` from the `haze-blur` module for consumers)
- the registration file, as a Java resource:

```text
glass/src/main/resources/META-INF/services/com.example.designsystem.blur.BlurProvider
```

containing a single line, the implementation class:

```text
com.example.designsystem.glass.HazeBlurProvider
```

### What R8 does with this in release builds

On Android, `ServiceLoader` could mean reading `META-INF/services` from the APK at runtime. But R8 recognizes this pattern: it can rewrite `ServiceLoader.load(...)` into a direct instantiation of the implementation, when the class loader argument is `null` or the interface’s own `.class.getClassLoader()`, as in the snippet above.

One thing to know: R8 skips this optimization if the interface is kept by a keep rule. So avoid a broad `-keep` on `BlurProvider`.

### Scoping `HazeState`: one per window, not per screen

The original implementation isolated blur per screen through a `CompositionLocalProvider`. `ServiceLoader` creates the provider once, outside any composition, so there is no natural place to provide state per screen.

The first version took the simplest route: a single `HazeState` for the whole process. It worked, but it is too wide: separate Activities, like a full-screen HUD and a dashboard, would share blur sources even though they live in different windows.

The current version scopes one `HazeState` per window, keyed by the root `View` (simplified):

```kotlin
class HazeBlurProvider : BlurProvider {
    private val defaultHazeState by lazy { createHazeState() }
    private val windowHazeStates = WeakHashMap<View, HazeState>()

    private fun hazeStateForRootView(rootView: View?): HazeState {
        if (rootView == null) return defaultHazeState
        return synchronized(windowHazeStates) {
            windowHazeStates.getOrPut(rootView) { createHazeState() }
        }
    }

    @Composable
    override fun Modifier.surfaceBlurSource(key: Any?, zIndex: Float): Modifier {
        val rootView = LocalView.current.rootView
        val hazeState = LocalHazeState.current ?: remember(rootView) { hazeStateForRootView(rootView) }
        return hazeSource(state = hazeState, zIndex = zIndex, key = key)
    }

    // surfaceBlur() and surfaceBlurElevated() resolve the same HazeState
    // and apply hazeBlur(...) with a HazeBlurStyle built from the theme tokens
}
```

This gives the right boundaries:

- several `ComposeView`s in the same Activity (for example a top bar in the Activity and the content in a Fragment) share one window, so they share blur sources;
- separate Activities and windows never mix their blur sources;
- the `WeakHashMap` lets each `HazeState` go away with its window;
- a `LocalHazeState` override is still available when a screen really needs explicit scoping.

The activation stays purely dependency-driven: no consumer has to provide anything.

## Test plan

- `./gradlew :designsystem:compileDebugKotlin :glass:compileDebugKotlin :app:compileDebugKotlin`: clean build, and no Haze references left in `designsystem`
- `unzip -l app-debug.apk`: no `:glass` classes and no `META-INF/services` entry when the dependency is removed; both present when it is added
- On device (API 34): with `:glass`, blur renders exactly as before; without it, `surfaceBlur()` is a no-op
- Release APK size: **24.6 KB** smaller without `:glass`

## Why this matters

1. **A design system should not impose dependencies on every consumer.** Opt-in features belong in opt-in modules.
2. **Small sizes add up.** 25 KB is not much for one app, but it is paid by every app that uses the design system, on every download and update.
3. **Trade-offs belong in the documentation.** Where blur state lives, and why, is written next to the code, not left for someone to rediscover six months later.
4. **The pattern is reusable.** Any feature that should switch on just by adding a module can follow the same shape.

## Lessons learned

- Kotlin extension functions are resolved at compile time. Don’t expect them to behave like runtime dispatch.
- Pick the scope of shared state on purpose. Per process was simple but too wide; per window matches how Android actually draws.
- `ServiceLoader` is the standard way to detect whether an optional module is present.
- R8 removes a lot, but not everything: a dependency on the classpath still has a measurable cost.
- Explaining architectural trade-offs is part of the job, not just making it work.

**TL;DR:** with `ServiceLoader`, Haze became an optional plugin of a Compose design system. Apps that don’t use blur save 24.6 KB, and no consumer had to change a single line of code.

## References

- [ServiceLoader, Android API reference](https://developer.android.com/reference/java/util/ServiceLoader)
- [Haze, blur for Compose](https://github.com/chrisbanes/haze)
- [R8: rewrite of ServiceLoader.load to direct instantiation](https://r8.googlesource.com/r8/+/b027e3c0b123bd4a9397ff210e40293c1381d1a8)
