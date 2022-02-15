interface FrontMatter {
  name: string
  title: string
  "create-date": string
  date: string
  description: string
  license: string
  serif?: string
}

interface Article extends FrontMatter {
  astro: {
    source: string
    html: string
    headers: {
      slug: number
      depth: number
      text: number
    }[]
  }
  file: URL
  url: string
}

interface Group {
  [key: string]: Article[]
}
