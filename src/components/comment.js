import React, { useEffect, useRef } from "react"
import "./comment.less"

const Comment = () => {
  const commentRef = useRef()

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

      <div className="comment-wrapper">
        <div
          ref={commentRef}
          className="utterances-comment"
          id="article-comment"
        ></div>
        <div className="space"></div>
      </div>
  )
}

export default Comment
