import styled from "@emotion/styled"
import React from "react"
import { Helmet } from "react-helmet"
import ArticleBar from "../components/article/Bar"
import Comment from "../components/article/Comment"
import Header from "../components/common/layout/Header"
import Markdown from "../components/common/typography/Markdown"

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

const Content = styled("div")`
  display: flex;
  flex-direction: column;
  padding: 1.625rem 1rem 2.25rem 1rem;
  transition: all 0.2s;

  @media (max-width: 800px) {
    padding: 1.125rem 1rem 1.75rem 1rem;
  }

  @media (max-width: 720px) {
    padding: 0.625rem 1rem 1.25rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.625rem 0.75rem 1.25rem 0.75rem;
  }
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
        <meta name="description" content={description} />
      </Helmet>
      <Header>{bar && <ArticleBar message={message} back />}</Header>
      <Markdown>
        <Content>{children}</Content>
      </Markdown>
      {comment ? <Comment /> : <Spacer />}
    </Container>
  )
}

export default Page
