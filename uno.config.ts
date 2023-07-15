import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
} from 'unocss'

import directives from '@unocss/transformer-directives'
import variant from '@unocss/transformer-variant-group'

import { colors, fonts, shortcuts } from './src/libs/styles'

export default defineConfig({
  presets: [
    presetUno({ dark: 'media' }),
    presetTypography(),
    presetIcons({ prefix: 'icon-' }),
    presetAttributify(),
  ],
  transformers: [variant(), directives()],
  theme: { fontFamily: fonts, colors },
  shortcuts,
})
