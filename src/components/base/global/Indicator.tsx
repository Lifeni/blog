import { useEffect, useRef, useState } from 'react'
import { useEventListener } from 'usehooks-ts'

export const Indicator = ({ paper }: { paper?: boolean }) => {
  const [percent, setPercent] = useState(0)
  const indicator = useRef<HTMLDivElement>(null)
  const progress = useRef<HTMLDivElement>(null)

  useEffect(() => calc(), [])
  useEventListener('scroll', () => calc())
  useEventListener('resize', () => calc())

  const calc = () => {
    if (!indicator.current || !progress.current) return
    const { scrollHeight, scrollTop } = document.documentElement
    const { innerHeight } = window
    progress.current!.style.height = `${(innerHeight / scrollHeight) * 100}%`
    progress.current!.style.top = `${(scrollTop / scrollHeight) * 100}%`
    setPercent((scrollTop / (scrollHeight - innerHeight)) * 100)
  }

  return (
    <div
      ref={indicator}
      position="fixed"
      left="12"
      top="1/2vh"
      z="200"
      display="none lg:flex"
      flex="col items-center justify-start"
      transform="~ translate-x--1/2 translate-y--1/2"
      w="0.5"
      h="1/2vh"
      max-h="72"
      bg="action"
      rounded="md"
    >
      <div
        ref={progress}
        position="absolute"
        top="0"
        left="0"
        w="0.5"
        h="0"
        bg="line"
        flex="~"
        rounded="md"
      />

      {percent > 0 && (
        <button
          aria-label="去顶部"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          position="absolute"
          left="1/2"
          top="-12"
          flex="~"
          rounded="full"
          p="2"
          bg={paper ? 'hover:subtle' : 'hover:action'}
          outline="~ none focus-visible:(4 yellow offset-0)"
          transform="~ translate-x--1/2"
          animate="fade-in duration-200 ease"
          transition="background-color"
        >
          <span className="icon-tabler:arrow-up" w="6" h="6" text="main" />
        </button>
      )}
      {percent < 99 && (
        <button
          aria-label="去底部"
          onClick={() =>
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            })
          }
          position="absolute"
          left="1/2"
          bottom="-12"
          flex="~"
          rounded="full"
          p="2"
          bg={paper ? 'hover:subtle' : 'hover:action'}
          outline="~ none focus-visible:(4 yellow offset-0)"
          transform="~ translate-x--1/2"
          animate="fade-in duration-200 ease"
          transition="background-color"
        >
          <span className="icon-tabler:arrow-down" w="6" h="6" text="main" />
        </button>
      )}
    </div>
  )
}
