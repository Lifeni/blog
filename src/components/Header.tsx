import styled from "@emotion/styled"

const Header = styled("header")`
  position: sticky;
  top: -3.5rem;
  z-index: 10;
  width: 100%;
  padding: 3.5rem 1.25rem 0 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  pointer-events: none;

  @media (max-width: 800px) {
    top: -2rem;
    padding: 2rem 1.25rem 0 1.25rem;
  }

  @media (max-width: 720px) {
    top: 0;
    padding: 0 1.25rem;
  }
`

export default Header
