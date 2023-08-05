export interface Archive {
  name: string
  title: string
  'create-date': string
  date: string
  description: string
  license: string
}

export interface Frontmatter {
  name: string
  description: string
  id: string
  draft?: boolean
  color?: string
  cover?: {
    image: string
    copyright: string
  }
  icon?: string
  license: string
  date: {
    created: string
    updated: string
  }
}

export type Article = Frontmatter & {
  subtitle?: string
  tags?: string[]
}
export type Story = Frontmatter & {}
