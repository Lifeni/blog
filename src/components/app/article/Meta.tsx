import styled from "@emotion/styled"
import { Fragment } from "react"
import { RiMarkupLine, RiTimeLine } from "react-icons/ri"

const H1 = styled("h1")`
  padding: 0.5rem 0 2.75rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.75;
  text-align: start;

  @media (max-width: 36rem) {
    padding: 0.5rem 0 1.75rem 0;
  }
`

const Description = styled("p")`
  display: flex;
  align-items: flex-start;
  padding: 0.125rem 0 0.25rem 0;
  line-height: 2.125;
  font-size: 1rem;
  font-weight: 700;

  svg {
    min-width: 1.125em;
    min-height: 1.125em;
    margin: 0.375rem 0.75em 0 0;
  }
`

const Time = styled("time")`
  margin: 0 1.5rem 0 0;
  padding: 0.125rem 0;
  display: flex;
  align-items: center;
  font-size: inherit;
  color: var(--font-secondary);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  svg {
    width: 1.125em;
    height: 1.125em;
    margin: 0 0.75em 0 0;
  }
`

const Hr = styled("hr")`
  width: calc(100% + 2rem);
  height: 0;
  margin: 2.5rem -1rem 1rem -1rem;
  border: none;
  border-top: var(--border);
  transition: all 0.2s;
`

interface MetaProps {
  frontmatter: Frontmatter
}

const Meta = ({ frontmatter }: MetaProps) => {
  return (
    <Fragment>
      <H1>{frontmatter.title}</H1>
      <Description>{frontmatter.description}</Description>
      <Time>
        <RiTimeLine aria-label="日期图标" />
        创建于 {frontmatter.create_date}
      </Time>

      <Time>
        <RiMarkupLine aria-label="编辑图标" />
        最后编辑于 {frontmatter.date}
      </Time>

      <Hr />
    </Fragment>
  )
}

export default Meta
