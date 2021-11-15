import styled from "@emotion/styled"
import { MDXProvider } from "@mdx-js/react"
import { graphql, Link as GatsbyLink } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout, { Main, Sidebar } from "../components/layout/Layout"

const Container = styled("article")`
  position: relative;
  width: 100%;
  padding: 2.25rem 1rem;
  display: flex;
  flex-direction: column;
  font-family: var(--font-sans);
  font-size: 1rem;
  line-height: 2;

  svg {
    width: 1.125rem;
    height: 1.125rem;
    margin: 0 0.75rem 0 0;
  }

  @media (max-width: 36rem) {
    padding: 2rem 0.75rem;
  }
`

const H1 = styled("h1")`
  padding: 0.5rem 0 2.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.75;

  @media (max-width: 36rem) {
    padding: 0.5rem 0 2rem 0;
  }
`

const Paragraph = styled("p")`
  font-size: 1rem;
  padding: 0.375rem 0;
`

const Link = styled(GatsbyLink)`
  color: var(--font-link);
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    color: var(--font-link-hover);
    text-decoration: underline;
    text-underline-offset: 0.25em;
  }
`

const List = styled("ul")`
  margin: 0.125rem 0;
  padding: 0 0 0 1.125rem;
`

const ListItem = styled("li")`
  margin: 0.375rem 0;
  padding: 0 0 0 0.5rem;
`

const Code = styled("code")`
  font-size: 0.875em;
  padding: 0.2em 0.4em;
  border: var(--border);
  border-radius: var(--border-radius);
  background-color: var(--element-background);
  font-family: var(--font-mono);
  transition: all 0.2s;
  overflow-wrap: break-word;
`

interface NotFoundProps {
  data: NotFoundQuery
}

const NotFoundPage = ({ data }: NotFoundProps) => {
  return (
    <Layout noSidebar title="找不到页面" description="你要找的页面不在这里。">
      <Main>
        <Container>
          <MDXProvider
            components={{
              h1: H1,
              p: Paragraph,
              a: Link,
              ul: List,
              li: ListItem,
              inlineCode: Code,
            }}
          >
            <MDXRenderer>{data.allMdx.edges[0].node.body}</MDXRenderer>
          </MDXProvider>
        </Container>
      </Main>
      <Sidebar />
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(filter: { fileAbsolutePath: { regex: "/404.mdx/" } }) {
      edges {
        node {
          body
        }
      }
    }
  }
`

export default NotFoundPage
