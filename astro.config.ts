import { defineConfig } from 'astro/config'
import unocss from 'unocss/astro'

import vercel from '@astrojs/vercel/serverless'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

const config = { injectReset: true }

// https://astro.build/config
export default defineConfig({
  output: 'server',
  server: { port: 8000, host: true },
  site: 'https://lifeni.life/',
  adapter: vercel(),
  integrations: [unocss(config), mdx(), sitemap()],
})
