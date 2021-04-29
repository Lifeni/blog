import { graphql, StaticQuery } from "gatsby"
import React from "react"
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

const HomeNote = () => <BaseNote path="home" />

export { HomeNote }

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
