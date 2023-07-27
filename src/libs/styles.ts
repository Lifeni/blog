import type { Rule } from 'unocss'

export const convertColors = (array: string[]) => {
  const colors: Record<string, string> = {}
  array.forEach((color, index) => (colors[index] = color))
  return colors
}

// prettier-ignore
export const fonts = {
  sans: `Inter Variable, Inter, -apple-system, HarmonyOS Sans SC, MiSans, Source Han Sans SC, 
         Noto Sans SC, system-ui, Roboto, emoji, sans-serif`,
  serif: `Source Han Serif SC, Noto Serif SC, Times, Times New Roman, Georgia, emoji, serif`,
  mono: `JetBrains Mono Variable, JetBrains Mono, Cascadia Mono, Consolas, Roboto Mono, 
         Fira Mono, Courier New, -apple-system, HarmonyOS Sans SC, MiSans, Source Han Sans SC, 
         Noto Sans SC, system-ui, emoji, monospace`,
  emoji: `Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji, emoji`,
}

// prettier-ignore
export const colors = {
  light: convertColors([
    '#f6f8fa', '#eaeef2', '#d0d7de', '#afb8c1',
    '#8c959f', '#6e7781', '#57606a', '#424a53',
    '#32383f', '#24292f', '#1f2328'
  ]),
  dark: convertColors([
    '#f0f6fc', '#c9d1d9', '#b1bac4', '#8b949e',
    '#6e7681', '#484f58', '#30363d', '#21262d',
    '#161b22', '#0d1117', '#010409'
  ])
}

export const shortcuts = {
  'text-main': 'text-light-9 dark:text-dark-0',
  'text-subtle': 'text-light-5 dark:text-dark-3',
  'text-icon': 'text-light-4 dark:text-dark-4',
  'text-link': 'text-indigo-5 dark:text-indigo-4',
  'text-light': 'text-light-9',
  'text-light-subtle': 'text-light-3 dark:text-dark-3',
  'text-dark': 'text-dark-0',
  'text-dark-subtle': 'text-light-3 dark:text-dark-3',
  'text-muted': 'text-light-6 dark:text-dark-2',

  'bg-main': 'bg-light-0 dark:bg-dark-9',
  'bg-line': 'bg-light-9 dark:bg-dark-0',
  'bg-gradient':
    'bg-gradient-radial bg-light-0 dark:bg-gradient-from-dark-8 dark:bg-gradient-to-dark-9',
  'bg-subtle': 'bg-light-0 dark:bg-dark-7',
  'bg-muted': 'bg-white dark:bg-dark-8',
  'bg-paper': 'bg-white dark:bg-dark-9',
  'bg-action': 'bg-light-1 dark:bg-dark-7',

  'border-color-line': 'border-light-1 dark:border-dark-7',
  'outline-color-yellow': 'outline-yellow-4 dark:outline-yellow-3',
  'scrollbar-main':
    'scrollbar-track-color-transparent scrollbar-thumb-color-light-2 dark:scrollbar-thumb-color-dark-5',
}

// prettier-ignore
export const breakpoints = { xs: '480px', sm: '640px', md: '768px', lg: '1024px', xl: '1280px', xxl: '1536px' }
export const rules = [['w-extend', { width: 'calc(100% + 2rem)' }]] as Rule[]
