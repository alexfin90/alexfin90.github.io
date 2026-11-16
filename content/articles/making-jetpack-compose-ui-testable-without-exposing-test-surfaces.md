---
title: Making Jetpack Compose UI Testable Without Exposing Test Surfaces in Production
description: How to let Appium and UI Automator find Jetpack Compose components in a shared design system, without exposing test tags in the production build.
date: 2026-08-09
series: What Broke in Android - Engineering Notes
issue: 5
tags: [Jetpack Compose, Testing, Appium, Design System, Security]
originalUrl: https://www.linkedin.com/pulse/what-broke-android-engineering-notes-5-eng-making-ui-finocchiaro-g4paf
cover: cover.jpg
coverAlt: A Compose UI shielded by a glowing barrier, with test locators connected on the outside. Testable Compose UI, bridge to Appium, controlled by the app, secure by design.
---

UI automation is no longer just a QA concern. In a shared Compose design system, it is a platform capability that must be designed together with testability, security, build variants, and long-term maintainability.

The challenge is enabling tools such as Appium and UI Automator to identify Compose components reliably without turning the production application into a permanently exposed testing surface.

## The context

We had three requirements:

- enable automated UI tests to identify Compose components;
- support Appium and UI Automator through `testTagsAsResourceId`;
- avoid exposing test tags in the production build distributed through the stores.

The main complication was that the design system is published to Maven only through the release variant. Therefore, using `BuildConfig.DEBUG` inside the library would always return `false`, even when the consuming application was built in debug mode.

The real problem was not simply:

> How do we add a testTag?

It was:

> Which layer owns the build context, and which layer decides whether the UI should be exposed to automation tools?

## The architectural decision

The library provides the mechanism, while the consuming application decides when it should be enabled.

```kotlin
object TestTagConfig {
    var enabled: Boolean = false
}
```

The application configures the flag using its own `BuildConfig` or variants:

```kotlin
override fun onCreate() {
    super.onCreate()
    TestTagConfig.enabled = BuildConfig.DEBUG
}
```

This prevents the library from making an environmental decision it cannot reliably make.

The responsibilities are therefore separated:

- **Design system:** provides the contract and implementation;
- **Consumer application:** decides whether automation is enabled;
- **Build variant:** defines the permitted exposure level.

This pattern is also reusable for other library-level features whose behaviour depends on the consuming application’s environment.

## A centralized modifier

To avoid spreading environment checks across every component, we introduced a dedicated modifier:

```kotlin
fun Modifier.qaTag(tag: String): Modifier =
    if (TestTagConfig.enabled) {
        testTag(tag)
    } else {
        this
    }
```

Components can use it without duplicating the enabling policy:

```kotlin
IconButton(
    modifier = Modifier.qaTag("IconButton_Home"),
    onClick = onHomeClick
) {
    Icon(
        imageVector = TechnogymIcons.Home,
        contentDescription = "Home"
    )
}
```

When automation is enabled, the tag is added to the semantics tree. Otherwise, the modifier is a no-op.

This provides:

- a single policy point;
- consistent behavior across the design system;
- a simpler API for component authors;
- lower risk of accidentally enabling tags in the wrong environment.

## Bridging Compose and Appium

A Compose `testTag` belongs to the Compose semantics tree. To make it discoverable as an Android `resource-id` by UiAutomator and Appium, `testTagsAsResourceId` must be enabled on the root of the relevant Compose subtree:

```kotlin
Scaffold(
    modifier = Modifier
        .fillMaxSize()
        .semantics {
            testTagsAsResourceId = TestTagConfig.enabled
        }
) {
    // Content
}
```

These two flags have different responsibilities:

- `TestTagConfig.enabled` decides whether components receive test tags;
- `testTagsAsResourceId` decides whether those tags are exposed as Android resource IDs.

This distinction becomes especially important in hybrid applications. An `AndroidViewBinding`, `Fragment`, or `ComposeView.setContent { ... }` can introduce a separate Compose root. In that case, enabling `testTagsAsResourceId` on the main Compose root does not necessarily cover the nested `ComposeView` subtree. The bridge must be configured at the entry point of each independent Compose root.

A reusable wrapper helps avoid duplication:

```kotlin
@Composable
fun QaAutomationRoot(
    content: @Composable () -> Unit
) {
    Box(
        modifier = Modifier.semantics {
            testTagsAsResourceId = TestTagConfig.enabled
        }
    ) {
        content()
    }
}
```

It can then be applied at each `ComposeView` entry point:

```kotlin
setContent {
    LiveTheme {
        QaAutomationRoot {
            HomePageScreen(viewModel = viewModel)
        }
    }
}
```

The theme remains responsible for styling and composition locals. The automation wrapper remains responsible for exposing test semantics. Keeping these concerns separate makes the architecture easier to understand and maintain.

## Making testability repeatable

Adding a `qaTag()` API solves only part of the problem.

In a design system, the long-term risk is not that the API is missing. It is that a new component is shipped without an automation contract because testability was treated as a manual, optional step.

