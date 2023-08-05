import type { MDXInstance } from 'astro'
import { useEffect, useState } from 'react'
import { time, year } from '../../../libs/utils'
import type { Article } from '../../../types'

interface ArchivesProps {
  groups: {
    articles: MDXInstance<Article>[]
    year: string
  }[]
}

export const Archives = ({ groups }: ArchivesProps) => {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('所有')
  const years = ['所有', ...groups.map(({ year }) => year)]

  const all = groups.flatMap(({ articles }) => articles)
  const [articles, setArticles] = useState<MDXInstance<Article>[]>(all)
  const [results, setResults] = useState<MDXInstance<Article>[]>(articles)

  useEffect(() => {
    setArticles(
      search
        ? all.filter(({ frontmatter }) =>
            frontmatter.name.toLowerCase().includes(search.toLowerCase())
          )
        : all
    )
  }, [search])

  useEffect(() => {
    setResults(
      filter === '所有'
        ? articles
        : articles.filter(
            ({ frontmatter }) => year(frontmatter.date.created) === filter
          )
    )
  }, [filter, articles])

  return (
    <div
      w="full"
      flex="~ col sm:row"
      border="~ 1 color-line"
      bg="muted"
      rounded="md"
      h="112"
      shadow="lg"
    >
      <div
        flex="~ col"
        border="~ 0 b-1 sm:r-1 sm:b-0 color-line"
        w="full sm:48"
        h="sm:full"
      >
        <input
          type="search"
          name="archives-search"
          id="archives-search"
          placeholder="搜索文章"
          onInput={e => setSearch((e.target as HTMLInputElement).value)}
          w="full"
          z="1"
          p="x-5 y-3"
          bg="muted"
          display="none sm:block"
          rounded="sm t-md sm:tl-md focus:sm focus-visible:sm"
          outline="~ none focus:(4 offset-0 yellow) focus-visible:(4 yellow offset-0)"
        />

        <ul
          p="2"
          border="~ 0 sm:t-1 color-line"
          flex="~ row sm:col"
          h="sm:full"
          overflow="auto"
        >
          {years.map(y => (
            <li key={y} className="group">
              <button
                onClick={() => setFilter(y)}
                w="full"
                flex="~ row items-center justify-start gap-4"
                p="x-3 y-2"
                bg={`hover:subtle ${
                  y === filter ? 'subtle sm:transparent' : 'transparent'
                }`}
                text="truncate main"
                font={`mono ${y === filter ? '900' : '500'}`}
                rounded="md focus-visible:sm"
                outline="~ none focus-visible:(4 yellow offset-0)"
                transition="colors"
              >
                <span flex="1" text="start">
                  {y}
                </span>
                <span
                  display="none sm:inline"
                  font="700"
                  text="subtle xs"
                  bg="subtle"
                  p="x-1.5 y-0.5 group-hover:x-0.5"
                  rounded="full"
                  transition="padding"
                >
                  <span display="group-hover:inline none">{'->'}</span>
                  <span display="group-hover:none inline">
                    {(y === '所有'
                      ? articles.length
                      : articles.filter(
                          ({ frontmatter }) =>
                            year(frontmatter.date.created) === y
                        ).length
                    )
                      .toString()
                      .padStart(2, '0')}
                  </span>
                </span>
              </button>
            </li>
          ))}

          <li w="full" display="none sm:flex" flex="1 col justify-end">
            <a
              href="https://web.archive.org/web/*/lifeni.life"
              target="_blank"
              rel="noopener noreferrer"
              w="full"
              flex="~ row items-center justify-start gap-2"
              p="x-3 y-2"
              bg="hover:subtle"
              text="truncate subtle sm"
              font="500 sans"
              rounded="md focus-visible:sm"
              outline="~ none focus-visible:(4 yellow offset-0)"
              transition="colors"
            >
              <span
                className="icon-tabler:history"
                w="4.5"
                h="4.5"
                flex="~"
              ></span>
              <span>Wayback Machine</span>
            </a>
          </li>
        </ul>
      </div>
      <div
        flex="~ col 1"
        rounded="b-md sm:r-md"
        overflow="y-auto"
        scrollbar="sm:~ sm:rounded sm:main"
        tabIndex={-1}
      >
        {results.length === 0 ? (
          <div w="full" h="full" flex="~ col items-center justify-center">
            <h2 text="subtle">没有找到相关文章</h2>
          </div>
        ) : (
          <ul w="full" p="2">
            {results.map(({ frontmatter }) => (
              <li
                key={frontmatter.id}
                className="group"
                w="full"
                flex="~"
                animate="fade-in duration-200 ease"
              >
                <a
                  href={`/article/${frontmatter.id}`}
                  w="full"
                  flex="~ row items-center justify-start gap-3"
                  p="x-3 y-2"
                  bg="hover:subtle"
                  text="truncate"
                  rounded="md focus-visible:sm"
                  outline="~ none focus-visible:(4 yellow offset-0)"
                  transition="background-color"
                >
                  <time
                    title={time(frontmatter.date.created, { year: true })}
                    text="subtle sm group-hover:muted"
                    font="mono 700"
                    transition="colors"
                  >
                    {time(frontmatter.date.created)}
                  </time>

                  <span text="sm truncate" font="700">
                    {frontmatter?.draft && (
                      <span
                        className={frontmatter.color || 'bg-yellow'}
                        text="xs light"
                        m="r-3"
                        p="x-1 y-0.5"
                        rounded="sm"
                      >
                        {frontmatter.tags[0]}
                      </span>
                    )}

                    {frontmatter.name}
                  </span>
                  <span
                    flex="1"
                    text="sm truncate subtle group-hover:muted"
                    transition="colors"
                  >
                    {frontmatter.description}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
