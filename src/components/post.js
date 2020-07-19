import React from "react"
import { Link } from "gatsby"
import "../styles/post.css"

const Post = ({
  title,
  name,
  date,
  className,
  descriptions,
  tags,
  excerpt,
}) => (
  <div className={className}>
    <span className="date">{date}</span>
    <Link to={`/article/${name}`}>
      <span className="title">{title}</span>
    </Link>

    <div className="info">
      {tags.map(tag => (
        <span key={tag} className="tag">
          # {tag}
        </span>
      ))}
    </div>
    <p className="description">
      {descriptions.map((description, index) => (
        <span key={description}>
          {description}
          {index === descriptions.length - 1 ? null : <br />}
        </span>
      ))}
    </p>
    <Link className="read-more" to={`/article/${name}`}>
      {">"} Read More
    </Link>
  </div>
)

export default Post
