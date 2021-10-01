import styled from "@emotion/styled"
import React, { useEffect, useRef, useState } from "react"
import { RiDiscussLine } from "react-icons/ri"
import BarAction from "../base/action/Bar"

const Container = styled("div")`
  width: 100%;
  max-width: calc(var(--main-width) + 2.5rem);
  margin: 0 auto;
  padding: 2rem 1.25rem 4.5rem 1.25rem;

  @media (max-width: 720px) {
    padding: 1.25rem;
  }
`

const ArticleComment = () => {
  const [showComment, setShowComment] = useState(false)
  const commentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (showComment && commentRef.current) {
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
  }, [commentRef, showComment])

  return (
    <Container>
      {showComment ? (
        <div ref={commentRef} id="article-comment" />
      ) : (
        <BarAction
          as="button"
          action={() => setShowComment(true)}
          description="Powered By Giscus"
          icon={RiDiscussLine}
          label="评论图标"
        >
          点击加载评论
        </BarAction>
      )}
    </Container>
  )
}

export default ArticleComment
