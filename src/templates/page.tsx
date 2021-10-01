import styled from "@emotion/styled"
import React from "react"
import { Helmet } from "react-helmet"
import Article from "../components/article/Article"
import ArticleBar from "../components/article/Bar"
import ArticleComment from "../components/article/Comment"
import Header from "../components/common/layout/header/Header"
import Markdown from "../components/common/typography/Markdown"

const Spacer = styled("div")`
  padding: 2rem 0;
`

interface PageProps {
  children: string
  pageContext: {
    frontmatter: {
      title: string
      description: string
      message?: string
      bar?: boolean
      comment?: boolean
    }
  }
}

const Page = ({ children, pageContext }: PageProps) => {
  const { title, description, message, bar, comment } = pageContext.frontmatter

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: "zh-hans",
        }}
      >
        <title>{title} | 记录干杯</title>
        <meta name="description" content={description}></meta>
      </Helmet>
      <Header>{bar && <ArticleBar message={message} back />}</Header>
      <Markdown>{children}</Markdown>
      {comment ? <ArticleComment /> : <Spacer />}
    </>
  )
}

export default Page
