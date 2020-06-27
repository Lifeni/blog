import React from "react"
import ReactDOMServer from "react-dom/server"
// import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/article.css"

import { graphql } from "gatsby"

const BlogPost = ({ data }) => {
  const post = data.markdownRemark

  const html = ReactDOMServer.renderToStaticMarkup(
    <div className="article-info">
      {/* <Link to="/" className="float-link article">
        ×
      </Link> */}
      <p className="subtitle">{post.frontmatter.date}</p>
      {/* <h1>{post.frontmatter.title}</h1> */}
    </div>
  )

  return (
    <Layout>
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
      tableOfContents(absolute: false, heading: "", maxDepth: 3)
    }
  }
`
