import {
  ArrowLeftIcon,
  FileDirectoryIcon,
  HomeIcon,
  ListUnorderedIcon,
  SearchIcon,
  XIcon,
} from "@primer/octicons-react"
import { Link, navigate } from "gatsby"
import React, { useEffect, useRef, useState } from "react"
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
        <SearchIcon aria-label="Search Icon" size={24} />
        <span className="text">搜索</span>
      </button>
      <Search />
    </>
  )
}

const HomeButton = () => {
  return (
    <Link to="/" className="auto-width" aria-label="返回主页" title="返回主页">
      <HomeIcon aria-label="Home Icon" size={24} />
      <span className="text">主页</span>
    </Link>
  )
}

const BackButton = () => {
  const handleBack = e => {
    if (e.button === 0 && !e.ctrlKey) {
      window.history.back()
    } else if (e.button === 1 || (e.button === 0 && e.ctrlKey)) {
      navigate("/")
    }
  }

  return (
    <button
      className="auto-width"
      aria-label="点击返回上一页，鼠标中键 或 Ctrl + 鼠标左键 返回主页"
      title="点击返回上一页，鼠标中键 或 Ctrl + 鼠标左键 返回主页"
      onMouseDown={handleBack}
    >
      <ArrowLeftIcon aria-label="Back Icon" size={24} />
      <span className="text">返回</span>
    </button>
  )
}

const SidebarButton = ({ type }) => {
  const [openSidebar, setOpenSidebar] = useState(null)

  useEffect(() => {
    if (openSidebar !== null) {
      const aside = document.querySelector("aside")
      const header = document.querySelector("header")
      aside.classList.toggle("expand")
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
        <ListUnorderedIcon
          className="action-open"
          aria-label="Box Icon"
          size={24}
        />
      ) : (
        <FileDirectoryIcon
          className="action-open"
          aria-label="Box Icon"
          size={24}
        />
      )}

      <XIcon className="action-close" aria-label="Close Icon" size={24} />
    </button>
  )
}

