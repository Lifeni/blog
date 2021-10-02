import styled from "@emotion/styled"
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

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  padding: 1.625rem 1rem 2.5rem 1rem;

  @media (max-width: 800px) {
    padding: 1.125rem 1rem 1.75rem 1rem;
  }

  @media (max-width: 720px) {
    padding: 0.625rem 1rem 1.25rem 1rem;
  }
`

const NoResult = () => {
  const data = useStaticQuery(query)

  return (
    <Markdown>
      <Container>
        <MDXRenderer>{data.allMdx.edges[0].node.body}</MDXRenderer>
      </Container>
    </Markdown>
  )
}

export default NoResult
