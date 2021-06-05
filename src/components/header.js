import React from "react"
import { FiArrowLeft, FiInbox, FiSearch, FiX } from "react-icons/fi"
import svg from "../assets/记录干杯.svg"
import { emitter } from "../emitter"
import "./header.less"

const Logo = () => (
  <h1 aria-label="记录干杯">
    <img src={svg} alt="Logo" />
  </h1>
)

const SearchButton = () => (
  <button
    id="open-dialog"
    aria-label="搜索文章"
    title="搜索文章（/）"
    onClick={() => emitter.emit("search")}
  >
    <FiSearch aria-label="Search Icon" size={24} />
  </button>
)

const SidebarButton = () => (
  <button
    className="mobile-only expand-aside"
    aria-label="展开侧栏"
    title="展开侧栏"
    onClick={() => emitter.emit("sidebar")}
  >
    <FiInbox className="action-open" aria-label="Box Icon" size={24} />
    <FiX className="action-close" aria-label="Close Icon" size={24} />
  </button>
)

const BackButton = () => (
  <button
    aria-label="返回主页"
    title="返回主页"
    onClick={() => window.history.back()}
  >
    <FiArrowLeft aria-label="Home Icon" size={24} />
  </button>
)

const Header = ({ logo, search, back, sidebar }) => (
  <header>
    <a href="#main-content" className="skip-link" aria-label="跳转到主要内容">
      Skip to main content | 跳转到主要内容
    </a>
    {logo && <Logo />}
    {search && <SearchButton />}
    {back && <BackButton />}
    {sidebar && <SidebarButton />}
  </header>
)

export default Header
