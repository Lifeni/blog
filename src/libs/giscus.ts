import { create, css, init } from 'libs:$'

init(() => {
  const container = create('section', { 'data-comments': '' })
  const script = create('script', {
    src: 'https://giscus.app/client.js',
    'data-repo': 'Lifeni/blog',
    'data-repo-id': 'MDEwOlJlcG9zaXRvcnkyOTY0ODMwNDU=',
    'data-category': 'Comment',
    'data-category-id': 'DIC_kwDOEav45c4B-c6k',
    'data-mapping': 'pathname',
    'data-reactions-enabled': '1',
    'data-emit-metadata': '0',
    'data-input-position': 'top',
    'data-theme': 'preferred_color_scheme',
    'data-lang': 'en',
  })

  container.appendChild(script)

  css(`
  section[data-comments] {
    width: calc(100% + var(--extra-margin) * 2);
    margin: 0 calc(var(--extra-margin) * -1) 2.5rem
      calc(var(--extra-margin) * -1);
  }
  `)
})
