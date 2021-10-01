import styled from "@emotion/styled"
import React, { ReactNode } from "react"

const Container = styled("header")`
  position: relative;
  top: 0;
  z-index: 10;
  width: 100%;
  margin: 0;
  padding: 4.25rem 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  pointer-events: none;
  transition: all 0.2s;

  @media (max-width: 800px) {
    padding: 4rem 0 0.75rem 0;
  }

  @media (max-width: 720px) {
    padding: 1.25rem 0 0.25rem 0;
  }
`

const Bar = styled("div")`
  width: 100%;
  max-width: var(--main-width);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--font-secondary);
  border-radius: var(--border-radius);
  background-color: var(--element-background);
  transition: all 0.2s;
  pointer-events: initial;
`

interface HeaderProps {
  children: ReactNode | ReactNode[]
}

const Header = ({ children }: HeaderProps) => {
  return (
    <Container>
      <Bar>{children}</Bar>
    </Container>
  )
}

export default Header
