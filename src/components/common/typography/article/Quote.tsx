import { css } from "@emotion/react"

const Quote = css`
  margin: 1rem 0;
  padding: 0.25rem 1.5rem;
  border-left: var(--border-block);
  color: var(--font-secondary);
  transition: all 0.2s;
  display: flex;
  flex-direction: column;

  .gatsby-highlight {
    width: 100%;
    margin: 0.75rem 0;
  }
`

export default Quote
