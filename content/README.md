# Articles

One Markdown file per article in `content/articles/`. The file name is the URL slug:
`content/articles/my-article.md` is published at `/articles/my-article/`.

## Frontmatter

```yaml
---
title: Making Jetpack Compose UI Testable Without Exposing Test Surfaces in Production
description: One or two sentences for search results and link previews.
date: 2026-03-14            # YYYY-MM-DD
series: What Broke in Android - Engineering Notes   # optional
issue: 5                    # optional
tags: [Jetpack Compose, Testing]   # optional
originalUrl: https://www.linkedin.com/pulse/...  # optional, link to the LinkedIn version
draft: true                 # optional; drafts are not published
---
```

`title`, `description` and `date` are required for a published article. The build fails with a clear
message if one is missing, so a half-finished article never goes live by accident.

## Code blocks

Use fenced blocks with a language: `kotlin`, `java`, `xml`, `groovy` (or `gradle`), `json`, `yaml`,
`bash`, `toml`, `diff`, `typescript`. Highlighting is done at build time, in light and dark themes.

## Preview

- `bun run dev`: drafts appear in the home "Writing" section and nav.
- `bun run build:drafts && bun run preview`: full article pages, drafts included.
- `bun run build`: what GitHub Pages publishes. Drafts are left out.
