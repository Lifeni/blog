import styled from "@emotion/styled"
import { graphql, useStaticQuery } from "gatsby"
import { useState } from "react"
import { RiFileList3Line } from "react-icons/ri"
import Post from "./Post"

const Container = styled("ul")`
  position: relative;
  width: 100%;
  padding: 0.625rem 0;
  display: flex;
  flex-direction: column;
`

const Action = styled("button")`
  position: relative;
  width: fit-content;
  margin: 0.625rem 1rem 2rem 1rem;
  display: flex;
  align-items: center;
  border: none;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  font-family: inherit;
  background-color: transparent;
  color: var(--font-link);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: var(--font-link-hover);
    text-underline-offset: 0.375em;
    text-decoration: underline;
  }

  svg {
    width: 1.25em;
    height: 1.25em;
    margin: 0 0.75em 0 0;
  }

  @media (max-width: 48rem) {
    margin: 0 1rem 1.875rem 1rem;
  }

  @media (max-width: 36rem) {
    margin: -0.125rem 0.75rem 1.625rem 0.75rem;
  }
`

const PostList = () => {
  const [showAllPosts, setShowAllPosts] = useState(false)

  const posts = useStaticQuery<IPostQuery>(graphql`
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
      {posts.allMdx.edges.slice(0, 4).map(post => (
        <Post post={post.node.frontmatter} key={post.node.frontmatter.name} />
      ))}
      {posts.allMdx.edges.length > 4 &&
        (showAllPosts ? (
          posts.allMdx.edges
            .slice(4)
            .map(post => (
              <Post
                post={post.node.frontmatter}
                key={post.node.frontmatter.name}
              />
            ))
        ) : (
          <Action onClick={() => setShowAllPosts(true)}>
            <RiFileList3Line aria-label="文章图标" />
            其余 {posts.allMdx.edges.length - 4} 篇文章 ...
          </Action>
        ))}
    </Container>
  )
}

export default PostList
