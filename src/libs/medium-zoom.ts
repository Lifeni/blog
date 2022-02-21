import { $$, css, init } from 'libs:$'

init(() => {
  const images = $$('article img')
  if (!images.length) return

  import('medium-zoom').then(({ default: zoom }) => {
    zoom(images, { background: 'rgba(0, 0, 0, 0.8)' })

    css(`
    .medium-zoom-overlay,
    .medium-zoom-image--opened {
      z-index: 99999;
    }
  `)
  })
})
