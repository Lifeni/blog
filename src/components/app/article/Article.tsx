import styled from "@emotion/styled"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout, { Main, Sidebar } from "../../layout/Layout"
import Meta from "./Meta"
import Provider from "./provider/Provider"
import Comment from "./widget/Comment"
import Contents from "./widget/Contents"
import Information from "./widget/Information"

const Container = styled("article")`
  position: relative;
  width: 100%;
  padding: 2.25rem 1rem;
  display: flex;
  flex-direction: column;
  font-family: var(--font-sans);
  font-size: 1rem;
  line-height: 2;
  text-align: justify;
  text-justify: auto;
  overflow-wrap: break-word;

  @media (max-width: 36rem) {
    padding: 2rem 0.75rem;
  }
`

interface ArticleProps {
  data: IArticleQuery
}

const Article = ({ data }: ArticleProps) => {
  return (
    <Layout
      title={data.mdx.frontmatter.title}
      description={data.mdx.frontmatter.description}
    >
      <Main>
        <Container>
          <Meta frontmatter={data.mdx.frontmatter} />
          <Provider>
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </Provider>
          <Comment />
        </Container>
      </Main>
      <Sidebar>
        <Information frontmatter={data.mdx.frontmatter} />
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
