import React from 'react';
import type { ArticleMeta } from 'virtual:articles';
import { portfolioData } from '../data/portfolioData';
import { formatDate } from '../lib/formatDate';
import { StaticShell } from './StaticShell';

interface ArticlePageProps {
  article: ArticleMeta;
  /** Markdown already converted to HTML at build time. */
  html: string;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ article, html }) => {
  const { personalInfo } = portfolioData;
  return (
    <StaticShell>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <a href="/articles/" className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline">
          ← All articles
        </a>

        <header className="mt-6 mb-10">
          {article.series && (
            <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
              {article.series}
              {article.issue !== undefined && ` · #${article.issue}`}
            </p>
          )}
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-2">
            {article.title}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-4">{article.description}</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-5 text-xs text-slate-500 dark:text-slate-400">
            <span>{personalInfo.name}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            {article.draft && (
              <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-300 font-semibold">
                Draft
              </span>
            )}
          </div>
          {article.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2 mt-4" aria-label="Tags">
              {article.tags.map((tag) => (
                <li
                  key={tag}
                  className="px-2 py-0.5 text-[11px] font-mono rounded-md bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        {article.cover && (
          <img
            src={article.cover}
            alt={article.coverAlt ?? ''}
            className="w-full h-auto rounded-2xl border border-slate-200 dark:border-slate-800 mb-10"
            fetchPriority="high"
          />
        )}

        <div
          className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-display prose-a:text-teal-600 dark:prose-a:text-teal-400 prose-pre:p-0 prose-pre:bg-transparent prose-code:before:content-none prose-code:after:content-none prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300 space-y-3">
          {article.originalUrl && (
            <p>
              Also published on{' '}
              <a href={article.originalUrl} rel="noopener" className="text-teal-600 dark:text-teal-400 hover:underline">
                LinkedIn
              </a>
              .
            </p>
          )}
          <p>
            Written by <a href="/" className="font-semibold text-slate-900 dark:text-white hover:underline">{personalInfo.name}</a>,{' '}
            {personalInfo.title}.
          </p>
        </footer>
      </article>
    </StaticShell>
  );
};
