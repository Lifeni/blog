import { graphql, StaticQuery } from "gatsby"
import React from "react"
import FriendList from "./friends"
import "./notes.less"

const BaseNote = ({ path }) => {
  return (
    <StaticQuery
      query={MarkdownQuery}
      render={data => {
        return (
          <div
            className="note"
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

const EmptyNote = ({ children }) => (
  <div className="note append">{children}</div>
)

const HomeNote = () => <BaseNote path="home" />
const FriendsNote = () => (
  <EmptyNote>
    <h3>朋友</h3>
    <FriendList />
  </EmptyNote>
)

export { HomeNote, FriendsNote }

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
