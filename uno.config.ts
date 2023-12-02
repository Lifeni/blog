import transformerDirectives from '@unocss/transformer-directives'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetUno({ dark: 'media' }),
  ],
  transformers: [transformerDirectives()],
  theme: {
    // prettier-ignore
    fontFamily: {
      sans: 'Inter Variable, Inter, -apple-system, HarmonyOS Sans SC, MiSans, Source Han Sans SC, Noto Sans SC, system-ui, Roboto, emoji, sans-serif',
      serif: 'Source Han Serif SC, Noto Serif SC, Times, Times New Roman, Georgia, emoji, serif',
      mono: 'Cascadia Mono, JetBrains Mono, Consolas, Roboto Mono, Fira Mono, Courier New, -apple-system, HarmonyOS Sans SC, MiSans, Source Han Sans SC, Noto Sans SC, system-ui, emoji, monospace',
      emoji: 'Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji, emoji',
    },
    // prettier-ignore
    breakpoints:{ xs: '480px', sm: '640px', md: '768px', lg: '1024px', xl: '1280px', xxl: '1536px' },
    colors: { dark: { 600: '#1c1c1c' } },
  },
  shortcuts: [
    {
      'text-main': 'text-dark-900 dark:text-light-400',
      'text-subtle': 'text-true-gray-500 dark:text-true-gray-400',
      'text-link': 'text-indigo-500 dark:text-indigo-400',
      'text-light': 'text-true-gray-400 dark:text-true-gray-500',
    },
    {
      'bg-main': 'bg-light-200 dark:bg-dark-800',
      'bg-subtle': 'bg-white dark:bg-dark-600',
      'bg-code': 'bg-white dark:bg-dark-600',
      'bg-hover': 'bg-light-400 dark:bg-dark-400',
    },
    {
      'border-main':
        'border-solid border-color-light-600 dark:border-color-dark-400 ',
      'border-quote':
        'border-solid border-color-light-900 dark:border-color-dark-100 ',
    },
  ],
})
