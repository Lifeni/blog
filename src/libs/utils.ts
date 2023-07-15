import type { MDXInstance } from 'astro'
import type { Article, Archive } from '../types.d'

export const unify = (arr: MDXInstance<Archive>[]) =>
  arr.map(archive => ({
    ...archive,
    frontmatter: {
      ...archive.frontmatter,
      name: archive.frontmatter.title,
      id: archive.frontmatter.name,
      date: {
        created: archive.frontmatter['create-date'],
        updated: archive.frontmatter['date'],
      },
    },
  }))

export const year = (date: string) => new Date(date).getFullYear().toString()
export const date = (date: string, config?: { year: boolean }) => {
  const d = new Date(date)
  const p = (num: number) => num.toString().padStart(2, '0')
  if (config?.year)
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
  return `${p(d.getMonth() + 1)}/${p(d.getDate())}`
}
