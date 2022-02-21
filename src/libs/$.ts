const { addEventListener, matchMedia, requestAnimationFrame } = window
const { querySelector, querySelectorAll, createElement } = document

export const $ = querySelector.bind(document)
export const $$ = querySelectorAll.bind(document)

export const listen = (event: string, callback: () => void, wait?: number) => {
  if (wait) addEventListener(event, debounce(callback, wait))
  else addEventListener(event, () => requestAnimationFrame(callback))
}

export const media = (
  query: string,
  callback?: (e: MediaQueryListEvent) => void
) => {
  const match = matchMedia(query)
  if (callback) match.onchange = callback
  return match.matches
}

export const debounce = (func: () => void, wait: number) => {
  let id: ReturnType<typeof setTimeout> | null = null
  return () => {
    if (id) clearTimeout(id)
    id = setTimeout(func, wait)
  }
}

export const css = (styles: string) => {
  const style = document.createElement('style')
  style.innerHTML = styles
  document.head.appendChild(style)
}

export const init = (callback: () => void) => listen('load', callback)

export const create = (
  name: string,
  attrs: { [key: string]: string } = {}
): HTMLElement => {
  const el = createElement(name)
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value))
  return el
}
