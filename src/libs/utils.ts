import { getCollection } from 'astro:content'
import dayjs from 'dayjs'
import type { Archive, Article } from 'types'

export const dateFormat = (date: Date) =>
  dayjs(date).format('YYYY 年 MM 月 DD 日')

export const frontmatterFormat = (data: Archive): Article => ({
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
  subtitle: data.subtitle,
  group: false,
  draft: false,
  star: data.star,
})

export const parseHref = (href: string) => {
  if (href.startsWith('/')) {
    const url = new URL(href, 'http://localhost')
    if (url.pathname.startsWith('/story'))
      return { type: '专题', href, id: url.pathname.replace('/story/', '') }
    if (url.pathname.startsWith('/article'))
      return { type: '文章', href, id: url.pathname.replace('/article/', '') }
    return { type: '应用', href }
  }

  return { type: '链接', href }
}

export const findContents = async (id: string) => {
  const articles = await getCollection('文章')
  const stories = await getCollection('专题')
  const archives = (await getCollection('存档')).map(({ data, ...props }) => ({
    ...props,
    data: { ...data, ...frontmatterFormat(data) },
  }))

  return [...articles, ...stories, ...archives].find(
    ({ data }) => data.id === id
  )
}
