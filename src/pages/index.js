import React from "react"
import Header from "../components/Header"
import PostList from "../components/PostList"
import SEO from "../components/SEO"
import Sidebar from "../components/Sidebar"
import "../styles/Layout.less"

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
