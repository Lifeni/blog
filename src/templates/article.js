import { graphql } from "gatsby"
import mediumZoom from "medium-zoom"
import React, { useEffect, useRef } from "react"
import Comment from "../components/comment"
import Header from "../components/header"
import Seo from "../components/seo"
import "./article.less"
import "./toc.less"

const Meta = ({ frontmatter }) => {
  const create = frontmatter.create_date
  const modify = frontmatter.date
  const titleId = frontmatter.title.replace(/[" "]/g, "-").toLowerCase()

  return (
    <section className="meta">
      <time title={`创建日期：${create} \n最后修改日期：${modify}`}>
        {create === modify ? "创建于" : "编辑于"} {modify}
      </time>
      <h1 id={titleId}>{frontmatter.title}</h1>
    </section>
  )
}

const TableOfContents = ({ toc }) => {
  return (
    <section className="toc" id="table-of-contents">
      <details className="toc-wrapper">
        <summary>目录</summary>
        <nav dangerouslySetInnerHTML={{ __html: toc }}></nav>
      </details>
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

  return (
    <div className="container">
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description}
      />
      <aside>
        <Header back toc comment />
      </aside>
      <main>
        <div className="article-wrapper">
          <Meta frontmatter={post.frontmatter} />
          {post.html.includes("</h2>") && (
            <TableOfContents toc={post.tableOfContents} />
          )}
          <article
            className="content"
            ref={articleRef}
            id="main-content"
            dangerouslySetInnerHTML={{ __html: post.html.split("</h1>")[1] }}
          />
          <Comment />
        </div>
      </main>
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
