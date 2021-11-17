import styled from "@emotion/styled"
import { MDXProvider } from "@mdx-js/react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import {
  Code,
  ExternalLink,
  List,
  ListItem,
  Paragraph,
} from "../components/app/article/provider/Component"
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

  @media (max-width: 36rem) {
    padding: 2rem 0.75rem;
  }
`

const H1 = styled("h1")`
  padding: 0.375rem 0 2.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.75;

  @media (max-width: 36rem) {
    padding: 0.375rem 0 2rem 0;
  }
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
              a: ExternalLink,
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
