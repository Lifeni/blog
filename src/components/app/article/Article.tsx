import styled from "@emotion/styled"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout, { Main, Sidebar } from "../../layout/Layout"
import Contents from "./Contents"
import Meta from "./Meta"
import Provider from "./Provider"

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

const Description = styled("p")`
  font-size: 1rem;
  padding: 0 0 0.375rem 0;
`

interface ArticleProps {
  data: ArticleQuery
}

const Article = ({ data }: ArticleProps) => {
  return (
    <Layout
      title={data.mdx.frontmatter.title}
      description={data.mdx.frontmatter.description}
    >
      <Main>
        <Container>
          <H1>{data.mdx.frontmatter.title}</H1>
          <Description>{data.mdx.frontmatter.description}</Description>
          <Provider>
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </Provider>
        </Container>
      </Main>
      <Sidebar>
        <Meta frontmatter={data.mdx.frontmatter} />
        <Contents items={data.mdx.tableOfContents.items[0]} />
      </Sidebar>
    </Layout>
  )
}

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        date(formatString: "YYYY 年 M 月 D 日")
        create_date(formatString: "YYYY 年 M 月 D 日")
        description
        name
        title
        license
      }
      body
      tableOfContents(maxDepth: 3)
    }
  }
`

export default Article