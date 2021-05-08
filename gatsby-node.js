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

    const re = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/
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

    const tables = dom.window.document.querySelectorAll("table")
    if (tables.length) {
      tables.forEach(table => {
        const wrapper = dom.window.document.createElement("div")
        const clone = table.cloneNode(true)
        wrapper.className = "table-wrapper"
        wrapper.appendChild(clone)
        table.replaceWith(wrapper)
      })
    }

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
