import { css } from "@emotion/react"

const CodeBlock = css`
  position: relative;
  width: calc(100% + 2rem);
  margin: 1rem -1rem;
  border-radius: var(--border-radius);
  overflow: hidden;

  & + .gatsby-highlight {
    margin-top: 0.25rem;
  }

  pre {
    margin: 0;
    padding: 1.125rem 1.5rem;
    display: flex;
    background-color: var(--element-background);
    transition: all 0.2s;
    overflow: auto;

    &::after {
      content: "";
      display: inline-block;
      width: 1.5rem;
    }

    code {
      padding: 0;
      border: none;
      line-height: 1.875;
      background-color: transparent !important;
      font-family: var(--font-mono);
    }
  }
`

export default CodeBlock
