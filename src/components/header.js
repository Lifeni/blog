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
  <button
    aria-label="返回上一页"
    title="返回上一页"
    onClick={() => window.history.back()}
  >
    <FiArrowLeft aria-label="Back Icon" size={24} />
  </button>
)

const Header = ({ logo, back }) => (
  <header>
    {logo && <Logo />}
    {back && <BackButton />}
  </header>
)

export default Header
