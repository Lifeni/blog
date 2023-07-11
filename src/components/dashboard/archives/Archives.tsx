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
    console.log(search)
    const results = groups.find(({ year: y }) => y === year)?.articles || all
    setArticles(
      search
        ? results.filter(({ frontmatter }) =>
            frontmatter.name.toLowerCase().includes(search.toLowerCase())
          )
        : results
    )
  }, [year, search])

  const date = (date: string) => {
    const d = new Date(date)
    const p = (num: number) => num.toString().padStart(2, '0')
    return `${p(d.getMonth() + 1)}/${p(d.getDate())}`
  }

  return (
    <div
      w="full"
      flex="~ col sm:row"
      border="~ 1 color-line"
      bg="muted"
      rounded="md"
      h="120"
      overflow="hidden"
    >
      <div flex="~ col" border="~ 0 r-1 color-line" w="48">
        <input
          type="search"
          name="archives-search"
          id="archives-search"
          placeholder="搜索文章"
          onInput={e => setSearch((e.target as HTMLInputElement).value)}
          w="full"
          p="x-5 y-3"
          bg="muted"
        />

        <ul p="2" border="~ 0 t-1 color-line">
          {years.map(y => (
            <li key={y}>
              <button
                onClick={() => setYear(y)}
                w="full"
                flex="~ row items-center justify-start gap-4"
                p="x-3 y-2"
                bg="hover:subtle"
                text="truncate main"
                font={`mono ${y === year ? '800' : '500'}`}
                rounded="md"
                transition="background-color"
              >
                {y}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div flex="~ col 1" overflow="y-auto">
        {articles.length === 0 ? (
          <div w="full" h="full" flex="~ col items-center justify-center">
            <h2 text="subtle">没有找到相关文章</h2>
          </div>
        ) : (
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
                  p="x-3 y-2"
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
        )}
      </div>
    </div>
  )
}
