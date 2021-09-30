import styled from "@emotion/styled"
import React from "react"
import { friends } from "../../../../data/friends"
import Avatar from "./Avatar"

const List = styled("div")`
  padding: 0.875rem 0 0.5rem 1px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`

const Friends = () => {
  return (
    <List>
      {friends.map((friend, index) => (
        <Avatar {...friend} key={index} />
      ))}
    </List>
  )
}

export default Friends
