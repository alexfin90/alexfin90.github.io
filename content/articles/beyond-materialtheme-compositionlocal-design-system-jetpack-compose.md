---
title: "Beyond MaterialTheme: Using CompositionLocal to Build a Scalable Design System in Jetpack Compose"
description: When MaterialTheme is enough, when a custom design system pays off, and how to build one with CompositionLocal and a MaterialTheme-style API.
date: 2026-07-31
series: What Broke in Android - Engineering Notes
issue: 4
tags: [Jetpack Compose, Design System, CompositionLocal, Theming]
# TODO: paste the LinkedIn URL of the Italian original
originalUrl:
translatedFrom: Italian
cover: cover.jpg
coverAlt: "Cover in Italian: Beyond MaterialTheme, using CompositionLocal to build a scalable design system in Jetpack Compose. A code snippet of AppDesignSystem and a fitness app built on its tokens."
---

## Why a custom design system (beyond Android’s MaterialTheme)

In many Android apps, configuring `MaterialTheme` is enough: pick a palette, a few text styles, and you are done. But when you have several products, or an ecosystem of apps (for example mobile + tablet + a kiosk in the gym, or several fintech apps under the same brand), the theme becomes a product asset. You want a visual language that is consistent and versionable, with clear rules for colors, spacing, typography and components.

In these scenarios:

- Some apps can live happily with a customized `MaterialTheme`.
- Complex ecosystems benefit from a custom design system, with shared tokens and components and clear governance.

The technical problem is always the same: **how do I bring these tokens everywhere in the UI without passing parameters to every function?**

## CompositionLocal: the theme’s “hidden tunnel”

Jetpack Compose provides `CompositionLocal` as a way to pass data down the composition tree without adding it as a parameter to every Composable.

In practice:

- A `CompositionLocal<T>` is a typed key for a piece of data (for example, your design system) that can be read anywhere in the subtree through `.current`.
- `CompositionLocalProvider(LocalAppDesignSystem provides value) { ... }` binds a concrete value to that key for all the child Composables.
- Nested providers give you local overrides: one section of the UI can use a theme variant (for example “glass” vs “dark”) without touching the rest of the app.

It is the same principle `MaterialTheme` uses internally: behind APIs like `MaterialTheme.colorScheme` there are `CompositionLocal`s that expose colors, typography and shapes implicitly across the whole composition.

To go deeper:

