import { defineConfig } from 'astro/config'
import unocss from 'unocss/astro'

import vercel from '@astrojs/vercel/serverless'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://lifeni.life/',
  integrations: [unocss({ injectReset: true }), mdx(), sitemap()],
  server: { port: 8000, host: true },
  output: 'server',
  adapter: vercel({ analytics: true, includeFiles: ['.vercel/output'] }),
  build: { split: true },
})
