import styled from "@emotion/styled"
import React, { MutableRefObject, useEffect, useRef } from "react"

const ArticleCommentWrapper = styled("div")`
  width: calc(var(--article-width) + 1.5rem);
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem 1rem 3rem 1rem;
`

const ArticleComment = () => {
  const commentRef: MutableRefObject<HTMLDivElement> = useRef()

  useEffect(() => {
    const utterances = document.createElement("script")

    utterances.setAttribute("src", "https://utteranc.es/client.js")
    utterances.setAttribute("repo", "Lifeni-Site/Comment")
    utterances.setAttribute("issue-term", "pathname")
    utterances.setAttribute("theme", "preferred-color-scheme")
    utterances.setAttribute("crossOrigin", "anonymous")
    utterances.setAttribute("async", "true")

    commentRef.current.appendChild(utterances)
  }, [])

  return (
    <ArticleCommentWrapper>
      <div
        ref={commentRef}
        className="utterances-comment"
        id="article-comment"
      />
    </ArticleCommentWrapper>
  )
}

export default ArticleComment
