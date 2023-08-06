import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
} from 'unocss'

import directives from '@unocss/transformer-directives'
import variant from '@unocss/transformer-variant-group'
import { presetScrollbar } from 'unocss-preset-scrollbar'

import {
  breakpoints,
  fonts,
  rules,
  shortcuts,
  colors,
  safelist,
} from './src/libs/styles/styles'

export default defineConfig({
  presets: [
    presetUno({ dark: 'media' }),
    presetTypography(),
    presetIcons({ prefix: 'icon-' }),
    presetAttributify(),
    presetScrollbar(),
  ],
  transformers: [variant(), directives()],
  theme: { fontFamily: fonts, colors, breakpoints },
  shortcuts,
  rules,
  safelist,
})
