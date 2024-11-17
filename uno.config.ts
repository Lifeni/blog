import transformerDirectives from '@unocss/transformer-directives'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerVariantGroup,
} from 'unocss'
import { presetAnimations } from 'unocss-preset-animations'
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
    presetAnimations(),
    presetUno({ dark: 'media' }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  // prettier-ignore
  theme: {
    breakpoints:{ xs: '480px', sm: '640px', md: '768px', lg: '1024px', xl: '1280px', xxl: '1536px' },
    fontFamily: {
      sans: 'Inter Variable, Inter, -apple-system, HarmonyOS Sans SC, MiSans, Source Han Sans SC, Noto Sans SC, system-ui, Roboto, emoji, sans-serif',
      serif: 'Source Han Serif SC, Noto Serif SC, Times, Times New Roman, Georgia, emoji, serif',
      mono: 'Fira Code Variable, Cascadia Mono, JetBrains Mono, Consolas, Roboto Mono, Fira Mono, Courier New, -apple-system, HarmonyOS Sans SC, MiSans, Source Han Sans SC, Noto Sans SC, system-ui, emoji, monospace',
      emoji: 'Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji, emoji',
    },
  },
  shortcuts: [
    {
      'text-main': 'text-dark-800 dark:text-light-400',
      'text-secondary': 'text-true-gray-600 dark:text-true-gray-400',
      'text-link': 'text-indigo-500 dark:text-indigo-400',
      'text-accent': 'text-true-gray-400 dark:text-true-gray-500',
      'text-line': 'text-true-gray-300 dark:text-true-gray-600',
    },
    {
      'bg-main': 'bg-white dark:bg-dark-800',
      'bg-secondary': 'bg-light-400 dark:bg-dark-600',
      'bg-accent': 'bg-light-400 dark:bg-dark-400',
      'bg-border': 'bg-light-600 dark:bg-dark-300',
      'bg-invert': 'bg-dark-800 dark:bg-light-400',
      'bg-invert-secondary': 'bg-true-gray-600 dark:bg-true-gray-400',
      'bg-footer': 'bg-light-300 dark:bg-dark-900',
      'bg-code': 'bg-light-400 dark:bg-dark-400',
      'bg-code-accent': 'bg-light-700 dark:bg-dark-300',
      'bg-popover': 'bg-white dark:bg-dark-700',
      'bg-back': 'bg-dark-900/35 dark:bg-dark-900/75',
      'bg-warning': 'bg-yellow-300 dark:bg-yellow-400',
      'bg-error': 'bg-red-400 dark:bg-red-500',
    },
    // prettier-ignore
    {
      'border-main': 'border-solid border-color-light-600 dark:border-color-dark-300',
      'border-secondary': 'border-solid border-color-light-900 dark:border-color-dark-100',
      'border-active': 'border-solid border-color-yellow-400 dark:border-color-yellow-400',
      'border-transparent': 'border-solid border-color-transparent',
    },
    // prettier-ignore
    {
      'underline-link': "underline-none hover:underline underline-from-font hover:underline-offset-4"
    },
  ],
})
