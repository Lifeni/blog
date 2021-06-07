import { graphql } from "gatsby"
import mediumZoom from "medium-zoom"
import React, { useEffect, useRef } from "react"
import Comment from "../components/comment"
import Seo from "../components/seo"
import "./article.less"
import "./toc.less"

import copyIcon from "../assets/icons/copy.svg"
import copiedIcon from "../assets/icons/copied.svg"

const ArticleHeader = ({ frontmatter }) => {
  let create = frontmatter.create_date
  let modify = frontmatter.date

  return (
    <div className="header">
      <div className="header-wrapper">
        <div className="meta">
          <span title={`创建日期：${create} \n最后修改日期：${modify}`}>
            {modify}
          </span>
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
        copy.style.backgroundImage = `url("${copyIcon}")`
        copy.setAttribute("aria-label", "复制")
        copy.title = "复制"
        copy.onclick = () => {
          const code = e.querySelector("pre code")
          navigator.clipboard
            .writeText(code.textContent)
            .then(() => {
              copy.style.backgroundImage = `url("${copiedIcon}")`
              copy.title = "已复制"
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
          <div className="container-wrapper">
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
          </div>
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
