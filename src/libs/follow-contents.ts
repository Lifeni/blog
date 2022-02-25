import type { Shortcuts } from './$'
import { $, debounce, match, start } from './$'

start(() => {
  const contents = $('[data-contents]')
  if (contents.len() === 0) return

  const headers = $('article h1, article h2, article h3')
  const links = $('[data-contents] li')

  let disabled = match(
    '(max-width: 72rem)',
    event => (disabled = event.matches)
  )

  let previous: Shortcuts | null = null
  let direction = 1

  const focus = debounce((ins: Shortcuts) => ins.view(), 200)

  const observer = new IntersectionObserver(entries => {
    if (disabled) return

    entries.forEach(entry => {
      if (entry.target.tagName === 'H1') {
        if (entry.isIntersecting) contents.attr('data-hide').set('true')
        else contents.attr('data-hide').set('false')
      } else {
        const id = entry.target.id
        const link = links.find().attr('data-slug').equal(id).get()
        if (entry.isIntersecting) {
          link.attr('data-visible').add()
          previous = link
        } else {
          link.attr('data-visible').remove()
          if (entry.boundingClientRect.y < 0) direction = 1
          else direction = -1
        }
      }
    })

    const visible = $('[data-visible]')
    links.attr('data-active').remove()

    let current = previous
    if (visible.len() !== 0) current = visible.get()
    else if (previous && direction === -1) current = previous.prev()

    if (!current) return
    current.attr('data-active').add()
    focus(current)
  })

  headers.each().func(observer.observe.bind(observer))
})
