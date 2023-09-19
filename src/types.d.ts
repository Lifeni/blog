export interface Article {
  name: string
  subtitle?: string
  date: { created: Date; updated: Date }
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
  'create-date': string
  date: string
  description: string
  license: string
}
