import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import { graphql } from "gatsby"
import React from "react"
import ReactDOMServer from "react-dom/server"
import Global from "../components/global"
import Header from "../components/header"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar"
import Utterances from "../components/utterances"
import "../styles/article.less"
import "../styles/code.less"
import "../styles/override.less"

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
    <>
      <div className="article-info">
        {dayjs().unix() - dayjs(post.frontmatter.date).unix() >
          6 * 30 * 24 * 60 * 60 && (
          <div className="outdated-tips" id="outdated-tips">
            <section>
              <p>
                这篇文章修改于 <strong>{date.from}</strong>
                ，其中有些信息可能已经过时
              </p>
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
            </section>
            <section>
              <p className="title"># Outdated Content</p>
            </section>
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
      <section className="banner" id="article-meta">
        <div>
          <span title={`创建日期：${date.create}`}>{date.create}</span>
          <span> / </span>
          <span title={`修改日期：${date.modify}`}>
            {date.create.slice(0, 4) === date.modify.slice(0, 4)
              ? date.modify.slice(7)
              : date.modify}
          </span>
        </div>
        <div>
          <span title={`共享协议：${post.frontmatter.license}`}>
            © {post.frontmatter.license}
          </span>
        </div>
      </section>
    </>
  )

  return (
    <>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.descriptions.join(" / ")}
      />
      <Global />
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
        </Sidebar>
        <div className="container">
          <article
            id="main-content"
            dangerouslySetInnerHTML={{ __html: html + post.html }}
          ></article>
          <Utterances />
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
