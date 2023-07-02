import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel/serverless'
import { defineConfig } from 'astro/config'
import unocss from 'unocss/astro'
import react from '@astrojs/react'
import lit from '@astrojs/lit'

export default defineConfig({
  adapter: vercel(),
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
