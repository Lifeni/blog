import styled from "@emotion/styled"
import React from "react"
import { RiCalendarLine } from "react-icons/ri"

const Container = styled("time")`
  margin: 0 1.375rem 0 0;
  display: flex;
  align-items: center;
  font-size: 1rem;
  line-height: 2.25;
  color: var(--font-secondary);

  svg {
    width: 1.125rem;
    height: 1.125rem;
    margin: 0 0.75rem 0 0;
  }
`

interface DateProps {
  children: string
}

const Time = ({ children }: DateProps) => {
  return (
    <Container>
      <RiCalendarLine aria-label="日期图标" />
      {children}
    </Container>
  )
}

export default Time
