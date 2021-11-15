import styled from "@emotion/styled"
import { MDXProvider } from "@mdx-js/react"
import { graphql, useStaticQuery } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { AnchorHTMLAttributes, DetailedHTMLProps } from "react"

const Container = styled("article")`
  position: relative;
  width: 100%;
  padding: 2.25rem 1rem;

  @media (max-width: 36rem) {
    padding: 1.5rem 1rem;
  }
`

const H3 = styled("h3")`
  width: fit-content;
  padding: 0.5rem 0 0.75rem 0;
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  line-height: 2;
  font-family: var(--font-mono);
  font-weight: 700;

  @media (max-width: 36rem) {
    padding: 0.5rem 0;
  }
`

const Strong = styled("strong")`
  font-size: 1rem;
  font-weight: 700;
`

const Paragraph = styled("p")`
  font-size: 1rem;
  padding: 0.375rem 0;
`

const Link = styled("a")`
  color: var(--font-link);
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    color: var(--font-link-hover);
    text-decoration: underline;
    text-underline-offset: 0.25em;
  }
`

const ExternalLink = (
  props: DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
) =>
  props.href?.startsWith("#") ? (
    <Link {...props} />
  ) : (
    <Link {...props} target="_blank" rel="noopener noreferrer" />
  )

const Hr = styled("hr")`
  width: calc(100% + 2rem);
  height: 0;
  margin: 1.875rem -1rem 1.5rem -1rem;
  border: none;
  border-top: var(--border);

  @media (max-width: 36rem) {
    margin: 1.375rem -1rem 1rem -1rem;
  }
`

const About = () => {
  const about = useStaticQuery<AboutQuery>(graphql`
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
        <a />
      </MDXProvider>
    </Container>
  )
}

export default About
