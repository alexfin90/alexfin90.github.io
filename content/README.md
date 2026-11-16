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
cover: cover.jpg            # optional, file in public/articles/<slug>/
coverAlt: Short description of the cover image   # required if cover is set
draft: true                 # optional; drafts are not published
---
```

`title`, `description` and `date` are required for a published article. The build fails with a clear
message if one is missing, so a half-finished article never goes live by accident.

## Images

Put every image for an article in `public/articles/<slug>/`, where `<slug>` is the Markdown file name
without `.md`. Example for `content/articles/my-article.md`:

```
public/articles/my-article/cover.jpg
public/articles/my-article/architecture.png
```

- **Cover:** set `cover: cover.jpg` and `coverAlt`. It is shown at the top of the article and on the
  cards, and used as the preview image when the link is shared (LinkedIn, X, Slack). Best size: 1200×630.
- **Images in the text:** use the file name only, `![What the image shows](architecture.png)`.
  The path is resolved for you. Always write a real description in the square brackets.

The build fails if a cover file is missing, so a broken image never goes live.

## Code blocks

Use fenced blocks with a language: `kotlin`, `java`, `xml`, `groovy` (or `gradle`), `json`, `yaml`,
`bash`, `toml`, `diff`, `typescript`. Highlighting is done at build time, in light and dark themes.

## Preview

- `bun run dev`: drafts appear in the home "Writing" section and nav.
- `bun run build:drafts && bun run preview`: full article pages, drafts included.
- `bun run build`: what GitHub Pages publishes. Drafts are left out.
