import React from "react"
import Header from "../components/header"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar"

const NotFoundPage = () => (
  <>
    <SEO title="404 Not found" />
    <Header back />
    <main>
      <Sidebar />
      <article>
        <p className="subtitle">404</p>
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </article>
    </main>
  </>
)

export default NotFoundPage
