// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Astro 7 default is "jsx" (React-style), which strips spaces around
  // multiline tags. true keeps source whitespace that affects rendering.
  compressHTML: true,
  // Never inline scripts into HTML, so the CSP can use script-src 'self'.
  vite: {
    build: { assetsInlineLimit: 0 },
  },
  site: 'https://dinsor.org',
  integrations: [sitemap()],
});
