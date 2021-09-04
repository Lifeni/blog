import styled from "@emotion/styled"
import React, { ReactElement, useEffect, useState } from "react"
import { useMouseWheel } from "react-use"

interface HeaderWrapperProps {
  direction: "up" | "down"
}

const HeaderWrapper = styled("header")<HeaderWrapperProps>`
  position: sticky;
  top: ${props => (props.direction === "up" ? "-3.5rem" : "-8.5rem")};
  z-index: 10;
  width: 100%;
  margin: 0;
  padding: 4.75rem 1.25rem 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  pointer-events: none;
  transition: all 0.2s;

  @media (max-width: 800px) {
    top: ${props => (props.direction === "up" ? " -1.25rem" : "-6.25rem")};
    padding: 2.5rem 1.25rem 0.75rem 1.25rem;
  }

  @media (max-width: 720px) {
    top: 0;
    padding: 1.25rem 1.25rem 0.25rem 1.25rem;
  }
`

const HeaderBar = styled("div")`
  width: 100%;
  max-width: var(--main-width);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--font-secondary);
  border-radius: 0.5rem;
  background-color: var(--element-background);
  transition: all 0.2s;
  pointer-events: initial;

  a,
  button {
    min-width: 3.5rem;
    height: 3.5rem;
    padding: 0.75rem 1.25rem;
    border: none;
    display: flex;
    align-items: center;
    color: var(--font-secondary);
    background-color: transparent;
    font-size: 1rem;
    font-family: inherit;
    line-height: 2;
    outline: none;
    transition: all 0.2s;
    pointer-events: initial;
    cursor: pointer;
    text-decoration: none;

    &::-webkit-details-marker {
      display: none;
    }

    svg {
      margin: 0 1rem 0 0;

      &.reverse {
        transform: rotate(-180deg);
      }
    }

    &.icon-only svg {
      margin: 0;
    }

    &.desktop-only {
      @media (max-width: 720px) {
        display: none;
      }
    }

    &:focus,
    &:focus-visible,
    &:hover {
      background-color: var(--element-background-hover);
    }
  }
`

interface HeaderProps {
  children: ReactElement | ReactElement[] | boolean | undefined
}

const Header = ({ children }: HeaderProps) => {
  const wheel = useMouseWheel()
  const [preWheel, setPreWheel] = useState(wheel)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down")

  useEffect(() => {
    window.requestAnimationFrame(() => {
      if (wheel > preWheel) {
        setScrollDirection("down")
      } else if (wheel < preWheel) {
        setScrollDirection("up")
      }
      setPreWheel(wheel)
    })
  }, [wheel])

  return (
    <HeaderWrapper direction={scrollDirection}>
      <HeaderBar>{children}</HeaderBar>
    </HeaderWrapper>
  )
}

export default Header
