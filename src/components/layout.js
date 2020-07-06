import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Footer from "./footer"
import "../styles/layout.css"
import Header from "./header"

const Layout = ({ children, noheader }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className={`layout`} data-title={data.site.siteMetadata.title}>
      <a href="#content" className="skip-link">
        Skip to main content | 跳转到主要内容
      </a>
      {noheader ? null : <Header />}
      <main>{children}</main>
      <Footer />
      <section className="notice" id="notice">
        <div className="text" id="text"></div>
      </section>
    </div>
  )
}

export default Layout
