import styled from "@emotion/styled"
import React from "react"

const FriendList = styled("div")`
  display: flex;
  padding: 1rem 0;
`

const FriendLink = styled("a")`
  position: relative;
  width: 2.25rem;
  height: 2.25rem;
  margin: 0 1rem 0 0;
  padding: 0;
  display: flex;

  &::before {
    content: attr(title);
    position: absolute;
    left: 50%;
    top: -2.75rem;
    width: fit-content;
    padding: 0.125rem 0.5rem;
    border-radius: 0.25rem;
    background-color: var(--popover-background);
    opacity: 0;
    visibility: hidden;
    z-index: 10;
    color: var(--popover-color);
    font-size: 0.925rem;
    white-space: nowrap;
    transform: translateX(-50%);
    box-shadow: var(--shadow);
    transition: all 0.2s;
  }

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: -0.675rem;
    width: fit-content;
    border: solid 0.5rem transparent;
    border-top: solid 0.5rem var(--popover-background);
    opacity: 0;
    visibility: hidden;
    z-index: 10;
    transform: translateX(-50%);
    box-shadow: var(--shadow);
    transition: all 0.2s;
  }

  &:hover::before,
  &:hover::after {
    opacity: 1;
    visibility: visible;
  }
`

const FriendAvatar = styled("img")`
  width: 2.25rem !important;
  height: 2.25rem !important;
  margin: 0 !important;
  border-radius: 100% !important;
  background-color: var(--element-background);
  overflow: hidden;
  font-size: 0.875rem;
`

interface FriendProps {
  name: string
  link: string
}

const Friend = ({ name, link }: FriendProps) => {
  return (
    <FriendLink
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      title={name}
    >
      <FriendAvatar
        src={`https://file.lifeni.life/avatar/friends/${name}.webp`}
        alt={name}
      />
    </FriendLink>
  )
}

export { Friend, FriendList }
