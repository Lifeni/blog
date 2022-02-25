export const $ = (selector: string | Element) => new Shortcuts(selector)

export const _ = (root: Document) => ({
  $: (selector: string | Element) => new Shortcuts(selector, root),
})

export class Shortcuts {
  public elements: Element[]
  public root: Document

  constructor(selector: string | Element, root?: Document) {
    this.root = root || document

    if (selector instanceof Element) this.elements = [selector]
    else this.elements = [...this.root.querySelectorAll<Element>(selector)]
  }

  public get = () => new Shortcuts(this.elements[0])
  public all = () => this.elements.map(element => new Shortcuts(element))
  public element = () => this.elements[0]
  public rand = () =>
    new Shortcuts(
      this.elements[Math.floor(Math.random() * this.elements.length)]
    )

  public first = () => new Shortcuts(this.elements[0])
  public last = () => new Shortcuts(this.elements[this.elements.length - 1])

  public len = () => this.elements.length

  public prev = () => {
    const el = this.elements[0].previousElementSibling
    return el ? new Shortcuts(el) : null
  }
  public next = () => {
    const el = this.elements[0].nextElementSibling
    return el ? new Shortcuts(el) : null
  }

  public func = (func: (element: Element) => void) =>
    this.elements.forEach(func)

  public each = () => ({
    func: (func: (element: Element) => void) => this.elements.forEach(func),
  })

  public find = () => ({
    attr: (name: string) => ({
      equal: (value: string) => ({
        get: () =>
          new Shortcuts(
            this.elements.find(element => element.getAttribute(name) === value)
          ),
      }),
    }),
  })

  public text = () => ({
    get: () => this.elements[0].textContent,
    set: (value: string) =>
      this.elements.forEach(element => (element.textContent = value)),
  })

  public html = () => ({
    set: (value: string) =>
      this.elements.forEach(element => (element.innerHTML = value)),
  })

  public class = () => ({
    get: () => this.elements[0].className,
    set: (value: string) =>
      this.elements.forEach(element => (element.className = value)),
  })

  public attr = (name: string) => ({
    get: () => this.elements[0].getAttribute(name),
    equal: (value: string) => this.elements[0].getAttribute(name) === value,
    all: () => this.elements.map(element => element.getAttribute(name)),
    add: () => this.elements.forEach(element => element.setAttribute(name, '')),
    set: (value?: string) =>
      this.elements.forEach(element => element.setAttribute(name, value)),
    remove: () =>
      this.elements.forEach(element => element.removeAttribute(name)),
  })

  public on = (event: string) => ({
    func: (func: (event: Event) => void) =>
      this.elements.forEach(element => element.addEventListener(event, func)),
  })

  public view = () =>
    this.elements[0]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    })

  public scroll = () => ({
    right: () => this.elements[0].scrollTo(this.elements[0].scrollWidth, 0),
  })

  public click = () => (this.elements[0] as HTMLElement).click()
}

export const start = (callback: () => void) => listen('load', callback)

export const match = (
  query: string,
  callback?: (e: MediaQueryListEvent) => void
) => {
  const media = window.matchMedia(query)
  if (callback) media.onchange = callback
  return media.matches
}

export const debounce = (func: (args) => void, wait: number) => {
  let id: ReturnType<typeof setTimeout> | null = null
  return args => {
    if (id) clearTimeout(id)
    id = setTimeout(() => func(args), wait)
  }
}

export const listen = (event: string, callback: () => void, wait?: number) => {
  if (wait) window.addEventListener(event, debounce(callback, wait))
  else
    window.addEventListener(event, () => window.requestAnimationFrame(callback))
}

export const create = (
  name: string,
  attrs: { [key: string]: string } = {}
): HTMLElement => {
  const el = document.createElement(name)
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value))
  return el
}

export const css = (styles: TemplateStringsArray) => {
  const style = document.createElement('style')
  style.innerHTML = styles.join('')
  document.head.appendChild(style)
}
