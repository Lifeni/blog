import styled from "@emotion/styled"
import { Link as GatsbyLink } from "gatsby"
import { RiHome2Line } from "react-icons/ri"
import Button from "../../app/common/base/Button"
import Nav from "./Nav"
import Search from "./Search"

const Container = styled("header")`
  position: relative;
  width: 100%;
  padding: 0.75rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--element-background);
  border-bottom: var(--border);
  transition: all 0.2s;

  @media (max-width: 64rem) {
    padding: 0.75rem 1.5rem;
  }

  @media (max-width: 56rem) {
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  @media (max-width: 48rem) {
    padding: 0.75rem 0.875rem;
  }
`

const Section = styled("section")`
  display: flex;
  align-items: center;
`

interface HeaderProps {
  noSidebar?: boolean
}

const Header = ({ noSidebar }: HeaderProps) => {
  const Link = Button.withComponent(GatsbyLink)
  return (
    <Container>
      <Section>
        <Link to="/" data-name="主页">
          <RiHome2Line aria-label="主页图标" />
        </Link>
      </Section>
      <Section>
        <Search />
        {noSidebar ? null : <Nav />}
      </Section>
    </Container>
  )
}

export default Header
