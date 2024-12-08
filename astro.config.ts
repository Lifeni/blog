import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import uno from 'unocss/astro'

import { plugin as wrap } from './src/libs/rehype-wrap-all'
import rewrite from 'rehype-rewrite'

// @ts-ignore
const rewriteHTML = (node, i, parent) => {
  if (node.type !== 'element') return
  if (node.tagName === 'h1')
    // @ts-ignore
    parent.children = parent.children.filter(n => n !== node)
  if (node.tagName === 'img') node.properties.loading = 'lazy'
  if (node.tagName === 'a') {
    if (node.properties.href.startsWith('http')) {
      node.properties.target = '_blank'
      node.properties.rel = 'noopener noreferrer'
    }
  }
}

const redirects = {
  '/article': '/',
  '/article/bye-2023': '/story/bye-2023',
  '/article/this-website': '/story/this-website',
}

// https://astro.build/config
export default defineConfig({
  server: { port: 8000, host: true },
  site: 'https://lifeni.life',
  integrations: [uno({ injectReset: true }), mdx(), sitemap()],
  redirects,
  markdown: {
    shikiConfig: { theme: 'css-variables' },
    rehypePlugins: [
      [wrap, { selector: 'table', wrapper: 'div.table-container' }],
      [rewrite, { rewrite: rewriteHTML }],
    ],
  },
})
