import { graphql } from "gatsby"
import mediumZoom from "medium-zoom"
import React, { useEffect, useRef } from "react"
import Comment from "../components/comment"
import Seo from "../components/seo"
import "./article.less"
import "./toc.less"

const ArticleHeader = ({ frontmatter }) => {
  let create = frontmatter.create_date
  let modify = frontmatter.date

  if (create.slice(0, 5) === modify.slice(0, 5)) {
    modify = modify.slice(6)
  }

  return (
    <div className="header">
      <div className="wrapper">
        <div className="meta">
          <span title={`创建日期：${create}`} className="create-date">
            {create}
          </span>
          {frontmatter.create_date !== frontmatter.date && (
            <>
              <span className="divider">{" / "}</span>
              <span title={`修改日期：${modify}`} className="modify-date">
                {modify}
              </span>
            </>
          )}
        </div>
        <h1>{frontmatter.title}</h1>
      </div>
    </div>
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

  useEffect(() => {
    const block = articleRef.current.querySelectorAll(".gatsby-highlight")
    if (block.length) {
      block.forEach(e => {
        const copy = document.createElement("button")
        copy.className = "copy"
        copy.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`
        copy.setAttribute("aria-label", "Copy")
        copy.title = "Copy"
        copy.onclick = () => {
          const code = e.querySelector("pre code")
          navigator.clipboard
            .writeText(code.textContent)
            .then(() => {
              copy.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"/></svg>`
            })
            .catch(err => {
              console.log("复制出错", err)
            })
        }

        const inner = e.firstElementChild
        e.insertBefore(copy, inner)
      })
    }
  }, [data])

  return (
    <div className="screen article">
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description}
      />
      <div className="container">
        <ArticleHeader frontmatter={post.frontmatter} />
        <main>
          <article
            ref={articleRef}
            id="main-content"
            dangerouslySetInnerHTML={{ __html: post.html.split("</h1>")[1] }}
          />
          <aside>
            <nav
              className="toc"
              dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
            />
          </aside>
        </main>
        <Comment />
      </div>
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
