import styled from "@emotion/styled"
import { graphql } from "gatsby"
import * as React from "react"
import { Helmet } from "react-helmet"
import Article from "../components/Article"

const NotFoundWrapper = styled("div")`
  padding: 4rem 0;
`
const NotFoundPage = ({ data }) => {
  return (
    <NotFoundWrapper>
      <Helmet>
        <title>找不到页面 | 记录干杯</title>
        <meta name="description" content="你要找的页面不在这里。"></meta>
      </Helmet>
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
