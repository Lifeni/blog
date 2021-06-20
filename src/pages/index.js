import React from "react"
import Cards from "../components/cards"
import Footer from "../components/footer"
import Header from "../components/header"
import "../components/message.less"
import Seo from "../components/seo"
import "./global.less"
import "./highlight.less"
import "./main.less"
import "./variables.less"

const IndexPage = () => (
  <div className="container">
    <Seo title="主页" />
    <aside>
      <Header about menu search />
    </aside>
    <main>
      <Cards />
      <Footer />
    </main>
  </div>
)

export default IndexPage
