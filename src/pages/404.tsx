import styled from "@emotion/styled"
import Layout from "../components/layout/Layout"

const Container = styled("article")`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 2.25rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: var(--font-sans);
  font-size: 1rem;
  line-height: 2;
  flex: 1;

  @media (max-width: 36rem) {
    padding: 2rem 0.75rem;
  }
`

const H1 = styled("h1")`
  font-size: 2rem;
  font-family: var(--font-mono);
  font-weight: 700;
`

const NotFoundPage = () => {
  return (
    <Layout
      hasSidebar={false}
      isCentered={true}
      title="找不到页面"
      description="你要找的页面不在这里。"
    >
      <Container>
        <H1>[&nbsp;找不到页面&nbsp;]</H1>
      </Container>
    </Layout>
  )
}

export default NotFoundPage
