import { graphql, Link, StaticQuery } from "gatsby"
import React from "react"
import { FiArrowRight } from "react-icons/fi"
import "./cards.less"

const Card = ({ title, name, date, description }) => (
  <div className="post">
    <time className="date">{date}</time>

    <Link to={`/article/${name}`} role="heading" aria-level="2">
      <span className="title">{title}</span>
    </Link>

    <p className="description" role="presentation">
      {description}
    </p>

    <section className="bar">
      <Link
        className="read-more"
        to={`/article/${name}`}
        aria-label="查看全文"
        title="查看全文"
        tabIndex="-1"
        aria-hidden="true"
      >
        <FiArrowRight aria-label="Open Article" size={24} />
      </Link>
    </section>
  </div>
)

const Cards = () => (
  <StaticQuery
    query={ArticleQuery}
    render={data => (
      <div className="post-list" id="main-content">
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
      </div>
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
