import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import {
  RiCloseLine,
  RiFileListLine,
  RiHome2Line,
  RiInboxLine,
  RiSearchLine,
} from "react-icons/ri"
import "./header.less"
import Search from "./search"

const SearchButton = () => {
  const handleSearch = () => {
    const search = document.querySelector("#search-container")
    if (search) {
      search.classList.add("show")
      setTimeout(() => {
        document.querySelector("#search-input").focus()
      }, 300)
    }
  }

  return (
    <>
      <button
        className="auto-width"
        id="open-dialog"
        aria-label="搜索文章"
        title="搜索文章"
        onClick={handleSearch}
      >
        <RiSearchLine aria-label="Search Icon" size={24} />
        <span className="text">搜索</span>
      </button>
      <Search />
    </>
  )
}

const HomeButton = () => {
  return (
    <Link to="/" className="auto-width" aria-label="返回主页" title="返回主页">
      <RiHome2Line aria-label="Home Icon" size={24} />
      <span className="text">主页</span>
    </Link>
  )
}

const SidebarButton = ({ type }) => {
  const [openSidebar, setOpenSidebar] = useState(null)

  useEffect(() => {
    if (openSidebar !== null) {
      const body = document.querySelector("body")
      const aside = document.querySelector("aside")
      const main = document.querySelector("main")
      const header = document.querySelector("header")
      body.classList.toggle("expand")
      aside.classList.toggle("expand")
      main.classList.toggle("expand")
      header.classList.toggle("expand")
    }
  }, [openSidebar])

  return (
    <button
      id="expand-aside"
      className="mobile-only expand-aside"
      aria-label="展开侧栏"
      title="展开侧栏"
      onClick={() => setOpenSidebar(!openSidebar)}
    >
      {type === "toc" ? (
        <RiFileListLine
          className="action-open"
          aria-label="Box Icon"
          size={24}
        />
      ) : (
        <RiInboxLine className="action-open" aria-label="Box Icon" size={24} />
      )}

      <RiCloseLine className="action-close" aria-label="Close Icon" size={24} />
    </button>
  )
}

const Header = ({ app, back, aside }) => {
  return (
    <header>
      <a href="#main-content" className="skip-link" aria-label="跳转到主要内容">
        Skip to main content | 跳转到主要内容
      </a>

      <section>
        {app && <SearchButton />}
        {back && <HomeButton />}
      </section>

      <section>{aside && <SidebarButton type={aside.type} />}</section>
    </header>
  )
}
export default Header
