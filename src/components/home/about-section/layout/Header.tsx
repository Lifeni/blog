import styled from "@emotion/styled"
import React from "react"

const Container = styled("div")`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const H2 = styled("h2")`
  font-size: 1.375rem;
  font-weight: 700;
  padding: 0.5rem 0 0.75rem 0;
  display: flex;
  align-items: center;

  @media (max-width: 720px) {
    padding: 0 0 1rem 0;
  }
`

interface HeaderProps {
  children: string
}

const Header = ({ children }: HeaderProps) => {
  return (
    <Container>
      <H2>{children}</H2>
    </Container>
  )
}

export default Header
