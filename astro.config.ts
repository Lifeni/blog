import { defineConfig } from 'astro/config'

import vercel from '@astrojs/vercel/serverless'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import partytown from '@astrojs/partytown'
import icon from 'astro-icon'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  server: { port: 8000, host: true },
  output: 'server',
  site: 'https://lifeni.life',
  adapter: vercel({
    webAnalytics: { enabled: true },
    speedInsights: { enabled: true },
  }),
  integrations: [
    svelte(),
    tailwind(),
    mdx(),
    sitemap(),
    icon({ include: { tabler: ['*'] } }),
    partytown(),
  ],
})
