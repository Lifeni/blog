import { graphql, StaticQuery } from "gatsby"
import React from "react"
import { StringParam, useQueryParam } from "use-query-params"
import BlogPost from "../components/blog-post"
import Footer from "../components/footer"
import Header from "../components/header"
import Main from "../components/main"
import { FriendsNote, HomeNote } from "../components/notes"
import { UpdateNow } from "../components/notification"
import Seo from "../components/seo"
import "./global.less"
import "./highlight.less"
import "./index.less"
import "./variables.less"

const PostList = ({ tag }) => {
  return (
    <StaticQuery
      query={IndexQuery}
      render={data => {
        let hrFlag = false
        return (
          <div className="post-list" id="main-content">
            {data.allMarkdownRemark.edges.map(({ node }) => {
              const postTags = node.frontmatter.tags.map(tag =>
                tag.toLowerCase().replace(" ", "-")
              )

              if (!tag || postTags.includes(tag)) {
                let Hr = null
                if (hrFlag) {
                  Hr = <hr />
                }

                hrFlag = true
                return (
                  <React.Fragment key={node.frontmatter.title}>
                    {Hr}
                    <BlogPost
                      title={node.frontmatter.title}
                      name={node.frontmatter.name}
                      descriptions={node.frontmatter.descriptions}
                      date={node.frontmatter.date}
                      create_date={node.frontmatter.create_date}
                      tags={node.frontmatter.tags}
                      license={node.frontmatter.license}
                      excerpt={node.excerpt}
                    />
                  </React.Fragment>
                )
              }

              return (
                <BlogPost
                  hide="true"
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
              )
            })}
          </div>
        )
      }}
    />
  )
}

const IndexPage = () => {
  const tag = useQueryParam("tag", StringParam)[0]

  return (
    <>
      <Seo title="主页" />
      <Header app aside={{ type: "note" }} />
      <Main
        aside={
          !tag && (
            <>
              <HomeNote />
              <FriendsNote />
            </>
          )
        }
        main={
          <>
            <UpdateNow />
            <PostList tag={tag} />
            {!tag && <Footer />}
          </>
        }
      />
    </>
  )
}

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
