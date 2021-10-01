import styled from "@emotion/styled"
import React, { ReactNode } from "react"
import { IconType } from "react-icons"

const Container = styled("a")`
  width: 100%;
  max-width: var(--main-width);
  height: 3.5rem;
  margin: 0.5rem auto;
  padding: 0.75rem 1.25rem;
  border-radius: var(--border-radius);
  border: none;
  display: flex;
  align-items: center;
  color: var(--font-secondary);
  background-color: var(--element-background);
  font-size: 1rem;
  font-family: inherit;
  font-weight: inherit;
  line-height: 2;
  outline: none;
  transition: all 0.2s;
  pointer-events: initial;
  cursor: pointer;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 800px) {
    margin: 1rem 0 0 0;
  }

  &:focus,
  &:focus-visible,
  &:hover {
    background-color: var(--element-background-hover);
  }
`

const Icon = styled("svg")`
  width: 1.125rem;
  height: 1.125rem;
  margin: 0 1rem 0 0;
`

const Description = styled("small")`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

interface ActionProps {
  as: "a" | "button"
  link?: string
  action?: () => void
  description: string
  icon: IconType
  label: string
  children: string | ReactNode | ReactNode[]
}

const BarAction = ({
  as,
  link,
  action,
  description,
  icon,
  label,
  children,
}: ActionProps) => {
  return as === "a" ? (
    <Container as={as} href={link} target="_blank" rel="noopener noreferrer">
      <Icon as={icon} aria-label={label} />
      {children}
      <Description>{description}</Description>
    </Container>
  ) : (
    <Container as={as} onClick={action}>
      <Icon as={icon} aria-label={label} />
      {children}
      <Description>{description}</Description>
    </Container>
  )
}

export default BarAction
