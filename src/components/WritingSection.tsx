import React from 'react';
import articles from 'virtual:articles';
import { ArrowRight } from 'lucide-react';
import { formatDate } from '../lib/formatDate';

/** Latest articles on the home page. Renders nothing until at least one article is published. */
export const WritingSection: React.FC = () => {
  if (articles.length === 0) return null;
  const latest = articles.slice(0, 3);

  return (
    <section id="writing" className="py-16 md:py-24 border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-widest">Writing</span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Engineering notes
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl">
              What broke, why, and how I fixed it. Notes from real Android projects.
            </p>
          </div>
          <a
            href="/articles/"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            <span>All articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest.map((a) => (
            <a
              key={a.slug}
              href={`/articles/${a.slug}/`}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:border-teal-500/40 transition-colors flex flex-col"
            >
              {a.cover && (
                <img
                  src={a.cover}
                  alt={a.coverAlt ?? ''}
                  loading="lazy"
                  className="w-full aspect-[1200/630] object-cover rounded-xl mb-4 border border-slate-200 dark:border-slate-800"
                />
              )}
              <span className="text-xs text-slate-500 dark:text-slate-400">
                <time dateTime={a.date}>{formatDate(a.date)}</time>
                {a.issue !== undefined && ` · #${a.issue}`}
              </span>
              <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mt-2">{a.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-3">{a.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
