import { HomeIcon, SmileyIcon } from "@primer/octicons-react"
import { graphql, Link, StaticQuery } from "gatsby"
import React from "react"
import "./widget.less"

const FriendsLink = () => (
  <Link to="/friends" className="widget-link">
    <SmileyIcon aria-label="Smiley Icon" size={16} />
    <span className="title">朋友</span>
    <span className="description">friend</span>
  </Link>
)

const HomeLink = () => (
  <Link to="/" className="widget-link">
    <HomeIcon aria-label="Home Icon" size={16} />
    <span className="title">主页</span>
    <span className="description">home</span>
  </Link>
)

export const Links = { FriendsLink, HomeLink }

export const MarkdownQuery = graphql`
  query {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/markdown/" } }) {
      edges {
        node {
          html
          frontmatter {
            path
          }
        }
      }
    }
  }
`

const BaseNote = ({ path }) => {
  return (
    <StaticQuery
      query={MarkdownQuery}
      render={data => {
        return (
          <div
            className="widget-note"
            dangerouslySetInnerHTML={{
              __html: data.allMarkdownRemark.edges.find(
                edge => edge.node.frontmatter.path === path
              ).node.html,
            }}
          ></div>
        )
      }}
    />
  )
}

const HomeNote = () => <BaseNote path="home" />
const FriendsNote = () => <BaseNote path="friends" />

export const Notes = { HomeNote, FriendsNote }
