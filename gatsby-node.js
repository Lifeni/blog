const path = require(`path`)
const Article = path.resolve(`./src/templates/article.js`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  try {
    const result = await graphql(
      `
        {
          allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/notebook/" } }
            sort: {
              fields: [frontmatter___date, frontmatter___create_date]
              order: [DESC, DESC]
            }
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      `
    )

    const articles = result.data.allMarkdownRemark.edges
    for (let i = 0; i < articles.length; i++) {
      createPage({
        path: `article/${articles[i].node.fields.slug}`,
        component: Article,
        context: {
          slug: articles[i].node.fields.slug,
        },
      })
    }
  } catch (error) {
    console.error(error)
  }
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    createNodeField({
      name: `slug`,
      node,
      value: node.frontmatter.name,
    })
  }
}
