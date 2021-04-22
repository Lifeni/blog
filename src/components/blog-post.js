import { RiArrowRightLine } from "react-icons/ri"
import { Link } from "gatsby"
import React from "react"
import "./blog-post.less"

const BlogPost = ({ title, name, date, descriptions, tags }) => (
  <div className="post">
    <span className="date">{date}</span>

    <Link to={`/article/${name}`}>
      <span className="title">{title}</span>
    </Link>

    <p className="description">
      {descriptions.map((description, index) => (
        <span key={description}>
          {description}
          {index !== descriptions.length - 1 && <br />}
        </span>
      ))}
    </p>
    <div className="bar">
      <p className="tags">
        {tags.map(tag => (
          <Link
            key={tag}
            className="tag"
            to={`/tag/${tag.toLowerCase().replace(" ", "-")}`}
          >
            {tag}
          </Link>
        ))}
      </p>

      <Link
        className="read-more"
        to={`/article/${name}`}
        aria-label="查看全文"
        title="查看全文"
        tabIndex="-1"
        aria-hidden="true"
      >
        <RiArrowRightLine aria-label="Open Article" size={24} />
      </Link>
    </div>
  </div>
)

export default BlogPost
