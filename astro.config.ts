import vercel from '@astrojs/vercel/serverless'
import { defineConfig } from 'astro/config'

import unocss from 'unocss/astro'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import rome from 'astro-rome'
import compress from 'astro-compress'

// https://astro.build/config
export default defineConfig({
  experimental: { assets: true, viewTransitions: true },
  site: 'https://lifeni.life',
  integrations: [
    unocss({ injectReset: true }),
    react(),
    mdx(),
    sitemap(),
    rome(),
    compress(),
  ],
  markdown: { shikiConfig: { theme: 'css-variables' } },
  server: { port: 8000, host: true },
  redirects: { '/router': 'https://iokl.link' },
  publicDir: 'assets',
  // https://github.com/withastro/astro/issues/7564
  output: 'server',
  adapter: vercel({ analytics: true }),
})
