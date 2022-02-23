import { $, css, start } from './$'

start(async () => {
  const images = $('article img')
  if (images.len() === 0) return

  const { default: zoom } = await import('medium-zoom')
  zoom(images.elements, { background: 'rgba(0, 0, 0, 0.8)' })
  css`
    .medium-zoom-overlay,
    .medium-zoom-image--opened {
      z-index: 99999;
    }

    .medium-zoom-image {
      transition: transform 300ms cubic-bezier(0.4, 0, 0, 1) !important;
    }
  `
})
