// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  build: {
    assets: 'static'
  },

  //Localhost
  //Deploy normal project
  // base: '/project-1020/',
  // site: 'https://20essentials.github.io/project-1020/'
  site: 'http://localhost:4321/',

  vite: {
    plugins: [tailwindcss()]
  }
});