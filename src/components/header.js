import React from "react"
import "../styles/header.css"
// import { Link } from "gatsby"

const Header = () => (
  <header>
    <img
      src="https://file.lifeni.life/avatar3.jpg"
      alt="头像"
      className="avatar"
    />
    {/* <p className="subtitle">lifeni.life</p> */}
    <h1>
      <span>记录</span>
      <span>干杯</span>
    </h1>
  </header>
)

export default Header
