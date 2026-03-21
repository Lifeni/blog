import { getCollection } from 'astro:content'
import type { Archive, Article } from 'src/content'

export const frontmatterFormat = (data: Archive): Article => ({
  name: data.title,
  description: data.description,
  subtitle: '',
  id: data.name,
  cover: undefined,
  license: data.license,
  tags: [],
  date: {
    created: data['create-date'],
    updated: data.date,
  },
  draft: false,
  archived: true,
  featured: false,
  pinned: false,
})

export const groupArticlesByYear = (
  articles: Article[],
): {
  year: number
  articles: Article[]
}[] => {
  const groups: Record<number, Article[]> = {}

  articles.forEach(article => {
    const year = article.date.created.getFullYear()
    if (!groups[year]) {
      groups[year] = []
    }
    groups[year].push(article)
  })

  return Object.entries(groups)
    .map(([year, articles]) => ({
      year: parseInt(year),
      articles: articles.sort(
        (a, b) => b.date.created.getTime() - a.date.created.getTime(),
      ),
    }))
    .sort((a, b) => b.year - a.year)
}

export const findContents = async (id: string) => {
  const articles = await getCollection('文章')
  const stories = await getCollection('专题')
  const archives = (await getCollection('存档')).map(({ data, ...props }) => ({
    ...props,
    data: { ...data, ...frontmatterFormat(data) },
  }))

  return [...articles, ...stories, ...archives].find(
    ({ data }) => data.id === id,
  )
}
