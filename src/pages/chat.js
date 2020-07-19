import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ChatPage = () => (
  <Layout>
    <SEO title="Chat" />
    <article>
      <p className="subtitle">Chat</p>
      <h1>想说些什么？</h1>
      <p>留言系统正在开发中，先占个位。</p>
    </article>
    <nav>
      <Link to="/" className="fab back-home" aria-label="Home" title="回到主页">
        回到主页
      </Link>
    </nav>
  </Layout>
)

export default ChatPage
