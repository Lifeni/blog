import { graphql, Link, StaticQuery } from "gatsby"
import React from "react"
import "../styles/PostList.less"

const Post = ({ title, name, date, className, descriptions, tags }) => (
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

const PostList = () => (
  <StaticQuery
    query={indexQuery}
    render={data => {
      return (
        <div className="post-list" id="content">
          {data.allMarkdownRemark.edges.map(({ node }, index) => (
            <Post
              title={node.frontmatter.title}
              name={node.frontmatter.name}
              descriptions={node.frontmatter.descriptions}
              date={node.frontmatter.date}
              tags={node.frontmatter.tags}
              excerpt={node.excerpt}
              key={node.frontmatter.title}
              className="post"
            />
          ))}
        </div>
      )
    }}
  />
)

const indexQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "YYYY 年 M 月 D 日")
            title
            name
            tags
            descriptions
          }
          excerpt(format: HTML, pruneLength: 100)
        }
      }
    }
  }
`

export default PostList
