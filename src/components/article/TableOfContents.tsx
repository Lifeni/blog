import styled from "@emotion/styled"
import React from "react"
import { RiFileListLine } from "react-icons/ri"

const Wrapper = styled("details")`
  position: relative;
  pointer-events: initial;
  transition: all 0.2s;

  &[open] nav {
    animation: show 0.2s;
    transform-origin: right top;
  }

  @keyframes show {
    from {
      opacity: 0;
      transform: scale(0.98);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`

const TableOfContents = styled("nav")`
  position: absolute;
  top: 4.75rem;
  right: 0;
  z-index: 200;
  width: calc(100vw - 2.5rem);
  max-width: var(--toc-width);
  height: auto;
  max-height: 65vh;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  background-color: var(--background);
  box-shadow: var(--shadow-hover);
  overflow: auto;
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
        line-height: 2.5;
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

interface TableOfContentsProps {
  toc: string
}

const ArticleTableOfContents = ({ toc }: TableOfContentsProps) => {
  return (
    <Wrapper>
      <summary className="round-right icon-only">
        <RiFileListLine size="1.125rem" />
      </summary>
      <TableOfContents
        dangerouslySetInnerHTML={{ __html: toc }}
      ></TableOfContents>
    </Wrapper>
  )
}

export default ArticleTableOfContents
