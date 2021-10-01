import styled from "@emotion/styled"
import { graphql, useStaticQuery } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import Markdown from "../../common/typography/Markdown"
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
  padding: 1.625rem 1rem 2.5rem 1rem;
  border-bottom: var(--border);
`

const About = () => {
  const data = useStaticQuery(query)

  return (
    <Markdown>
      <Container>
        <Header>你好</Header>
        <MDXRenderer>{data.allMdx.edges[0].node.body}</MDXRenderer>
        <Friends />
        <Footer># BLOG / README.mdx</Footer>
      </Container>
    </Markdown>
  )
}

export default About
