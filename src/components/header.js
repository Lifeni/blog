import {
  ArrowLeftIcon,
  HomeIcon,
  PackageIcon,
  SearchIcon,
  UploadIcon,
  XIcon,
} from "@primer/octicons-react"
import { Link, navigate } from "gatsby"
import React, { useEffect, useRef, useState } from "react"
import "./header.less"
import Search from "./search"

const Header = ({ app, back, aside, top }) => {
  const [openSidebar, setOpenSidebar] = useState(null)
  const [backWay, setBackWay] = useState("direct")

  const headerRef = useRef()

  useEffect(() => {
    if (aside) {
      if (openSidebar !== null) {
        const aside = document.querySelector("aside")
        const header = document.querySelector("header")
        aside.classList.toggle("expand")
        header.classList.toggle("expand")
      }
    }
  }, [aside, openSidebar])

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

  const handleSearch = () => {
    const search = document.querySelector("#search-container")
    if (search) {
      search.classList.add("show")
      setTimeout(() => {
        document.querySelector("#search-input").focus()
      }, 300)
    }
  }

  const handleBack = e => {
    if (e.button === 0 && !e.ctrlKey) {
      window.history.back()
    } else if (e.button === 1 || (e.button === 0 && e.ctrlKey)) {
      navigate("/")
    }
  }

  return (
    <header ref={headerRef}>
      <a href="#main-content" className="skip-link">
        Skip to main content | 跳转到主要内容
      </a>

      <section>
        {app && (
          <>
            <button
              className="fab auto-width"
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
        )}

        {back && (
          <>
            {backWay === "direct" ? (
              <Link
                to="/"
                className="fab auto-width"
                aria-label="返回主页"
                title="返回主页"
              >
                <HomeIcon aria-label="Home Icon" size={24} />
                <span className="text">主页</span>
              </Link>
            ) : (
              <button
                className="fab auto-width"
                aria-label="点击返回上一页，鼠标中键 或 Ctrl + 鼠标左键 返回主页"
                title="点击返回上一页，鼠标中键 或 Ctrl + 鼠标左键 返回主页"
                onMouseDown={handleBack}
              >
                <ArrowLeftIcon aria-label="Back Icon" size={24} />
                <span className="text">返回</span>
              </button>
            )}
          </>
        )}

        {top && (
          <button
            className="fab go-top"
            aria-label="返回页面顶部"
            title="返回页面顶部"
            onClick={() => window.scrollTo(0, 0)}
          >
            <UploadIcon aria-label="Top Icon" size={24} />
          </button>
        )}
      </section>

      {aside && (
        <button
          id="expand-aside"
          className="mobile-only expand-aside"
          aria-label="展开侧栏"
          title="展开侧栏"
          onClick={() => setOpenSidebar(!openSidebar)}
        >
          <PackageIcon
            className="action-open"
            aria-label="Box Icon"
            size={24}
          />
          <XIcon className="action-close" aria-label="Close Icon" size={24} />
        </button>
      )}
    </header>
  )
}
export default Header
