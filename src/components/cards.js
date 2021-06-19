import { graphql, Link, StaticQuery } from "gatsby"
import React from "react"
import { RiArrowRightLine } from "react-icons/ri"
import "./cards.less"
import Masonry from "react-masonry-css"

const Card = ({ title, name, create_date, date, description }) => (
  <div className="card">
    <time className="date">{date}</time>
    <Link
      className="title"
      to={`/article/${name}`}
      aria-label={title}
      title={title}
    >
      <h2>{title}</h2>
    </Link>
    <p className="description" role="presentation">
      {description}
    </p>
    <Link
      className="read-more"
      to={`/article/${name}`}
      aria-label="查看全文"
      title="查看全文"
    >
      查看全文
      <RiArrowRightLine aria-label="Open Article" />
    </Link>
  </div>
)

const Cards = () => (
  <StaticQuery
    query={ArticleQuery}
    render={data => (
      <>
        <Masonry
          breakpointCols={2}
          className="list"
          id="main-content"
          columnClassName="list-column"
        >
          {data.allMarkdownRemark.edges.map(({ node }) => {
            return (
              <Card
                title={node.frontmatter.title}
                name={node.frontmatter.name}
                description={node.frontmatter.description}
                date={node.frontmatter.date}
                create_date={node.frontmatter.create_date}
                license={node.frontmatter.license}
                key={node.frontmatter.title}
              />
            )
          })}
        </Masonry>
      </>
    )}
  />
)

export default Cards

const ArticleQuery = graphql`
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
            description
            license
          }
        }
      }
    }
  }
`
