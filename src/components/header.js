import { Link } from "gatsby"
import React from "react"
import Search from "../components/search"
import "../styles/header.less"

const Header = ({ app, back, aside }) => (
  <header>
    {app && (
      <>
        <button className="fab auto-width" id="open-dialog" aria-label="搜索">
          <svg
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
        <div className="dialog" id="home-dialog">
          <div className="mask" id="close-dialog"></div>
          <div className="card">
            <Search />
          </div>
        </div>
      </>
    )}

    {back && (
      <Link to="/" className="fab auto-width" aria-label="返回">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            fillRule="evenodd"
            d="M10.78 19.03a.75.75 0 01-1.06 0l-6.25-6.25a.75.75 0 010-1.06l6.25-6.25a.75.75 0 111.06 1.06L5.81 11.5h14.44a.75.75 0 010 1.5H5.81l4.97 4.97a.75.75 0 010 1.06z"
          ></path>
        </svg>
        <span className="text">返回</span>
      </Link>
    )}

    {aside && (
      <button
        id="expand-aside-header"
        className="mobile-only expand-aside-header"
        aria-label="展开侧栏"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            fillRule="evenodd"
            d="M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z"
          ></path>
        </svg>
      </button>
    )}
  </header>
)

export default Header
