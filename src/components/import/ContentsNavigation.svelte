<script>
  import debounce from 'lodash.debounce'
  import { onMount } from 'svelte'

  onMount(() => {
    const contents = document.querySelector('[data-contents]')

    if (contents) {
      let disabled = window.matchMedia('(max-width: 72rem)').matches

      const h1 = document.querySelector('article h1')
      const offset = h1.offsetTop + h1.offsetHeight + 32

      const h2s = document.querySelectorAll('article h2')
      const h3s = document.querySelectorAll('article h3')
      const headers = [...h2s, ...h3s]

      const links = document.querySelectorAll('[data-contents] li')

      const show = () => {
        if (window.scrollY < offset) contents.setAttribute('data-hide', 'true')
        else contents.setAttribute('data-hide', 'false')

        calc()
      }

      const calc = debounce(() => {
        const screen = window.innerHeight
        const page = document.documentElement.scrollHeight
        let up = { top: page }
        let down = { top: -page }

        headers.forEach(element => {
          const top = element.getBoundingClientRect().top
          if (top >= 0 && top < screen / 2 && top <= up.top)
            up = { element, top }
          else if (top < 0 && top > down.top) down = { element, top }
        })

        const id = up.element?.id || down.element?.id

        if (id) {
          links.forEach(link => link.removeAttribute('data-active'))
          const active = [...links].find(link => link.dataset.slug === id)

          if (active) {
            active.setAttribute('data-active', 'true')
            active.scrollIntoView({ block: 'center', inline: 'center' })
          }
        }
      }, 100)

      if (!disabled) show()

      if (debounce && headers.length !== 0) {
        window.addEventListener('scroll', () => {
          window.requestAnimationFrame(() => {
            if (!disabled) show()
          })
        })
        window.addEventListener('resize', () => {
          window.requestAnimationFrame(() => {
            disabled = window.matchMedia('(max-width: 72rem)').matches
            if (!disabled) show()
          })
        })
      }
    }
  })
</script>
