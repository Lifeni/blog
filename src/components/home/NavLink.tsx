import styled from "@emotion/styled"
import React from "react"
import { RiInboxLine, RiTerminalBoxLine } from "react-icons/ri"

const Wrapper = styled("section")`
  position: relative;
  padding: 0 1.25rem 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  line-height: 2;

  @media (max-width: 720px) {
    padding: 0 1.25rem 0.5rem 1.25rem;
  }
`

const Link = styled("a")`
  width: 100%;
  max-width: var(--main-width);
  height: 3.5rem;
  margin: 0.5rem auto;
  padding: 0.75rem 1.25rem;
  border-radius: var(--border-radius);
  border: none;
  display: flex;
  align-items: center;
  color: var(--font-secondary);
  background-color: var(--element-background);
  font-size: 1rem;
  font-family: inherit;
  font-weight: inherit;
  line-height: 2;
  outline: none;
  transition: all 0.2s;
  pointer-events: initial;
  cursor: pointer;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 800px) {
    margin: 1rem 0 0 0;
  }

  svg {
    margin: 0 1rem 0 0;
  }

  &:focus,
  &:focus-visible,
  &:hover {
    background-color: var(--element-background-hover);
  }

  small {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const NavLink = () => {
  return (
    <Wrapper>
      <Link
        href="https://lab.lifeni.life"
        target="_blank"
        rel="noopener noreferrer"
      >
        <RiTerminalBoxLine aria-label="茶杯图标" size="1.125em" />
        并不存在的实验室
        <small>Hello World</small>
      </Link>

      <Link
        href="https://dev.lifeni.life"
        target="_blank"
        rel="noopener noreferrer"
      >
        <RiInboxLine aria-label="箱子图标" size="1.125em" />
        一些自己做的东西
        <small>Code Sandbox</small>
      </Link>
    </Wrapper>
  )
}

export default NavLink
