import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';
import {ARTICLES_DIR, loadArticles, toMeta} from './scripts/articles.ts';

// Exposes article metadata (no bodies) to the app as `virtual:articles`.
const articlesPlugin = (): Plugin => {
  const id = 'virtual:articles';
  const resolvedId = '\0' + id;
  let isBuild = false;
  return {
    name: 'articles-metadata',
    configResolved(config) {
      isBuild = config.command === 'build';
    },
    resolveId: (source) => (source === id ? resolvedId : undefined),
    load(loadId) {
      if (loadId !== resolvedId) return;
      this.addWatchFile(ARTICLES_DIR);
      // Drafts show in dev so they can be previewed; builds follow INCLUDE_DRAFTS.
      const withDrafts = !isBuild || process.env.INCLUDE_DRAFTS === '1';
      const meta = loadArticles(withDrafts).map(toMeta);
      return `export default ${JSON.stringify(meta)};`;
    },
  };
};

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), articlesPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
  };
});
