import styled from "@emotion/styled"
import mediumZoom from "medium-zoom"
import React from "react"
import { MutableRefObject, useEffect, useRef } from "react"

const ArticleWrapper = styled("main")`
  position: relative;
  padding: 0 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  line-height: 2;

  article {
    width: 100%;
    max-width: var(--article-width);
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }

  a {
    color: var(--font-link);
    text-decoration: none;
    overflow-wrap: break-word;

    &:hover {
      color: var(--font-link-hover);
      text-underline-offset: 0.25em;
      text-decoration: underline;
    }
  }

  p {
    margin: 0.375rem 0;
    font-size: inherit;
    line-height: inherit;
    text-align: justify;
    text-justify: auto;
    overflow-wrap: break-word;
  }

  h1 {
    padding: 1.5rem 0 0 0;
    font-size: 1.5rem;
    line-height: 1.875;

    @media (max-width: 800px) {
      padding: 1.5rem 0 0 0;
    }

    @media (max-width: 720px) {
      padding: 1.5rem 0 0.25rem 0;
    }

    & + h2 {
      margin: 2rem 0 0 0;

      @media (max-width: 720px) {
        margin: 1.25rem 0 0 0;
      }
    }
  }

  h2 {
    padding: 1.25rem 0;
    font-size: 1.375rem;
    line-height: 1.75;

    & + h3 {
      padding: 0.5rem 0 1rem 0;
    }
  }

  h3 {
    padding: 1rem 0;
    font-size: 1.25rem;
    line-height: 1.75;
  }

  h4 {
    padding: 0.75rem 0 0.375rem 0;
    font-size: 1.125rem;
    line-height: 1.75;
  }

  ul,
  ol {
    margin: 0.375rem 0;
    padding: 0 0 0 1.25rem;

    li {
      margin: 0.375rem 0;
      padding: 0 0 0 0.375rem;
    }
  }

  img {
    width: calc(100% + 2rem);
    margin: 0.75rem -1rem;
    border-radius: 0.5rem;
    display: flex;
  }

  code[class*="language-"] {
    font-size: 0.875em;
    padding: 0.185em 0.5em;
    border-radius: 0.5rem;
    background-color: var(--element-background);
    font-family: var(--font-mono);
    transition: all 0.2s;
    overflow-wrap: break-word;
  }

  h1,
  h2,
  h3 {
    position: relative;
    max-width: 100%;
    width: fit-content;
    vertical-align: middle;

    &::before {
      display: block;
      position: relative;
      content: " ";
      top: 8rem;
      visibility: hidden;
    }

    code[class*="language-"] {
      max-width: 100%;
      display: inline-block;
      vertical-align: middle;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .gatsby-highlight {
    position: relative;
    width: calc(100% + 2rem);
    margin: 0.75rem -1rem;
    border-radius: 0.5rem;
    overflow: hidden;

    pre {
      margin: 0;
      padding: 1.125rem 1.5rem;
      display: flex;
      background-color: var(--element-background);
      transition: all 0.2s;
      overflow: auto;

      &::after {
        content: "";
        display: inline-block;
        width: 1.5rem;
      }

      code {
        padding: 0;
        border: none;
        line-height: 1.875;
        background-color: inherit;
        font-family: var(--font-mono);
      }
    }
  }

  .table-wrapper {
    width: calc(100% + 2rem);
    margin: 0.75rem -1rem;
    display: flex;
    border-radius: 0.5rem;
    transition: all 0.2s;
    border: var(--border);
    overflow-x: auto;
  }

  table {
    width: 100%;
    display: table;
    border-collapse: collapse;
    table-layout: auto;
    text-align: center;
    overflow-x: auto;
    transition: all 0.2s;

    tr {
      border-bottom: var(--border);
      transition: all 0.2s;

      &:nth-of-type(even) {
        background-color: var(--element-background);
      }
    }

    tbody tr:last-of-type {
      border: none;
    }

    th,
    td {
      padding: 0.5rem 1rem;
      color: inherit;
      text-align: start;
      border-right: var(--border);
      text-align: justify;
      text-justify: auto;
      overflow-wrap: break-word;
      transition: all 0.2s;

      &:last-of-type {
        border: none;
      }

      code[class*="language-"] {
        white-space: nowrap;
      }
    }

    th {
      font-weight: 700;
      background-color: var(--element-background);
    }
  }

  blockquote {
    margin: 0.75rem 0;
    padding: 0.25rem 1.5rem;
    border-left: var(--border-block);
    color: var(--font-secondary);
    transition: all 0.2s;
  }

  details {
    margin: 0.75rem 0;

    summary {
      width: fit-content;
      padding: 0.375rem 1rem;
      border-radius: 0.5rem;
      background-color: var(--element-background);
      cursor: pointer;
      user-select: none;
    }
  }

  hr {
    border: none;
    padding: 1.25rem 0;

    @media (max-width: 720px) {
      padding: 0.75rem;
    }
  }
`

interface ArticleProps {
  html?: boolean
  children: string
}

const Article = ({ html, children }: ArticleProps) => {
  const articleRef: MutableRefObject<HTMLElement | null> = useRef(null)

  useEffect(() => {
    if (articleRef.current) {
      const tables = articleRef.current.querySelectorAll("table")
      if (tables.length !== 0) {
        tables.forEach(table => {
          const wrapper = document.createElement("div")
          const clone = table.cloneNode(true)
          wrapper.className = "table-wrapper"
          wrapper.appendChild(clone)
          table.replaceWith(wrapper)
        })
      }
    }
  }, [])

  useEffect(() => {
    if (articleRef.current) {
      const imgs = articleRef.current.querySelectorAll("img")
      if (
        imgs.length !== 0 &&
        window.location.pathname.startsWith("/article/")
      ) {
        imgs.forEach(e => {
          e.setAttribute("tabindex", "0")
          e.onkeypress = event => {
            if (event.key === "Enter") {
              e.click()
            }
          }
        })
        setTimeout(() => {
          mediumZoom(imgs, {
            background: "rgba(0, 0, 0, .8)",
          })
        }, 300)
      }
    }
  }, [])

  return (
    <ArticleWrapper>
      {html ? (
        <article
          ref={articleRef}
          dangerouslySetInnerHTML={{ __html: children }}
        />
      ) : (
        <article ref={articleRef}>{children}</article>
      )}
    </ArticleWrapper>
  )
}

export default Article
