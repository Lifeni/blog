import { graphql, StaticQuery } from "gatsby"
import React from "react"
import Comment from "../components/comment"
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
        <Comment />
      </div>
    )}
  />
)

const AboutPage = () => (
  <div className="container">
    <Seo title="关于我和这个网站" />
    <aside>
      <Header back comment links />
    </aside>
    <main>
      <Message />
    </main>
  </div>
)

export default AboutPage

const MessageQuery = graphql`
  {
    allMarkdownRemark(filter: { frontmatter: { path: { eq: "about" } } }) {
      edges {
        node {
          html
        }
      }
    }
  }
`
