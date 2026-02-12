// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  build: {
    assets: 'static'
  },

  //Localhost
  //Deploy normal project
  base: '/some-projects-with-wix-studio',
  site: 'https://20essentials.github.io/some-projects-with-wix-studio/',
  // site: 'http://localhost:4321/',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});