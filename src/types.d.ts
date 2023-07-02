export interface ArchivedArticleFrontmatter {
  name: string
  title: string
  'create-date': string
  date: string
  description: string
  license: string
}

export interface ArticleFrontmatter {
  name: string
  description: string
  id: string
  license: string
  date: {
    created: string
    updated: string
  }
}

export interface ExploreFrontmatter {
  name: string
  description: string
  id: string
  license: string
  date: {
    created: string
    updated: string
  }
}
