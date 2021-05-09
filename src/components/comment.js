import React from "react"
import "./comment.less"

const Utterances = () => (
  <div className="utterances-comment" id="article-comment">
    <p className="comment-loading" id="comment-loading">
      <span aria-hidden="true">🔮</span> utterances 加载中 ...
    </p>
    <p className="comment-error hide" id="comment-error">
      <span aria-hidden="true">🔮</span> utterances 加载失败，请检查网络
    </p>
  </div>
)

export default Utterances
