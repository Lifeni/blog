import React from "react"
import Aside from "../components/Aside"
import Header from "../components/Header"
import PostList from "../components/PostList"
import SEO from "../components/SEO"
import "../styles/Layout.less"

const IndexPage = () => (
  <>
    <a href="#content" className="skip-link">
      Skip to main content | 跳转到主要内容
    </a>
    <SEO title="Home" />
    <Header home like aside title="记录干杯" />
    <main>
      <Aside about footer />
      <PostList />
    </main>
  </>
)

export default IndexPage
