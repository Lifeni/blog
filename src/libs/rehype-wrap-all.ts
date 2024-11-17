// @ts-nocheck
// https://github.com/mrzmmr/rehype-wrap/issues/4

import { visit } from 'unist-util-visit'
import { selectAll } from 'hast-util-select'
import { parseSelector } from 'hast-util-parse-selector'

export const plugin = options => tree => {
  for (const match of selectAll(options.selector, tree)) {
    visit(tree, match, (node, i, parent) => {
      const wrapper = parseSelector(options.wrapper)
      wrapper.children = [node]
      parent.children[i] = wrapper
    })
  }
}
