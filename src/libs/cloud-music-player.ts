import type { Shortcuts } from './$'
import { $, css, start } from './$'

start(async () => {
  const player = $('[data-audio]')
  const audio = player.element() as HTMLAudioElement
  audio.volume = 0.5

  let current: Shortcuts = null
  let beat: Shortcuts = null
  let status: Shortcuts = null

  const { default: nprogress } = await import('nprogress')
  nprogress.configure({ minimum: 0, trickle: false, showSpinner: false })

  const songs = $('[data-music]')
  songs.on('click').func(e => {
    const song = $((e.target as HTMLElement).closest('button'))
    audio.src = song.attr('data-music').get()
    audio.currentTime = 0
    audio.play()
    nprogress.set(0)

    current = song
    songs.attr('data-playing').remove()
    song.attr('data-playing').add()

    beat = $('[data-playing] [data-beat]')
    status = $(
      '[data-playing] [data-status] > span, [data-playing] [data-duration]'
    ) as Shortcuts
  })

  const action = $('[data-play-action]')
  const play = $('[data-play]')
  const pause = $('[data-pause]')

  action.on('click').func(() => {
    if (action.attr('data-play-action').equal('play')) {
      if (audio.src) audio.play()
      else songs.rand().click()

      action.attr('data-play-action').set('pause')
      play.attr('data-remove').add()
      pause.attr('data-remove').remove()
    } else {
      audio.pause()

      action.attr('data-play-action').set('play')
      pause.attr('data-remove').add()
      play.attr('data-remove').remove()
    }
  })

  const previous = $('[data-previous]')
  previous.on('click').func(() => {
    if (current) {
      const song = current.prev()
      if (song) song.click()
      else songs.last().click()
    }
  })

  const next = $('[data-next]')
  next.on('click').func(() => {
    if (current) {
      const song = current.next()
      if (song) song.click()
      else songs.first().click()
    }
  })

  const volume = $('[data-volume]')
  volume.on('click').func(() => {
    const on = $('[data-volume-on]')
    const off = $('[data-volume-off]')

    if (volume.attr('data-volume').equal('on')) {
      audio.muted = true
      volume.attr('data-volume').set('off')
      volume.attr('data-tooltip').set('取消静音')

      off.attr('data-remove').add()
      on.attr('data-remove').remove()
    } else {
      audio.muted = false
      volume.attr('data-volume').set('on')
      volume.attr('data-tooltip').set('静音')

      on.attr('data-remove').add()
      off.attr('data-remove').remove()
    }
  })

  player.on('timeupdate').func(() => {
    const time = audio.currentTime
    const duration = audio.duration
    const percent = time / duration
    nprogress.set(percent)

    if (status.len() !== 0) {
      const m = Math.floor(time / 60)
      const s = Math.floor(time % 60)
      status.text().set(`${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`)
    }
  })

  player.on('play').func(() => {
    action.attr('data-play-action').set('pause')
    action.attr('data-tooltip').set('暂停')
    play.attr('data-remove').add()
    pause.attr('data-remove').remove()

    if (beat) beat.attr('data-pause').remove()
  })

  player.on('pause').func(() => {
    action.attr('data-play-action').set('play')
    action.attr('data-tooltip').set('播放')
    pause.attr('data-remove').add()
    play.attr('data-remove').remove()

    if (beat) beat.attr('data-pause').add()
  })

  player.on('ended').func(() => {
    nprogress.set(1)
    next.click()
  })

  css`
    #nprogress {
      pointer-events: none;
    }

    #nprogress .bar {
      background: #29d;

      position: fixed;
      z-index: 1031;
      top: 0;
      left: 0;

      width: 100%;
      height: 4px;
    }

    #nprogress .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 20px #29d, 0 0 10px #29d;
      opacity: 1;
      transform: rotate(3deg) translate(0px, -4px);
    }

    .nprogress-custom-parent {
      overflow: hidden;
      position: relative;
    }

    .nprogress-custom-parent #nprogress .spinner,
    .nprogress-custom-parent #nprogress .bar {
      position: absolute;
    }

    @keyframes nprogress-spinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `
})
