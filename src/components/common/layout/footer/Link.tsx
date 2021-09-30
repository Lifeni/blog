import styled from "@emotion/styled"
import React, { ReactNode } from "react"
import Logo from "./Logo"

const Container = styled("a")`
  width: fit-content;
  max-width: 100%;
  margin: 0 1.375rem 0 0;
  padding: 0.1875rem 0;
  display: flex;
  align-items: center;
  color: var(--font-secondary);
  font-size: 1rem;
  line-height: 2;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: all 0.2s;

  &:hover {
    color: var(--font-primary);

    ${Logo} {
      filter: grayscale(0);
    }
  }
`

interface LinkProps {
  link: string
  children: ReactNode | ReactNode[]
}

const Link = ({ link, children }: LinkProps) => {
  return (
    <Container href={link} target="_blank" rel="noopener noreferrer">
      {children}
    </Container>
  )
}

export default Link
