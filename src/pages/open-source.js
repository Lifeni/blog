import React from "react"
import About from "../components/about"
import Footer from "../components/footer"
import Header from "../components/header"
import ProjectList from "../components/project-list"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar"
import UpdateCard from "../components/update-card"

const OpenSourcePage = () => (
  <>
    <SEO title="开源项目" />
    <Header back aside />
    <main>
      <Sidebar>
        <About project page />
      </Sidebar>
      <div className="container">
        <UpdateCard />
        <ProjectList />
        <Footer />
      </div>
    </main>
  </>
)

export default OpenSourcePage
