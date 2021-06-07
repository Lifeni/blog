import React from "react"
import svg from "../assets/记录干杯.svg"
import "./header.less"

const Logo = () => (
  <h1 aria-label="记录干杯" title="记录干杯">
    <img src={svg} alt="Logo" />
  </h1>
)

const Header = ({ logo }) => <header>{logo && <Logo />}</header>

export default Header
