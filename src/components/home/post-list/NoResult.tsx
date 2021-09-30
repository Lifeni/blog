import { graphql, useStaticQuery } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import Markdown from "../../common/typography/Markdown"

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
    <Markdown>
      <MDXRenderer>{data.allMdx.edges[0].node.body}</MDXRenderer>
    </Markdown>
  )
}

export default NoResult
