// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

// Import site config for the site URL
import config from './src/site.config';

export default defineConfig({
  site: config.siteUrl,
  output: 'static',
  trailingSlash: 'always',

  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/admin/') &&
        !page.includes('/api/') &&
        !page.includes('/draft/'),
      changefreq: 'weekly',
      priority: 0.7,
      customPages: [],
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  // Swap to netlify() for Netlify deploy, or remove adapter for pure static
  // adapter: netlify(),
});
