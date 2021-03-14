import React from "react"
import About from "../components/about"
import Footer from "../components/footer"
import Header from "../components/header"
import ProjectList from "../components/project-list"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar"
import Tabs from "../components/tabs"
import UpdateCard from "../components/update-card"

const OpenSourcePage = () => (
  <>
    <SEO title="开源项目" />
    <Header app aside />
    <main>
      <Sidebar>
        <About />
      </Sidebar>
      <div className="container">
        <Tabs page="open-source" />
        <UpdateCard />
        <ProjectList />
        <Footer />
      </div>
    </main>
  </>
)

export default OpenSourcePage
