import vercel from '@astrojs/vercel/serverless'
import { defineConfig } from 'astro/config'

import unocss from 'unocss/astro'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import rome from 'astro-rome'
import compress from 'astro-compress'

import external from 'rehype-external-links'
import rewrite from 'rehype-rewrite'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({ analytics: true }),
  experimental: { assets: true, viewTransitions: true },
  site: 'https://lifeni.life',
  redirects: { '/router': 'https://iokl.link' },
  server: { port: 8000, host: true },
  integrations: [
    unocss({ injectReset: true }),
    react(),
    mdx(),
    sitemap(),
    rome(),
    compress(),
  ],
  markdown: {
    shikiConfig: { theme: 'css-variables' },
    rehypePlugins: [
      [external, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
      [
        rewrite,
        {
          selector: 'h1',
          rewrite: (n, _, p) => {
            if (n.type !== 'element') return
            p.children = p.children.filter(c => c.tagName !== 'h1')
          },
        },
      ],
    ],
  },
})
