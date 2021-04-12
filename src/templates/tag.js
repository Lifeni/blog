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
              <svg
                aria-label="Tag Icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="16"
                height="16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 7.775V2.75a.25.25 0 01.25-.25h5.025a.25.25 0 01.177.073l6.25 6.25a.25.25 0 010 .354l-5.025 5.025a.25.25 0 01-.354 0l-6.25-6.25a.25.25 0 01-.073-.177zm-1.5 0V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 010 2.474l-5.026 5.026a1.75 1.75 0 01-2.474 0l-6.25-6.25A1.75 1.75 0 011 7.775zM6 5a1 1 0 100 2 1 1 0 000-2z"
                ></path>
              </svg>
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
