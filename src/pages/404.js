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
      <div className="container">
        <article>
          <p className="subtitle">HTTP 404</p>
          <h1>NOT FOUND</h1>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
          <p>
            <span role="img" aria-label="？">
              👀
            </span>{" "}
            你要找的页面不在这里。
          </p>
        </article>
      </div>
    </main>
  </>
)

export default NotFoundPage
