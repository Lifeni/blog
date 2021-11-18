import styled from "@emotion/styled"
import { RiChat1Line, RiCopyrightLine, RiHashtag } from "react-icons/ri"

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
    width: 1.125em;
    height: 1.125em;
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

const Link = styled("a")`
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

interface InformationProps {
  frontmatter: Frontmatter
}

const Information = ({ frontmatter }: InformationProps) => {
  return (
    <Container>
      <H3>页面</H3>
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
        {frontmatter.license === "CC-BY-SA-4.0"
          ? "署名-相同方式共享 4.0 国际"
          : frontmatter.license}
      </Link>
      <Link href="#giscus">
        <RiChat1Line aria-label="讨论图标" />
        转到 Giscus
      </Link>
    </Container>
  )
}

export default Information
