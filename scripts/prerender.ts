/**
 * Runs after the client and SSR builds. Writes static HTML into dist/:
 *  - index.html with the home page markup (hydrated by the client bundle)
 *  - articles/ and articles/<slug>/ pages (no JS bundle)
 *  - 404.html, sitemap.xml, feed.xml
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { Marked } from 'marked';
import { createHighlighter } from 'shiki';
import { loadArticles, toMeta, type Article } from './articles.ts';

const SITE_URL = 'https://alexfin90.github.io';
const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SSR_ENTRY = path.join(ROOT, 'dist-ssr', 'entry-server.js');

const ssr = await import(pathToFileURL(SSR_ENTRY).href);
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

const escapeHtml = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const write = (rel: string, content: string) => {
  const file = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
};

// ---------- Home ----------
const ROOT_MARKER = '<div id="root"></div>';
if (!template.includes(ROOT_MARKER)) throw new Error(`dist/index.html: marker ${ROOT_MARKER} not found`);
write('index.html', template.replace(ROOT_MARKER, `<div id="root">${ssr.renderHome()}</div>`));

// ---------- Shared head for static pages ----------
// Reuse the hashed stylesheet, fonts and theme script from the built index.html.
const stylesheets = template.match(/<link[^>]+rel="stylesheet"[^>]*>/g) ?? [];
const preconnects = template.match(/<link[^>]+rel="preconnect"[^>]*>/g) ?? [];
const themeScript = template.match(/<script data-theme-init>[\s\S]*?<\/script>/)?.[0] ?? '';
if (!stylesheets.some((l) => l.includes('/assets/'))) throw new Error('Built stylesheet not found in dist/index.html');

const TOGGLE_SCRIPT = `<script>document.querySelectorAll('[data-theme-toggle]').forEach(function(b){b.addEventListener('click',function(){var d=document.documentElement.classList.toggle('dark');try{localStorage.setItem('theme',d?'dark':'light')}catch(e){}})})</script>`;

interface PageOptions {
  title: string;
  description: string;
  pathname: string; // e.g. /articles/foo/
  body: string;
  ogType?: string;
  jsonLd?: object;
  noindex?: boolean;
  extraHead?: string;
  /** Site path of the preview image; defaults to the profile photo. */
  image?: string;
}

const page = (o: PageOptions): string => {
  const url = SITE_URL + o.pathname;
  const image = SITE_URL + (o.image ?? ssr.siteInfo.photo);
  return `<!doctype html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(o.title)}</title>
    <meta name="description" content="${escapeHtml(o.description)}" />
    <meta name="author" content="${escapeHtml(ssr.siteInfo.name)}" />
    ${o.noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`}
    <meta property="og:title" content="${escapeHtml(o.title)}" />
    <meta property="og:description" content="${escapeHtml(o.description)}" />
    <meta property="og:type" content="${o.ogType ?? 'website'}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta name="twitter:card" content="${o.image ? 'summary_large_image' : 'summary'}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:title" content="${escapeHtml(o.title)}" />
    <meta name="twitter:description" content="${escapeHtml(o.description)}" />
    <link rel="icon" href="/favicon.ico" sizes="32x32" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="alternate" type="application/rss+xml" title="${escapeHtml(ssr.siteInfo.name)}: Engineering notes" href="/feed.xml" />
    ${o.extraHead ?? ''}
    ${o.jsonLd ? `<script type="application/ld+json">${JSON.stringify(o.jsonLd)}</script>` : ''}
    ${themeScript}
    ${preconnects.join('\n    ')}
    ${stylesheets.join('\n    ')}
  </head>
  <body class="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased">
    ${o.body}
    ${TOGGLE_SCRIPT}
  </body>
