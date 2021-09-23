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

    @media (max-width: 800px) {
      padding: 1.5rem 1rem 2rem 1rem;
    }

    h2 {
      font-size: 1.375rem;
      padding: 0 0 0.5rem 0;
      line-height: 1.875;
      font-weight: 700;
    }

    p {
      font-size: 1rem;
      line-height: 2;
    }
  }
`

export default ArticleList
