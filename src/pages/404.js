import { MilestoneIcon } from "@primer/octicons-react"
import { graphql, StaticQuery } from "gatsby"
import React from "react"
import About from "../components/about"
import Footer from "../components/footer"
import Header from "../components/header"
import Seo from "../components/seo"
import Sidebar from "../components/sidebar"

const NotFoundPage = () => (
  <>
    <Seo title="404 Not found" />
    <Header back aside />
    <main>
      <Sidebar>
        <About page={["friend", "project"]} />
      </Sidebar>
      <div className="container">
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
      </div>
    </main>
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
