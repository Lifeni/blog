import { defineConfig } from 'astro/config'
import unocss from 'unocss/astro'
import vercel from '@astrojs/vercel/serverless'

import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import lit from '@astrojs/lit'

export default defineConfig({
  adapter: vercel({}),
  output: 'server',
  site: 'https://lifeni.life/',
  integrations: [
    unocss({ injectReset: true }),
    react(),
    lit(),
    sitemap(),
    mdx(),
  ],
  server: { port: 8000, host: true },
})
