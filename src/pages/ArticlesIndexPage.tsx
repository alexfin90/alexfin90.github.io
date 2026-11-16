import React from 'react';
import type { ArticleMeta } from 'virtual:articles';
import { formatDate } from '../lib/formatDate';
import { StaticShell } from './StaticShell';

export const ArticlesIndexPage: React.FC<{ articles: ArticleMeta[] }> = ({ articles }) => (
  <StaticShell>
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-widest">Writing</span>
      <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
        Engineering notes
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
        Notes on Android engineering from real projects. Also available as an{' '}
        <a href="/feed.xml" className="text-teal-600 dark:text-teal-400 hover:underline">
          RSS feed
        </a>
        .
      </p>

      {articles.length === 0 ? (
        <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">No articles yet.</p>
      ) : (
        <ul className="mt-10 space-y-6">
          {articles.map((a) => (
            <li key={a.slug}>
              <a
                href={`/articles/${a.slug}/`}
                className="block p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-teal-500/40 transition-colors"
              >
                {a.cover && (
                  <img
                    src={a.cover}
                    alt={a.coverAlt ?? ''}
                    loading="lazy"
                    className="w-full aspect-[1200/630] object-cover rounded-xl mb-5 border border-slate-200 dark:border-slate-800"
                  />
                )}
                <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-500 dark:text-slate-400">
                  <time dateTime={a.date}>{formatDate(a.date)}</time>
                  {a.series && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>
                        {a.series}
                        {a.issue !== undefined && ` #${a.issue}`}
                      </span>
                    </>
                  )}
                  {a.draft && <span className="text-amber-600 dark:text-amber-300 font-semibold">· Draft</span>}
                </div>
                <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white mt-2">{a.title}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{a.description}</p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  </StaticShell>
);
