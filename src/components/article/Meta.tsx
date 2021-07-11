import styled from "@emotion/styled"
import React from "react"
import { RiCalendarLine, RiCopyrightLine } from "react-icons/ri"

const Meta = styled("div")`
  width: calc(100% + 2rem);
  margin: 0 -1rem 1.75rem -1rem;
  padding: 0.25rem 1rem 3rem 1rem;
  border-bottom: var(--border);
  transition: all 0.2s;

  & + p {
    margin: 1.5rem 0 0 0 !important;
  }

  @media (max-width: 800px) {
    padding: 0 1rem 3rem 1rem;
  }

  @media (max-width: 720px) {
    margin: 0 -1rem 1.25rem -1rem;
    padding: 0 1rem;
    border-bottom: none;
  }

  time,
  span,
  a {
    margin: 0 1rem 0 0;
    font-size: 1rem;
    line-height: 2.25;
    display: flex;
    align-items: center;

    svg {
      margin: 0 0.5rem 0 0;
    }
  }

  time,
  span {
    color: var(--font-secondary);
  }

  section {
    padding: 0;
    display: flex;
    flex-wrap: wrap-reverse;
    align-items: center;
    white-space: nowrap;
    line-height: 2.375rem;

    svg {
      min-width: 1.125rem;
    }
  }
`

const ArticleMeta = ({
  title,
  description,
  create_date,
  date,
  license,
}: ArticleFrontmatterGraphQL) => {
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
      </section>
    </Meta>
  )
}

export default ArticleMeta
