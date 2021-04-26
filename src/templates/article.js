import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import { graphql, Link } from "gatsby"
import React from "react"
import ReactDOMServer from "react-dom/server"
import Utterances from "../components/comment"
import Header from "../components/header"
import Main from "../components/main"
import { OutdatedContent } from "../components/notification"
import Seo from "../components/seo"
import "./article.less"

const relativeTime = require("dayjs/plugin/relativeTime")
dayjs.extend(relativeTime)
dayjs.locale("zh-cn")

const BlogArticle = ({ data }) => {
  const post = data.markdownRemark
  const date = {
    create: dayjs(post.frontmatter.create_date).format("YYYY 年 M 月 D 日"),
    modify: dayjs(post.frontmatter.date).format("YYYY 年 M 月 D 日"),
    from: dayjs(post.frontmatter.date).fromNow(),
  }

  const html = ReactDOMServer.renderToStaticMarkup(
    <>
      <p className="article-subtitle">
        {post.frontmatter.name.replaceAll("-", " ")}
      </p>
      <h1>{post.frontmatter.title}</h1>

      <section className="article-meta" id="article-meta">
        <span title={`创建日期：${date.create}`}>{date.create}</span>
        <span> / </span>
        <span title={`修改日期：${date.modify}`}>
          {date.create.slice(0, 4) === date.modify.slice(0, 4)
            ? date.modify.slice(7)
            : date.modify}
        </span>
      </section>
    </>
  )

  const Footer = () => (
    <section className="article-info">
      {post.frontmatter.license === "CC-BY-SA-4.0" ? (
        <a
          href="https://creativecommons.org/licenses/by-sa/4.0/deed.zh"
          target="_blank"
          rel="noopener noreferrer"
          title={`署名-相同方式共享 4.0 国际`}
          className="article-license"
        >
          {post.frontmatter.license}
        </a>
      ) : (
        <span
          className="article-license"
          title={`共享协议：${post.frontmatter.license}`}
        >
          {post.frontmatter.license}
        </span>
      )}
      <p className="tags">
        {post.frontmatter.tags.map(tag => (
          <Link
            key={tag}
            className="tag"
            to={`/tag/${tag.toLowerCase().replace(" ", "-")}`}
          >
            {tag}
          </Link>
        ))}
      </p>
    </section>
  )

  return (
    <>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.descriptions.join(" / ")}
      />
      <Header back aside={{ type: "toc" }} comment />
      <Main
        aside={
          <nav
            className="toc"
            dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
          ></nav>
        }
        main={
          <>
            {dayjs().unix() - dayjs(post.frontmatter.date).unix() >
              6 * 30 * 24 * 60 * 60 && <OutdatedContent date={date.from} />}
            <article
              id="main-content"
              dangerouslySetInnerHTML={{
                __html: html + post.html.split("</h1>")[1],
              }}
            ></article>
            <Utterances />
            <Footer />
          </>
        }
      />
    </>
  )
}

export default BlogArticle

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
