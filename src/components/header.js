import { Link, navigate } from "gatsby"
import React, { useEffect, useRef, useState } from "react"
import {
  RiArrowLeftLine,
  RiChat3Line,
  RiCloseLine,
  RiFileListLine,
  RiHomeLine,
  RiInboxLine,
  RiSearchLine,
  RiUserSmileLine,
} from "react-icons/ri"
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
        <RiSearchLine aria-label="Search Icon" size={24} />
      </button>
      <Search />
    </>
  )
}

const HomeButton = () => {
  return (
    <Link to="/" className="auto-width" aria-label="返回主页" title="返回主页">
      <RiHomeLine aria-label="Home Icon" size={24} />
    </Link>
  )
}

const FriendsButton = () => {
  return (
    <Link to="/friends" className="auto-width" aria-label="朋友" title="朋友">
      <RiUserSmileLine aria-label="Friends Icon" size={24} />
    </Link>
  )
}

const CommentButton = () => {
  return (
    <Link
      to="#comment"
      className="mobile-only auto-width"
      aria-label="评论"
      title="评论"
    >
      <RiChat3Line aria-label="Comment Icon" size={24} />
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
      <RiArrowLeftLine aria-label="Back Icon" size={24} />
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
        <RiFileListLine
          className="action-open"
          aria-label="Box Icon"
          size={24}
        />
      ) : (
        <RiInboxLine className="action-open" aria-label="Box Icon" size={24} />
      )}

      <RiCloseLine className="action-close" aria-label="Close Icon" size={24} />
    </button>
  )
}

const Header = ({ app, back, aside, friends, comment }) => {
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
        {friends && <FriendsButton />}
      </section>

      <section>
        {comment && <CommentButton />}
        {aside && <SidebarButton type={aside.type} />}
      </section>
    </header>
  )
}
export default Header
