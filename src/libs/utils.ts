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
