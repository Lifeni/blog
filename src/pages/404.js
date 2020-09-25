import React from "react"
import Header from "../components/Header"
import SEO from "../components/SEO"
import Sidebar from "../components/Sidebar"

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
