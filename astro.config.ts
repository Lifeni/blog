import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel/serverless'
import rome from 'astro-rome'
import { defineConfig } from 'astro/config'
import unocss from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  experimental: { assets: true },
  site: 'https://lifeni.life/',
  integrations: [unocss({ injectReset: true }), mdx(), sitemap(), rome()],
  server: { port: 8000, host: true },
  publicDir: 'assets',
  // https://github.com/withastro/astro/issues/7564
  output: 'server',
  adapter: vercel({ analytics: true }),
})
