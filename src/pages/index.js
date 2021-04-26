import { graphql, StaticQuery } from "gatsby"
import React from "react"
import BlogPost from "../components/blog-post"
import Footer from "../components/footer"
import Header from "../components/header"
import Main from "../components/main"
import { UpdateNow } from "../components/notification"
import Seo from "../components/seo"
import { HomeNote } from "../components/notes"
import "./global.less"
import "./highlight.less"
import "./index.less"
import "./variables.less"

const PostList = () => (
  <StaticQuery
    query={IndexQuery}
    render={data => {
      return (
        <div className="post-list" id="main-content">
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
      )
    }}
  />
)

const IndexPage = () => (
  <>
    <Seo title="主页" />
    <Header app aside={{ type: "note" }} />
    <Main
      aside={
        <>
          <HomeNote />
        </>
      }
      main={
        <>
          <UpdateNow />
          <PostList />
          <Footer />
        </>
      }
    />
  </>
)

export default IndexPage

const IndexQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/notebook/" } }
      sort: {
        fields: [frontmatter___date, frontmatter___create_date]
        order: [DESC, DESC]
      }
    ) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "YYYY 年 M 月 D 日")
            create_date(formatString: "YYYY 年 M 月 D 日")
            title
            name
            tags
            descriptions
            license
          }
          excerpt(format: HTML, pruneLength: 100)
        }
      }
    }
  }
`
