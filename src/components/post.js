import React from "react"
import { Link } from "gatsby"
import "../styles/post.css"

const Post = ({ title, name, date, className, description, tags }) => (
  <div className={className}>
    <Link to={`/article/${name}`}>
      <span className="title">{title}</span>
    </Link>

    <div className="info">
      <span className="date">{date}</span>
      {tags.map(tag => (
        <span key={tag} className="tag">
          # {tag}
        </span>
      ))}
    </div>
    <p className="description">{description}</p>
    <Link className="read-more" to={`/article/${name}`}>
      {">"} Read More...
    </Link>
  </div>
)

export default Post
