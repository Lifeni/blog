import { graphql, StaticQuery } from "gatsby"
import React from "react"
import Header from "../components/header"
import Seo from "../components/seo"

const Message = () => (
  <StaticQuery
    query={MessageQuery}
    render={data => (
      <div className="article-wrapper">
        <article
          className="message"
          dangerouslySetInnerHTML={{
            __html: data.allMarkdownRemark.edges[0].node.html,
          }}
        ></article>
      </div>
    )}
  />
)

const NotFoundPage = () => (
  <div className="container">
    <Seo title="404 Not found" />
    <aside>
      <Header back about links />
    </aside>
    <main>
      <Message />
    </main>
  </div>
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
