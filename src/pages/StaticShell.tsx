/**
 * Layout for the build-time pages (articles, 404). These pages ship no JavaScript bundle,
 * only a tiny inline script for the theme toggle, so everything here must be plain markup.
 */
import React from 'react';
import { portfolioData } from '../data/portfolioData';

export const StaticShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { personalInfo } = portfolioData;
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-slate-950/85 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <a
            href="/"
            className="font-display text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-2"
          >
            <span className="h-2 w-2 rounded-full bg-teal-500" aria-hidden="true" />
            <span>{personalInfo.name}</span>
          </a>
          <nav aria-label="Main" className="flex items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="/articles/" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              Writing
            </a>
            <a href="/#contact" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              Contact
            </a>
            <button
              type="button"
              data-theme-toggle=""
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
              aria-label="Toggle dark mode"
            >
              <span className="dark:hidden" aria-hidden="true">☾</span>
              <span className="hidden dark:inline" aria-hidden="true">☀</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span>
            {personalInfo.name} · {personalInfo.title}
          </span>
          <span className="flex items-center gap-4">
            <a href={personalInfo.github} rel="me noopener" className="hover:text-teal-600 dark:hover:text-teal-400">
              GitHub
            </a>
            <a href={personalInfo.linkedin} rel="me noopener" className="hover:text-teal-600 dark:hover:text-teal-400">
              LinkedIn
            </a>
            <a href="/feed.xml" className="hover:text-teal-600 dark:hover:text-teal-400">
              RSS
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
};
