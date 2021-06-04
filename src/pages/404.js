import { graphql, StaticQuery } from "gatsby"
import React from "react"
import Header from "../components/header"
import Seo from "../components/seo"

const Message = () => (
  <StaticQuery
    query={MessageQuery}
    render={data => (
      <article
        dangerouslySetInnerHTML={{
          __html: data.allMarkdownRemark.edges[0].node.html,
        }}
      ></article>
    )}
  />
)

const NotFoundPage = () => (
  <>
    <Seo title="404 Not found" />
    <div className="container">
      <Header back />
      <main>
        <Message />
      </main>
    </div>
  </>
)

export default NotFoundPage

const MessageQuery = graphql`
  {
    allMarkdownRemark(filter: { frontmatter: { path: { eq: "404" } } }) {
      edges {
        node {
          frontmatter {
            path
          }
          html
        }
      }
    }
  }
`
