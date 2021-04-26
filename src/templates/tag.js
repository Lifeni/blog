import { graphql } from "gatsby"
import React from "react"
import BlogPost from "../components/blog-post"
import Header from "../components/header"
import Main from "../components/main"
import Seo from "../components/seo"
import "./tag.less"
const BlogTag = ({ data, pageContext }) => {
  const { tag } = pageContext

  return (
    <>
      <Seo title={`标签：${tag}`} />
      <Header back />
      <Main
        main={
          <>
            <article id="tag-list">
              <h1>标签：{tag}</h1>
            </article>
            <div className="post-list tag-list" id="main-content">
              {data.allMarkdownRemark.edges.map(({ node }) => (
                <BlogPost
                  title={node.frontmatter.title}
                  name={node.frontmatter.name}
                  descriptions={node.frontmatter.descriptions}
                  date={node.frontmatter.date}
                  create_date={node.frontmatter.create_date}
                  tags={node.frontmatter.tags}
                  license={node.frontmatter.license}
                  excerpt={node.excerpt}
                  key={node.frontmatter.title}
                />
              ))}
            </div>
          </>
        }
      />
    </>
  )
}

export default BlogTag

export const PostQuery = graphql`
  query PostQuery($tag: String) {
    allMarkdownRemark(
      sort: {
        fields: [frontmatter___date, frontmatter___create_date]
        order: [DESC, DESC]
      }
      limit: 1000
      filter: { frontmatter: { tags: { eq: $tag } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            name
            descriptions
            tags
            date(formatString: "YYYY 年 M 月 D 日")
            create_date(formatString: "YYYY 年 M 月 D 日")
            license
          }
        }
      }
    }
  }
`
