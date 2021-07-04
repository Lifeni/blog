import styled from "@emotion/styled"
import { useEffect, useState } from "react"

const ScrollBarWrapper = styled("div")`
  position: fixed;
  top: 28vh;
  left: calc(50vw - var(--main-width) / 2 - 4rem);
  width: 1px;
  height: 44vh;
  background-color: var(--border-color);
  transition: background-color 0.2s;

  @media (max-width: 1000px) {
    display: none;
  }
`

const ScrollBarStick = styled("div")<IScrollBarProps>`
  position: relative;
  top: ${props => `${props.topRatio * 44}vh`};
  width: 100%;
  height: ${props => `${props.heightRatio * 44}vh`};
  background-color: var(--font-secondary);
  transition: background-color 0.2s;
`

const ScrollBar = () => {
  const [heightRatio, setHeightRatio] = useState(0)
  const [topRatio, setTopRatio] = useState(0)

  useEffect(() => {
    let windowWidth = window.innerWidth
    let windowHeight = window.innerHeight
    let scrollHeight = document.documentElement.scrollHeight
    setHeightRatio(windowHeight / scrollHeight)

    const scrollListener = () => {
      if (windowWidth > 1000) {
        window.requestAnimationFrame(() => {
          setTopRatio(window.scrollY / scrollHeight)
        })
      }
    }

    const resizeListener = () => {
      window.requestAnimationFrame(() => {
        windowWidth = window.innerWidth
        windowHeight = window.innerHeight
        scrollHeight = document.documentElement.scrollHeight
        setHeightRatio(windowHeight / scrollHeight)
      })
    }

    window.addEventListener("scroll", scrollListener)
    window.addEventListener("resize", resizeListener)

    return () => {
      window.removeEventListener("scroll", scrollListener)
      window.removeEventListener("resize", resizeListener)
    }
  }, [])

  return (
    <ScrollBarWrapper>
      <ScrollBarStick heightRatio={heightRatio} topRatio={topRatio} />
    </ScrollBarWrapper>
  )
}

export default ScrollBar
