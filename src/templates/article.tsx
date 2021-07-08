import styled from "@emotion/styled"
import { graphql } from "gatsby"
import * as React from "react"
import ReactDOMServer from "react-dom/server"
import { Helmet } from "react-helmet"
import { RiCalendarLine, RiCopyrightLine } from "react-icons/ri"
import Article from "../components/Article"
import ArticleBar from "../components/ArticleBar"
import ArticleComment from "../components/ArticleComment"
import Header from "../components/Header"

const Meta = styled("div")`
  margin: 0 0 1.5rem 0;
  padding: 0 0 2.5rem 0;
  border-bottom: var(--border);

  time,
  span {
    margin: 0 1rem 0 0;
    font-size: 1rem;
    line-height: 2;
    color: var(--font-secondary);
    display: flex;
    align-items: center;

    svg {
      margin: 0 0.5rem 0 0;
    }
  }

  section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    white-space: nowrap;

    svg {
      min-width: 1.125rem;
    }
  }
`

const meta = ({ title, description, create_date, date, license }) =>
  ReactDOMServer.renderToString(
    <Meta>
      <h1>{title}</h1>
      <p>{description}</p>
      <section>
        <time>
          <RiCalendarLine aria-label="日期图标" size="1.125rem" />
          {(create_date === date ? "创建于 " : "编辑于 ") + date}
        </time>
        <span>
          <RiCopyrightLine aria-label="版权图标" size="1.125em" />
          {license}
        </span>
      </section>
    </Meta>
  )

const ArticlePage = ({ data }) => {
  const post = data.markdownRemark
  const frontmatter = post.frontmatter
  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: "zh-hans",
        }}
      >
        <title>{frontmatter.title} | 记录干杯</title>
        <meta name="description" content={frontmatter.description}></meta>
      </Helmet>
      <Header>
        <ArticleBar toc={post.tableOfContents} />
      </Header>
      <Article {...frontmatter}>
        {meta(frontmatter) + post.html.split("</h1>")[1]}
      </Article>
      <ArticleComment />
    </>
  )
}

export default ArticlePage

export const PostQuery = graphql`
  query BlogArticleQuery($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        name
        description
        date(formatString: "YYYY 年 M 月 D 日")
        create_date(formatString: "YYYY 年 M 月 D 日")
        license
      }
      tableOfContents(absolute: false, maxDepth: 3)
    }
  }
`
