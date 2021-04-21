import React from "react"
import Utterances from "../components/comment"
import Header from "../components/header"
import Main from "../components/main"
import { UpdateNow } from "../components/notification"
import Seo from "../components/seo"
import { Links, Notes } from "../components/widget"
import friends from "../data/friends.json"
import "./friends.less"

const FriendList = () => (
  <article className="friend-list" id="friend-list">
    <p className="article-subtitle">
      {friends.length > 1
        ? `${friends.length} sites`
        : `${friends.length} site`}
    </p>
    <h1>朋友的网站</h1>
    <ul>
      {friends.map((friend, index) => (
        <li key={index}>
          <a
            href={friend.url}
            target="_blank"
            rel="noopener noreferrer"
            className="friend"
          >
            <img
              src={friend.icon}
              alt={friend.name}
              aria-label={friend.name}
              title={friend.name}
              className="favicon"
            />
            {friend.name}
            <small>{friend.link}</small>
          </a>
        </li>
      ))}
    </ul>
  </article>
)

const OpenSourcePage = () => (
  <>
    <Seo title="朋友" />
    <Header back aside top />
    <Main
      aside={
        <>
          <Notes.FriendsNote />
        </>
      }
      main={
        <>
          <UpdateNow />
          <FriendList />
          <Utterances />
        </>
      }
    />
  </>
)

export default OpenSourcePage