To reduce that risk, I also created a Claude Code skill that reviews newly developed Compose components and adds the expected QA tag pattern automatically.

The goal is not to delegate architecture decisions to AI. The goal is to encode an agreed engineering convention into the delivery workflow:

- new interactive components get a predictable automation hook;
- naming follows the same convention across the design system;
- engineers do not need to remember every testing requirement manually;
- code review can focus on whether the identifier is meaningful and stable, not on whether a tag was forgotten.

This turns testability from a best-effort convention into a repeatable platform capability.

The final decision still belongs to the engineer: a generated tag may need a domain-specific name, uniqueness for repeated items, or no tag at all if the component is not part of the automation contract.

## Security: why not production?

The goal is not to claim that every `testTag` is a critical vulnerability. A tag such as `IconButton_Home`, by itself, does not bypass authentication or authorization.

The concern is the additional informational and operational surface left in a public build:

- stable and descriptive locators for the UI structure;
- internal feature and flow names;
- easier construction of unauthorized automation;
- possible exposure of test entry points, hidden menus, or shortcuts;
- increased risk when locator metadata is combined with login, payment, onboarding, or subscription bypasses.

Android explicitly warns against releasing production builds that contain testing or debugging functionality. Such functionality may alter the intended application flow, bypass authentication or payment protections, expose system or user information, or trigger test activities. Android recommends restricting these capabilities to controlled staging or test builds.

The distinction is important:

> The main risk is not the tag string itself, but the combination of exposed locators and accessible test functionality.

This is a defense-in-depth decision based on the principle of least exposure:

> If metadata exists exclusively for QA and has no value for end users, it should not be exposed in the public build without a clear risk assessment.

The same principle applies to debug logging, hidden menus, mock authentication, test endpoints, and developer-only actions. OWASP’s Mobile Application Security Testing Guide includes checks for debuggable applications, debugging information, debug symbols, and production logging practices. OWASP also recommends disabling verbose and debug logging in production.

## Debug, QA release, and production release

The strategy does not need to be limited to “debug or nothing”. We can define separate build variants:

| Variant | Test tags | R8/minification | Purpose |
|---|---|---|---|
| `debug` | Enabled | Usually disabled | Development and UI automation |
| `releaseQa` | Enabled | Enabled | Appium, smoke tests, and hardware-in-the-loop |
| `release` | Disabled | Enabled | Production distribution |

A `releaseQa` variant is useful when the goal is to test a build that behaves as closely as possible to production while still exposing stable locators to the automation infrastructure.

The important constraint is that `releaseQa` must not be treated as a production build:

- it should be distributed only to QA, CI, or controlled test devices;
- it should be clearly distinguishable from the store build;
- its signing and application identity should be managed appropriately;
- the final production artifact should be checked to verify that QA exposure is disabled.

Android build variants are designed for exactly this type of separation between different application configurations and packaging requirements.

## Trade-offs

### Testability vs. security

Keeping test tags permanently enabled makes automation simpler, but increases the exposure of the UI. The chosen approach keeps automation effective while limiting the exposure to controlled builds.

### Simplicity vs. centralized control

Scattering `BuildConfig.DEBUG` checks throughout the library may look simple, but it is incorrect when the library is published as a release artifact and consumed by applications with different build variants.

A consumer-controlled runtime flag is more explicit and works across multiple applications.

### Stable locators vs. internal implementation details

A test tag should be stable and meaningful, but it should not accidentally become a public contract for the internal UI structure.

This makes naming strategy important. Tags should identify behavior or test intent where possible, rather than exposing unnecessary implementation details.

## What we learned

This change is not simply about adding `testTag` to Compose components.

It defines an architectural contract between the design system, consuming applications, and the QA infrastructure:

- the library provides the capability;
- the application controls the environment;
- QA builds expose stable automation locators;
- production builds minimize unnecessary exposure;
- Appium can test Compose without turning internal UI metadata into a public interface.

The main lesson is that testability and security are not opposing goals.

The right question is not whether the UI should be testable or secure. The right question is:

> Which capabilities should be available in each build, and who is responsible for controlling them?

By separating debug, QA, and production concerns, we get a solution that scales beyond a single component or application.

## References

- [Test and debug features — Android Developers](https://developer.android.com/privacy-and-security/risks/test-debug)
- [Build variants — Android Developers](https://developer.android.com/build/build-variants)
- [Compose interoperability with UiAutomator — Android Developers](https://developer.android.com/develop/ui/compose/testing/interoperability)
- [Semantics in Jetpack Compose — Android Developers](https://developer.android.com/develop/ui/compose/accessibility/semantics)
- [OWASP MASTG: Code quality and build settings](https://mas.owasp.org/MASTG/0x05i-Testing-Code-Quality-and-Build-Settings/)
- [OWASP MASTG: Disable verbose and debug logging in production builds](https://mas.owasp.org/MASTG/best-practices/MASTG-BEST-0022/)
