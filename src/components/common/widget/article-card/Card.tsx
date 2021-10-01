import styled from "@emotion/styled"
import React from "react"
import Spacer from "../../layout/tool/Spacer"
import MoreInfo from "../modal/MoreInfo"
import Action from "./bar/Action"
import Bar from "./bar/Bar"
import License from "./bar/License"
import Time from "./bar/Time"
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
  from: "home" | "article"
  frontmatter: IFrontMatter
}

const ArticleCard = ({ from, frontmatter }: PostCardProps) => {
  const { create_date, date, title, description, name } = frontmatter

  return (
    <Container>
      <Title from={from} name={name}>
        {title}
      </Title>
      <Description>{description}</Description>
      <Bar>
        {from === "home" && <Action name={name} />}
        <Time>{(create_date === date ? "创建于 " : "编辑于 ") + date}</Time>
        {from === "article" && <License>{frontmatter.license || ""}</License>}
        <Spacer />
        <MoreInfo {...frontmatter} />
      </Bar>
    </Container>
  )
}

export default ArticleCard
