import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://wolffsroom.9h9rnjjcrf.workers.dev',
  output: 'static',
  integrations: [sitemap()]
});
