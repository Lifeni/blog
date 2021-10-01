import styled from "@emotion/styled"
import React from "react"
import { Link } from "gatsby"

const Container = styled("h1")`
  padding: 0.5rem 0;
  font-size: ${props => (props.as === "h1" ? "1.5rem" : "1.375rem")};
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
  from: "home" | "article"
  name: string
  children: string
}

const Title = ({ from, name, children }: TitleProps) => {
  return (
    <Container as={from === "article" ? "h1" : "h2"}>
      <Link to={`/article/${name}`} state={{ fromHome: true }}>
        {children}
      </Link>
    </Container>
  )
}

export default Title
