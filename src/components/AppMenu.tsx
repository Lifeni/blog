import styled from "@emotion/styled"
import { Link } from "gatsby"
import * as React from "react"
import { RiDownloadLine, RiFileListLine, RiHome2Line } from "react-icons/ri"

const AppMenuWrapper = styled("div")`
  width: 100%;
  max-width: var(--article-width);
  margin: 0;
  padding: 1.25rem 0;
  pointer-events: none;
`

const AppMenuBar = styled("div")`
  width: 100%;
  display: flex;
  border-radius: 0.5rem;
  background-color: var(--element-blur-background);
  backdrop-filter: blur(0.5rem);
  overflow: hidden;
  transition: all 0.2s;

  a,
  button {
    padding: 0.75rem 1.25rem;
    border: none;
    display: flex;
    align-items: center;
    gap: 1rem;
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

    &.right {
      margin: 0 0 0 auto;
    }

    &.reverse {
      transform: rotate(-180deg);
    }

    &:hover {
      background-color: var(--element-blur-background-hover);
    }
  }
`

const AppMenu = () => {
  return (
    <AppMenuWrapper>
      <AppMenuBar>
        <Link to="/">
          <RiHome2Line size="1.125em" />
          <span className="text">回到「记录干杯」</span>
        </Link>
        <button className="right reverse" onClick={() => window.scrollTo(0, 0)}>
          <RiDownloadLine size="1.125em" />
        </button>
      </AppMenuBar>
    </AppMenuWrapper>
  )
}

export default AppMenu
