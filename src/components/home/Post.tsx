import styled from "@emotion/styled"
import { Link } from "gatsby"
import React from "react"
import { RiBookOpenLine, RiCalendarLine } from "react-icons/ri"
import Info from "../common/Info"

const Post = styled("div")`
  width: 100%;
  max-width: var(--main-width);
  padding: 2.5rem 1rem;
  border-bottom: var(--border);
  transition: all 0.2s;

  &:last-of-type {
    border: none;
  }

  @media (max-width: 800px) {
    padding: 2rem 1rem;
  }

  @media (max-width: 720px) {
    padding: 1.5rem 1rem;
  }
`

const Time = styled("time")`
  display: flex;
  align-items: center;
  font-size: 1rem;
  line-height: 2.25;
  color: var(--font-secondary);

  svg {
    margin: 0 0.75rem 0 0;
  }
`

const Title = styled("h2")`
  padding: 0.5rem 0;
  font-size: 1.375rem;
  line-height: 1.75;
  font-weight: 700;

  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.2s;

    &:hover,
    &:focus-visible {
      color: var(--font-link);
    }
  }
`

const Description = styled("p")`
  font-size: 1rem;
  line-height: 2;
  width: fit-content;
  max-width: 100%;
  text-overflow: ellipsis;
  text-align: justify;
  text-justify: auto;
  overflow-wrap: break-word;
`

const Action = styled("section")`
  padding: 0.375rem 0;
  display: flex;
  align-items: center;
  white-space: nowrap;
  flex-wrap: wrap;

  a {
    margin: 0 1.375rem 0 0;
    display: flex;
    align-items: center;
    text-decoration: none;
    border: none;
    color: var(--font-link);
    line-height: 2.25;

    svg {
      margin: 0 0.75rem 0 0;
    }

    &:hover {
      color: var(--font-link-hover);
      text-decoration: underline;
      text-underline-offset: 0.25em;
    }
  }
`

const ArticlePost = ({
  create_date,
  date,
  title,
  description,
  name,
}: ArticleFrontmatterGraphQL) => {
  return (
    <Post>
      <Title>
        <Link to={`/article/${name}`}>{title}</Link>
      </Title>
      <Description>{description}</Description>
      <Action>
        <Link to={`/article/${name}`}>
          <RiBookOpenLine aria-label="查看图标" size="1.125rem" />
          查看全文
        </Link>
        <Time>
          <RiCalendarLine aria-label="日期图标" size="1.125rem" />
          {(create_date === date ? "创建于 " : "编辑于 ") + date}
        </Time>

        <Info create_date={create_date} date={date} title={title} name={name} />
      </Action>
    </Post>
  )
}

export default ArticlePost
