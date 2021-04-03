import React from "react"
import About from "../components/about"
import Footer from "../components/footer"
import Header from "../components/header"
import PostList from "../components/post-list"
import Seo from "../components/seo"
import Sidebar from "../components/sidebar"
import UpdateCard from "../components/update-card"
import "../styles/layout.less"
import "../styles/variables.less"

const IndexPage = () => (
  <>
    <Seo title="Home" />
    <Header app aside />
    <main>
      <Sidebar>
        <About hello me page={["friend", "project"]} />
      </Sidebar>
      <div className="container">
        <UpdateCard />
        <PostList />
        <Footer />
      </div>
    </main>
  </>
)

export default IndexPage
