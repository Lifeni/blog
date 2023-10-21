import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import uno from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  server: { port: 8000, host: true },
  site: 'https://lifeni.life',
  integrations: [mdx(), sitemap(), uno()],
})
