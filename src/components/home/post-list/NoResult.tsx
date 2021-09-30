import styled from "@emotion/styled"
import { graphql, useStaticQuery } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import Article from "../../article/Article"

const query = graphql`
  query {
    allMdx(filter: { slug: { eq: "null" } }) {
      edges {
        node {
          body
          slug
        }
      }
    }
  }
`

const NoResult = () => {
  const data = useStaticQuery(query)

  return (
    <Article>
      <MDXRenderer>{data.allMdx.edges[0].node.body}</MDXRenderer>
    </Article>
  )
}

export default NoResult
