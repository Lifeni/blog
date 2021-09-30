import { css } from "@emotion/react"

const Image = css`
  width: calc(100% + 2rem);
  margin: 1rem -1rem;
  border-radius: var(--border-radius);
  display: flex;

  & + img {
    margin-top: 0.25rem;
  }
`

export default Image
