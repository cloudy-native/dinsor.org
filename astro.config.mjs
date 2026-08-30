// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Astro 7 default is "jsx" (React-style), which strips spaces around
  // multiline tags. true keeps source whitespace that affects rendering.
  compressHTML: true,
  vite: {
    plugins: [tailwind()],
  },
  site: 'https://dinsor.org',
  integrations: [sitemap()],
});
