import styled from "@emotion/styled"
import React from "react"
import Spacer from "../../../common/layout/tool/Spacer"
import Action from "./action-bar/Action"
import Bar from "./action-bar/Bar"
import MoreInfo from "../../../common/widget/modal/MoreInfo"
import Time from "./action-bar/Time"
import Description from "./Description"
import Title from "./Title"

const Container = styled("div")`
  width: 100%;
  max-width: var(--main-width);
  padding: 2.5rem 1rem;
  border-bottom: var(--border);
  transition: all 0.2s;

  &:last-of-type {
    border: none;
  }

  @media (max-width: 800px) {
    padding: 2rem 1rem;
  }

  @media (max-width: 720px) {
    padding: 1.5rem 1rem;
  }
`

interface PostCardProps {
  create_date: string
  date: string
  title: string
  description: string
  name: string
}

const PostCard = (props: PostCardProps) => {
  const { create_date, date, title, description, name } = props

  return (
    <Container>
      <Title name={name}>{title}</Title>
      <Description>{description}</Description>
      <Bar>
        <Action name={name} />
        <Time>{(create_date === date ? "创建于 " : "编辑于 ") + date}</Time>
        <Spacer />
        <MoreInfo {...props} />
      </Bar>
    </Container>
  )
}

export default PostCard
