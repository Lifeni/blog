import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import PostList from "../components/postlist"
import Showcase from "../components/showcase"
import { Link } from "gatsby"

const IndexPage = () => (
  <>
    <Layout path="home">
      <SEO title="Home" />
      <Showcase />
      <PostList />
      <nav>
        <button className="fab like" id="like-it" aria-label="喜欢">
          喜欢
        </button>
        <Link className="fab about" to="/about" aria-label="关于">
          关于
        </Link>
        <Link className="fab chat" to="/chat" aria-label="留言">
          留言
        </Link>
      </nav>
    </Layout>
  </>
)

export default IndexPage
