declare module "*.svg" {
  const svg: any
  export default svg
}

interface ArticleListGraphQL {
  data: {
    allMarkdownRemark: {
      edges: { node: ArticleGraphQL }[]
    }
  }
}

interface ArticlePageGraphQL {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
    markdownRemark: ArticleGraphQL
  }
}

interface ArticleGraphQL {
  id: string
  html: string
  frontmatter: ArticleFrontmatterGraphQL
  tableOfContents: string
}

interface ArticleFrontmatterGraphQL {
  title: string
  name: string
  description: string
  date: string
  create_date: string
  license?: string
}
