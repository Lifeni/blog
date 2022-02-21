import { $$, $, init, listen, media } from 'libs:$'

init(() => {
  const contents = $('[data-contents]')
  if (!contents) return

  const h1 = $('article h1')
  const offset = h1.offsetTop + h1.offsetHeight + 32

  const headers = $$('article h2, article h3')
  const links = $$('[data-contents] li')

  let disabled = media('(max-width: 72rem)', e => (disabled = e.matches))

  const show = () => {
    if (disabled) return

    if (window.scrollY < offset) contents.setAttribute('data-hide', 'true')
    else contents.setAttribute('data-hide', 'false')

    const screen = window.innerHeight
    const page = document.documentElement.scrollHeight

    let up = { top: page, element: null }
    let down = { top: -page, element: null }

    headers.forEach(header => {
      const top = header.getBoundingClientRect().top
      if (top >= 0 && top < screen / 2 && top <= up.top)
        up = { element: header, top }
      else if (top < 0 && top > down.top) down = { element: header, top }
    })

    const id = up.element?.id || down.element?.id
    if (!id) return

    links.forEach((e: HTMLElement) => e.removeAttribute('data-active'))
    const active = [...links].find((e: HTMLElement) => e.dataset.slug === id)

    console.log(active)

    if (!active) return
    active.setAttribute('data-active', 'true')
    active.scrollIntoView({ block: 'center', inline: 'center' })
  }

  show()

  listen('scroll', show, 100)
  listen('resize', show, 100)
})
