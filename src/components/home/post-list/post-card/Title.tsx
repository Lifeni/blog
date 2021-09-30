import styled from "@emotion/styled"
import React from "react"
import { Link } from "gatsby"

const Container = styled("h2")`
  padding: 0.5rem 0;
  font-size: 1.375rem;
  line-height: 1.75;
  font-weight: 700;

  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.2s;

    &:hover,
    &:focus-visible {
      color: var(--font-link);
    }
  }
`

interface TitleProps {
  name: string
  children: string
}

const Title = ({ name, children }: TitleProps) => {
  return (
    <Container>
      <Link to={`/article/${name}`} state={{ fromHome: true }}>
        {children}
      </Link>
    </Container>
  )
}

export default Title
