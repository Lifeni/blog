import { MilestoneIcon } from "@primer/octicons-react"
import { graphql, StaticQuery } from "gatsby"
import React from "react"
import Footer from "../components/footer"
import Header from "../components/header"
import Main from "../components/main"
import Seo from "../components/seo"
import "./404.less"

const NotFoundPage = () => (
  <>
    <Seo title="404 Not found" />
    <Header back aside />
    <Main
      aside={""}
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
            <h1>你要找的页面不在这里</h1>
            <p className="caption">
              <MilestoneIcon aria-label="Nav Icon" size={16} />
              404 PAGE NOT FOUND
            </p>
          </article>
          <Footer />
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
