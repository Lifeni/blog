import styled from "@emotion/styled"
import React, { useState } from "react"
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri"
import { useDebounce, useWindowScroll, useWindowSize } from "react-use"

const Wrapper = styled("div")`
  position: fixed;
  left: 4.25rem;
  top: 50%;
  width: 0.1rem;
  height: 45vh;
  background-color: var(--border-color);
  transform: translateY(-50%);
  transition: all 0.2s;

  @media (max-width: 960px) {
    display: none;
  }
`

interface ActionProps {
  light: boolean
}

const Action = styled("button")<ActionProps>`
  position: absolute;
  left: calc((-2rem + 0.1rem) / 2);
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius);
  border: none;
  color: ${props =>
    props.light ? "var(--font-primary)" : "var(--border-color)"};
  background-color: var(--background);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: var(--font-primary);
    background-color: var(--element-background);
  }
`

const Up = styled(Action)`
  top: -3rem;
`

const Down = styled(Action)`
  bottom: -3rem;
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
  transition: background 0.2s, top 0.4s cubic-bezier(0.17, 0.89, 0.3, 1),
    height 0.4s cubic-bezier(0.17, 0.89, 0.3, 1);
`

interface PositionProps {
  deps?: string | number
}

const Position = ({ deps }: PositionProps) => {
  const { width, height } = useWindowSize()
  const { y } = useWindowScroll()

  const [position, setPosition] = useState(0)
  const [ratio, setRatio] = useState(0)
  const [bottom, setBottom] = useState(false)

  useDebounce(
    () => {
      if (width >= 960) {
        const size = document.documentElement.scrollHeight
        setPosition(y / size)
        setRatio(height / size)

        if (y + height >= size - 1) setBottom(true)
        else setBottom(false)
      }
    },
    50,
    [height, y, deps]
  )

  return (
    <Wrapper aria-hidden>
      <Up
        light={position === 0 && ratio !== 0}
        onClick={() => window.scrollTo(0, 0)}
      >
        <RiArrowUpSLine
          aria-label="页面顶部"
          title="页面顶部"
          size="1.125rem"
        />
      </Up>
      <Bar position={position} ratio={ratio} />
      <Down
        light={bottom}
        onClick={() =>
          window.scrollTo(0, document.documentElement.scrollHeight)
        }
      >
        <RiArrowDownSLine
          aria-label="页面底部"
          title="页面底部"
          size="1.125rem"
        />
      </Down>
    </Wrapper>
  )
}

export default Position
