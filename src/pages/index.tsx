import styled from "@emotion/styled"
import { graphql, navigate } from "gatsby"
import React, { ChangeEvent, FormEvent, useState } from "react"
import { Helmet } from "react-helmet"
import Footer from "../components/common/layout/footer/Footer"
import Header from "../components/common/layout/Header"
import Nav from "../components/common/layout/Nav"
import ArticleCard from "../components/common/widget/article-card/Card"
import Position from "../components/common/widget/position/Position"
import About from "../components/home/about-section/About"
import ArticleList from "../components/home/article-list/List"
import NoResult from "../components/home/article-list/NoResult"
import SearchBar from "../components/home/article-search/Search"
import ArticleSearch from "../utils/article-search"

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

interface IndexProps {
  data: {
    allMarkdownRemark: {
      edges: { node: IMarkdown }[]
    }
  }
}

const IndexPage = ({ data }: IndexProps) => {
  const documents: IFrontMatter[] = data.allMarkdownRemark.edges.map(
    article => article.node.frontmatter
  )
  const [articles, setArticles] = useState(documents)
  const [searchText, setSearchText] = useState("")
  const search = new ArticleSearch(documents)

  const handleSearch = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement
    const text = target.value

    if (text) {
      setArticles(search.search(text))
      setSearchText(text)
    } else {
      setArticles(documents)
      setSearchText("")
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
        />
        <link href="https://file.lifeni.life" rel="preconnect" />
      </Helmet>
      <Header>
        <SearchBar search={handleSearch} enter={handleEnter} />
      </Header>
      {!searchText && <About />}
      <ArticleList>
        {articles.length !== 0 ? (
          articles.map(article => (
            <ArticleCard from="home" frontmatter={article} key={article.name} />
          ))
        ) : (
          <NoResult />
        )}
      </ArticleList>
      {!searchText && <Nav />}
      <Footer />
      <Position deps={searchText} />
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
