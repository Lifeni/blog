import {
  HomeIcon,
  PackageIcon,
  SearchIcon,
  UploadIcon,
  XIcon,
} from "@primer/octicons-react"
import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import Search from "../components/search"
import "../styles/header.less"

const Header = ({ app, back, aside, top }) => {
  const [openSearch, setOpenSearch] = useState(false)
  const [openSidebar, setOpenSidebar] = useState(null)

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

  return (
    <header>
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
          <Link
            to="/"
            className="fab auto-width"
            aria-label="返回主页"
            title="返回主页"
          >
            <HomeIcon aria-label="Home Icon" size={24} />
            <span className="text">主页</span>
          </Link>
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
