import { defineConfig } from 'astro/config'

import vercel from '@astrojs/vercel/serverless'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import partytown from '@astrojs/partytown'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  server: { port: 8000, host: true },
  site: 'https://lifeni.life',
  output: 'server',
  integrations: [svelte(), tailwind(), mdx(), sitemap(), partytown()],
  adapter: vercel({ analytics: true }),
})
