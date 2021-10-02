declare module "*.svg" {
  const svg: any
  export default svg
}

interface IFrontMatter {
  title: string
  name: string
  description: string
  date: string
  create_date: string
  license?: string
  serif?: boolean
}

interface IMarkdown {
  id: string
  html: string
  frontmatter: IFrontMatter
  tableOfContents: string
}
