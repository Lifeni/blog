import styled from "@emotion/styled"
import { RiDoubleQuotesL, RiGithubFill, RiHashtag } from "react-icons/ri"

const Container = styled("div")`
  position: relative;
  width: 100%;
  padding: 2rem 1rem 2.75rem 1rem;
  display: flex;
  flex-direction: column;
  border-top: var(--border);
  font-size: 1rem;
  transition: all 0.2s;

  svg {
    width: 1.25em;
    height: 1.25em;
    margin: 0 0.75em 0 0;
  }

  @media (max-width: 36rem) {
    padding: 2rem 1rem;
  }
`

const H3 = styled("h3")`
  padding: 0 0 1.125rem 0;
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  line-height: 2;
  font-weight: 700;
  transition: all 0.2s;
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
    text-underline-offset: 0.375em;
  }
`

interface ReferenceProps {
  frontmatter: Frontmatter
}

const Reference = ({ frontmatter }: ReferenceProps) => {
  return (
    <Container>
      <H3>页面</H3>
      <Link href="#giscus">
        <RiHashtag aria-label="评论图标" />
        Giscus
      </Link>
      <Link
        href={`https://github.dev/Lifeni-Space/Notebook/blob/master/articles/${encodeURIComponent(
          frontmatter.title
        )}.md`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <RiGithubFill aria-label="GitHub 图标" />
        Edit on GitHub
      </Link>
      <Link
        href={`https://raw.githubusercontent.com/Lifeni-Space/Notebook/master/articles/${encodeURIComponent(
          frontmatter.title
        )}.md`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <RiDoubleQuotesL aria-label="源文件图标" />
        Source
      </Link>
    </Container>
  )
}

export default Reference
