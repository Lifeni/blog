import { css } from "@emotion/react"

const Details = css`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;

  summary {
    width: fit-content;
    padding: 0.375rem 1rem;
    border-radius: var(--border-radius);
    background-color: var(--element-background);
    cursor: pointer;
    user-select: none;
  }

  &[open] summary {
    margin-bottom: 1.75rem;
  }
`

export default Details
