const { JSDOM } = require("jsdom")
const path = require(`path`)
const BlogArticle = path.resolve(`./src/templates/article.js`)

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
              html
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
    const dom = new JSDOM(posts[i].node.html)
    const h1 = dom.window.document.querySelector("h1")
    const p1 = dom.window.document.querySelector("h1 + p")
    const p2 = dom.window.document.querySelector("h1 + p + p")

    h1.parentElement.removeChild(h1)

    const re = /((\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55])\s/
    const replaceEmoji = p => {
      if (p) {
        const emoji = p.innerHTML.match(re)
        p.innerHTML = p.innerHTML.replace(
          re,
          `<span class="emoji" role="img" aria-label="Emoji">${emoji?.[0].trim()}</span>`
        )
      }
    }

    replaceEmoji(p1)
    replaceEmoji(p2)

    // const insertElement = p => {
    //   const hr = dom.window.document.createElement("hr")
    //   p.parentNode.insertBefore(hr, p.nextSibling)
    // }

    // if (p2) {
    //   insertElement(p2)
    // } else if (p1) {
    //   insertElement(p1)
    // }

    createPage({
      path: `article/${posts[i].node.fields.slug}`,
      component: BlogArticle,
      context: {
        slug: posts[i].node.fields.slug,
        dom: dom.serialize(dom.window.document),
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
