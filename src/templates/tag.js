import { TagIcon } from "@primer/octicons-react"
import { graphql } from "gatsby"
import React from "react"
import About from "../components/about"
import Footer from "../components/footer"
import Header from "../components/header"
import { Post } from "../components/post-list"
import Seo from "../components/seo"
import Sidebar from "../components/sidebar"
import "../styles/tag.less"

const BlogTag = ({ data, pageContext }) => {
  const { tag } = pageContext
  return (
    <>
      <Seo title={`# ${tag}`} />
      <Header back aside top />
      <main>
        <Sidebar>
          <About page={["friend", "project"]} />
        </Sidebar>
        <div className="container">
          <article id="tag-list">
            <h1>{tag}</h1>
            <p className="subtitle">
              <TagIcon aria-label="Tag Icon" size={16} />
              文章标签
            </p>
          </article>
          <div className="post-list tag-list" id="main-content">
            {data.allMarkdownRemark.edges.map(({ node }) => (
              <Post
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

          <Footer />
        </div>
      </main>
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
