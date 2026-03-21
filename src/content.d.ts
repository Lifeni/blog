export type Article = {
  name: string
  description: string
  subtitle?: string
  id: string
  cover?: {
    description: string
    path: string
  }
  license: string
  tags: string[]
  date: {
    created: Date
    updated: Date
  }
  draft?: boolean
  archived?: boolean
  featured?: boolean
  pinned?: boolean
}

export type Story = {
  name: string
  description: string
  subtitle?: string
  id: string
  cover: {
    description: string
    path: string
  }
  license: string
  tags: string[]
  date: {
    created: Date
    updated: Date
  }
  draft?: boolean
  articles?: string[]
}

export type Archive = {
  title: string
  description: string
  name: string
  'create-date': Date
  date: Date
  license: string
}
