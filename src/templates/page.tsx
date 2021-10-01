import styled from "@emotion/styled"
import React from "react"
import { Helmet } from "react-helmet"
import ArticleBar from "../components/article/Bar"
import ArticleComment from "../components/article/Comment"
import Header from "../components/common/layout/header/Header"
import Markdown from "../components/common/typography/Markdown"

const Container = styled("div")`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 1.25rem;
  display: flex;
  flex-direction: column;
`

const Content = styled("div")`
  padding: 1.625rem 1rem 2.5rem 1rem;
`

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
    <Container>
      <Helmet
        htmlAttributes={{
          lang: "zh-hans",
        }}
      >
        <title>{title} | 记录干杯</title>
        <meta name="description" content={description}></meta>
      </Helmet>
      <Header>{bar && <ArticleBar message={message} back />}</Header>
      <Markdown>
        <Content>{children}</Content>
      </Markdown>
      {comment ? <ArticleComment /> : <Spacer />}
    </Container>
  )
}

export default Page
