---
title: A Small Logging Detail That Can Save Real Work in Android
description: Kotlin string interpolation in Timber logs builds strings even when they are never printed. Switching to parameterised logging cut String allocations by 32% in a real app.
date: 2026-06-25
series: What Broke in Android - Engineering Notes
issue: 1
tags: [Android, Performance, Timber, Logging, Kotlin]
originalUrl: https://www.linkedin.com/pulse/what-broke-week-android-engineering-notes-1-small-can-finocchiaro-3iy5f/
cover: cover.jpg
coverAlt: "A small logging detail that can save real work in Android: string interpolation, Timber.d(\"Hello, $name\"), builds the string immediately; parameterised logging, Timber.d(\"Hello, %s\", name), lets Timber skip formatting when the log is filtered out."
---

When discussing Android performance, we typically focus on the major factors: image loading, recomposition, database queries, network calls, and rendering. But sometimes, a surprisingly small detail can create unnecessary work across an entire app.

One example I recently revisited in a real project was how we write Timber logs in Kotlin.

> Timber is a lightweight logging library for Android that makes logging cleaner and easier to manage than raw `Log.*()` calls. It is widely used because it keeps logs readable while supporting different behaviors across debug and release builds.

## The problem with string interpolation in Timber logs

In Kotlin, it is very common to write logs like this:

```kotlin
Timber.d("Hello, $name")
```

It looks clean and idiomatic, but there is a hidden cost: the string is built immediately, even if the log will never actually be printed.

The alternative is parameterised logging:

```kotlin
Timber.d("Hello, %s", name)
```

This allows Timber to defer formatting until it is actually needed.

This exact topic has also been discussed in Timber’s issue tracker: [Recommendations for avoiding Kotlin String interpolation in Production](https://github.com/JakeWharton/timber/issues/385).

## Why this matters

The difference is not just stylistic.

With interpolation:

- Kotlin creates the final string before Timber receives it.
- That means temporary objects are allocated immediately.
- Even if logging is disabled in a release build, the work has already happened.

With parameterised logging:

- The value is passed separately.
- Timber can skip formatting when the log is filtered out.
- Fewer temporary strings means less GC pressure.

In other words, this is a minor code change, but it can eliminate a significant amount of unnecessary work in hot paths.

## What I measured

To make this more concrete, I profiled the app before and after the change by using the app for 2 minutes in the same scenario.

The number of `java.lang.String` allocations went from **5,481** before to **3,727** after.

![Android Studio Profiler, Java/Kotlin allocations, before the change: 5,481 java.lang.String allocations in the app heap.](profiler-before.png)

*Before: 5,481 `java.lang.String` allocations.*

![Android Studio Profiler, Java/Kotlin allocations, after the change: 3,727 java.lang.String allocations in the app heap.](profiler-after.png)

*After: 3,727 `java.lang.String` allocations.*

That is a reduction of **32%**.

This is a great example of how a tiny logging pattern can have a measurable impact when repeated hundreds of times across a large codebase.

## What I changed across the codebase

In my case, I applied the same refactor not only to Timber logs, but also to other logging calls such as `println()` and `Log.*()` where string construction could be avoided or deferred.

The result was:

- cleaner logging patterns
- fewer temporary allocations
- reduced garbage collection pressure
- and a codebase that is more intentional about performance

## Why this optimisation is worth doing

This is not the kind of optimisation that will magically transform a slow app into a fast one. But that is exactly why it is valuable.

Real performance work is often made of many small improvements that accumulate:

- fewer allocations,
- less GC churn,
- fewer wasted CPU cycles,
- and more predictable behaviour in performance-sensitive screens.

As Senior Android Developers, we not only optimise algorithms and UI rendering. We also pay attention to the invisible work the app is doing in the background.

![Recap: String allocations went from 5,481 to 3,727, a 32% reduction. Logging calls were refactored across the codebase. Final takeaway: if a log message can be parameterised, prefer parameterised logging over Kotlin string interpolation.](recap.jpg)

*Recap.*

## Final thoughts

The main takeaway is simple:

**If a log message can be parameterised, prefer parameterised logging over Kotlin string interpolation.**

It is a small habit, but in a large Android app, it can reduce unnecessary allocations and make profiling results noticeably better.

I like this kind of optimisation because it sits right at the intersection of clean code and performance engineering: easy to apply, easy to understand, and valuable at scale.
