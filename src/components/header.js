import { Link } from "gatsby"
import React from "react"
import {
  RiArrowUpLine,
  RiAtLine,
  RiDiscussLine,
  RiFileList2Line,
  RiHome2Line,
  RiMenuLine,
  RiSearchLine,
} from "react-icons/ri"
import "./header.less"

const BackButton = () => (
  <Link to="/" aria-label="返回主页" title="返回主页" tabIndex="1">
    <RiHome2Line aria-label="Back Icon" />
  </Link>
)

const SearchButton = () => (
  <button onClick={() => {}} aria-label="搜索" title="搜索" tabIndex="1">
    <RiSearchLine aria-label="Search Icon" />
  </button>
)

const MenuButton = () => {
  const links = [
    { name: "博客园", url: "https://www.cnblogs.com/liangfengning" },
    { name: "Seafile", url: "https://cloud.lifeni.life" },
    { name: "Gitea", url: "https://git.lifeni.life/liangfengning" },
  ]

  return (
    <>
      <input id="menu-checkbox" type="checkbox" />
      <label
        aria-label="菜单"
        title="菜单"
        tabIndex="1"
        className="menu-button"
        for="menu-checkbox"
      >
        <RiMenuLine aria-label="Menu Icon" />
      </label>
      <label
        className="menu-wrapper"
        for="menu-checkbox"
        title="点击任意处关闭菜单"
      ></label>
      <menu className="menu">
        {links.map((link, index) => (
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
          >
            {link.name}
          </a>
        ))}
      </menu>
    </>
  )
}

const GoTopButton = () => (
  <button
    onClick={() => window.scrollTo(0, 0)}
    aria-label="返回文章顶部"
    title="返回文章顶部"
    tabIndex="1"
  >
    <RiArrowUpLine aria-label="Go Top Icon" />
  </button>
)

const AboutButton = () => (
  <Link to="/about" aria-label="关于" title="关于" tabIndex="1">
    <RiAtLine aria-label="About Icon" />
  </Link>
)

const TOCButton = () => (
  <Link
    to="#table-of-contents"
    aria-label="文章目录"
    title="文章目录"
    tabIndex="1"
  >
    <RiFileList2Line aria-label="Table of Contents Icon" />
  </Link>
)

const CommentButton = () => (
  <Link
    to="#article-comment"
    aria-label="文章评论"
    title="文章评论"
    tabIndex="1"
  >
    <RiDiscussLine aria-label="Comment Icon" />
  </Link>
)

const Header = ({ about, menu, search, back, toc, top, comment }) => (
  <header>
    <section>
      {back && <BackButton />}
      {search && <SearchButton />}
    </section>
    <section>
      {top && <GoTopButton />}
      {about && <AboutButton />}
      {toc && <TOCButton />}
      {comment && <CommentButton />}
      {menu && <MenuButton />}
    </section>
  </header>
)

export default Header
