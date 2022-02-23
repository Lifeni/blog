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

  let pre: Shortcuts | null = null
  let dir = 1

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
          pre = link
        } else {
          link.attr('data-visible').remove()
          if (entry.boundingClientRect.y < 0) dir = 1
          else dir = -1
        }
      }
    })

    const visible = $('[data-visible]')
    links.attr('data-active').remove()

    let cur = pre
    if (visible.len() !== 0) cur = visible.get()
    else if (pre && dir === -1) cur = pre.pre()

    if (!cur) return
    cur.attr('data-active').add()
    focus(cur)
  })

  headers.each().func(observer.observe.bind(observer))
})
