import styled from "@emotion/styled"
import { Fragment } from "react"
import { RiCopyrightLine, RiMarkupLine } from "react-icons/ri"
import { ExternalLink } from "./provider/Component"

const H1 = styled("h1")`
  padding: 0.375rem 0 1.25rem 0;
  font-size: 1.375rem;
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
  line-height: inherit;
  font-size: inherit;

  svg {
    min-width: 1.25em;
    min-height: 1.25em;
    margin: 0.375rem 0.75em 0 0;
  }
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

const Time = styled("time")`
  width: fit-content;
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
    width: 1.25em;
    height: 1.25em;
    margin: 0 0.75em 0 0;
  }
`

const Link = styled(ExternalLink)`
  width: fit-content;
  padding: 0.125rem 0;
  display: flex;
  align-items: center;

  svg {
    width: 1.25em;
    height: 1.25em;
    margin: 0 0.75em 0 0;
  }
`

const Hr = styled("hr")`
  width: calc(100% + 2rem);
  height: 0;
  margin: 2rem -1rem 1rem -1rem;
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
      <Bar>
        <Time>
          <RiMarkupLine aria-label="编辑图标" />
          {frontmatter.date === frontmatter.create_date
            ? "创建于"
            : "编辑于"}{" "}
          {frontmatter.date}
        </Time>
        <Link
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
        </Link>
      </Bar>
      <Hr />
    </Fragment>
  )
}

export default Meta
