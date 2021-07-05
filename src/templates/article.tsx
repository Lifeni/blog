import styled from "@emotion/styled"
import { graphql } from "gatsby"
import * as React from "react"
import ReactDOMServer from "react-dom/server"
import { Helmet } from "react-helmet"
import { RiCopyrightLine, RiTimeLine } from "react-icons/ri"
import ActionBar from "../components/ActionBar"
import Article from "../components/Article"
import Comment from "../components/Comment"
import Header from "../components/Header"

const Meta = styled("section")`
  margin: 0 0 0.5rem 0;

  time {
    display: flex;
    align-items: center;
    font-size: 1rem;
    line-height: 2;
    color: var(--font-secondary);
    gap: 0.5rem;
  }
`

const meta = ({ title, description, create_date, date }) =>
  ReactDOMServer.renderToString(
    <Meta>
      <h1>{title}</h1>
      <p>{description}</p>
      <time>
        <RiTimeLine aria-label="时间图标" size="1.125rem" />
        {(create_date === date ? "创建于 " : "编辑于 ") + date}
      </time>
    </Meta>
  )

const Copyright = styled("span")`
  margin: 1.75rem 0 0 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--font-secondary);
`

const copyright = ({ license }) =>
  ReactDOMServer.renderToString(
    <Copyright>
      <RiCopyrightLine aria-label="版权图标" size="1.125em" />
      {license}
    </Copyright>
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
        <ActionBar />
      </Header>
      <Article {...frontmatter}>
        {meta(frontmatter) +
          post.html.split("</h1>")[1] +
          copyright(frontmatter)}
      </Article>
      <Comment />
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
