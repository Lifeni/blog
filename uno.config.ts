import {
  defineConfig,
  presetTypography,
  presetUno,
  presetAttributify,
  presetIcons,
} from 'unocss'
import { colors, fonts, shortcuts } from './src/libs/styles'
import variant from '@unocss/transformer-variant-group'

export default defineConfig({
  presets: [
    presetUno({ dark: 'media' }),
    presetTypography(),
    presetIcons({ prefix: 'icon-' }),
    presetAttributify(),
  ],
  transformers: [variant()],
  theme: { fontFamily: fonts, colors },
  shortcuts,
})
