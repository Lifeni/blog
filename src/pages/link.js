import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const LinkPage = () => (
  <Layout>
    <SEO title="Chat" />
    <article>
      <p className="subtitle">Link</p>
      <h1>???</h1>
      <p>这是啥？</p>
    </article>
    <nav>
      <Link to="/" className="fab back-home" aria-label="Home" title="回到主页">
        回到主页
      </Link>
    </nav>
  </Layout>
)

export default LinkPage
