import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  build: {
    assets: 'static'
  },

  base: import.meta.env.DEV ? undefined : '/some-projects-with-wix-studio',
  site: import.meta.env.DEV
    ? 'http://localhost:4321/'
    : 'https://20essentials.github.io/some-projects-with-wix-studio/',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});
