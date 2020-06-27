import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Footer from "./footer"
import "../styles/layout.css"
import Header from "./header"

const Layout = ({ children }) => {
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
    <div className="layout" data-title={data.site.siteMetadata.title}>
      <a href="#content" className="skip-link">
        Skip to main content | 跳转到主要内容
      </a>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
