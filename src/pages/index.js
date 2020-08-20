import { Link } from "gatsby"
import React from "react"
import Header from "../components/Header"
import PostList from "../components/PostList"
import SEO from "../components/SEO"
import Sidebar from "../components/Sidebar"
import Snackbar from "../components/Snackbar"
import "../styles/Layout.less"

const IndexPage = () => (
  <>
    <a href="#content" className="skip-link">
      Skip to main content | 跳转到主要内容
    </a>
    <SEO title="Home" />
    <Header home like aside privacy title="记录干杯" />
    <main>
      <Sidebar about footer />
      <PostList />
    </main>
    <Snackbar id="privacy-snackbar">
      <p>
        请查看网站的{" "}
        <Link to="/privacy" aria-label="隐私数据说明">
          隐私数据说明
        </Link>
      </p>
    </Snackbar>
  </>
)

export default IndexPage
