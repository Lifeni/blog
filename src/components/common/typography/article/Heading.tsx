import { css } from "@emotion/react"

const H1 = css`
  padding: 1.5rem 0 0 0;
  font-size: 1.5rem;
  line-height: 1.875;

  @media (max-width: 800px) {
    padding: 1.5rem 0 0 0;
  }

  @media (max-width: 720px) {
    padding: 1.5rem 0 0.25rem 0;
  }

  & + h2 {
    margin: 2rem 0 0 0;

    @media (max-width: 720px) {
      margin: 1.25rem 0 0 0;
    }
  }
`

const H2 = css`
  padding: 1.25rem 0;
  font-size: 1.375rem;
  line-height: 1.75;

  & + h3 {
    padding: 0.5rem 0 1rem 0;
  }
`

const H3 = css`
  padding: 1rem 0;
  font-size: 1.25rem;
  line-height: 2;
`

const H4 = css`
  padding: 0.375rem 0;
  font-size: 1.125rem;
  line-height: 2;
`

const Heading = css`
  position: relative;
  max-width: 100%;
  width: fit-content;
  vertical-align: middle;

  code {
    max-width: 100%;
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export { Heading, H1, H2, H3, H4 }
