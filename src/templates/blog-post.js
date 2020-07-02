import React from "react"
import ReactDOMServer from "react-dom/server"
// import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/article.css"

import { graphql, Link } from "gatsby"

const BlogPost = ({ data }) => {
  const post = data.markdownRemark

  const html = ReactDOMServer.renderToStaticMarkup(
    <div className="article-info">
      <p className="subtitle">{post.frontmatter.date}</p>
    </div>
  )

  return (
    <Layout path="article" noheader>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
      />
      <aside className="post-toc">
        <nav
          className="toc"
          dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
        ></nav>
      </aside>
      <article
        id="content"
        dangerouslySetInnerHTML={{ __html: html + post.html }}
      ></article>
      <nav>
        <button className="fab toggle-toc hide" id="toggle" title="查看目录">
          查看目录
        </button>
        <button className="fab focus-content" id="focus" title="聚焦内容">
          聚焦内容
        </button>
        <button className="fab to-top" id="top" title="回到顶部">
          回到顶部
        </button>
        <Link
          to="/"
          className="fab back-home article"
          aria-label="Home"
          title="回到主页"
        >
          回到主页
        </Link>
      </nav>
    </Layout>
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
        description
        tags
        date(fromNow: true, locale: "zh-cn", formatString: "YYYY 年 M 月 D 日")
      }
      tableOfContents(absolute: false, maxDepth: 3)
    }
  }
`
