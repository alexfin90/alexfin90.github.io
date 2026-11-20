---
title: "From combinedClickable to pointerInput: Stabilising Press States in Scrollable Jetpack Compose UIs"
description: Why press feedback built on combinedClickable becomes late or sticky inside scrollables, and how moving it to pointerInput fixed it across a Compose design system.
date: 2026-06-25
series: What Broke in Android - Engineering Notes
issue: 2
tags: [Jetpack Compose, Gestures, InteractionSource, Design System]
originalUrl: https://www.linkedin.com/pulse/what-broke-android-engineering-notes-2-from-press-uis-finocchiaro-hh5cf/
cover: cover.jpg
coverAlt: "Stabilizing press states in scrollable Compose UIs: on the left, combinedClickable with delayed and uncertain press states while scrolling; on the right, pointerInput with immediate, stable press feedback."
---

I thought I was just fixing a simple press animation. In reality, I was touching something much deeper in our design system: how reliable is the visual feedback of our components when they live inside gesture‑heavy contexts?

In our case, it started from a reusable modifier called `Modifier.scaleOnPress()`. Its job was to scale content and trigger visual effects like inner shadow and light reflection on buttons, chips, cards, and other interactive components in the design system.

On static screens, it worked fine. Once those components landed inside `LazyColumn`, scroll containers, pagers, and nested gesture hierarchies… not so much:

- the scale animation would often start only on long press, not on tap
- in some scenarios the pressed state would “stick” and not reset properly
- some downstream visual effects did not receive release/cancel correctly

This wasn’t just a local bug. It was the result of an architectural choice: we were driving our press feedback off `combinedClickable` and its `InteractionSource`, in a context where taps and scroll gestures are literally fighting for the same pointer stream.

When a component lives inside a scrollable, the framework first needs to decide what gesture it’s observing: tap, scroll, long press, drag, etc. That arbitration phase can delay or alter when `PressInteraction` events are emitted, and therefore when `collectIsPressedAsState()` flips to `true`. The end user just sees “press feedback is late or inconsistent”, and that’s unacceptable for design‑system primitives.

## The fix: move press control to pointerInput

The real fix was not “tweak an animation”, but reassign responsibility.

Instead of delegating press handling to `combinedClickable`, we moved it to a dedicated `pointerInput` block using `detectTapGestures`, while still emitting `PressInteraction` events explicitly to the `InteractionSource` so everything downstream keeps working as before.

Concretely:

- we intercept the press immediately on pointer down
- we start the visual feedback right away (scale, shadow, etc.)
- we use `tryAwaitRelease()` to suspend until release or cancellation
- on release or cancellation, we reset the pressed state explicitly
- we manually emit `PressInteraction.Press`, `Release`, and `Cancel` to the shared `MutableInteractionSource`, so any consumer using `collectIsPressedAsState()` (custom ripples, fume layers, borders) continues to behave correctly

The key outcome:

> The immediate visual feedback no longer passively depends on a high‑level click abstraction. In gesture‑heavy contexts (scroll, pager, nested gestures), we keep explicit ownership of the press lifecycle via `pointerInput`, instead of relying on `combinedClickable`’s internal heuristics.

## When to use combinedClickable vs pointerInput

This experience gave me a very practical rule of thumb.

`combinedClickable` is still the right choice for most app‑level use cases: you get tap, long press, semantics, and accessibility out of the box with a clean, idiomatic API.

But when the press state itself is critical to the UX (for example, in a design system with custom animations, visual states, and components that live inside scrollables or pagers), then `pointerInput` gives you explicit ownership over the gesture lifecycle and, therefore, more predictability.

In short:

- Use `combinedClickable` when you want standard interactions plus semantics/accessibility without micro‑managing events.
- Use `pointerInput` when you need fine‑grained control and robust handling of down / release / cancel in the presence of competing gestures (scroll, drag, nested containers).

## Design system migration, not just a refactor

A reusable modifier in a design system is not “just a utility”. It’s effectively a public API for internal consumers. Changing its behaviour impacts the UX consistency across multiple components.

So we didn’t treat this as a silent refactor. We treated it as a migration:

- introduced a new, safer extension (e.g. `safeScaleOnPress()`)
- deprecated the old `scaleOnPress()` with a clear message and `ReplaceWith` suggestion
- migrated all DS components that depended on it (`IconButton`, `TextButton`, `ToggleIconButton`, `MachineControl`, `Chip`, `CheckupCard`, `TileCardBlack`, tiles, etc.)
- added a temporary demo screen to visualise “old vs new” side by side for every component
- ran cloud tests with Firebase Test Lab + Robo test, capturing videos and screenshots before and after, to ensure there were no regressions in navigation or behaviour

The result: zero regressions, and a much more reliable interaction primitive at the core of the design system.

## A few takeaways that I think matter beyond this specific bug

1. **Don’t treat `InteractionSource` as your only source of truth for pressed state** when components live in scrollable or gesture‑rich contexts. It’s great for interoperability and visuals, but less as the single behavioural driver.
2. **A shared modifier in a design system is a public API.** Evolving it requires a migration plan, deprecation, and verification, not a hidden refactor.
3. **In Compose, gesture handling and visual feedback are architectural responsibilities**, not implementation details you sprinkle in at the end.

This also matches the direction of modern Compose guidance:

- There’s growing emphasis on being careful with heavy `Modifier.composed` usage and considering `Modifier.Node` for more efficient, reusable modifiers in performance‑sensitive paths.
- The new Styles API is meant to centralise theming/styling concerns (padding, colours, typography, shapes), but it is not a replacement for modifiers when it comes to interaction, gestures, semantics, or layout behaviour.

![From combinedClickable to pointerInput, in four steps. Problem: press state not working in a scrollable list. Cause: scroll and press gestures compete for pointer events. Fix: handle the press explicitly with pointerInput and detectTapGestures. Outcome: immediate, consistent and testable press feedback.](combinedclickable-to-pointerinput.jpg)

*Swipe into the details: how we debugged, fixed, and hardened press interactions in a scrollable Compose design system.*

## References

These official docs helped structure the solution, and are worth reading if you’re dealing with similar issues:

- [Tap and press](https://developer.android.com/develop/ui/compose/touch-input/pointer-input/tap-and-press)
- [Handling user interactions and InteractionSource](https://developer.android.com/develop/ui/compose/touch-input/user-interactions/handling-interactions)
- [Styles vs Modifiers](https://developer.android.com/develop/ui/compose/styles/styles-vs-modifiers)
- [Styles in Compose](https://developer.android.com/develop/ui/compose/styles)

If press feedback is part of the core experience of your design system, you can’t treat it as a minor implementation detail. It deserves explicit ownership, a clear API, and a proper migration path.
