/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Github, ExternalLink, Code2 } from 'lucide-react';

export const OpenSourceSection: React.FC = () => {
  const { openSource, config } = portfolioData;

  return (
    <section id="opensource" className="py-16 md:py-24 border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
              Community &amp; Open Source
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Public Code &amp; Repositories
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl">
              Public Android and Kotlin repositories hosted on GitHub. Descriptions marked with <code className="text-teal-600 dark:text-teal-400 font-mono text-xs">[ADD description]</code> can be updated as projects evolve.
            </p>
          </div>

          <a
            href={config.githubProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            <Github className="w-4 h-4" />
            <span>github.com/alexfin90</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Repositories Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {openSource.map((repo) => (
            <div
              key={repo.title}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col justify-between hover:border-teal-500/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-teal-600 dark:text-teal-400">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    aria-label={`Open repository ${repo.title}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-bold text-base text-slate-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors block"
                >
                  {repo.title}
                </a>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {repo.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-1.5">
                {repo.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
