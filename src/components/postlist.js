import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Post from "./post"

const PostList = () => (
  <StaticQuery
    query={indexQuery}
    render={data => {
      return (
        <div className="post-list" id="content">
          <p className="subtitle">Articles</p>
          <h2>文章与笔记</h2>
          {data.allMarkdownRemark.edges.map(({ node }, index) => (
            <Post
              title={node.frontmatter.title}
              name={node.frontmatter.name}
              description={node.frontmatter.description}
              date={node.frontmatter.date}
              tags={node.frontmatter.tags}
              key={node.frontmatter.title}
              className={index >= 3 ? "post hide" : "post"}
            />
          ))}
          {/* <Link to="/" className="float-link home">
            #
          </Link> */}
          <button className="expand-post">Show All Articles</button>
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
            date(formatString: "YYYY / MM / DD ")
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
