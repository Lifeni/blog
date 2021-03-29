const path = require(`path`)
const BlogPost = path.resolve(`./src/templates/article.js`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: {
            fields: [frontmatter___date, frontmatter___create_date]
            order: [DESC, DESC]
          }
          limit: 1000
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

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  for (let i = 0; i < posts.length; i++) {
    createPage({
      path: `article/${posts[i].node.fields.slug}`,
      component: BlogPost,
      context: {
        slug: posts[i].node.fields.slug,
      },
    })
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