</html>
`;
};

// ---------- Markdown ----------
const LANGS = ['kotlin', 'java', 'xml', 'groovy', 'json', 'yaml', 'bash', 'shell', 'typescript', 'javascript', 'diff', 'toml', 'properties'];
const highlighter = await createHighlighter({ themes: ['github-light', 'github-dark'], langs: LANGS });
const loaded = new Set(highlighter.getLoadedLanguages());

// Set per article before parsing, so relative image paths resolve to /articles/<slug>/.
let currentSlug = '';

const marked = new Marked({
  gfm: true,
  renderer: {
    image({ href, title, text }) {
      const src = /^(https?:)?\/\//.test(href) || href.startsWith('/') ? href : `/articles/${currentSlug}/${href.replace(/^\.\//, '')}`;
      const t = title ? ` title="${escapeHtml(title)}"` : '';
      return `<img src="${escapeHtml(src)}" alt="${escapeHtml(text)}"${t} loading="lazy" />`;
    },
    code({ text, lang }) {
      const requested = (lang ?? '').split(/\s/)[0].toLowerCase();
      const alias: Record<string, string> = { kt: 'kotlin', kts: 'kotlin', gradle: 'groovy', sh: 'bash', ts: 'typescript', js: 'javascript' };
      const language = alias[requested] ?? requested;
      return highlighter.codeToHtml(text, {
        lang: loaded.has(language) ? language : 'text',
        themes: { light: 'github-light', dark: 'github-dark' },
      });
    },
  },
});

// ---------- Articles ----------
const articles: Article[] = loadArticles();
const metas = articles.map(toMeta);
const author = { '@type': 'Person', name: ssr.siteInfo.name, url: SITE_URL + '/' };

for (const article of articles) {
  currentSlug = article.slug;
  const html = await marked.parse(article.body);
  const pathname = `/articles/${article.slug}/`;
  write(
    `articles/${article.slug}/index.html`,
    page({
      title: `${article.title} | ${ssr.siteInfo.name}`,
      description: article.description,
      pathname,
      ogType: 'article',
      image: article.cover,
      noindex: article.draft,
      extraHead: `<meta property="article:published_time" content="${article.date}" />`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.description,
        datePublished: article.date,
        author,
        mainEntityOfPage: SITE_URL + pathname,
        ...(article.cover ? { image: SITE_URL + article.cover } : {}),
        ...(article.tags.length ? { keywords: article.tags.join(', ') } : {}),
      },
      body: ssr.renderArticle(toMeta(article), html),
    }),
  );
}

write(
  'articles/index.html',
  page({
    title: `Engineering notes | ${ssr.siteInfo.name}`,
    description: `Android engineering notes by ${ssr.siteInfo.name}, ${ssr.siteInfo.title}.`,
    pathname: '/articles/',
    noindex: metas.length === 0,
    body: ssr.renderArticlesIndex(metas),
  }),
);

write(
  '404.html',
  page({
    title: `Page not found | ${ssr.siteInfo.name}`,
    description: 'Page not found.',
    pathname: '/404.html',
    noindex: true,
    body: ssr.renderNotFound(),
  }),
);

// ---------- Sitemap ----------
const published = articles.filter((a) => !a.draft);
const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: '/', lastmod: today },
  ...(published.length ? [{ loc: '/articles/', lastmod: published[0].date }] : []),
  ...published.map((a) => ({ loc: `/articles/${a.slug}/`, lastmod: a.date })),
];
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE_URL}${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n')}
</urlset>
`,
);

// ---------- RSS ----------
const rfc822 = (iso: string) => new Date(`${iso}T08:00:00Z`).toUTCString();
write(
  'feed.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeHtml(ssr.siteInfo.name)}: Engineering notes</title>
    <link>${SITE_URL}/articles/</link>
    <description>Android engineering notes by ${escapeHtml(ssr.siteInfo.name)}.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${published
  .map(
    (a) => `    <item>
      <title>${escapeHtml(a.title)}</title>
      <link>${SITE_URL}/articles/${a.slug}/</link>
      <guid isPermaLink="true">${SITE_URL}/articles/${a.slug}/</guid>
      <pubDate>${rfc822(a.date)}</pubDate>
      <description>${escapeHtml(a.description)}</description>
    </item>`,
  )
  .join('\n')}
  </channel>
</rss>
`,
);

console.log(
  `prerender: home, ${articles.length} article page(s)${articles.some((a) => a.draft) ? ' (including drafts)' : ''}, articles index, 404, sitemap (${urls.length} urls), feed (${published.length} items)`,
);
