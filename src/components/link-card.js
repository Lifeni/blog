import { ArchiveIcon, HomeIcon, SmileyIcon } from "@primer/octicons-react"
import { Link } from "gatsby"
import React from "react"

const LinkCard = ({ page }) =>
  page === "open-source" ? (
    <Link to="/open-source" className="link-card">
      <span className="title">
        <ArchiveIcon aria-label="Project Icon" size={16} />
        开源项目
      </span>
      <span className="description" title="一些做过的开源项目">
        一些做过的开源项目
      </span>
    </Link>
  ) : page === "hello-friend" ? (
    <Link to="/hello-friend" className="link-card">
      <span className="title">
        <SmileyIcon aria-label="Smiley Icon" size={16} />
        朋友
      </span>
      <span className="description" title="朋友的网站，欢迎来看看">
        朋友的网站，欢迎来看看
      </span>
    </Link>
  ) : page === "home" ? (
    <Link to="/" className="link-card">
      <span className="title">
        <HomeIcon aria-label="Home Icon" size={16} />
        主页
      </span>
      <span className="description" title="点这里可以回到主页">
        点这里可以回到主页
      </span>
    </Link>
  ) : null

export default LinkCard
