import { css } from "@emotion/react"

const Link = css`
  color: var(--font-link);
  text-decoration: none;
  overflow-wrap: break-word;

  &:hover {
    color: var(--font-link-hover);
    text-underline-offset: 0.25em;
    text-decoration: underline;
  }
`

export default Link
