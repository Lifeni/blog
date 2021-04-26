import React from "react"
import friends from "../data/friends.json"
import "./friends.less"

const FriendList = () => (
  <article className="friend-list" id="friend-list">
    <ul>
      {friends.map((friend, index) => (
        <li key={index}>
          <img
            src={friend.icon}
            alt={friend.name}
            aria-label={friend.name}
            title={friend.name}
            className="favicon"
          />
          <a
            href={friend.url}
            target="_blank"
            rel="noopener noreferrer"
            className="friend link"
          >
            <span>{friend.name}</span>
          </a>
        </li>
      ))}
    </ul>
  </article>
)

export default FriendList
