const path = require(`path`)
const Article = path.resolve(`./src/components/app/article/Article.tsx`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  try {
    const result = await graphql(`
      {
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
                name
              }
              id
            }
          }
        }
      }
    `)

    const articles = result.data.allMdx.edges
    for (let i = 0; i < articles.length; i++) {
      createPage({
        path: `article/${articles[i].node.frontmatter.name}`,
        component: Article,
        context: {
          id: articles[i].node.id,
        },
      })
    }
  } catch (error) {
    console.error(error)
  }
}
