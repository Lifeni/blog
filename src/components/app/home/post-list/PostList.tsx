import styled from "@emotion/styled"
import { graphql, useStaticQuery } from "gatsby"
import Post from "./Post"

const Container = styled("ul")`
  position: relative;
  width: 100%;
  padding: 0.125rem 0;
  display: flex;
  flex-direction: column;
`

const PostList = () => {
  const posts = useStaticQuery<PostQuery>(graphql`
    query {
      allMdx(
        filter: { fileAbsolutePath: { regex: "/articles/" } }
        sort: {
          fields: [frontmatter___date, frontmatter___create_date]
          order: [DESC, DESC]
        }
      ) {
        edges {
          node {
            frontmatter {
              date(formatString: "YYYY 年 M 月 D 日")
              create_date(formatString: "YYYY 年 M 月 D 日")
              description
              name
              title
              license
            }
          }
        }
      }
    }
  `)

  return (
    <Container>
      {posts.allMdx.edges.map(post => (
        <Post post={post.node.frontmatter} key={post.node.frontmatter.name} />
      ))}
    </Container>
  )
}

export default PostList
