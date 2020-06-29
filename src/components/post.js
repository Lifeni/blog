import React from "react"
import { Link } from "gatsby"
import "../styles/post.css"

const Post = ({ title, name, date, className }) => (
  <div className={className}>
    <p className="post-date">{date}</p>
    <Link to={`/article/${name}`}>
      <h3>{title}</h3>
    </Link>
  </div>
)

export default Post
