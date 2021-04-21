import React from "react"
import "./comment.less"

const Utterances = () => (
  <div className="utterances-comment" id="comment">
    <p className="comment-loading" id="comment-loading">
      🔮 Utterances 加载中 ...
    </p>
    <p className="comment-error hide" id="comment-error">
      🔮 Utterances 加载失败，请检查网络
    </p>
  </div>
)

export default Utterances
