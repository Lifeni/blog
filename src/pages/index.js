import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import PostList from "../components/postlist"
import { Link } from "gatsby"

const IndexPage = () => (
  <Layout path="home">
    <SEO title="Home" />
    <PostList />
    <nav>
      {/* <Link className="fab home" to="/" aria-label="主页">
        主页
      </Link> */}
      <button className="fab like" id="like-it" aria-label="喜欢">
        喜欢
      </button>
      <Link className="fab about" to="/about" aria-label="关于">
        关于
      </Link>
    </nav>
  </Layout>
)

export default IndexPage
