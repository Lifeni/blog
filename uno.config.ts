import {
  defineConfig,
  presetTypography,
  presetUno,
  presetAttributify,
  presetIcons,
} from 'unocss'
import { colors, fonts, shortcuts } from './src/libs/styles'

export default defineConfig({
  presets: [
    presetUno({ dark: 'media' }),
    presetTypography(),
    presetIcons({ prefix: 'icon-' }),
    presetAttributify(),
  ],
  theme: { fontFamily: fonts, colors },
  shortcuts,
})
