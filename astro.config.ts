import { defineConfig } from 'astro/config'
import unocss from 'unocss/astro'

import vercel from '@astrojs/vercel/serverless'
import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  site: 'https://lifeni.life/',
  integrations: [unocss({ injectReset: true }), mdx()],
  server: { port: 8000, host: true },
  output: 'server',
  adapter: vercel({ analytics: true }),
  build: { split: true },
})
