import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <article>
      <p className="subtitle">404</p>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </article>
    <nav>
      <Link to="/" className="fab back-home" aria-label="Home" title="回到主页">
        回到主页
      </Link>
    </nav>
  </Layout>
)

export default NotFoundPage
