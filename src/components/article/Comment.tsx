import styled from "@emotion/styled"
import React, { useEffect, useRef, useState } from "react"
import { RiDiscussLine } from "react-icons/ri"

const CommentWrapper = styled("div")`
  width: 100%;
  max-width: calc(var(--main-width) + 2.5rem);
  margin: 0 auto;
  padding: 2rem 1.25rem 4.5rem 1.25rem;

  @media (max-width: 720px) {
    padding: 1.25rem;
  }
`

const CommentButton = styled("button")`
  width: 100%;
  height: 3.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
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
  }
`

const hasComment = true

const ArticleComment = () => {
  const [showComment, setShowComment] = useState(false)
  const commentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (hasComment && showComment && commentRef.current) {
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
  }, [commentRef, hasComment, showComment])

  return (
    <CommentWrapper>
      {showComment ? (
        <div ref={commentRef} id="article-comment" />
      ) : (
        <CommentButton onClick={() => setShowComment(true)}>
          <RiDiscussLine aria-label="评论图标" size="1.125em" /> 点击加载评论
          <small>powered by giscus</small>
        </CommentButton>
      )}
    </CommentWrapper>
  )
}

export default ArticleComment
