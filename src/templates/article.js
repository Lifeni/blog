import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import { graphql } from "gatsby"
import React from "react"
import ReactDOMServer from "react-dom/server"
import Header from "../components/header"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar"
import "../styles/article.less"

const relativeTime = require("dayjs/plugin/relativeTime")
dayjs.extend(relativeTime)
dayjs.locale("zh-cn")

const BlogPost = ({ data }) => {
  const post = data.markdownRemark

  const date = {
    create: dayjs(post.frontmatter.create_date).format("YYYY 年 M 月 D 日"),
    modify: dayjs(post.frontmatter.date).format("YYYY 年 M 月 D 日"),
    from: dayjs(post.frontmatter.date).fromNow(),
  }

  const html = ReactDOMServer.renderToStaticMarkup(
    <div className="article-info">
      {dayjs().unix() - dayjs(post.frontmatter.date).unix() >
        6 * 30 * 24 * 60 * 60 && (
        <div className="outdated-tips" id="outdated-tips">
          <span>
            这篇文章修改于 <strong> {date.from} </strong>
            ，其中有些信息可能已经过时
          </span>
          <button className="close-tips" id="close-tips">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fillRule="evenodd"
                d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"
              ></path>
            </svg>
          </button>
        </div>
      )}
      <p className="subtitle">
        {post.frontmatter.tags.map(tag => (
          <span key={tag} className="tag">
            # {tag}
          </span>
        ))}
      </p>
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
        back
        aside
        title={post.frontmatter.title}
        data={post.frontmatter}
      />
      <main>
        <Sidebar>
          <nav
            className="toc"
            dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
          ></nav>
          <section className="banner off-margin">
            <p title={`创建日期：${date.create}`}>创建日期： {date.create}</p>
            <p title={`修改日期：${date.modify}`}>修改日期： {date.modify}</p>
            <p title={`共享协议：${post.frontmatter.license}`}>
              共享协议： {post.frontmatter.license}
            </p>
          </section>
        </Sidebar>
        <div className="container">
          <article
            id="content"
            dangerouslySetInnerHTML={{ __html: html + post.html }}
          ></article>
        </div>
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
        date
        create_date
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
