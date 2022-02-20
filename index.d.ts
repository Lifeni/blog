interface FrontMatter {
  name: string
  title: string
  'create-date': string
  date: string
  description: string
  license: string
}

interface Article extends FrontMatter {
  astro: {
    source: string
    html: string
    headers: Header[]
  }
  file: URL
  url: string
}

interface Header {
  slug: number
  depth: number
  text: number
}

interface Group {
  [key: string]: Article[]
}

interface Friends {
  data: { id: string; name: string; link: string; avatar: string }[]
}

interface About {
  data: {
    id: string
    date_created: string
    date_updated: string | null
    content: string
  }
}
