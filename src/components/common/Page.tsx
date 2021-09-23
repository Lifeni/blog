import styled from "@emotion/styled"
import React from "react"
import { Helmet } from "react-helmet"
import Article from "../article/Article"
import ArticleBar from "../article/Bar"
import ArticleComment from "../article/Comment"
import Header from "./Header"

const Spacer = styled("div")`
  padding: 2rem 0;
`

interface LayoutProps {
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

const Page = ({ children, pageContext }: LayoutProps) => {
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
      <Header>{bar && <ArticleBar message={message} />}</Header>
      <Article>
        <div>{children}</div>
      </Article>
      {comment ? <ArticleComment /> : <Spacer />}
    </>
  )
}

export default Page
