import { graphql, Link } from "gatsby"
import mediumZoom from "medium-zoom"
import React, { useEffect, useRef } from "react"
import Comment from "../components/comment"
import Seo from "../components/seo"
import "./article.less"
import "./toc.less"
import Han from "han-css/dist/han.min.js"

const Meta = ({ frontmatter }) => {
  const create = frontmatter.create_date
  const modify = frontmatter.date
  const titleId = frontmatter.title.replace(/[" "]/g, "-").toLowerCase()

  return (
    <section className="meta">
      <div className="meta-wrapper">
        <div>
          <time title={`创建日期：${create} \n最后修改日期：${modify}`}>
            {modify}
          </time>
          <h1 id={titleId}>{frontmatter.title}</h1>
          {/* <p>{frontmatter.description}</p> */}
        </div>
        <div className="space"></div>
      </div>
    </section>
  )
}

const TOC = ({ toc }) => {
  return (
    <section className="toc">
      <div className="toc-wrapper">
        <h2>目录</h2>
        <nav dangerouslySetInnerHTML={{ __html: toc }}></nav>
      </div>
    </section>
  )
}

const ArticlePage = ({ data }) => {
  const post = data.markdownRemark

  const articleRef = useRef()

  useEffect(() => {
    const tables = articleRef.current.querySelectorAll("table")
    tables.forEach(table => {
      const wrapper = document.createElement("div")
      const clone = table.cloneNode(true)
      wrapper.className = "table-wrapper"
      wrapper.appendChild(clone)
      table.replaceWith(wrapper)
    })
  }, [data])

  useEffect(() => {
    const imgs = articleRef.current.querySelectorAll("img")
    imgs.forEach(e => {
      e.setAttribute("tabindex", "0")
      e.onkeypress = event => {
        if (event.key === "Enter") {
          e.click()
        }
      }
    })
    setTimeout(() => {
      mediumZoom(imgs, {
        background: "rgba(0, 0, 0, .8)",
      })
    }, 300)
  }, [data])

  // useEffect(() => {
  //   Han.init()
  // }, [])

  return (
    <div className="container">
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description}
      />
      <Meta frontmatter={post.frontmatter} />
      <div className="article-wrapper">
        <article
          className="content"
          ref={articleRef}
          id="main-content"
          dangerouslySetInnerHTML={{ __html: post.html.split("</h1>")[1] }}
        />
        {post.html.includes("</h2>") && <TOC toc={post.tableOfContents} />}
      </div>
      <Comment />
    </div>
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
