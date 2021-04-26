import { graphql, Link, StaticQuery } from "gatsby"
import React from "react"
import Header from "../components/header"
import Main from "../components/main"
import Seo from "../components/seo"
import "./404.less"

const NotFoundPage = () => (
  <>
    <Seo title="404 Not found" />
    <Header back />
    <Main
      main={
        <>
          <article id="main-content">
            <StaticQuery
              query={ImageQuery}
              render={data => {
                return (
                  <img
                    src={
                      data.allFile.edges.find(edge => edge.node.name === "👀")
                        .node.publicURL
                    }
                    alt="找不到页面"
                    aria-label="找不到页面"
                    className="not-found-image"
                  />
                )
              }}
            />
            <h2 role="h1" className="not-found-title">
              你要找的页面不在这里，去 <Link to="/">主页</Link> 看看吧。
            </h2>
          </article>
        </>
      }
    />
  </>
)

export default NotFoundPage

export const ImageQuery = graphql`
  query ImageQuery {
    allFile(filter: { relativeDirectory: { eq: "images" } }) {
      edges {
        node {
          publicURL
          name
        }
      }
    }
  }
`
