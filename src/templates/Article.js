import { graphql } from "gatsby"
import React from "react"
import ReactDOMServer from "react-dom/server"
import Aside from "../components/Aside"
import Header from "../components/Header"
import SEO from "../components/SEO"
import "../styles/Article.less"

const BlogPost = ({ data }) => {
  const post = data.markdownRemark
  console.log(post.frontmatter)

  const html = ReactDOMServer.renderToStaticMarkup(
    <div className="article-info">
      <p className="subtitle">{post.frontmatter.date}</p>
    </div>
  )

  return (
    <>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.descriptions.join(" | ")}
      />
      <a href="#content" className="skip-link">
        Skip to main content | 跳转到主要内容
      </a>
      <Header
        top
        info
        aside
        title={post.frontmatter.title}
        data={post.frontmatter}
      />
      <main>
        <Aside>
          <nav
            className="toc"
            dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
          ></nav>
        </Aside>
        <article
          id="content"
          dangerouslySetInnerHTML={{ __html: html + post.html }}
        ></article>
      </main>
    </>
  )
}

export default BlogPost

export const PostQuery = graphql`
  query BlogPostQuery($slug: String!) {
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
        descriptions
        tags
        date(fromNow: true, locale: "zh-cn", formatString: "YYYY 年 M 月 D 日")
        create_date(
          fromNow: true
          locale: "zh-cn"
          formatString: "YYYY 年 M 月 D 日"
        )
        license
      }
      wordCount {
        paragraphs
        words
        sentences
      }
      tableOfContents(absolute: false, maxDepth: 3)
    }
  }
`
