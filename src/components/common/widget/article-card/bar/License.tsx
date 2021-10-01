import styled from "@emotion/styled"
import React from "react"
import { RiCopyrightLine } from "react-icons/ri"

const Container = styled("a")`
  margin: 0 1.375rem 0 0;
  display: flex;
  align-items: center;
  font-size: 1rem;
  line-height: 2.25;
  color: var(--font-link);

  svg {
    width: 1.125rem;
    height: 1.125rem;
    margin: 0 0.75rem 0 0;
  }
`

interface LicenseProps {
  children: string
}

const License = ({ children }: LicenseProps) => {
  return (
    <Container
      href="https://creativecommons.org/licenses/by-sa/4.0/deed.zh"
      target="_blank"
      rel="noopener noreferrer"
    >
      <RiCopyrightLine aria-label="版权图标" size="1.125em" />
      {children}
    </Container>
  )
}

export default License
