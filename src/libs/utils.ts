import type { Archive, Article } from 'src/types'

export const format = (data: Archive): Article => ({
  name: data.title,
  description: data.description,
  id: data.name,
  license: data.license,
  date: {
    created: data['create-date'],
    updated: data.date,
  },
  cover: undefined,
  tags: undefined,
  subtitle: undefined,
  draft: false,
})
