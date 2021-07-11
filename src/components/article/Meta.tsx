import styled from "@emotion/styled"
import React from "react"
import { RiCalendarLine, RiCopyrightLine } from "react-icons/ri"

const Meta = styled("div")`
  width: calc(100% + 2rem);
  margin: 0 -1rem 2rem -1rem;
  padding: 0.25rem 1rem 3.25rem 1rem;
  border-bottom: var(--border);
  transition: all 0.2s;

  @media (max-width: 800px) {
    padding: 0 1rem 3rem 1rem;
  }

  @media (max-width: 720px) {
    margin: 0 -1rem 1.25rem -1rem;
    padding: 0 1rem;
    border-bottom: none;
  }

  time,
  span {
    margin: 0 1rem 0 0;
    font-size: 1rem;
    line-height: 2;
    color: var(--font-secondary);
    display: flex;
    align-items: center;

    svg {
      margin: 0 0.5rem 0 0;
    }
  }

  section {
    padding: 0.125rem 0;
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
      <h1>{title}</h1>
      <p>{description}</p>
      <section>
        <time>
          <RiCalendarLine aria-label="日期图标" size="1.125rem" />
          {(create_date === date ? "创建于 " : "最后编辑于 ") + date}
        </time>
        <span>
          <RiCopyrightLine aria-label="版权图标" size="1.125em" />
          {license}
        </span>
      </section>
    </Meta>
  )
}

export default ArticleMeta
