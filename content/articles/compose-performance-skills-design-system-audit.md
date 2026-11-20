---
title: How We Used Android’s Compose Performance Skills to Audit a Design System at Scale
description: Using the official Jetpack Compose Performance skill as a shared checklist to audit a Compose design system, with phase deferral, fewer allocations and Modifier.Node where it really pays off.
date: 2026-11-29
series: What Broke in Android - Engineering Notes
issue: 7
tags: [Jetpack Compose, Performance, Modifier.Node, Design System, Android Skills]
cover: cover.jpg
coverAlt: "Audit, don't patch: a repeatable performance checklist for a Compose design system. Work moves from the Composition lane down to Layout and Draw, deferred to the cheapest phase, next to a budget API 23 phone with a stable frame-time chart."
---

In a Compose-heavy app, performance issues rarely appear as one obvious bottleneck.

They show up as a scroll that is almost smooth, an animation that drops a few frames on older hardware, a chart that becomes expensive during real-time updates, or a component that looks fine in isolation but behaves differently once it is reused across dozens of screens.

That was the context for a recent performance initiative across our Compose design system and UI modules.

Instead of treating performance as a series of isolated fixes, we used the official Android [Jetpack Compose Performance skill](https://github.com/android/skills/tree/main/jetpack-compose/jetpack-compose-performance) as a shared framework to audit the codebase, identify recurring anti-patterns, and apply consistent optimization patterns.

The goal was not simply to make individual components faster.

The goal was to make the right performance decision easier to repeat across the design system and application modules.

## Starting from a shared framework

[Android Skills](https://github.com/android/skills) are modular, AI-optimized instructions designed to help agents and developers apply Android best practices more consistently. The repository includes a dedicated Jetpack Compose Performance skill focused on diagnosing performance bottlenecks, minimizing recomposition overhead, and preventing dropped frames and UI lag.

We used it as a practical checklist rather than as a replacement for engineering judgment.

For every component, modifier, animation, list, or custom drawing implementation, we asked a small set of questions:

- Does this work really need to happen during composition?
- Is this modifier stateful, or is it only combining existing modifiers?
- Are we allocating objects during layout or draw?
- Are we reading animated state too early?
- Are we using a generic API where a more targeted one would be cheaper?
- Do lazy lists have a stable identity and an appropriate content type?
- Is this component reused often enough that a small inefficiency becomes a systemic cost?

These questions turned a broad topic, “make Compose faster”, into an auditable engineering process.

## Performance is about the right phase

One of the most valuable ideas in Compose performance work is understanding which phase should own a piece of work.

Not every state change needs to trigger recomposition.

Some values only affect how a component is drawn: progress, alpha, scale, offset, or a visual transformation. If those values are read during composition, Compose may need to recompose the UI even though the structure and layout have not changed.

A simple example is an animated progress value:

```kotlin
// Read during composition
val progress = animatedProgress.value

Box(
    modifier = Modifier
        .graphicsLayer {
            scaleX = progress
            scaleY = progress
        }
)
```

In this case, the value is read during composition. Every animation frame can trigger recomposition, even if the UI structure remains identical.

A better approach is to defer the read to the phase where it is actually needed:

```kotlin
Box(
    modifier = Modifier
        .graphicsLayer {
            // Read when the layer is updated, after composition and layout
            scaleX = animatedProgress.value
            scaleY = animatedProgress.value
        }
)
```

The UI still animates, but the animation no longer needs to invalidate composition for every frame.

This pattern became especially relevant for progress indicators, charts, alpha effects, transformations, and components that update frequently during real-time usage.

## Avoiding allocations on hot paths

On modern devices, an extra allocation may seem harmless.

On lower-end hardware, it can matter much more.

Allocating objects such as `Paint`, `Path`, `Matrix`, gradients, or filters inside draw, measure, or animation loops can increase memory pressure and eventually lead to garbage collection pauses. On a device already working close to its frame budget, that can translate directly into jank.

Our audit paid particular attention to custom drawing paths:

- Avoiding repeated allocations inside draw and measure.
- Caching reusable drawing resources where appropriate.
- Using `drawWithCache` to build resources tied to stable inputs or dimensions.
- Reusing `Paint`, `Path`, `Matrix`, and gradient objects instead of recreating them every frame.
- Keeping expensive graphics work out of composition whenever possible.

The principle is simple:

> If an object is created on every frame, ask whether it can be created once, cached, or derived only when its inputs actually change.

This becomes especially important on older hardware, where the margin between a stable frame and a dropped frame is smaller.

## When Modifier.composed becomes a problem

`Modifier.composed` was historically a convenient way to create reusable, stateful modifiers.

It lets you write something like this:

```kotlin
fun Modifier.pulseIndicator(enabled: Boolean): Modifier = composed {
    val scale = remember { Animatable(1f) }

    LaunchedEffect(enabled) {
        if (enabled) {
            scale.animateTo(
                targetValue = 1.2f,
                animationSpec = infiniteRepeatable(tween(600), RepeatMode.Reverse)
            )
        } else {
            scale.snapTo(1f)
        }
    }

    graphicsLayer {
        scaleX = scale.value
        scaleY = scale.value
    }
}
```

It works.

But it also means that the modifier’s lambda, `remember` blocks, effects, and state objects participate in composition. As the number of composed modifiers grows, this can increase composition work, slot-table overhead, and allocation pressure.

`Modifier.composed` is no longer recommended because of these performance concerns, and the Android lint guidance specifically points developers toward `Modifier.Node`.

That does not mean every composed modifier needs to be migrated immediately.

It means we needed a rule for when migration is worth the added complexity.

## Modifier.Node: state without subcomposition

`Modifier.Node` is a lower-level API for building custom modifiers. It is the same API Compose uses internally for many of its own modifiers, and it is designed to be more efficient than `Modifier.composed`.

The key distinction is lifecycle:

| Component | Role | Lifetime |
|---|---|---|
| `ModifierNodeElement` | Immutable configuration and diffing | Recreated on recomposition |
| `Modifier.Node` | State, coroutines, listeners, and behavior | Persistent and reusable |
| Modifier factory | Public API for developers | Adds the element to the chain |

With `Modifier.Node`, the configuration remains immutable, while the state lives in a long-lived node. When the modifier’s inputs change, Compose can update the existing node instead of recreating its internal state.

For example, the same pulse as a node:

```kotlin
private class PulseNode(
    private var enabled: Boolean
) : Modifier.Node(), DrawModifierNode {

    private val scale = Animatable(1f)
    private var pulseJob: Job? = null

    override fun onAttach() = restartPulse()

    fun update(enabled: Boolean) {
        if (this.enabled == enabled) return
        this.enabled = enabled
        restartPulse()
    }

    private fun restartPulse() {
        pulseJob?.cancel()
        pulseJob = coroutineScope.launch {
            if (enabled) {
                scale.animateTo(1.2f, infiniteRepeatable(tween(600), RepeatMode.Reverse))
            } else {
                scale.snapTo(1f)
            }
        }
    }

    override fun ContentDrawScope.draw() {
        // State read in draw: only drawing is invalidated when it changes
        withTransform({ scale(scale.value, scale.value, pivot = center) }) {
            this@draw.drawContent()
        }
    }
}

private data class PulseElement(val enabled: Boolean) : ModifierNodeElement<PulseNode>() {
    override fun create() = PulseNode(enabled)
    override fun update(node: PulseNode) = node.update(enabled)
}

fun Modifier.pulseIndicator(enabled: Boolean): Modifier = this then PulseElement(enabled)
```

Here, the animation state, coroutine, and drawing behavior live in the node rather than in a composition-scoped lambda. When `enabled` changes, the element’s `update` reuses the same node instead of rebuilding its state.

That makes `Modifier.Node` particularly useful for modifiers that:

- Hold state.
- Launch coroutines.
- Handle pointer input or gestures.
- Observe focus or key input.
- Add semantics.
- Implement custom layout or drawing.
- Need selective invalidation.

## Choosing the right capability

`Modifier.Node` is not a single monolithic abstraction.

A node can implement one or more capability interfaces, depending on what it needs to do:

| Capability | Use case | When something changes |
|---|---|---|
| `LayoutModifierNode` | Custom measurement or placement | `invalidateMeasurement()` |
| `DrawModifierNode` | Custom drawing | `invalidateDraw()` |
| `SemanticsModifierNode` | Accessibility and testing | `invalidateSemantics()` |
| `FocusEventModifierNode` | Reacting to focus changes | Callback on focus events |
| `KeyInputModifierNode` | Hardware keyboard input | Callback on key events |
| `PointerInputModifierNode` | Touch, mouse, stylus, gestures | Callback on pointer events |
| `DelegatingNode` | Composing multiple nodes | Depends on the delegates |

This granularity is one of the biggest advantages of the Node API.

If only a color changes, you may only need to invalidate drawing.

If only a size-related property changes, you may only need to invalidate measurement.

Instead of treating every change as a reason to redo everything, the node can invalidate only the work that is actually affected.

## Not every modifier needs Node

We were deliberate about this.

A modifier that only chains existing modifiers does not necessarily need to become a `Modifier.Node`:

```kotlin
fun Modifier.cardStyle() = this
    .clip(RoundedCornerShape(12.dp))
    .background(Color.White)
    .padding(16.dp)
```

Migrating that to `Modifier.Node` would likely add complexity without a meaningful benefit.

Our rule was straightforward:

> Migrate a modifier to `Modifier.Node` when it carries state, side effects, gestures, animations, custom layout, custom drawing, or selective invalidation needs.

Otherwise, keep the implementation simple.

Performance work should not turn every abstraction into a more complex one.

## The impact on low-end devices

This initiative was particularly relevant for hardware running older Android versions, including API 23 devices.

On those devices, the frame budget is less forgiving. A few extra allocations, unnecessary recompositions, or repeated layout work can make the difference between a smooth interaction and visible jank.

The optimizations that mattered most were not necessarily the most visible ones:

- Reading animated values in the correct phase.
- Avoiding allocations during draw and layout.
- Caching graphics resources.
- Reducing unnecessary recomposition.
- Using `Modifier.Node` for stateful modifiers.
- Keeping custom layouts simple and predictable.
- Making lazy lists more efficient with stable keys and content types.

None of these changes is revolutionary on its own.

Together, they can improve the consistency of frame delivery, especially during scrolling, animations, charts, progress indicators, and real-time UI.

## Making the decision repeatable

The most important outcome was not a single performance win.

It was the ability to apply the same decision framework again in the future.

For every new component or modifier, the team can now ask:

- Is this work happening in the cheapest possible phase?
- Is this modifier stateful enough to justify `Modifier.Node`?
- Are we allocating anything on a hot path?
- Are we reading state too early?
- Is this list item identified correctly?
- Is this component likely to be reused across the design system?

That turns performance from a reactive activity into an architectural practice.

## Lessons learned

Here are the lessons I would carry into any Compose performance initiative:

1. **Do not optimize blindly.** Identify hot paths first.
2. **Do not migrate every `Modifier.composed`.** Migrate the ones with state, effects, gestures, or custom behavior.
3. **Think in phases.** Composition, layout, and draw have different costs.
4. **Treat allocations as a first-class concern.** Especially on low-end hardware.
5. **Make performance rules visible.** A shared checklist beats tribal knowledge.
6. **Measure before and after.** Recomposition count alone is not enough.
7. **Favor repeatable decisions.** A good pattern is more valuable than a one-off optimization.

## Final thought

Performance optimization is not about applying every possible trick.

It is about knowing which phase should own each piece of work, avoiding unnecessary work on hot paths, and making those decisions repeatable across a team.

Android’s Compose Performance Skills gave us a practical framework to turn that principle into an auditable process.

## References

- [Android Skills repository](https://github.com/android/skills)
- [Jetpack Compose Performance skill](https://github.com/android/skills/tree/main/jetpack-compose/jetpack-compose-performance)
- [Browse Android skills, Android Developers](https://developer.android.com/tools/agents/android-skills/browse)
