/**
 * Server entry used only at build time (see scripts/prerender.ts).
 */
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import type { ArticleMeta } from 'virtual:articles';
import App from './App';
import { portfolioData } from './data/portfolioData';
import { ArticlePage } from './pages/ArticlePage';
import { ArticlesIndexPage } from './pages/ArticlesIndexPage';
import { NotFoundPage } from './pages/NotFoundPage';

/** Home page markup, hydrated by the client bundle. */
export const renderHome = (): string => renderToString(<App />);

/** Article pages ship without the app bundle, so static markup is enough. */
export const renderArticle = (article: ArticleMeta, html: string): string =>
  renderToStaticMarkup(<ArticlePage article={article} html={html} />);

export const renderArticlesIndex = (articles: ArticleMeta[]): string =>
  renderToStaticMarkup(<ArticlesIndexPage articles={articles} />);

export const renderNotFound = (): string => renderToStaticMarkup(<NotFoundPage />);

export const siteInfo = {
  name: portfolioData.personalInfo.name,
  title: portfolioData.personalInfo.title,
  github: portfolioData.personalInfo.github,
  linkedin: portfolioData.personalInfo.linkedin,
  photo: portfolioData.personalInfo.profilePhoto,
};
