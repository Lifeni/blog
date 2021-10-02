import styled from "@emotion/styled"
import mediumZoom from "medium-zoom"
import React, { MutableRefObject, useEffect, useRef } from "react"
import Markdown from "../common/typography/Markdown"
import ArticleCard from "../common/widget/article-card/Card"

interface ContainerProps {
  serif?: boolean
}

const Container = styled("div")<ContainerProps>`
  padding: ${props => (props.serif ? "2.5rem 1rem 1rem 1rem" : "1rem")};
  display: flex;
  flex-direction: column;
  line-height: ${props => (props.serif ? "2.25" : "2")};
  font-family: ${props =>
    props.serif ? "var(--font-serif)" : "var(--font-sans)"};
  text-indent: ${props => (props.serif ? "2rem" : "0")};

  p {
    margin: ${props => (props.serif ? "0" : "0.375rem 0")};

    &:first-of-type {
      text-indent: 0;
    }
  }
`

interface ArticleProps {
  frontmatter: IFrontMatter
  children: string
}

const Article = ({ frontmatter, children }: ArticleProps) => {
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
          e.addEventListener("keypress", event => {
            if (event.key === "Enter") {
              e.click()
            }
          })
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
    <Markdown ref={articleRef}>
      <ArticleCard from="article" frontmatter={frontmatter} />
      <Container
        serif={frontmatter.serif}
        dangerouslySetInnerHTML={{ __html: children }}
      />
    </Markdown>
  )
}

export default Article
