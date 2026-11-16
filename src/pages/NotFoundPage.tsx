import React from 'react';
import { StaticShell } from './StaticShell';

export const NotFoundPage: React.FC = () => (
  <StaticShell>
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
      <p className="font-mono text-sm text-teal-600 dark:text-teal-400">404</p>
      <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white mt-2">Page not found</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">The page you are looking for does not exist or has moved.</p>
      <div className="mt-8 flex items-center justify-center gap-4 text-sm font-semibold">
        <a href="/" className="text-teal-600 dark:text-teal-400 hover:underline">
          Home
        </a>
        <a href="/articles/" className="text-teal-600 dark:text-teal-400 hover:underline">
          Writing
        </a>
      </div>
    </section>
  </StaticShell>
);
