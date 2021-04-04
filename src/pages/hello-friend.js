import React from "react"
import About from "../components/about"
import Footer from "../components/footer"
import FriendList from "../components/friend-list"
import Header from "../components/header"
import Seo from "../components/seo"
import Sidebar from "../components/sidebar"
import UpdateCard from "../components/update-card"
import Utterances from "../components/utterances"

const OpenSourcePage = () => (
  <>
    <Seo title="朋友" />
    <Header back aside top />
    <main className="friend">
      <Sidebar>
        <About friend page={["project"]} />
      </Sidebar>
      <div className="container">
        <UpdateCard />
        <FriendList />
        <Utterances />
        <Footer />
      </div>
    </main>
  </>
)

export default OpenSourcePage
