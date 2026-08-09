import mdx from '@astrojs/mdx'
import partytown from '@astrojs/partytown'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'
import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'
import { redirects } from './src/libs/configs'

const ignoreElementNames = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'a',
  'p',
  'img',
  'hr',
  'code',
  'pre',
  'blockquote',
  'ul',
  'ol',
  'li',
  'table',
  'thead',
  'tbody',
  'tfoot',
  'tr',
  'th',
  'td',
  'em',
]

export default defineConfig({
  server: { port: 8000, host: true },
  site: 'https://lifeni.life',
  image: { domains: ['file.lifeni.life'] },
  integrations: [
    react(),
    mdx({ optimize: { ignoreElementNames } }),
    sitemap(),
    icon(),
    partytown(),
  ],
  vite: { plugins: [tailwindcss()] },
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: { theme: 'css-variables' },
  },
  redirects,
  adapter: vercel(),
})
