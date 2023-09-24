import { defineConfig } from 'astro/config'

import vercel from '@astrojs/vercel/serverless'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import partytown from '@astrojs/partytown'
import icon from 'astro-icon'
import tailwind from '@astrojs/tailwind'

import toc from 'remark-toc'
import external from 'rehype-external-links'
import rewrite from 'rehype-rewrite'

// https://astro.build/config
export default defineConfig({
  server: { port: 8000, host: true },
  output: 'server',
  site: 'https://lifeni.life',
  adapter: vercel({
    webAnalytics: { enabled: true },
    speedInsights: { enabled: true },
  }),
  markdown: {
    shikiConfig: { theme: 'css-variables' },
    remarkPlugins: [toc],
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
  integrations: [
    svelte(),
    tailwind(),
    mdx(),
    sitemap(),
    icon({ include: { tabler: ['*'] } }),
    partytown(),
  ],
})
