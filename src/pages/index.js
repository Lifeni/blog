import { graphql, StaticQuery } from "gatsby"
import React from "react"
import Cards from "../components/cards"
import Footer from "../components/footer"
import Header from "../components/header"
import "../components/message.less"
import Seo from "../components/seo"
import "./global.less"
import "./highlight.less"
import "./main.less"
import "./variables.less"

const Message = () => (
  <StaticQuery
    query={MessageQuery}
    render={data => (
      <article
        className="message"
        dangerouslySetInnerHTML={{
          __html: data.allMarkdownRemark.edges[0].node.html,
        }}
      ></article>
    )}
  />
)

const IndexPage = () => (
  <div className="screen">
    <Seo title="主页" />
    <div className="container">
      {/* <aside>
          <Header logo />
          <Message />
          <Footer />
        </aside> */}
      <main>
        <Cards />
      </main>
    </div>
  </div>
)

export default IndexPage

const MessageQuery = graphql`
  {
    allMarkdownRemark(filter: { frontmatter: { path: { eq: "home" } } }) {
      edges {
        node {
          html
        }
      }
    }
  }
`
