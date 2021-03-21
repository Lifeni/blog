import React from "react"
import Header from "../components/header"
import ProjectList from "../components/project-list"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar"
import UpdateCard from "../components/update-card"

const OpenSourcePage = () => (
  <>
    <SEO title="开源项目" />
    <Header back />
    <main>
      <Sidebar />
      <div className="container">
        <UpdateCard />
        <ProjectList />
      </div>
    </main>
  </>
)

export default OpenSourcePage
