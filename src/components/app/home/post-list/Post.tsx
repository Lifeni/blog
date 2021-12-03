import styled from "@emotion/styled"
import { Link as GatsbyLink } from "gatsby"
import { RiBookOpenLine, RiCalendarLine } from "react-icons/ri"

const Container = styled("li")`
  position: relative;
  width: 100%;
  padding: 1.75rem 1rem;
  border-top: var(--border);
  list-style: none;
  transition: all 0.2s;

  &:first-of-type {
    margin: 0;
    border-top: none;
  }

  svg {
    width: 1.2em;
    height: 1.2em;
    margin: 0 0.75em 0 0;
  }

  @media (max-width: 36rem) {
    padding: 1.5rem 0.75rem;
  }
`

const Title = styled("h2")`
  padding: 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.75;
  text-align: start;
`

const TitleLink = styled(GatsbyLink)`
  color: var(--font-primary);
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    color: var(--font-link-hover);
  }
`

const Description = styled("p")`
  font-size: 1rem;
`

const Bar = styled("section")`
  position: relative;
  width: 100%;
  padding: 0.375rem 0;
  display: flex;
  flex-wrap: wrap;
  white-space: nowrap;

  @media (max-width: 36rem) {
    flex-direction: column;
  }
`

const Link = styled(GatsbyLink)`
  width: fit-content;
  display: flex;
  align-items: center;
  margin: 0 1.5rem 0 0;
  padding: 0.125rem 0;
  color: var(--font-link);
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    color: var(--font-link-hover);
    text-decoration: underline;
    text-underline-offset: 0.375em;
  }
`

const Time = styled("time")`
  width: fit-content;
  padding: 0.125rem 0;
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: var(--font-secondary);
  transition: all 0.2s;
`

interface PostProps {
  post: Frontmatter
}

const Post = ({ post }: PostProps) => {
  return (
    <Container>
      <Title>
        <TitleLink to={`/article/${post.name}`}>{post.title}</TitleLink>
      </Title>
      <Description>{post.description}</Description>
      <Bar>
        <Link to={`/article/${post.name}`}>
          <RiBookOpenLine aria-label="查看图标" />
          查看全文
        </Link>
        <Time>
          <RiCalendarLine aria-label="日期图标" />
          {post.date === post.create_date ? "创建于" : "编辑于"} {post.date}
        </Time>
      </Bar>
    </Container>
  )
}

export default Post
