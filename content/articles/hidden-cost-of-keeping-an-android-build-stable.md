---
title: "The Hidden Cost of Keeping an Android Build Stable: Lessons from AGP, CI, and an Upstream Bug"
description: A release build that passed locally failed in CI because of an AGP bug. How we diagnosed it, why we chose a workaround over an upgrade, and what it says about maintenance work.
date: 2026-07-02
series: What Broke in Android - Engineering Notes
issue: 3
tags: [Android Gradle Plugin, CI/CD, Navigation, Build Systems, Engineering Leadership]
originalUrl: https://www.linkedin.com/pulse/what-broke-android-engineering-notes-3-eng-hidden-cost-finocchiaro-mmtqf/
cover: cover.jpg
coverAlt: "When a build breaks in CI: diagnostics, decisions and trust in the maintenance work. A diagnose, decide, apply workaround, stabilize cycle around a failed CI pipeline."
---

## Introduction

Sometimes a build that should be routine turns into a small lesson in platform engineering. In this case, everything started with what looked like a simple upgrade: moving to a newer AGP version. Locally, the build worked. In Android Studio, it worked too. In CI, it didn’t: the pipeline failed on a resource verification task because a navigation graph could not be found.

It became a classic example of the hidden cost of maintenance: more time spent understanding where the real problem ends and where the toolchain noise begins.

## The actual problem

The issue was not in the feature work itself, but in the way the multi-module project handled the navigation graph inside XML layouts.

In CI, the failure appeared in `verifyRealReleaseResources`, with AAPT reporting missing navigation resources in presentation modules. The important detail was this: the problem only showed up in CI, not in the local workflow. That made it immediately clear that this was not an application bug, but a combination of build system behavior, AGP, and resource verification rules.

This is where an often underestimated point comes in: maintenance work is not just about keeping things running. It is diagnosis, isolation, environment comparison, upstream issue tracking, workaround validation, upgrade risk assessment, and above all, deciding what is actually worth doing.

![GitHub Actions log: the Build APK step fails on verifyRealReleaseResources with an AAPT error, resource navigation/nav_graph not found.](ci-build-failure.png)

*The most obvious symptom appeared in CI, where the release build failed on `verifyRealReleaseResources` with a resource linking error.*

## The invisible context

From the outside, a fix like this can look trivial: “just remove the nav graph from XML and set it in code.”

Inside the engineering work, though, the picture is wider:

- a multi-module pipeline,
- a release build that passes locally but fails in CI,
- a known AGP bug,
- an open Google issue with discussion pointing in different directions,
- uncertainty about whether it is better to wait for a stable fix or apply a workaround.

This is exactly the kind of work that often remains invisible. It does not produce a new feature, so it is easy to treat it as background noise. In reality, it protects the team’s delivery speed over time.

## The technical decision

At that point, there were essentially three options.

The first was to keep pushing on the toolchain: change Build Tools, update Gradle, switch the CI image, and hope the issue would disappear. That path, however, was not giving strong signals. Even after forcing Build Tools 36, the build still failed.

The second was to jump straight to a newer AGP version. But that would have meant a more significant upgrade on top of an already fragile setup, with no real guarantee that moving to an alpha version or a less consolidated major release would be the right production choice.

The third option was the workaround suggested in the issue itself: remove navigation graph references from XML and set the graph programmatically through `navController.setGraph(...)`.

That turned out to be the right decision. Not because it was elegant, but because it was the most predictable and least invasive option. In a pipeline that needs to remain reliable, predictability is often more valuable than architectural purity.

The official issue discussion is here: [AGP 8.13.0 fails to verify nav graph in a module](https://issuetracker.google.com/issues/443587266).

The issue discussion was not just confirmation that the problem was real. It was also where trade-offs became visible, and where practical solutions emerged from people who had already run into the same blocker.

![Google Issue Tracker, issue 443587266: Google announces the fix in Android Gradle Plugin 9.0.0-alpha06, Alessandro asks why it is not fixed in 8.13.x, and a SAP engineer shares the setGraph workaround.](upstream-issue.png)

*Cross-contributions from Google, Technogym, and SAP.*

## The leadership angle

This is the part that, to me, matters most for an Engineering Manager or a Team Lead.

People leading teams should not only focus on the next feature that has to make it into the sprint. They should also trust the team when the work looks like “just maintenance.” Because that work keeps the system healthy, prevents regressions, reduces time lost in debugging, and protects future throughput.

The challenge is that this cost is hard to explain. Describing why a build broke means talking about AGP, Gradle, resource verification tasks, upstream bugs, workarounds, upgrade risk, and differences between local and CI environments. It is completely understandable that, from the outside, all of this may look excessive. But that is exactly where trust matters: trust that the technical team is choosing the solution with the best balance between risk, effort, and stability.

## The operational lesson

The lesson here is not “Google got it wrong,” and it is not “always wait.”

The real lesson is that you need to distinguish between:

- local problems and platform problems,
- quick fixes and structural upgrades,
- perceived maintenance cost and actual maintenance cost,
- apparent speed and system reliability.

Sometimes the best work is the work no one sees: recognizing that an upstream issue should not be chased anxiously but observed methodically; knowing when a workaround is the wiser choice; and documenting the decision so the team does not repeat the same investigation six months later.

## What this leaves behind

There are three things I take away from this story.

**First:** maintenance is product work, not extra work.

**Second:** in complex platforms, technical context must be explained clearly even to people who do not live inside the build every day.

**Third:** the cleanest solution is not always the right one today; often, the right solution is the one that stabilizes the system without introducing new risk.

In other words, a green build is not a minor technical detail. It is a form of trust between the people building the software and the people deciding where the next investment should go.
