import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    // Tailwind v4 is handled via CSS (@import "tailwindcss") + postcss.config.js
    // + updated tailwind.config.js content paths. No @astrojs/tailwind (v3 only).
  ],
  // Static site by default - perfect for our use case
  output: 'static',
  // Ensure build outputs to dist/ like before for CDK compatibility
  outDir: './dist',
  // Site URL for sitemap etc. (update if needed)
  site: 'https://dinsor.org',
});
