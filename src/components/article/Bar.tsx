import styled from "@emotion/styled"
import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import { RiFileListLine, RiHome2Line } from "react-icons/ri"

const ArticleBarWrapper = styled("div")`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;

  svg {
    min-width: 1.125rem;
  }

  .text {
    max-width: max-content;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .message {
    min-width: 3.5rem;
    height: 3.5rem;
    padding: 0.75rem 1.25rem;
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    font-family: var(--font-mono);
    color: inherit;
    user-select: none;
    pointer-events: none;
    transition: all 0.2s;

    &::before {
      content: "[";
      padding: 0 0.125rem 0 0;
    }

    &::after {
      content: "]";
      padding: 0 0 0 0.125rem;
    }
  }
`

const ArticleBarSpacer = styled("div")`
  flex: 1;
`

interface BarProps {
  toc?: string
  message?: string
}

const ArticleBar = ({ toc, message }: BarProps) => {
  return (
    <ArticleBarWrapper>
      <Link to="/" className="round-left">
        <RiHome2Line aria-label="主页图标" size="1.125em" />
        <span className="text">回到「记录干杯」</span>
      </Link>
      <ArticleBarSpacer />
      {toc && <ArticleTableOfContents toc={toc} />}
      {message && <span className="message">{message}</span>}
    </ArticleBarWrapper>
  )
}

export default ArticleBar

interface TableOfContentsWrapperProps {
  open: boolean
}

const TableOfContentsWrapper = styled("div")<TableOfContentsWrapperProps>`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 200;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${props => (props.open ? "visible" : "hidden")};
  opacity: ${props => (props.open ? 1 : 0)};
  transition: all 0.2s;
`

const TableOfContents = styled("nav")`
  width: calc(100% - 2.5rem);
  max-width: var(--widget-width);
  height: auto;
  max-height: 65vh;
  z-index: 200;
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius);
  background-color: var(--background);
  overflow: hidden;
  transition: all 0.2s;

  li,
  p {
    display: flex;
    flex-direction: column;
  }

  & > ul {
    position: relative;
    width: 100%;
    height: auto;
    padding: 1.5rem 2rem;
    overflow: auto;

    li {
      max-width: 100%;
      list-style: none;

      ul {
        padding: 0 0 0 1.5rem;
      }

      a {
        width: fit-content;
        max-width: 100%;
        height: auto;
        padding: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        line-height: 2.375;
        display: inline-block;

        code {
          font-size: 0.875em;
          padding: 0.25em 0.5em;
          border-radius: var(--border-radius);
          white-space: nowrap;
          background-color: var(--element-background);
          font-family: var(--font-mono);
          transition: all 0.2s;

          &:hover {
            background-color: var(--element-background-hover);
          }
        }

        &:focus,
        &:focus-visible,
        &:hover {
          background-color: var(--background);
          color: var(--font-primary);
        }
      }
    }
  }
`

const TableOfContentsOverlay = styled("div")`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
`

const ArticleTableOfContents = ({ toc }: BarProps) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault()
        setOpen(open => !open)
      }
    }

    window.addEventListener("keypress", listener)
    return () => window.removeEventListener("keypress", listener)
  }, [])

  return (
    <>
      <button
        aria-label="文章目录"
        className="round-right"
        onClick={() => setOpen(true)}
        title="使用 / 键切换目录窗口"
      >
        <RiFileListLine size="1.125rem" className="open" />
        目录
      </button>

      <TableOfContentsWrapper open={open}>
        <TableOfContents
          dangerouslySetInnerHTML={{ __html: toc || "" }}
          onClick={e => {
            const target = e.target as HTMLElement
            if (target?.tagName === "A") {
              setOpen(false)
            }
          }}
        />
        <TableOfContentsOverlay onClick={() => setOpen(false)} />
      </TableOfContentsWrapper>
    </>
  )
}
