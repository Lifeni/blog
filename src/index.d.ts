declare module "*.svg" {
  const svg: any
  export default svg
}

type Frontmatter = {
  create_date: string
  date: string
  description: string
  name: string
  title: string
  license: string
}

type TableOfContents = {
  url: string
  title: string
  items?: TableOfContents[]
}

interface IPostQuery {
  allMdx: {
    edges: {
      node: { frontmatter: Frontmatter }
    }[]
  }
}

interface IArticleQuery {
  mdx: {
    frontmatter: {
      date: string
      create_date: string
      description: string
      name: string
      title: string
      license: string
    }
    body: string
    tableOfContents: { items: TableOfContents[] }
  }
}

interface IAboutQuery {
  allMdx: {
    edges: {
      node: { body: string }
    }[]
  }
}

interface INotFoundQuery {
  allMdx: {
    edges: {
      node: { body: string }
    }[]
  }
}

interface ISidebarContext {
  showSidebar: boolean
  setShow: () => void
  setHide: () => void
}
