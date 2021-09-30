import styled from "@emotion/styled"
import { Link } from "gatsby"
import React from "react"
import { RiBookOpenLine } from "react-icons/ri"

const Container = styled(Link)`
  margin: 0 1.375rem 0 0;
  display: flex;
  align-items: center;
  text-decoration: none;
  border: none;
  color: var(--font-link);
  line-height: 2.25;
  transition: all 0.2s;

  svg {
    width: 1.125rem;
    height: 1.125rem;
    margin: 0 0.75rem 0 0;
  }

  &:hover {
    color: var(--font-link-hover);
    text-decoration: underline;
    text-underline-offset: 0.25em;
  }
`

interface ActionProps {
  name: string
}

const Action = ({ name }: ActionProps) => {
  return (
    <Container to={`/article/${name}`} state={{ fromHome: true }}>
      <RiBookOpenLine aria-label="查看图标" />
      查看全文
    </Container>
  )
}

export default Action
