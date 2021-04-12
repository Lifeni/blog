import { ArrowRightIcon, NumberIcon } from "@primer/octicons-react"
import { graphql, Link, StaticQuery } from "gatsby"
import React from "react"
import "../styles/post-list.less"

const Post = ({ title, name, date, descriptions, tags }) => (
  <div className="post">
    <span className="date">{date}</span>

    <Link to={`/article/${name}`}>
      <span className="title">{title}</span>
    </Link>

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
            <NumberIcon aria-label="Hash Icon" size={16} />
            <Link to={`/tag/${tag.toLowerCase().replace(" ", "-")}`}>
              {tag}
            </Link>
          </span>
        ))}
      </p>

      <Link
        className="read-more"
        to={`/article/${name}`}
        aria-label="查看全文"
        title="查看全文"
        tabIndex="-1"
        aria-hidden="true"
      >
        <ArrowRightIcon aria-label="Open Article" size={24} />
      </Link>
    </div>
  </div>
)

const PostList = () => (
  <StaticQuery
    query={IndexQuery}
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

const IndexQuery = graphql`
  query {
    allMarkdownRemark(
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

export default PostList

export { Post }
