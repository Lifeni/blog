import React from "react"
import "../styles/friend-list.less"
import friends from "../data/friends.json"

const FriendList = () => (
  <article className="friend-list" id="friend-list">
    <h1>朋友的网站</h1>
    <p className="subtitle">
      <svg
        aria-label="Hash Tag"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="16"
        height="16"
      >
        <path
          fillRule="evenodd"
          d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zM5 8a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zM5.32 9.636a.75.75 0 011.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 111.222.87l-.614-.431c.614.43.614.431.613.431v.001l-.001.002-.002.003-.005.007-.014.019a1.984 1.984 0 01-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.32 3.32 0 01-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 01.183-1.044h.001z"
        ></path>
      </svg>
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
              alt="网站图标"
              aria-label="网站图标"
              title="网站图标"
              className="favicon"
            />
            {friend.name}
            <small>{friend.link}</small>
          </a>
        </li>
      ))}
    </ul>
    <h2>我的网站</h2>
    <section className="my-site">
      <a
        href="https://lifeni.life/icons/icon-512x512.png"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="site-logo"
          src="https://lifeni.life/icons/icon-512x512.png"
          alt="Logo"
        />
      </a>
      <div>
        <span className="name">
          记录干杯{" "}
          <a href="https://lifeni.life/" alt="Link" rel="noopener noreferrer">
            lifeni.life
          </a>
        </span>

        <span>在这里记录一些技术相关的文章、尝试一些新的技术。</span>
      </div>
    </section>
  </article>
)

export default FriendList
