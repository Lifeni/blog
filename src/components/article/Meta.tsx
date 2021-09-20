import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"
import { RiCalendarLine, RiCopyrightLine, RiShareLine } from "react-icons/ri"

const Meta = styled("div")`
  width: calc(100% + 2rem);
  margin: 0 -1rem 1.75rem -1rem;
  padding: 0.25rem 1rem 2.875rem 1rem;
  border-bottom: var(--border);
  font-family: var(--font-sans);
  transition: all 0.2s;

  p {
    line-height: 2 !important;
    text-indent: unset !important;
    margin: 0.5rem 0 !important;
  }

  & + p {
    margin: 1.5rem 0 0 0 !important;
  }

  @media (max-width: 800px) {
    padding: 0 1rem 2.875 1rem;
  }

  @media (max-width: 720px) {
    margin: -0.5rem -1rem 1rem -1rem;
    padding: 0 1rem 2.25rem 1rem;
  }

  time,
  span,
  a {
    margin: 0 1.375rem 0 0;
    font-size: 1rem;
    line-height: 2.25;
    display: flex;
    align-items: center;

    svg {
      margin: 0 0.75rem 0 0;
    }
  }

  time,
  span {
    color: var(--font-secondary);
  }

  section {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    white-space: nowrap;
    line-height: 2.375rem;

    svg {
      min-width: 1.125rem;
    }
  }
`

const Share = styled("button")`
  width: 2.25rem;
  height: 2.25rem;
  margin: 0 -0.5rem 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--border-radius);
  color: var(--font-secondary);
  background-color: var(--background);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: var(--font-primary);
    background-color: var(--element-background);
  }
`

const ArticleMeta = ({
  name,
  title,
  description,
  create_date,
  date,
  license,
}: ArticleFrontmatterGraphQL) => {
  const [share, setShare] = useState(false)

  useEffect(() => {
    // @ts-ignore
    if (window?.navigator?.share) setShare(true)
  }, [])

  const handleShare = () => {
    if (share) {
      window.navigator.share({
        title: `${title} | 记录干杯`,
        text: description,
        url: `https://lifeni.life/article/${name}`,
      })
    }
  }

  return (
    <Meta>
      <h1 id={title.toLowerCase().replace(/\s/g, "-")}>{title}</h1>
      <p>{description}</p>
      <section>
        <time>
          <RiCalendarLine aria-label="日期图标" size="1.125rem" />
          {(create_date === date ? "创建于 " : "编辑于 ") + date}
        </time>
        {license === "CC-BY-SA-4.0" ? (
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/deed.zh"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RiCopyrightLine aria-label="版权图标" size="1.125em" />
            {license}
          </a>
        ) : (
          <span>
            <RiCopyrightLine aria-label="版权图标" size="1.125em" />
            {license}
          </span>
        )}

        {share && (
          <Share title="分享文章" onClick={handleShare}>
            <RiShareLine aria-label="分享文章" size="1.125rem" />
          </Share>
        )}
      </section>
    </Meta>
  )
}

export default ArticleMeta
