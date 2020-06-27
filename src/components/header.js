import React from "react"
import "../styles/header.css"
import { Link } from "gatsby"

const Header = () => (
  <header>
    <p className="subtitle">Lifeni</p>
    <h1>记录干杯</h1>
    <nav>
      <Link to="/" className="home-icon" aria-label="Home">
        Home
      </Link>
      <Link to="/about" className="about-icon" aria-label="About">
        About
      </Link>
    </nav>
  </header>
)

export default Header
