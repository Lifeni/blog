import styled from "@emotion/styled"
import React, { MutableRefObject, useEffect, useRef } from "react"

const CommentWrapper = styled("div")`
  width: calc(100% + 1.5rem);
  margin: 0 -0.75rem;
  padding: 2.5rem 0;
`

const Comment = () => {
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
  }, [commentRef])

  return (
    <CommentWrapper>
      <div
        ref={commentRef}
        className="utterances-comment"
        id="article-comment"
      />
    </CommentWrapper>
  )
}

export default Comment
