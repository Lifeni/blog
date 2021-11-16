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

interface PostQuery {
  allMdx: {
    edges: {
      node: { frontmatter: Frontmatter }
    }[]
  }
}

interface ArticleQuery {
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

interface AboutQuery {
  allMdx: {
    edges: {
      node: { body: string }
    }[]
  }
}

interface NotFoundQuery {
  allMdx: {
    edges: {
      node: { body: string }
    }[]
  }
}

type SidebarState = "show" | "hide" | null

type LayoutContext = {
  sidebar: SidebarState
  show: () => void
  hide: () => void
}
