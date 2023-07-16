import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare global {
  namespace astroHTML.JSX {
    interface HTMLAttributes extends AttributifyAttributes {
      position?: 'fixed' | 'absolute' | 'relative' | 'static' | 'sticky'
      left?: string
      right?: string
      top?: string
      bottom?: string
      whitespace?: 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap'
      op?: string
      scroll?: string
      scrollbar?: string
      object?: string
      leading?: string
    }
  }
}

declare module 'react' {
  interface HTMLAttributes<T> extends AttributifyAttributes {
    position?: 'fixed' | 'absolute' | 'relative' | 'static' | 'sticky'
    flex?: string
    display?: string
    w?: string
    h?: string
    left?: string
    right?: string
    top?: string
    bottom?: string
    scrollbar?: string
  }
}
