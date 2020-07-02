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
              description={node.frontmatter.description}
              date={node.frontmatter.date}
              tags={node.frontmatter.tags}
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
            # date(formatString: "YYYY / MM / DD ")
            date(formatString: "M 月 D 日")
            title
            name
            tags
            description
          }
        }
      }
    }
  }
`

export default PostList
