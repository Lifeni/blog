import React from "react"
import "../styles/header.css"

const Header = () => (
  <header>
    {/* <img
      src="https://file.lifeni.life/avatar3.jpg"
      alt="头像"
      className="avatar"
    /> */}
    <h1>
      <span># 记录干杯</span>
    </h1>
    <a
      className="background-author"
      href="https://www.pixiv.net/artworks/75961171"
      target="_blank"
      rel="noopener noreferrer"
    >
      图片来自 Pixiv @banishment
    </a>
  </header>
)

export default Header
