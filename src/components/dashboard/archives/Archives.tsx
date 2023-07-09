import type { MDXInstance } from 'astro'
import { useEffect, useState } from 'react'
import type { Article } from '../../../types'

interface ArchivesProps {
  groups: {
    year: string
    articles: MDXInstance<Article>[]
  }[]
}

export const Archives = ({ groups }: ArchivesProps) => {
  const [search, setSearch] = useState('')
  const [year, setYear] = useState('所有')

  const years = ['所有', ...groups.map(({ year }) => year)]
  const all = groups.flatMap(({ articles }) => articles)
  const [articles, setArticles] = useState<MDXInstance<Article>[]>(all)

  useEffect(() => {
    setArticles(groups.find(({ year: y }) => y === year)?.articles || all)
    console.log(year, articles)
  }, [year])

  const date = (date: string) => {
    const d = new Date(date)
    const p = (num: number) => num.toString().padStart(2, '0')
    return `${p(d.getMonth() + 1)}/${p(d.getDate())}`
  }

  return (
    <div
      w="full"
      flex="~ row"
      border="~ 1 color-line"
      bg="muted"
      rounded="md"
      h="120"
      overflow="hidden"
    >
      <div flex="~ col" border="~ 0 r-1 color-line">
        <input
          type="search"
          name="archives-search"
          id="archives-search"
          placeholder="搜索文章"
          onInput={e => setSearch((e.target as HTMLInputElement).value)}
          bg="muted"
          p="x-4 y-3"
        />
        <ul p="2" border="~ 0 t-1 color-line">
          {years.map(year => (
            <li key={year}>
              <button
                onClick={() => setYear(year)}
                w="full"
                flex="~ row items-center justify-start gap-4"
                p="x-2 y-2"
                bg="hover:subtle"
                text="truncate"
                rounded="md"
                transition="background-color"
              >
                {year}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div flex="~ col" overflow="y-auto">
        <ul w="full" p="2">
          {articles.map(article => (
            <li
              key={article.frontmatter.id}
              className="group"
              w="full"
              flex="~"
            >
              <a
                href={`/article/${article.frontmatter.id}`}
                w="full"
                flex="~ row items-center justify-start gap-4"
                p="x-3 sm:x-2 y-2"
                bg="hover:subtle"
                text="truncate"
                rounded="md"
                transition="background-color"
              >
                <span flex="1" text="truncate">
                  {article.frontmatter.name}
                </span>
                <code text="subtle sm" font="mono 700">
                  {date(article.frontmatter.date.created)}
                </code>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
