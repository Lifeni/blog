import styled from "@emotion/styled"
import { graphql, navigate } from "gatsby"
import React, { ChangeEvent, FormEvent, useState } from "react"
import { Helmet } from "react-helmet"
import Position from "../components/article/widget/Position"
import Footer from "../components/common/Footer"
import Header from "../components/common/Header"
import ArticleCard from "../components/home/Card"
import ArticleList from "../components/home/List"
import SearchBar from "../components/home/Search"
import ArticleSearch from "../utils/article-search"

const Container = styled("div")`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const IndexPage = ({ data }: ArticleListGraphQL) => {
  const documents: ArticleFrontmatterGraphQL[] =
    data.allMarkdownRemark.edges.map(article => ({
      name: article.node.frontmatter.name,
      title: article.node.frontmatter.title,
      description: article.node.frontmatter.description,
      date: article.node.frontmatter.date,
      create_date: article.node.frontmatter.create_date,
    }))
  const [articles, setArticles] = useState(documents)
  const search = new ArticleSearch(documents)

  const handleSearch = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement
    const text = target.value

    if (text) {
      setArticles(search.search(text))
    } else {
      setArticles(documents)
    }
  }

  const handleEnter = (e: FormEvent) => {
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
      </Header>
      <ArticleList>
        {articles.length !== 0 ? (
          articles.map((article, index) => (
            <ArticleCard {...article} key={index} />
          ))
        ) : (
          <section className="null">
            <h2>没有找到相关文章</h2>
            <p>换个关键词试试看吧，比如「标题：记录」。</p>
          </section>
        )}
      </ArticleList>
      <Position />
      <Footer />
    </Container>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/articles/" } }
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
