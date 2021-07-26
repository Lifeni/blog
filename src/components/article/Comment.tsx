import styled from "@emotion/styled"
import React, { MutableRefObject, useEffect, useRef } from "react"

const ArticleCommentWrapper = styled("div")`
  width: calc(var(--article-width) + 1.5rem);
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem 1rem 3rem 1rem;
`

const ArticleComment = () => {
  const commentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (commentRef.current) {
      const comment = document.createElement("script")

      comment.setAttribute("src", "https://giscus.app/client.js")
      comment.setAttribute("data-repo", "Lifeni-Space/Blog")
      comment.setAttribute("data-repo-id", "MDEwOlJlcG9zaXRvcnkyOTY0ODMwNDU=")
      comment.setAttribute("data-category", "Comment")
      comment.setAttribute("data-category-id", "DIC_kwDOEav45c4B-c6k")
      comment.setAttribute("data-mapping", "pathname")
      comment.setAttribute("data-reactions-enabled", "1")
      comment.setAttribute("data-emit-metadata", "0")

      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        comment.setAttribute("data-theme", "transparent_dark")
      } else {
        comment.setAttribute("data-theme", "light")
      }

      comment.setAttribute("crossOrigin", "anonymous")
      comment.setAttribute("async", "true")

      commentRef.current.appendChild(comment)
    }
  }, [commentRef])

  return (
    <ArticleCommentWrapper>
      <div ref={commentRef} id="article-comment" />
    </ArticleCommentWrapper>
  )
}

export default ArticleComment
