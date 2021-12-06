import styled from "@emotion/styled"
import { Link as GatsbyLink } from "gatsby"
import { RiDoorOpenFill } from "react-icons/ri"
import Button from "../components/app/common/base/Button"
import Layout from "../components/layout/Layout"

const Container = styled("article")`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
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
  width: fit-content;
  margin: 1rem 0;
  font-size: 1.375rem;
  font-family: var(--font-mono);
  font-weight: 700;
  line-height: 1.75;
  text-align: center;
  transition: all 0.2s;
`

const Action = styled(Button)`
  svg {
    width: 1.625rem;
    height: 1.625rem;
  }
`

const NotFoundPage = () => {
  const Link = Action.withComponent(GatsbyLink)

  return (
    <Layout
      hasHeader={false}
      hasFooter={false}
      isCentered={true}
      title="找不到页面"
      description="你要找的页面不在这里。"
    >
      <Container>
        <H1>你要找的页面不在这里</H1>
        <Link to="/" data-name="回到主页">
          <RiDoorOpenFill aria-label="回到主页" />
        </Link>
      </Container>
    </Layout>
  )
}

export default NotFoundPage
