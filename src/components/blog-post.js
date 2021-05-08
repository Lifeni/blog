import { Link } from "gatsby"
import React from "react"
import { RiArrowRightLine, RiArticleLine, RiBookmarkLine } from "react-icons/ri"
import "./blog-post.less"
import "./tag.less"

const BlogPost = ({ title, name, date, descriptions, tags, hide }) => (
  <div
    className={`post ${hide ? "hide" : ""}`}
    data-tags={tags.map(tag => tag.toLowerCase().replace(" ", "-")).join(",")}
  >
    <span className="date">{date}</span>

    <Link to={`/article/${name}`}>
      <span className="title">{title}</span>
    </Link>

    <ul className="description">
      {descriptions.map(description => (
        <li key={description}>{description}</li>
      ))}
    </ul>
    <div className="bar">
      <span>
        <RiArticleLine aria-label="Article Icon" size={18} />
        文章
      </span>
      <p className="tags">
        {tags.map(tag => (
          <Link
            key={tag}
            className={`tag ${tag.toLowerCase().replace(" ", "-")}`}
            to={`/?tag=${tag.toLowerCase().replace(" ", "-")}`}
          >
            <RiBookmarkLine aria-label="Tag Icon" size={18} />
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
        <RiArrowRightLine aria-label="Open Article" size={18} />
      </Link>
    </div>
  </div>
)

export default BlogPost