const Slogan = () => (
  <svg
    width="80"
    height="19"
    viewBox="0 0 80 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.14 0.18C3.08 1.18 4.22 2.72 4.68 4.08C6.98 5.44 8.52 0.959999 2.3 0.0599988L2.14 0.18ZM7.88 12.86C7.06 13.34 6.28 13.8 5.52 14.2V6.64C5.96 6.56 6.18 6.4 6.3 6.26L4.36 4.62L3.3 5.7H0.64L0.8 6.28H3.26V14.52C3.26 14.96 3.12 15.14 2.3 15.62L3.94 18.12C4.18 17.96 4.44 17.68 4.58 17.26C6.16 15.5 7.36 13.88 8 13.04L7.88 12.86ZM18.52 13.1H18.3C17.9 14.38 17.56 15.3 17.32 15.68C17.14 15.88 16.98 15.96 16.64 15.98C16.26 16 15.4 16.02 14.4 16.02H11.7C10.8 16.02 10.64 15.9 10.64 15.48V8.66H15.24V10.32H15.6C16.38 10.32 17.54 9.92 17.56 9.78V2.84C18.06 2.74 18.4 2.52 18.56 2.32L16.14 0.439999L15 1.74H7.4L7.58 2.32H15.24V8.1H10.9L8.36 7.14V15.9C8.36 17.56 9.02 17.92 11.42 17.92H14.2C18.5 17.92 19.5 17.66 19.5 16.66C19.5 16.24 19.3 16 18.58 15.76L18.52 13.1ZM31.12 7.84H38.88C39.18 7.84 39.4 7.74 39.46 7.52C38.5 6.68 36.94 5.54 36.94 5.54L35.54 7.26H35.22L35.46 2.12C35.86 2.08 36.02 2 36.18 1.82L33.86 0.0799997L32.88 1.22H22.98L23.16 1.8H33.04L32.9 4.28H23.58L23.76 4.86H32.9L32.78 7.26H20.76L20.94 7.84H28.76V11.7C25.42 13.16 22.26 14.44 20.88 14.94L22.68 17.28C22.9 17.16 23.04 16.92 23.08 16.66C25.54 14.98 27.38 13.6 28.76 12.46V15.86C28.76 16.08 28.66 16.22 28.34 16.22C27.88 16.22 25.7 16.08 25.7 16.08V16.34C26.76 16.52 27.24 16.78 27.56 17.12C27.86 17.48 28 18.02 28.02 18.76C30.74 18.56 31.12 17.48 31.12 15.92V8.78C32.28 13.42 34.42 15.7 37.44 17.44C37.72 16.34 38.34 15.5 39.26 15.26L39.32 15.06C37.4 14.5 35.32 13.64 33.68 12.04C35 11.48 36.38 10.72 37.32 10.14C37.8 10.24 37.96 10.14 38.08 9.96L35.64 8.3C35.16 9.18 34.16 10.56 33.26 11.62C32.36 10.64 31.6 9.44 31.12 7.9V7.84ZM23.06 8.58C23.9 9.4 24.82 10.74 25.08 11.9C27.24 13.38 29.04 9.14 23.24 8.46L23.06 8.58ZM55.34 8.4H51.2V2.66H57.72C58 2.66 58.22 2.56 58.28 2.34C57.34 1.52 55.72 0.299999 55.72 0.299999L54.3 2.1H41.84L42 2.66H48.7V8.4H40.66L40.82 8.96H48.7V18.82H49.14C50.44 18.82 51.2 18.28 51.2 18.12V8.96H58.82C59.12 8.96 59.34 8.86 59.4 8.64C58.42 7.8 56.8 6.56 56.8 6.56L55.34 8.4ZM66.06 5.38H68.92C69.2 5.38 69.4 5.28 69.44 5.06C68.74 4.36 67.52 3.3 67.52 3.3L66.44 4.8H66.06V0.92C66.6 0.839999 66.76 0.64 66.8 0.339999L63.78 0.039999V4.8H60.82L60.98 5.38H63.54C62.94 8.4 61.92 11.58 60.34 13.88L60.6 14.1C61.84 13 62.92 11.74 63.78 10.34V18.78H64.24C65.1 18.78 66.06 18.3 66.06 18.1V6.76C66.54 7.58 66.94 8.64 66.98 9.58C68.68 11.16 70.82 7.76 66.06 6.34V5.38ZM73.88 6.2C74.58 5.06 75.12 3.86 75.56 2.58H78.96C79.24 2.58 79.46 2.48 79.52 2.26C78.66 1.46 77.26 0.299999 77.26 0.299999L76 2H67.28L67.44 2.58H72.9C71.82 6.28 69.6 10.08 66.54 12.56L66.74 12.78C68.82 11.68 70.58 10.3 72 8.72V18.7H72.42C73.3 18.7 74.26 18.24 74.28 18.08V6.96C74.66 6.9 74.84 6.78 74.9 6.58L73.88 6.2ZM74.42 7.36C75.6 8.64 77.06 10.54 77.54 12.18C79.88 13.72 81.44 9.04 74.6 7.22L74.42 7.36Z"
      fill="black"
    />
  </svg>
)

const Header = ({ app, back, aside }) => {
  const [backWay, setBackWay] = useState("direct")

  const headerRef = useRef()

  useEffect(() => {
    if (back) {
      const ref = headerRef.current.dataset.ref
      if (ref === "null") {
        setBackWay("direct")
      } else {
        setBackWay(ref)
      }
    }
  }, [back, setBackWay])

  return (
    <header ref={headerRef}>
      <a href="#main-content" className="skip-link">
        Skip to main content | 跳转到主要内容
      </a>

      <section>
        {app && <SearchButton />}
        {back && (backWay === "direct" ? <HomeButton /> : <BackButton />)}
      </section>

      <section>
        <p
          className="header-title"
          alt="记录干杯"
          title="记录干杯"
          aria-label="记录干杯"
        >
          <Slogan />
        </p>
      </section>

      <section>{aside && <SidebarButton type={aside.type} />}</section>

      {/* <Fab /> */}
    </header>
  )
}
export default Header
