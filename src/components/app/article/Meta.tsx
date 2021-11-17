import styled from "@emotion/styled"
import { RiCopyrightLine, RiMarkupLine, RiTimeLine } from "react-icons/ri"

const Container = styled("section")`
  position: relative;
  width: 100%;
  padding: 2.25rem 1rem;
  display: flex;
  flex-direction: column;
  border-bottom: var(--border);
  font-size: 1rem;
  transition: all 0.2s;

  svg {
    width: 1.25em;
    height: 1.25em;
    margin: 0 0.75em 0 0;
  }

  @media (max-width: 36rem) {
    padding: 1.5rem 1rem;
  }
`

const H3 = styled("h3")`
  padding: 0.5rem 0 1.125rem 0;
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  line-height: 2;
  font-weight: 700;
  transition: all 0.2s;

  @media (max-width: 36rem) {
    padding: 0.5rem 0 0.875rem 0;
  }
`

const Time = styled("time")`
  padding: 0.125rem 0;
  display: flex;
  align-items: center;
  font-size: inherit;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const Copyright = styled("a")`
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 0.125rem 0;
  color: var(--font-link);
  font-size: inherit;
  text-decoration: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  transition: all 0.2s;

  &:hover {
    color: var(--font-link-hover);
    text-decoration: underline;
    text-underline-offset: 0.25em;
  }
`

interface MetaProps {
  frontmatter: Frontmatter
}

const Meta = ({ frontmatter }: MetaProps) => {
  return (
    <Container>
      <H3>文章</H3>
      <Time>
        <RiTimeLine aria-label="日期图标" />
        创建于 {frontmatter.create_date}
      </Time>
      <Time>
        <RiMarkupLine aria-label="编辑图标" />
        最后编辑于 {frontmatter.date}
      </Time>
      <Copyright
        href={
          frontmatter.license === "CC-BY-SA-4.0"
            ? "https://creativecommons.org/licenses/by-sa/4.0/deed.zh"
            : ""
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <RiCopyrightLine aria-label="版权图标" />
        {frontmatter.license}
      </Copyright>
    </Container>
  )
}

export default Meta
