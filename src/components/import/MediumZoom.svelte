<script>
  import zoom from 'medium-zoom'
  import { onMount } from 'svelte'

  onMount(() => {
    const images = document.querySelectorAll('article img')
    if (images.length !== 0) zoom(images, { background: 'rgba(0, 0, 0, 0.8)' })
  })
</script>
