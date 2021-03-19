import { Link } from "gatsby"
import React from "react"
import Search from "../components/search"
import "../styles/header.less"

const Header = ({ app, back, aside }) => (
  <header>
    <a href="#main-content" className="skip-link">
      Skip to main content | 跳转到主要内容
    </a>

    {app && (
      <>
        <button className="fab auto-width" id="open-dialog" aria-label="搜索">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fillRule="evenodd"
              d="M14.53 15.59a8.25 8.25 0 111.06-1.06l5.69 5.69a.75.75 0 11-1.06 1.06l-5.69-5.69zM2.5 9.25a6.75 6.75 0 1111.74 4.547.746.746 0 00-.443.442A6.75 6.75 0 012.5 9.25z"
            ></path>
          </svg> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="16"
            height="16"
          >
            <path
              fillRule="evenodd"
              d="M11.5 7a4.499 4.499 0 11-8.998 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"
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
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            fillRule="evenodd"
            d="M10.78 19.03a.75.75 0 01-1.06 0l-6.25-6.25a.75.75 0 010-1.06l6.25-6.25a.75.75 0 111.06 1.06L5.81 11.5h14.44a.75.75 0 010 1.5H5.81l4.97 4.97a.75.75 0 010 1.06z"
          ></path>
        </svg> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="16"
          height="16"
        >
          <path
            fillRule="evenodd"
            d="M6.78 1.97a.75.75 0 010 1.06L3.81 6h6.44A4.75 4.75 0 0115 10.75v2.5a.75.75 0 01-1.5 0v-2.5a3.25 3.25 0 00-3.25-3.25H3.81l2.97 2.97a.75.75 0 11-1.06 1.06L1.47 7.28a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0z"
          ></path>
        </svg>
        <span className="text">返回</span>
      </Link>
    )}

    {aside && (
      <button
        id="expand-aside"
        className="mobile-only expand-aside"
        aria-label="展开侧栏"
      >
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            fillRule="evenodd"
            d="M4.801 3.57A1.75 1.75 0 016.414 2.5h11.174c.702 0 1.337.42 1.611 1.067l3.741 8.828c.04.092.06.192.06.293v7.562A1.75 1.75 0 0121.25 22H2.75A1.75 1.75 0 011 20.25v-7.5c0-.1.02-.199.059-.291L4.8 3.571zM6.414 4a.25.25 0 00-.23.153L2.88 12H8a.75.75 0 01.648.372L10.18 15h3.638l1.533-2.628a.75.75 0 01.64-.372l5.13-.051-3.304-7.797a.25.25 0 00-.23-.152H6.414zM21.5 13.445l-5.067.05-1.535 2.633a.75.75 0 01-.648.372h-4.5a.75.75 0 01-.648-.372L7.57 13.5H2.5v6.75c0 .138.112.25.25.25h18.5a.25.25 0 00.25-.25v-6.805z"
          ></path>
        </svg> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="16"
          height="16"
        >
          <path
            fillRule="evenodd"
            d="M2.8 2.06A1.75 1.75 0 014.41 1h7.18c.7 0 1.333.417 1.61 1.06l2.74 6.395a.75.75 0 01.06.295v4.5A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25v-4.5a.75.75 0 01.06-.295L2.8 2.06zm1.61.44a.25.25 0 00-.23.152L1.887 8H4.75a.75.75 0 01.6.3L6.625 10h2.75l1.275-1.7a.75.75 0 01.6-.3h2.863L11.82 2.652a.25.25 0 00-.23-.152H4.41zm10.09 7h-2.875l-1.275 1.7a.75.75 0 01-.6.3h-3.5a.75.75 0 01-.6-.3L4.375 9.5H1.5v3.75c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V9.5z"
          ></path>
        </svg>
      </button>
    )}
  </header>
)

export default Header
