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
  data: { id: number; name: string; link: string; avatar: string }[]
}

interface About {
  data: {
    id: string
    date_created: string
    date_updated: string | null
    content: string
  }
}

interface Projects {
  data: {
    id: number
    icon: string
    name: string
    description: string
    github: string
    website?: string
    docs?: string
  }[]
}

interface Playlist {
  songs: {
    name: string
    id: number
    dt: number // 时长，ms
    // 专辑
    al: {
      id: number
      name: string
      picUrl: string
    }
    // 歌手
    ar: {
      id: number
      name: string
    }[]
  }[]
}
