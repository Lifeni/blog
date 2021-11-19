import styled from "@emotion/styled"
import { MDXProvider } from "@mdx-js/react"
import { graphql, useStaticQuery } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { ExternalLink, Paragraph } from "../../article/provider/Component"

const Container = styled("article")`
  position: relative;
  width: 100%;
  padding: 2.25rem 1rem;
  display: flex;
  flex-direction: column;
  transition: all 0.2s;

  @media (max-width: 36rem) {
    padding: 2rem 1rem 1.75rem 1rem;
  }
`

const H3 = styled("h3")`
  width: fit-content;
  padding: 0.5rem 0 0.75rem 0;
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  line-height: 2;
  font-weight: 700;

  @media (max-width: 36rem) {
    padding: 0 0 0.75rem 0;
  }
`

const Strong = styled("strong")`
  font-size: 1rem;
  font-weight: 700;
`

const Hr = styled("hr")`
  width: calc(100% + 2rem);
  height: 0;
  margin: 1.875rem -1rem 1.5rem -1rem;
  border: none;
  border-top: var(--border);
  transition: all 0.2s;

  @media (max-width: 36rem) {
    margin: 1.625rem -1rem 2rem -1rem;
  }
`

const About = () => {
  const about = useStaticQuery<IAboutQuery>(graphql`
    query {
      allMdx(filter: { fileAbsolutePath: { regex: "/about.mdx/" } }) {
        edges {
          node {
            body
          }
        }
      }
    }
  `)

  return (
    <Container>
      <MDXProvider
        components={{
          h3: H3,
          strong: Strong,
          p: Paragraph,
          a: ExternalLink,
          hr: Hr,
        }}
      >
        <MDXRenderer>{about.allMdx.edges[0].node.body}</MDXRenderer>
      </MDXProvider>
    </Container>
  )
}

export default About
