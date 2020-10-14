import React from "react"
import Header from "../components/header"
import PostList from "../components/postlist"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar"
import "../styles/layout.less"

const IndexPage = () => (
  <>
    <a href="#content" className="skip-link">
      Skip to main content | 跳转到主要内容
    </a>
    <SEO title="Home" />
    <Header aside title="记录干杯" />
    <main>
      <Sidebar about footer />
      <PostList />
    </main>
  </>
)

export default IndexPage
