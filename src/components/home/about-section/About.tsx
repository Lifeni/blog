import styled from "@emotion/styled"
import { graphql, useStaticQuery } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import Markdown from "../../common/typography/Markdown"
import Like from "./action/Like"
import Share from "./action/Share"
import Friends from "./friend-list/List"
import Footer from "./layout/Footer"
import Header from "./layout/Header"

const query = graphql`
  query {
    allMdx(filter: { slug: { eq: "about" } }) {
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
  padding: 1.625rem 1rem 2.25rem 1rem;
  border-bottom: var(--border);
  transition: all 0.2s;

  @media (max-width: 800px) {
    padding: 1.125rem 1rem 1.75rem 1rem;
  }

  @media (max-width: 720px) {
    padding: 0.625rem 1rem 1.25rem 1rem;
  }

  h2 {
    font-family: var(--font-mono);
  }
`

const Action = styled("div")`
  margin: 0 0 0 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
`

const About = () => {
  const data = useStaticQuery(query)

  return (
    <Markdown>
      <Container>
        <MDXRenderer>{data.allMdx.edges[0].node.body}</MDXRenderer>
        <Footer># BLOG / ABOUT.mdx</Footer>
      </Container>
    </Markdown>
  )
}

export default About
