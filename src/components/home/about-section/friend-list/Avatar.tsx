import styled from "@emotion/styled"
import React from "react"

const Image = styled("img")`
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  border-radius: 100% !important;
  background-color: var(--element-background);
  color: transparent;
`

const ToolTip = styled("span")`
  position: absolute;
  left: 50%;
  bottom: 3rem;
  padding: 0.125rem 0.625rem;
  visibility: hidden;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius);
  color: var(--font-light);
  background-color: var(--font-primary);
  font-size: 0.875rem;
  white-space: nowrap;
  transform: translateX(-50%);
  transition: all 0.2s;
`

const Link = styled("a")`
  position: relative;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 100%;

  &:hover ${ToolTip} {
    visibility: visible;
    opacity: 1;
  }
`

interface AvatarProps {
  link: string
  name: string
}

const Avatar = ({ link, name }: AvatarProps) => {
  return (
    <Link href={link} target="_blank" rel="nofollow noopener noreferrer">
      <Image
        src={`https://file.lifeni.life/avatar/friends/${name}.webp`}
        alt={name}
      />
      <ToolTip>{name}</ToolTip>
    </Link>
  )
}

export default Avatar
