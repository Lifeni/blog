import React from "react"
import svg from "../assets/记录干杯.svg"
import Cards from "../components/cards"
import Footer from "../components/footer"
import Header from "../components/header"
import "../components/hero.less"
import "../components/message.less"
import Seo from "../components/seo"
import "./global.less"
import "./highlight.less"
import "./main.less"
import "./variables.less"

const Hero = () => {
  return (
    <section className="hero">
      <img className="logo" src={svg} alt="Logo" />
    </section>
  )
}

const IndexPage = () => (
  <div className="container">
    <Seo title="主页" />
    <aside>
      <Header about menu search />
    </aside>
    <main>
      {/* <Hero /> */}
      <Cards />
      <Footer />
    </main>
  </div>
)

export default IndexPage
