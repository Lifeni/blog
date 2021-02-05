import React from "react"
import About from "../components/about"
import Footer from "../components/footer"
import Header from "../components/header"
import PostList from "../components/postlist"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar"
import "../styles/layout.less"
import "../styles/variables.less"

const IndexPage = () => (
  <>
    <a href="#main-content" className="skip-link">
      Skip to main content | 跳转到主要内容
    </a>
    <SEO title="Home" />
    <Header app aside />
    <main>
      <Sidebar>
        <About />
      </Sidebar>
      <div className="container">
        <PostList />
        <Footer />
      </div>
    </main>
  </>
)

export default IndexPage
