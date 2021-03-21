import React from "react"
import About from "../components/about"
import FriendList from "../components/friend-list"
import Header from "../components/header"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar"
import Utterances from "../components/utterances"

const OpenSourcePage = () => (
  <>
    <SEO title="朋友们" />
    <Header back aside />
    <main className="friend">
      <Sidebar>
        <About friend page />
      </Sidebar>
      <div className="container">
        <FriendList />
        <Utterances />
      </div>
    </main>
  </>
)

export default OpenSourcePage
