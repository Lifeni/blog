import alpinejs from '@astrojs/alpinejs'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import uno from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  server: { port: 8000, host: true },
  site: 'https://lifeni.life',
  integrations: [uno({ injectReset: true }), mdx(), alpinejs(), sitemap()],
  markdown: { shikiConfig: { theme: 'css-variables' } },
})
