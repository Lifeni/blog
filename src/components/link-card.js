import { ArchiveIcon, HomeIcon, SmileyIcon } from "@primer/octicons-react"
import { Link } from "gatsby"
import React from "react"

const LinkCard = ({ page }) =>
  page === "open-source" ? (
    <Link to="/open-source" className="link-card">
      <ArchiveIcon aria-label="Project Icon" size={16} />

      <span className="title">开源项目</span>
      <span className="description">open-source</span>
    </Link>
  ) : page === "hello-friend" ? (
    <Link to="/hello-friend" className="link-card">
      <SmileyIcon aria-label="Smiley Icon" size={16} />

      <span className="title">朋友</span>
      <span className="description">hello-friend</span>
    </Link>
  ) : page === "home" ? (
    <Link to="/" className="link-card">
      <HomeIcon aria-label="Home Icon" size={16} />

      <span className="title">主页</span>
      <span className="description">home</span>
    </Link>
  ) : null

export default LinkCard
