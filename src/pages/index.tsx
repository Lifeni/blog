import styled from "@emotion/styled"
import { graphql, Link, navigate } from "gatsby"
import * as React from "react"
import { useState } from "react"
import { Helmet } from "react-helmet"
import { RiAtLine } from "react-icons/ri"
import Footer from "../components/Footer"
import Header from "../components/Header"
import PostCard from "../components/PostCard"
import ScrollBar from "../components/ScrollBar"
import SearchBar from "../components/SearchBar"
import ArticleSearch from "../utils/article-search"

const Container = styled("div")`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media (max-width: 800px) {
    margin: -1.25rem 0 0 0;
    padding: 0 0 2rem 0;
  }
`

const ArticleList = styled("main")`
  position: relative;
  width: 100%;
  padding: 0 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .null {
    width: 100%;
    max-width: var(--main-width);
    padding: 2rem 1rem;

    @media (max-width: 800px) {
      padding: 1.5rem 1rem;
    }

    h2 {
      font-size: 1.375rem;
      padding: 0.5rem 0;
      line-height: 1.875;
      font-weight: 600;
    }

    p {
      font-size: 1rem;
      line-height: 2;
    }
  }
`

const IndexPage = ({ data }) => {
  const documents = data.allMarkdownRemark.edges.map(article => ({
    name: article.node.frontmatter.name,
    title: article.node.frontmatter.title,
    description: article.node.frontmatter.description,
    date: article.node.frontmatter.date,
    create_date: article.node.frontmatter.create_date,
  }))
  const [articles, setArticles] = useState(documents)
  const search = new ArticleSearch(documents)

  const handleSearch = (e: Event) => {
    const target = e.target as HTMLInputElement
    const text = target.value

    if (text) {
      setArticles(search.search(text))
    } else {
      setArticles(documents)
    }
  }

  const handleEnter = (e: Event) => {
    e.preventDefault()
    if (articles.length !== 0) {
      navigate(`/article/${articles[0].name}`)
    }
  }

  return (
    <Container>
      <Helmet
        htmlAttributes={{
          lang: "zh-hans",
        }}
      >
        <title>记录干杯</title>
        <meta
          name="description"
          content="个人网站「记录干杯」，在这里记录一些技术相关的文章、尝试一些新的技术。"
        ></meta>
      </Helmet>
      <Header>
        <SearchBar search={handleSearch} enter={handleEnter} />
        <Link
          title="关于我和这个网站"
          aria-label="关于我和这个网站"
          to="/about"
        >
          <RiAtLine aria-label="关于图标" size="1.125rem" />
        </Link>
      </Header>
      <ScrollBar />
      <ArticleList>
        {articles.length !== 0 ? (
          articles.map((article, index) => (
            <PostCard {...article} key={index} />
          ))
        ) : (
          <section className="null">
            <h2>没有找到相关文章</h2>
            <p>换个关键词试试看吧，比如「标题：记录」。</p>
          </section>
        )}
      </ArticleList>
      <Footer />
    </Container>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/notebook/" } }
      sort: {
        fields: [frontmatter___date, frontmatter___create_date]
        order: [DESC, DESC]
      }
    ) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "YYYY 年 M 月 D 日")
            create_date(formatString: "YYYY 年 M 月 D 日")
            title
            name
            description
            license
          }
        }
      }
    }
  }
`
