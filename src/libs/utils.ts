import type { MDXInstance } from 'astro'
import type { Archive } from '../types.d'

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
export const time = (
  date: string,
  config?: { year?: boolean; calendar?: boolean }
) => {
  const d = new Date(date)
  const p = (num: number) => num.toString().padStart(2, '0')
  if (config?.year)
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
  if (config?.calendar)
    return `${d.getFullYear()} 年 ${p(d.getMonth() + 1)} 月 ${p(
      d.getDate()
    )} 日`
  return `${p(d.getMonth() + 1)}/${p(d.getDate())}`
}
export const date = (date: { created: string; updated: string }) =>
  date.created === date.updated
    ? `发布于 ${time(date.created, { calendar: true })}`
    : `编辑于 ${time(date.updated, { calendar: true })}`

export const image = (src: string) => `https://file.lifeni.life/notebook/${src}`
