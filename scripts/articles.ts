/**
 * Loads articles from content/articles/*.md.
 * Shared by the Vite plugin (metadata for the app) and the prerender script (full pages).
 */
import fs from 'node:fs';
import path from 'node:path';

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  series?: string;
  issue?: number;
  tags: string[];
  originalUrl?: string;
  draft: boolean;
}

export interface Article extends ArticleMeta {
  body: string; // raw markdown
}

export const ARTICLES_DIR = path.resolve(import.meta.dirname, '..', 'content', 'articles');

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const unquote = (value: string): string => {
  const v = value.trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    return v.slice(1, -1);
  }
  return v;
};

/** Minimal frontmatter parser: `key: value` lines and `[a, b]` lists. Enough for our fields. */
const parseFrontmatter = (source: string, file: string): { data: Record<string, string | string[]>; body: string } => {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`${file}: missing frontmatter block (--- ... ---) at the top of the file`);
  const data: Record<string, string | string[]> = {};
  for (const rawLine of match[1].split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const idx = line.indexOf(':');
    if (idx === -1) throw new Error(`${file}: cannot read frontmatter line "${line}"`);
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map(unquote)
        .filter(Boolean);
    } else {
      data[key] = unquote(value);
    }
  }
  return { data, body: match[2] };
};

const str = (v: string | string[] | undefined): string => (Array.isArray(v) ? v.join(', ') : (v ?? ''));

export const includeDrafts = (): boolean => process.env.INCLUDE_DRAFTS === '1';

/** Reads every article. Drafts are skipped unless `withDrafts` is true. Newest first. */
export const loadArticles = (withDrafts = includeDrafts()): Article[] => {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  const articles: Article[] = [];
  for (const name of fs.readdirSync(ARTICLES_DIR).sort()) {
    if (!name.endsWith('.md')) continue;
    const file = path.join(ARTICLES_DIR, name);
    const { data, body } = parseFrontmatter(fs.readFileSync(file, 'utf8'), name);
    const draft = str(data.draft) === 'true';
    if (draft && !withDrafts) continue;

    const slug = name.replace(/\.md$/, '');
    if (!SLUG_RE.test(slug)) {
      throw new Error(`${name}: file name must be a lowercase slug like "my-article-title.md"`);
    }
    const title = str(data.title);
    const description = str(data.description);
    let date = str(data.date);
    if (!title) throw new Error(`${name}: "title" is required`);
    if (!draft) {
      if (!description) throw new Error(`${name}: "description" is required for a published article`);
      if (!DATE_RE.test(date)) throw new Error(`${name}: "date" must be YYYY-MM-DD for a published article`);
    } else if (!DATE_RE.test(date)) {
      date = new Date().toISOString().slice(0, 10); // drafts preview with today's date
    }
    const issue = str(data.issue) ? Number(str(data.issue)) : undefined;
    articles.push({
      slug,
      title,
      description: description || 'Draft',
      date,
      series: str(data.series) || undefined,
      issue: Number.isFinite(issue) ? issue : undefined,
      tags: Array.isArray(data.tags) ? data.tags : str(data.tags) ? [str(data.tags)] : [],
      originalUrl: str(data.originalUrl) || undefined,
      draft,
      body,
    });
  }
  return articles.sort((a, b) => b.date.localeCompare(a.date));
};

export const toMeta = ({ body: _body, ...meta }: Article): ArticleMeta => meta;
