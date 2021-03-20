import React from "react"

const FriendList = () => (
  <article className="friend-list" id="friend-list">
    <p class="subtitle">Hello Friend</p>
    <h1>朋友们的网站</h1>
    <p>有时间可以去他们的网站看一看。</p>
    <ul>
      <li>
        <a
          href="https://blog.bluebonnet27.xyz/"
          target="_blank"
          rel="noopener noreferrer"
          className="friend"
        >
          bluebonnet27
        </a>
      </li>
      <li>
        <a
          href="https://tanakarino.cn/"
          target="_blank"
          rel="noopener noreferrer"
          className="friend"
        >
          Nanako
        </a>
      </li>
    </ul>
  </article>
)

export default FriendList
