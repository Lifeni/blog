import styled from "@emotion/styled"
import { Giscus } from "@giscus/react"
import { useState } from "react"
import { RiDiscussLine } from "react-icons/ri"

const Container = styled("div")`
  width: 100%;
  margin: 2.5rem 0 0 0;

  @media (max-width: 36rem) {
    margin: 1.5rem 0 0 0;
  }
`

const Action = styled("button")`
  display: flex;
  align-items: center;
  border: none;
  font-size: inherit;
  line-height: inherit;
  font-family: inherit;
  background-color: transparent;
  color: var(--font-link);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: var(--font-link-hover);
  }

  svg {
    width: 1.125rem;
    height: 1.125rem;
    margin: 0 0.75rem 0 0;
  }
`

const Comment = () => {
  const [showComment, setShowComment] = useState(false)

  return (
    <Container id="giscus">
      {showComment ? (
        <Giscus
          repo="Lifeni-Space/Blog"
          repoId="MDEwOlJlcG9zaXRvcnkyOTY0ODMwNDU="
          category="Comment"
          categoryId="DIC_kwDOEav45c4B-c6k"
          mapping="pathname"
          reactionsEnabled="1"
          emitMetadata="0"
          theme={
            window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "transparent_dark"
              : "light"
          }
        />
      ) : (
        <Action onClick={() => setShowComment(true)}>
          <RiDiscussLine aria-label="评论图标" />
          打开 Giscus
        </Action>
      )}
    </Container>
  )
}

export default Comment