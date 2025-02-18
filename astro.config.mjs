// @ts-check
// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import solidJs from '@astrojs/solid-js';

import icon from 'astro-icon';


import vercel from '@astrojs/vercel';


// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), solidJs(), icon()],
  output: "hybrid",
  prefetch: true,
  adapter: vercel(),
});