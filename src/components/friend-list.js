import { SmileyIcon } from "@primer/octicons-react"
import React from "react"
import friends from "../data/friends.json"
import "../styles/friend-list.less"

const FriendList = () => (
  <article className="friend-list" id="friend-list">
    <h1>朋友的网站</h1>
    <p className="subtitle">
      <SmileyIcon aria-label="Smiley Icon" size={16} />
      Hello Friend
    </p>
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

export default FriendList
