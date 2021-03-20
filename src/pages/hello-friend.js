import React from "react"
import Footer from "../components/footer"
import FriendList from "../components/friend-list"
import Header from "../components/header"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar"
import UpdateCard from "../components/update-card"

const OpenSourcePage = () => (
  <>
    <SEO title="朋友们" />
    <Header back />
    <main>
      <Sidebar />
      <div className="container">
        <UpdateCard />
        <FriendList />
      </div>
    </main>
  </>
)

export default OpenSourcePage
