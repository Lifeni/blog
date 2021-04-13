import React from "react"
import About from "../components/about"
import Footer from "../components/footer"
import Header from "../components/header"
import ProjectList from "../components/project-list"
import Seo from "../components/seo"
import Sidebar from "../components/sidebar"
import UpdateCard from "../components/update-card"
import Widget from "../components/widget"

const OpenSourcePage = () => (
  <>
    <Seo title="开源项目" />
    <Header back aside top />
    <main>
      <Sidebar>
        <About project page={["friend", "home"]} />
      </Sidebar>
      <div className="container">
        <UpdateCard />
        <ProjectList />
        <Widget chart />
        <Footer />
      </div>
    </main>
  </>
)

export default OpenSourcePage
