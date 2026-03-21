import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'
import { redirects } from './src/libs/configs'

export default defineConfig({
  server: { port: 8000, host: true },
  site: 'https://lifeni.life',
  image: { domains: ['file.lifeni.life', 'octodex.github.com'] },
  integrations: [react(), mdx(), sitemap(), icon()],
  vite: { plugins: [tailwindcss()] },
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: { theme: 'css-variables' },
  },
  redirects,
})
