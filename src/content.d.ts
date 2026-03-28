export type Article = {
  name: string
  description: string
  subtitle?: string
  id: string
  cover?: {
    description: string
    path: ImageMetadata
  }
  license: string
  tags: string[]
  date: {
    created: Date
    updated: Date
  }
  draft?: boolean
  archived?: boolean
  pinned?: boolean
  featured?: boolean
}

export type Story = {
  name: string
  description: string
  subtitle?: string
  id: string
  cover: {
    description: string
    path: ImageMetadata
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

export type Moment = {
  name: string
  date: Date
  camera: string
  location: string
  exif: string[]
  path: ImageMetadata
  edited?: boolean
}
