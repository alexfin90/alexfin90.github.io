import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;

// In production the page is prerendered at build time, so hydrate the existing markup.
// In dev (vite) the root is empty, so render from scratch.
if (container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
