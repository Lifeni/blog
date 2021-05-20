import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import { graphql, Link } from "gatsby"
import React, { useEffect } from "react"
import ReactDOMServer from "react-dom/server"
import { FiBookmark, FiInfo } from "react-icons/fi"
import Utterances from "../components/comment"
import Header from "../components/header"
import Main from "../components/main"
import { OutdatedContent } from "../components/notification"
import Seo from "../components/seo"
import "./article.less"

const relativeTime = require("dayjs/plugin/relativeTime")
dayjs.extend(relativeTime)
dayjs.locale("zh-cn")

const ArticleFooter = ({ post }) => (
  <section className="article-info">
    {post.frontmatter.license === "CC-BY-SA-4.0" ? (
      <a
        href="https://creativecommons.org/licenses/by-sa/4.0/deed.zh"
        target="_blank"
        rel="noopener noreferrer"
        title={`CC-BY-SA-4.0 署名-相同方式共享 4.0 国际`}
        className="article-license pill"
      >
        <FiInfo aria-label="Copyright Icon" size={17} />
        署名-相同方式共享 4.0 国际
      </a>
    ) : (
      <span
        className="article-license pill"
        title={`共享协议：${post.frontmatter.license}`}
      >
        <FiInfo aria-label="Copyright Icon" size={17} />
        {post.frontmatter.license}
      </span>
    )}
    <p className="tags">
      {post.frontmatter.tags.map(tag => (
        <Link
          key={tag}
          className="tag pill"
          to={`/?tag=${tag.toLowerCase().replace(" ", "-")}`}
        >
          <FiBookmark aria-label="Tag Icon" size={17} />
          {tag}
        </Link>
      ))}
    </p>
  </section>
)

const BlogArticle = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const date = {
    create: {
      full: dayjs(post.frontmatter.create_date).format("YYYY 年 M 月 D 日"),
      year: dayjs(post.frontmatter.create_date).year(),
      month: dayjs(post.frontmatter.create_date).month() + 1,
      date: dayjs(post.frontmatter.create_date).date(),
    },
    modify: {
      full: dayjs(post.frontmatter.date).format("YYYY 年 M 月 D 日"),
      year: dayjs(post.frontmatter.date).year(),
      month: dayjs(post.frontmatter.date).month() + 1,
      date: dayjs(post.frontmatter.date).date(),
    },
    from: dayjs(post.frontmatter.date).fromNow(),
  }

  const html = ReactDOMServer.renderToStaticMarkup(
    <>
      <p className="article-subtitle article">文章 / {post.frontmatter.name}</p>
      <h1>{post.frontmatter.title}</h1>
      <section className="article-meta" id="article-meta">
        <span title={`创建日期：${date.create.full}`} className="create-date">
          {date.create.full}
        </span>
        <span className="divider">{" -> "}</span>
        <span title={`修改日期：${date.modify.full}`} className="modify-date">
          {date.modify.full}
        </span>
      </section>
      <section
        className="article-description"
        dangerouslySetInnerHTML={{
          __html: post.fields.description_html,
        }}
        id="article-description"
      ></section>
    </>
  )

  const handleGoTop = () => {
    const body = document.querySelector("body")
    const aside = document.querySelector("aside")
    const main = document.querySelector("main")
    const header = document.querySelector("header")
    if (aside?.classList.contains("expand")) {
      body.classList.remove("expand")
      aside.classList.remove("expand")
      header.classList.remove("expand")
      main.classList.remove("expand")
    }

    window.history.pushState(
      "",
      document.title,
      window.location.pathname + window.location.search
    )
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    const toggleDescription = document
      .querySelector("#article-description")
      .addEventListener("click", e => {
        e.target.classList.toggle("show")
      })

    return document.removeEventListener("click", toggleDescription)
  }, [])

  return (
    <>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description}
      />
      <Header back aside={{ type: "toc" }} />
      <Main
        aside={
          <>
            <button className="aside-link go-top" onClick={handleGoTop}>
              文章顶部
            </button>
            <nav
              className="toc"
              dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
            ></nav>
            <a className="aside-link go-comment" href="#article-comment">
              文章评论
            </a>
          </>
        }
        main={
          <>
            {dayjs().unix() - dayjs(post.frontmatter.date).unix() >
              6 * 30 * 24 * 60 * 60 && <OutdatedContent date={date.from} />}
            <article
              id="main-content"
              dangerouslySetInnerHTML={{
                __html: html + pageContext.dom,
              }}
            />
            <Utterances />
            <ArticleFooter post={post} />
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
      fields {
        description_html
      }
      frontmatter {
        title
        name
        description
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
