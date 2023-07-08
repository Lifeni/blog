import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel/serverless'
import rome from 'astro-rome'
import { defineConfig } from 'astro/config'
import unocss from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  site: 'https://lifeni.life/',
  integrations: [unocss({ injectReset: true }), mdx(), sitemap(), rome()],
  server: { port: 8000, host: true },
  // https://github.com/withastro/astro/issues/7564
  output: 'server',
  adapter: vercel({ analytics: true }),
  experimental: { assets: true },
})
