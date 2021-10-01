import { css } from "@emotion/react"
import styled from "@emotion/styled"
import Code from "../../common/typography/article/Code"

const List = css`
  position: relative;
  width: 100%;
  height: auto;
  padding: 0 0 0 1.5rem;
  display: flex;
  flex-direction: column;
`

const ListItem = css`
  max-width: 100%;
  display: flex;
  list-style: none;
  flex-direction: column;
`

const Link = css`
  width: fit-content;
  max-width: 100%;
  height: auto;
  padding: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 2.375;
  display: inline-block;
  color: var(--font-secondary);
  text-decoration: none;

  code {
    ${Code}
  }

  &:focus,
  &:focus-visible,
  &:hover {
    background-color: var(--background);
    color: var(--font-primary);
  }
`

const Content = styled("nav")`
  width: calc(100% - 2.5rem);
  max-width: var(--widget-width);
  height: auto;
  max-height: 65vh;
  z-index: 200;
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius);
  background-color: var(--background);
  overflow: hidden;
  transition: all 0.2s;

  & > ul {
    padding: 1.5rem 2rem !important;
    overflow: auto;
  }

  ul {
    ${List}

    p,li {
      ${ListItem}
    }
  }

  a {
    ${Link}
  }
`

export default Content
