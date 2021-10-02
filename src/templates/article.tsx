import styled from "@emotion/styled"
import { graphql } from "gatsby"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import Article from "../components/article/Article"
import ArticleBar from "../components/article/Bar"
import Comment from "../components/article/Comment"
import Header from "../components/common/layout/Header"
import Position from "../components/common/widget/position/Position"

const hasComment = false

const Container = styled("div")`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 1.25rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`

const Spacer = styled("div")`
  padding: 2rem 0;
`

interface ArticleProps {
  location?: {
    state: {
      [key: string]: boolean
    }
  }
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
    markdownRemark: IMarkdown
  }
}

const ArticlePage = ({ location, data }: ArticleProps) => {
  const post = data.markdownRemark
  const frontmatter = post.frontmatter
  const [fromHome, setFromHome] = useState(false)

  useEffect(() => {
    if (location?.state) {
      setFromHome(location.state.fromHome)
    }
  }, [])

  return (
    <Container>
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
      <Article frontmatter={frontmatter}>{post.html.split("</h1>")[1]}</Article>
      {hasComment ? <Comment /> : <Spacer />}
      <Position />
    </Container>
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
