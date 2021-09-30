import styled from "@emotion/styled"
import { graphql, useStaticQuery } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import Article from "../../article/Article"
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

const Container = styled("div")``

const About = () => {
  const data = useStaticQuery(query)

  return (
    <Container>
      <Article>
        <Header>你好</Header>
        <MDXRenderer>{data.allMdx.edges[0].node.body}</MDXRenderer>
        <Friends />
        <Footer># BLOG / README.mdx</Footer>
      </Article>
    </Container>
  )
}

export default About