- [Official documentation on CompositionLocal](https://developer.android.com/develop/ui/compose/compositionlocal) (concepts and best practices)
- [API reference for CompositionLocal and CompositionLocalProvider](https://developer.android.com/reference/kotlin/androidx/compose/runtime/CompositionLocal)
- [Custom design systems in Compose](https://developer.android.com/develop/ui/compose/designsystems/custom), to see a real example of a design system built with this pattern

## Defining a design system with CompositionLocal

Let’s start from a minimal, generic design system:

```kotlin
// The app's design system
@Immutable
data class AppDesignSystem(
    val colors: AppColors,
    val typography: AppTypography,
    val spacing: AppSpacing
)

// A few simple tokens, heavily simplified here
@Immutable
data class AppColors(
    val primary: Color,
    val surface: Color,
    val onSurface: Color
)

@Immutable
data class AppTypography(
    val title: TextStyle,
    val body: TextStyle
)

@Immutable
data class AppSpacing(
    val small: Dp,
    val medium: Dp,
    val large: Dp
)
```

Now let’s create a `CompositionLocal` for this design system:

```kotlin
// CompositionLocal that identifies the design system
val LocalAppDesignSystem = staticCompositionLocalOf<AppDesignSystem> {
    error("No AppDesignSystem provided")
}
```

`staticCompositionLocalOf` is the recommended choice for values that rarely change (like a theme), because Compose does not track individual reads and can better optimize the “almost static theme” case.

Next, we define the app theme:

```kotlin
@Composable
fun AppTheme(
    darkTheme: Boolean,
    content: @Composable () -> Unit
) {
    val colors = if (darkTheme) {
        AppColors(
            primary = Color(0xFFBB86FC),
            surface = Color(0xFF121212),
            onSurface = Color.White
        )
    } else {
        AppColors(
            primary = Color(0xFF6200EE),
            surface = Color.White,
            onSurface = Color.Black
        )
    }

    val designSystem = AppDesignSystem(
        colors = colors,
        typography = AppTypography(
            title = TextStyle(fontSize = 20.sp, fontWeight = FontWeight.Bold),
            body = TextStyle(fontSize = 16.sp)
        ),
        spacing = AppSpacing(
            small = 4.dp,
            medium = 8.dp,
            large = 16.dp
        )
    )

    CompositionLocalProvider(
        LocalAppDesignSystem provides designSystem
    ) {
        content()
    }
}
```

This is the same pattern you see in the official samples when they use `CompositionLocal` for elevations, configuration, custom colors and so on.

## AppThemeTokens: the API layer

Reading `LocalAppDesignSystem.current` directly everywhere works, but it is not the cleanest API for the team. Like Material does, it helps to have a “facade” object:

```kotlin
object AppThemeTokens {

    val colors: AppColors
        @Composable
        @ReadOnlyComposable
        get() = LocalAppDesignSystem.current.colors

    val typography: AppTypography
        @Composable
        @ReadOnlyComposable
        get() = LocalAppDesignSystem.current.typography

    val spacing: AppSpacing
        @Composable
        @ReadOnlyComposable
        get() = LocalAppDesignSystem.current.spacing
}
```

This pattern is directly inspired by `MaterialTheme`, which exposes `MaterialTheme.colorScheme`, `MaterialTheme.typography` and so on, wrapping `LocalColorScheme`, `LocalTypography`, `LocalShapes` and the others.

Benefits:

- **Ergonomic API:** as a consumer you write `AppThemeTokens.colors` instead of `LocalAppDesignSystem.current.colors`.
- **Hidden internals:** if you change the structure of `AppDesignSystem`, you only update these getters.
- **`@ReadOnlyComposable`** tells Compose that these functions only read from the composition, with no side effects, which enables some optimizations.

### Everyday use

With this setup, UI code becomes very readable:

```kotlin
@Composable
fun AppCard(
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit
) {
    Box(
        modifier = modifier
            .background(AppThemeTokens.colors.surface)
            .padding(AppThemeTokens.spacing.medium)
    ) {
        content()
    }
}
```

Or:

```kotlin
@Composable
fun AppTitle(text: String) {
    Text(
        text = text,
        style = AppThemeTokens.typography.title,
        color = AppThemeTokens.colors.onSurface
    )
}
```

What matters here is the API you give the team:

- `AppThemeTokens.colors.surface` makes it clear you are using a theme surface token, not a hard-coded color.
- When the design system evolves (new palettes, spacing, scaling per device), you only update the `AppDesignSystem` implementation and the values you provide, not every component.

## When MaterialTheme is enough, and when it is not

### When MaterialTheme is enough

For many apps:

- A single product, with fairly standard visual needs.
- An explicit goal of following the Material guidelines.
- A small team, where the governance cost of a custom design system is higher than the benefits.

In these cases you can:

- Use `MaterialTheme` directly (`colorScheme`, `typography`, `shapes`).
- Add a few targeted `CompositionLocal`s for specific cases (for example custom elevations or app-wide padding).

### When a custom design system is worth it

A custom design system based on `CompositionLocal` makes a lot of sense when:

- You have several apps under the same brand (for example consumer, pro, kiosk, companion) and you want strong consistency across them.
- Your visual language does not map directly to Material concepts (for example surface levels, or color categories tied to the domain, like fitness or fintech).
- You want to version the design system (v1, v2, v3) and coordinate rollouts across apps, possibly through a shared module.

In these cases, the pattern:

- `AppDesignSystem` (data class of tokens)
- `LocalAppDesignSystem` (`staticCompositionLocalOf`)
- `AppTheme` (Composable wrapper)
- `AppThemeTokens` (object with `@ReadOnlyComposable` getters)

gives you a very solid foundation, aligned with Compose best practices for `CompositionLocal`.

## Key takeaways

Points worth bringing into your team discussions:

- `CompositionLocal` is a tool for **UI context data, not domain state**: perfect for theme, app-wide configuration and layout parameters.
- A custom design system can, and should, follow the `MaterialTheme` pattern: an `AppThemeTokens` object that wraps the `CompositionLocal`s and offers a clean API.
- Choosing between `MaterialTheme` and a custom design system is an **architectural decision**: for a single app, extending Material may be enough; for a multi-app ecosystem it makes sense to invest in a shared, versioned and governed design system.
