import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Link as GatsbyLink } from "gatsby"
import React, { ReactNode } from "react"
import { IconType } from "react-icons"

const Container = css`
  min-width: 3.5rem;
  height: 3.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  display: flex;
  align-items: center;
  color: var(--font-secondary);
  background-color: transparent;
  font-size: 1rem;
  font-family: inherit;
  font-weight: inherit;
  line-height: 2;
  outline: none;
  transition: all 0.2s;
  pointer-events: initial;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;

  &::-webkit-details-marker {
    display: none;
  }

  &:focus,
  &:focus-visible,
  &:hover {
    background-color: var(--element-background-hover);
  }
`

const A = styled("a")`
  ${Container}
`

const Button = styled("button")`
  ${Container}
`

const Link = styled(GatsbyLink)`
  ${Container}
`

const Icon = styled("svg")`
  width: 1.125rem;
  height: 1.125rem;
  margin: 0 1rem 0 0;
`

interface ActionProps {
  as: "a" | "button" | "link"
  link?: string
  action?: () => void
  icon: IconType
  label: string
  title?: string
  left?: boolean
  right?: boolean
  children: ReactNode | ReactNode[]
}

const BlockAction = ({
  as,
  link,
  action,
  icon,
  label,
  title,
  left,
  right,
  children,
}: ActionProps) => {
  const className = `round-${left ? "left" : right ? "right" : ""}`

  return as === "a" ? (
    <A
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      className={className}
    >
      <Icon as={icon} aria-label={label} /> {children}
    </A>
  ) : as === "button" ? (
    <Button onClick={action} title={title} className={className}>
      <Icon as={icon} aria-label={label} /> {children}
    </Button>
  ) : (
    <Link to={link || "/"} title={title} className={className}>
      <Icon as={icon} aria-label={label} /> {children}
    </Link>
  )
}

export default BlockAction
