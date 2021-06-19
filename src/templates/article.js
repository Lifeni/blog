import { graphql } from "gatsby"
import mediumZoom from "medium-zoom"
import React, { useEffect, useRef } from "react"
import Comment from "../components/comment"
import Header from "../components/header"
import Seo from "../components/seo"
import "./article.less"
import "./toc.less"

const Meta = ({ frontmatter, html }) => {
  const create = frontmatter.create_date
  const modify = frontmatter.date
  const titleId = frontmatter.title.replace(/[" "]/g, "-").toLowerCase()

  return (
    <section className="meta">
      {/* <div className="meta-wrapper"> */}
      {/* <div> */}
      <time title={`创建日期：${create} \n最后修改日期：${modify}`}>
        {create === modify ? "创建于" : "编辑于"} {modify}
      </time>
      <h1 id={titleId}>{frontmatter.title}</h1>
      {/* <p>{frontmatter.description}</p> */}
      {/*
          <section className="actions">
            <Link to="/">
              <RiHome2Line aria-label="Back Icon" /> 返回主页
            </Link>
            {html.includes("</h2>") && (
              <Link to="/">
                <RiFileList2Line aria-label="Table of Contents Icon" /> 查看目录
              </Link>
            )}
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/deed.zh"
              target="_blank"
              rel="noopener noreferrer"
              title={`CC-BY-SA-4.0 署名-相同方式共享 4.0 国际`}
              className="article-license pill"
            >
              <RiCopyrightLine aria-label="Copyright Icon" />
              CC-BY-SA-4.0
            </a>
          </section> */}
      {/* </div>
        <div className="space"></div>
      </div> */}
    </section>
  )
}

const TOC = ({ toc, html }) => {
  return (
    <section className="toc">
      {html.includes("</h2>") && (
        <div className="toc-wrapper">
          <nav dangerouslySetInnerHTML={{ __html: toc }}></nav>
        </div>
      )}
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
        <Meta frontmatter={post.frontmatter} html={post.html} />
        <article
          className="content"
          ref={articleRef}
          id="main-content"
          dangerouslySetInnerHTML={{ __html: post.html.split("</h1>")[1] }}
        />
        <Comment />
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
