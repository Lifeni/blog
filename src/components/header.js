import { Link } from "gatsby"
import React from "react"
import { FiArrowLeft } from "react-icons/fi"
import svg from "../assets/记录干杯.svg"
import "./header.less"

const Logo = () => (
  <h1 aria-label="记录干杯" title="记录干杯">
    <img src={svg} alt="Logo" />
  </h1>
)

const BackButton = () => (
  <Link to="/" aria-label="返回主页" title="返回主页">
    <FiArrowLeft aria-label="Back Icon" size={24} />
  </Link>
)

const Header = ({ logo, back }) => (
  <header>
    {logo && <Logo />}
    {back && <BackButton />}
  </header>
)

export default Header
