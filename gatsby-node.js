const path = require(`path`)
const BlogArticle = path.resolve(`./src/templates/article.js`)
const BlogTag = path.resolve(`./src/templates/tag.js`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/notebook/" } }
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
          group(field: frontmatter___tags) {
            fieldValue
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
      component: BlogArticle,
      context: {
        slug: posts[i].node.fields.slug,
      },
    })
  }

  const tags = result.data.allMarkdownRemark.group
  for (let i = 0; i < tags.length; i++) {
    createPage({
      path: `tag/${tags[i].fieldValue.toLowerCase().replace(" ", "-")}`,
      component: BlogTag,
      context: {
        tag: tags[i].fieldValue,
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
