import { graphql, StaticQuery } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import React from "react"
import "../styles/post-list.less"
import { HashIcon } from "./icon"

const Post = ({ title, name, date, descriptions, tags }) => (
  <div className="post">
    <span className="date">{date}</span>

    <AniLink
      cover
      bg="var(--background-3)"
      direction="left"
      duration={1}
      to={`/article/${name}`}
    >
      <span className="title">{title}</span>
    </AniLink>

    <p className="description">
      {descriptions.map((description, index) => (
        <span key={description}>
          {description}
          {index !== descriptions.length - 1 && <br />}
        </span>
      ))}
    </p>
    <div className="bar">
      <p className="info">
        {tags.map(tag => (
          <span key={tag} className="tag">
            <HashIcon />
            {tag}
          </span>
        ))}
      </p>

      <AniLink
        cover
        bg="var(--background-3)"
        direction="left"
        duration={1}
        className="read-more"
        to={`/article/${name}`}
        aria-label="查看全文"
        title="查看全文"
        tabIndex="-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            fillRule="evenodd"
            d="M13.22 19.03a.75.75 0 001.06 0l6.25-6.25a.75.75 0 000-1.06l-6.25-6.25a.75.75 0 10-1.06 1.06l4.97 4.97H3.75a.75.75 0 000 1.5h14.44l-4.97 4.97a.75.75 0 000 1.06z"
          ></path>
        </svg>
      </AniLink>
    </div>
  </div>
)

const PostList = () => (
  <StaticQuery
    query={indexQuery}
    render={data => {
      return (
        <div className="post-list" id="main-content">
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
      )
    }}
  />
)

const indexQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
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

export default PostList
