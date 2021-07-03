import styled from "@emotion/styled"
import { graphql } from "gatsby"
import * as React from "react"
import Article from "../components/Article"

const NotFoundWrapper = styled("div")`
  padding: 4rem 0;
`
const NotFoundPage = ({ data }) => {
  return (
    <NotFoundWrapper>
      <Article>{data.allMarkdownRemark.edges[0].node.html}</Article>
    </NotFoundWrapper>
  )
}

export default NotFoundPage

export const query = graphql`
  {
    allMarkdownRemark(filter: { frontmatter: { path: { eq: "404" } } }) {
      edges {
        node {
          frontmatter {
            path
          }
          html
        }
      }
    }
  }
`
