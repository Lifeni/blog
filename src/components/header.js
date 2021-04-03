import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import Search from "../components/search"
import "../styles/header.less"

const Header = ({ app, back, aside }) => {
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

      {app && (
        <>
          <button
            className="fab auto-width"
            id="open-dialog"
            aria-label="搜索文章"
            title="搜索文章"
            onClick={() => setOpenSearch(true)}
          >
            <svg
              aria-label="Search Icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fillRule="evenodd"
                d="M14.53 15.59a8.25 8.25 0 111.06-1.06l5.69 5.69a.75.75 0 11-1.06 1.06l-5.69-5.69zM2.5 9.25a6.75 6.75 0 1111.74 4.547.746.746 0 00-.443.442A6.75 6.75 0 012.5 9.25z"
              ></path>
            </svg>

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
          <svg
            aria-label="Back Icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fillRule="evenodd"
              d="M11.03 2.59a1.5 1.5 0 011.94 0l7.5 6.363a1.5 1.5 0 01.53 1.144V19.5a1.5 1.5 0 01-1.5 1.5h-5.75a.75.75 0 01-.75-.75V14h-2v6.25a.75.75 0 01-.75.75H4.5A1.5 1.5 0 013 19.5v-9.403c0-.44.194-.859.53-1.144l7.5-6.363zM12 3.734l-7.5 6.363V19.5h5v-6.25a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75v6.25h5v-9.403L12 3.734z"
            ></path>
          </svg>
          <span className="text">主页</span>
        </Link>
      )}

      {aside && (
        <button
          id="expand-aside"
          className="mobile-only expand-aside"
          aria-label="展开侧栏"
          title="展开侧栏"
          onClick={() => setOpenSidebar(!openSidebar)}
        >
          <svg
            aria-label="Box Icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fillRule="evenodd"
              d="M4.801 3.57A1.75 1.75 0 016.414 2.5h11.174c.702 0 1.337.42 1.611 1.067l3.741 8.828c.04.092.06.192.06.293v7.562A1.75 1.75 0 0121.25 22H2.75A1.75 1.75 0 011 20.25v-7.5c0-.1.02-.199.059-.291L4.8 3.571zM6.414 4a.25.25 0 00-.23.153L2.88 12H8a.75.75 0 01.648.372L10.18 15h3.638l1.533-2.628a.75.75 0 01.64-.372l5.13-.051-3.304-7.797a.25.25 0 00-.23-.152H6.414zM21.5 13.445l-5.067.05-1.535 2.633a.75.75 0 01-.648.372h-4.5a.75.75 0 01-.648-.372L7.57 13.5H2.5v6.75c0 .138.112.25.25.25h18.5a.25.25 0 00.25-.25v-6.805z"
            ></path>
          </svg>
        </button>
      )}
    </header>
  )
}
export default Header
