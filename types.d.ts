type NavLinks = NavLink[]
interface NavLink {
  name: string
  href: string
  icon: string[]
}

type ContentItems = ContentItem[]
interface ContentItem {
  slug: string
  text: string
  depth: number
}

type AppsName = '记录干杯' | '代码可行' | '时间之外' | '越过长城'

export interface Article {
  name: string
  subtitle?: string
  date: FrontMatterDate
  description: string
  id: string
  cover?: { image: string; caption: string }
  draft?: boolean
  license: string
  tags?: string[]
}

export interface Archive {
  name: string
  title: string
  'create-date': Date
  date: Date
  description: string
  license: string
}
