import styled from "@emotion/styled"

const ArticleList = styled("main")`
  position: relative;
  width: 100%;
  padding: 0 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .null {
    width: 100%;
    max-width: var(--main-width);
    padding: 2.5rem 1rem 3rem 1rem;
    display: flex;
    flex-direction: column;

    @media (max-width: 800px) {
      padding: 1.75rem 1rem;
    }

    h1 {
      font-size: 1.375rem;
      padding: 0.5rem 0 0.75rem 0;
      font-weight: 700;
      display: flex;
      align-items: center;

      @media (max-width: 720px) {
        padding: 0 0 1rem 0;
      }
    }

    p {
      margin: 0.375rem 0;
      font-size: inherit;
      line-height: inherit;
      text-align: justify;
      text-justify: auto;
      overflow-wrap: break-word;
    }

    ul,
    ol {
      margin: 0.375rem 0;
      padding: 0 0 0 1.5rem;

      li {
        margin: 0;
        padding: 0 0 0 0.5rem;
      }
    }

    code {
      font-size: 0.875em;
      padding: 0.25em 0.5em;
      border-radius: var(--border-radius);
      background-color: var(--element-background);
      font-family: var(--font-mono);
      transition: all 0.2s;
      overflow-wrap: break-word;
    }
  }
`

export default ArticleList
