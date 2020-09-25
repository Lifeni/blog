import { Link } from "gatsby"
import React from "react"
import "../styles/Header.less"

const Header = ({ back, aside, title }) => (
  <header>
    {back ? (
      <nav>
        <Link to="/" aria-label="返回">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fillRule="evenodd"
              fill="#FFFFFF"
              d="M10.78 19.03a.75.75 0 01-1.06 0l-6.25-6.25a.75.75 0 010-1.06l6.25-6.25a.75.75 0 111.06 1.06L5.81 11.5h14.44a.75.75 0 010 1.5H5.81l4.97 4.97a.75.75 0 010 1.06z"
            ></path>
          </svg>
          <span>返回</span>
        </Link>
      </nav>
    ) : null}

    {title ? <h6 id="header-title">{title}</h6> : null}

    {aside ? (
      <div>
        <button
          id="expand-aside-header"
          className="expand-aside-header"
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
              fill="#FFFFFF"
              d="M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z"
            ></path>
          </svg>
        </button>
      </div>
    ) : null}
  </header>
)

export default Header
