import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Post from "./post"

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
