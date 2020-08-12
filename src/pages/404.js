import React from "react"
import Aside from "../components/Aside"
import Header from "../components/Header"
import SEO from "../components/SEO"

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <Header />
    <main>
      <Aside footer />
      <article>
        <p className="subtitle">404</p>
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </article>
    </main>
  </>
)

export default NotFoundPage
