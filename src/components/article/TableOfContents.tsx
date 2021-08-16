import styled from "@emotion/styled"
import React, { useState } from "react"
import { RiFileListLine } from "react-icons/ri"

interface IWrapper {
  open: boolean
}

const Wrapper = styled("div")<IWrapper>`
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
  max-width: var(--toc-width);
  height: auto;
  max-height: 65vh;
  z-index: 200;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
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
          padding: 0.185em 0.5em;
          border-radius: 0.5rem;
          white-space: nowrap;
          background-color: var(--element-background);
          font-family: var(--font-mono);
          transition: all 0.2s;
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

const Overlay = styled("div")`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
`

interface TableOfContentsProps {
  toc: string
}

const ArticleTableOfContents = ({ toc }: TableOfContentsProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="round-right icon-only"
        title="文章目录"
        aria-label="文章目录"
        onClick={() => setOpen(true)}
      >
        <RiFileListLine size="1.125rem" className="open" />
      </button>

      <Wrapper open={open}>
        <TableOfContents
          dangerouslySetInnerHTML={{ __html: toc }}
          onClick={e => {
            const target = e.target as HTMLElement
            if (target?.tagName === "A") {
              setOpen(false)
            }
          }}
        />
        <Overlay onClick={() => setOpen(false)} />
      </Wrapper>
    </>
  )
}

export default ArticleTableOfContents
