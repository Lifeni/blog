import { graphql } from "gatsby"
import React from "react"
import Comment from "../components/comment"
import Footer from "../components/footer"
import Header from "../components/header"
import Seo from "../components/seo"
import "./article.less"

const ArticlePage = ({ data }) => {
  const post = data.markdownRemark

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
          />
          <Footer />
        </aside>
        <main>
          <section className="meta">
            <span
              title={`创建日期：${post.frontmatter.create_date}`}
              className="create-date"
            >
              {post.frontmatter.create_date}
            </span>
            <span className="divider">{" -> "}</span>
            <span
              title={`修改日期：${post.frontmatter.date}`}
              className="modify-date"
            >
              {post.frontmatter.date}
            </span>
          </section>
          <article
            id="main-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <Comment />
        </main>
      </div>
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
      }
      tableOfContents(absolute: false, maxDepth: 3)
    }
  }
`
