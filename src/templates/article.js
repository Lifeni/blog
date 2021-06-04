import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import { graphql } from "gatsby"
import React from "react"
import ReactDOMServer from "react-dom/server"
import Comment from "../components/comment"
import Footer from "../components/footer"
import Header from "../components/header"
import Seo from "../components/seo"
import "./article.less"

const relativeTime = require("dayjs/plugin/relativeTime")
dayjs.extend(relativeTime)
dayjs.locale("zh-cn")

const Article = ({ data }) => {
  const post = data.markdownRemark
  const date = {
    create: dayjs(post.frontmatter.create_date).format("YYYY 年 M 月 D 日"),
    modify: dayjs(post.frontmatter.date).format("YYYY 年 M 月 D 日"),
    from: dayjs(post.frontmatter.date).fromNow(),
  }

  const html = ReactDOMServer.renderToStaticMarkup(
    <>
      <section className="article-meta" id="article-meta">
        <span title={`创建日期：${date.create}`} className="create-date">
          {date.create}
        </span>
        <span className="divider">{" -> "}</span>
        <span title={`修改日期：${date.modify}`} className="modify-date">
          {date.modify}
        </span>
      </section>
    </>
  )

  return (
    <>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description}
      />
      <div className="container">
        <Header back />
        <aside>
          <nav
            className="toc"
            dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
          ></nav>
          <Footer />
        </aside>
        <main>
          <article
            id="main-content"
            dangerouslySetInnerHTML={{ __html: html + post.html }}
          />
          <Comment />
        </main>
      </div>
    </>
  )
}

export default Article

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
        date
        create_date
        license
      }
      tableOfContents(absolute: false, maxDepth: 3)
    }
  }
`
