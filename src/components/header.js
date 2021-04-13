import {
  HomeIcon,
  PackageIcon,
  SearchIcon,
  UploadIcon,
  XIcon,
  ArrowLeftIcon,
} from "@primer/octicons-react"
import { Link, navigate } from "gatsby"
import React, { useEffect, useState, useRef } from "react"
import Search from "../components/search"
import "../styles/header.less"

const Header = ({ app, back, aside, top }) => {
  const [openSearch, setOpenSearch] = useState(false)
  const [openSidebar, setOpenSidebar] = useState(null)
  const [backWay, setBackWay] = useState("direct")

  const headerRef = useRef()

  useEffect(() => {
    if (app) {
      const closeSearch = document.querySelector("#close-search")
      if (closeSearch) {
        closeSearch.addEventListener("click", () => {
          setOpenSearch(false)
        })
      }

      window.addEventListener("keypress", e => {
        if (e.key === "/") {
          setOpenSearch(true)
        } else if (e.key === "Enter") {
          const dialog = document.querySelector("#home-dialog")
          if (
            dialog?.querySelectorAll("ul > li > a") &&
            dialog?.querySelectorAll("ul > li > a")[0]
          ) {
            dialog.querySelectorAll("ul > li > a")[0].click()
          }
        }
      })

      window.addEventListener("keydown", e => {
        if (e.key === "Escape") {
          setOpenSearch(false)
        }
      })

      document.querySelector(".search-tips a").setAttribute("tabindex", "-1")
    }
  }, [app])

  useEffect(() => {
    if (app) {
      const dialog = document.querySelector("#home-dialog")
      if (openSearch) {
        const search = document.querySelector("#article-search")
        dialog.classList.add("show")
        setTimeout(() => {
          search.focus()
        }, 300)
      } else {
        dialog.classList.remove("show")
      }
    }
  }, [app, openSearch])

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
              onClick={() => setOpenSearch(true)}
            >
              <SearchIcon aria-label="Search Icon" size={24} />
              <span className="text">搜索</span>
            </button>
            <div
              className="dialog"
              id="home-dialog"
              aria-label="搜索对话框"
              role="dialog"
            >
              <div
                className="mask"
                id="close-dialog"
                onClick={() => setOpenSearch(false)}
                aria-hidden="true"
                title="点击这里也可以关闭搜索窗口"
              ></div>
              <div className="card">
                <Search />
              </div>
            </div>
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
