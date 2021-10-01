import mediumZoom from "medium-zoom"
import React, { MutableRefObject, useEffect, useRef } from "react"
import Markdown from "../common/typography/Markdown"
import ArticleCard from "../common/widget/article-card/Card"

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
      <div dangerouslySetInnerHTML={{ __html: children }} />
    </Markdown>
  )
}

export default Article
