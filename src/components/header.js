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

        {top && (
          <button
            className="fab auto-width go-top"
            aria-label="返回页面顶部"
            title="返回页面顶部"
            onClick={() => window.scrollTo(0, 0)}
          >
            <svg
              aria-label="Top Icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M4.97 12.97a.75.75 0 101.06 1.06L11 9.06v12.19a.75.75 0 001.5 0V9.06l4.97 4.97a.75.75 0 101.06-1.06l-6.25-6.25a.75.75 0 00-1.06 0l-6.25 6.25zM4.75 3.5a.75.75 0 010-1.5h14.5a.75.75 0 010 1.5H4.75z"></path>
            </svg>
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
          <svg
            aria-label="Box Icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fillRule="evenodd"
              d="M0 4.75C0 3.784.784 3 1.75 3h20.5c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0122.25 21H1.75A1.75 1.75 0 010 19.25V4.75zm1.75-.25a.25.25 0 00-.25.25v14.5c0 .138.112.25.25.25h20.5a.25.25 0 00.25-.25V4.75a.25.25 0 00-.25-.25H1.75z"
            ></path>
            <path
              fillRule="evenodd"
              d="M5 8.75A.75.75 0 015.75 8h11.5a.75.75 0 010 1.5H5.75A.75.75 0 015 8.75zm0 4a.75.75 0 01.75-.75h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 01-.75-.75z"
            ></path>
          </svg>
        </button>
      )}
    </header>
  )
}
export default Header
