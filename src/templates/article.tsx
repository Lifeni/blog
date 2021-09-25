import { graphql } from "gatsby"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import Article from "../components/article/Article"
import ArticleBar from "../components/article/Bar"
import ArticleComment from "../components/article/Comment"
import ArticleMeta from "../components/article/Meta"
import Header from "../components/common/Header"
import Position from "../components/common/Position"

const ArticlePage = ({ location, data }: ArticlePageGraphQL) => {
  const post = data.markdownRemark
  const frontmatter = post.frontmatter
  const [fromHome, setFromHome] = useState(false)

  useEffect(() => {
    if (location?.state) {
      setFromHome(location.state.fromHome)
    }
  }, [])

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
        <ArticleBar back={fromHome} toc={post.tableOfContents} />
      </Header>
      <Article {...frontmatter}>
        <ArticleMeta {...frontmatter} />
        <div
          dangerouslySetInnerHTML={{ __html: post.html.split("</h1>")[1] }}
        />
      </Article>
      <ArticleComment />
      <Position />
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
        serif
      }
      tableOfContents(absolute: false, maxDepth: 3)
    }
  }
`
