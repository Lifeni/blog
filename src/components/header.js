import { Link } from "gatsby"
import React from "react"
import {
  RiCloseFill,
  RiFileListFill,
  RiFilterOffFill,
  RiHome2Fill,
  RiInboxFill,
  RiSearchFill,
} from "react-icons/ri"
import { StringParam, useQueryParam } from "use-query-params"
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
        title="搜索文章（/）"
        onClick={handleSearch}
      >
        <RiSearchFill aria-label="Search Icon" size={24} />
        <span className="text">搜索</span>
      </button>
    </>
  )
}

const HomeButton = () => {
  return (
    <Link to="/" className="auto-width" aria-label="返回主页" title="返回主页">
      <RiHome2Fill aria-label="Home Icon" size={24} />
      <span className="text">主页</span>
    </Link>
  )
}

const FilterOffButton = () => {
  return (
    <Link to="/" className="auto-width" aria-label="清除筛选" title="清除筛选">
      <RiFilterOffFill aria-label="Filter Off Icon" size={24} />
      <span className="text">清除筛选</span>
    </Link>
  )
}

const SidebarButton = ({ type }) => {
  const handleToggleSideber = () => {
    document.querySelector("body")?.classList.toggle("expand")
    document.querySelector("aside")?.classList.toggle("expand")
    document.querySelector("main")?.classList.toggle("expand")
    document.querySelector("header")?.classList.toggle("expand")
  }

  return (
    <button
      id="expand-aside"
      className="mobile-only expand-aside"
      aria-label="展开侧栏"
      title="展开侧栏"
      onClick={handleToggleSideber}
    >
      {type === "toc" ? (
        <RiFileListFill
          className="action-open"
          aria-label="Box Icon"
          size={24}
        />
      ) : (
        <RiInboxFill className="action-open" aria-label="Box Icon" size={24} />
      )}

      <RiCloseFill className="action-close" aria-label="Close Icon" size={24} />
    </button>
  )
}

const Header = ({ app, back, aside }) => {
  const tag = useQueryParam("tag", StringParam)[0]

  return (
    <header>
      <a href="#main-content" className="skip-link" aria-label="跳转到主要内容">
        Skip to main content | 跳转到主要内容
      </a>

      <section>
        {app && (tag ? <FilterOffButton /> : <SearchButton />)}
        <Search />
        {back && <HomeButton />}
      </section>

      <section>{!tag && aside && <SidebarButton type={aside.type} />}</section>
    </header>
  )
}
export default Header
