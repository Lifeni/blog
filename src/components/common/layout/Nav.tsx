import styled from "@emotion/styled"
import React from "react"
import { links } from "../../../data/links"
import BarAction from "../../base/action/Bar"

const Container = styled("section")`
  position: relative;
  padding: 0 1.25rem 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  line-height: 2;

  @media (max-width: 720px) {
    padding: 0 1.25rem 0.5rem 1.25rem;
  }
`

const Nav = () => {
  return (
    <Container>
      {links.map(link => (
        <BarAction as="a" {...link} key={link.title}>
          {link.title}
        </BarAction>
      ))}
    </Container>
  )
}

export default Nav
