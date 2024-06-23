import transformerDirectives from '@unocss/transformer-directives'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
} from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'

export default defineConfig({
  content: {
    pipeline: {
      include: [/\.([jt]sx|[jt]s|mdx?|astro|html)($|\?)/],
    },
  },
  presets: [
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetScrollbar({ noCompatible: false }),
    presetUno({ dark: 'media' }),
  ],
  transformers: [transformerDirectives()],
  // prettier-ignore
  theme: {
    fontFamily: {
      sans: 'Inter Variable, Inter, -apple-system, HarmonyOS Sans SC, MiSans, Source Han Sans SC, Noto Sans SC, system-ui, Roboto, emoji, sans-serif',
      serif: 'Source Han Serif SC, Noto Serif SC, Times, Times New Roman, Georgia, emoji, serif',
      mono: 'Fira Code Variable, Cascadia Mono, JetBrains Mono, Consolas, Roboto Mono, Fira Mono, Courier New, -apple-system, HarmonyOS Sans SC, MiSans, Source Han Sans SC, Noto Sans SC, system-ui, emoji, monospace',
      emoji: 'Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji, emoji',
    },
    breakpoints:{ xs: '480px', sm: '640px', md: '768px', lg: '1024px', xl: '1280px', xxl: '1536px' },
  },
  shortcuts: [
    {
      'text-main': 'text-dark-900 dark:text-light-400',
      'text-secondary': 'text-true-gray-600 dark:text-true-gray-400',
      'text-link': 'text-indigo-500 dark:text-indigo-400',
      'text-accent': 'text-true-gray-400 dark:text-true-gray-500',
      'text-line': 'text-true-gray-300 dark:text-true-gray-600',
    },
    {
      'bg-popover': 'bg-white dark:bg-dark-700',
      'bg-main': 'bg-white dark:bg-dark-800',
      'bg-secondary': 'bg-light-400 dark:bg-dark-600',
      'bg-code': 'bg-light-400 dark:bg-dark-400',
      'bg-accent': 'bg-light-400 dark:bg-dark-400',
      'bg-error': 'bg-red-400 dark:bg-red-500',
      'bg-warning': 'bg-yellow-300 dark:bg-yellow-400',
    },
    // prettier-ignore
    {
      'border-main': 'border-solid border-color-light-600 dark:border-color-dark-300 ',
      'border-secondary': 'border-solid border-color-light-900 dark:border-color-dark-100 ',
    },
  ],
})
