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

interface AboutQuery {
  allMdx: {
    edges: {
      node: { body: string }
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

type SidebarState = "show" | "hide" | null

type LayoutContext = {
  sidebar: SidebarState
  show: () => void
  hide: () => void
}

interface NotFoundQuery {
  allMdx: {
    edges: {
      node: { body: string }
    }[]
  }
}