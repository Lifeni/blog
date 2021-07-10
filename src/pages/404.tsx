import styled from "@emotion/styled"
import { graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import Article from "../components/article/Article"

const NotFoundWrapper = styled("div")`
  min-height: 100vh;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  article {
    h2 {
      margin: 0;
      font-size: 1.125rem;
    }
  }
`
const NotFoundPage = ({ data }: MessageListGraphQL) => {
  return (
    <NotFoundWrapper>
      <Helmet
        htmlAttributes={{
          lang: "zh-hans",
        }}
      >
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
          tableOfContents(absolute: false, maxDepth: 3)
        }
      }
    }
  }
`
