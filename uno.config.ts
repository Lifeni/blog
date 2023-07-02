import {
  defineConfig,
  presetTypography,
  presetUno,
  presetAttributify,
} from 'unocss'
import { colors, fonts, shortcuts } from './src/libs/styles'

export default defineConfig({
  presets: [
    presetUno({ dark: 'media' }),
    presetTypography(),
    presetAttributify(),
  ],
  theme: { fontFamily: fonts, colors },
  shortcuts,
})
