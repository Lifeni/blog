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

export const getReadingStats = (
  content: string,
): { wordCount: number; readingTime: number } => {
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^[\s]*[-*+]\s/gm, '')
    .replace(/^[\s]*\d+\.\s/gm, '')
    .replace(/^>\s*/gm, '')
    .replace(/^[-*_]{3,}$/gm, '')

  const chineseCount = (cleanContent.match(/[\u4e00-\u9fa5]/g) || []).length
  const englishWordCount = cleanContent
    .replace(/[\u4e00-\u9fa5]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(w => w).length

  const wordCount = chineseCount + englishWordCount
  const readingTime = Math.max(
    1,
    Math.ceil(chineseCount / 300 + englishWordCount / 200),
  )

  return { wordCount, readingTime }
}
