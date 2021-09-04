import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"
import { useWindowScroll, useWindowSize } from "react-use"

const Wrapper = styled("div")`
  position: fixed;
  left: 4rem;
  top: 50%;
  width: 0.1rem;
  height: 40vh;
  background-color: var(--border-color);
  transform: translateY(-50%);
  transition: all 0.2s;

  @media (max-width: 960px) {
    display: none;
  }
`

interface BarProps {
  position: number
  ratio: number
}

const Bar = styled("div")<BarProps>`
  position: absolute;
  left: 0;
  top: ${props => `${props.position * 100}%`};
  width: 100%;
  height: ${props => `${props.ratio * 100}%`};
  background-color: var(--font-primary);
  transition: background 0.2s;
`

const Position = () => {
  const { width, height } = useWindowSize()
  const { y } = useWindowScroll()

  const [position, setPosition] = useState(0)
  const [ratio, setRatio] = useState(0)

  useEffect(() => {
    window.requestAnimationFrame(() => {
      if (width >= 960) {
        const size = document.documentElement.scrollHeight
        setPosition(y / size)
        setRatio(height / size)
      }
    })
  }, [height, y])

  return (
    <Wrapper>
      <Bar position={position} ratio={ratio} />
    </Wrapper>
  )
}

export default Position
