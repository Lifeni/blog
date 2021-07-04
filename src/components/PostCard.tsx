import styled from "@emotion/styled"
import { Link } from "gatsby"
import * as React from "react"
import { RiEyeLine, RiTimeLine } from "react-icons/ri"

const Card = styled("div")`
  width: 100%;
  max-width: var(--main-width);
  padding: 2rem 1rem;
  border-bottom: var(--border);
  transition: all 0.2s;

  &:last-of-type {
    border: none;
  }

  @media (max-width: 800px) {
    padding: 1.5rem 1rem;
  }
`

const Time = styled("time")`
  display: flex;
  align-items: center;
  font-size: 1rem;
  line-height: 2;
  color: var(--font-secondary);
  gap: 0.5rem;
`

const Title = styled("h2")`
  padding: 0.5rem 0;
  font-size: 1.375rem;
  line-height: 1.875;
  font-weight: 600;

  a {
    color: inherit;
    text-decoration: none;
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
  padding: 0.5rem 0;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  white-space: nowrap;

  a {
    display: flex;
    align-items: center;
    vertical-align: middle;
    text-decoration: none;
    border: none;
    color: var(--font-link);
    gap: 0.5rem;

    &:hover {
      color: var(--font-link-hover);
      text-decoration: underline;
      text-underline-offset: 0.25rem;
    }

    @media (max-width: 480px) {
      display: none;
    }
  }
`

const PostCard = ({ create_date, date, title, description, name }) => {
  return (
    <Card>
      <Title>
        <Link to={`/article/${name}`}>{title}</Link>
      </Title>
      <Description>{description}</Description>
      <Action>
        <Link to={`/article/${name}`}>
          <RiEyeLine aria-label="查看图标" size="1.125rem" />
          查看全文
        </Link>
        <Time>
          <RiTimeLine aria-label="时间图标" size="1.125rem" />
          {(create_date === date ? "创建于 " : "最后编辑于 ") + date}
        </Time>
      </Action>
    </Card>
  )
}

export default PostCard
