import React from "react"
import About from "../components/about"
import FriendList from "../components/friend-list"
import Header from "../components/header"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar"
import UpdateCard from "../components/update-card"
import Utterances from "../components/utterances"

const OpenSourcePage = () => (
  <>
    <SEO title="朋友们" />
    <Header back aside />
    <main className="friend">
      <Sidebar>
        <About friend page={["home", "project"]} />
      </Sidebar>
      <div className="container">
        <UpdateCard />
        <FriendList />
        <Utterances />
      </div>
    </main>
  </>
)

export default OpenSourcePage
