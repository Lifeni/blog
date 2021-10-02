import styled from "@emotion/styled"
import React from "react"
import { RiMore2Line } from "react-icons/ri"
import useDiclosure from "../../../../hooks/useDiclosure"
import Modal from "../../../base/modal/Modal"

const Action = styled("button")`
  width: 2.25rem;
  height: 2.25rem;
  margin: 0 -0.5rem 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--border-radius);
  color: var(--font-secondary);
  background-color: var(--background);
  cursor: pointer;
  transition: all 0.2s;
  animation: show 0.2s;

  &:hover {
    color: var(--font-primary);
    background-color: var(--element-background);
  }

  svg {
    width: 1.125rem;
    height: 1.125rem;
  }
`

const Content = styled("article")`
  width: calc(100% - 2.5rem) !important;
  max-width: var(--widget-width) !important;
  height: auto;
  max-height: 65vh !important;
  padding: 1.5rem 2rem !important;
  z-index: 200;
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius);
  background-color: var(--background);
  overflow: hidden;
  transition: all 0.2s;
  font-size: 1rem;
  line-height: 2 !important;
`

const H1 = styled("h1")`
  width: 100%;
  font-size: 1.125rem !important;
  font-weight: 700;
  line-height: 1.75 !important;
  margin: 0 !important;
  padding: 0 !important;
  white-space: normal;
`

const Hr = styled("hr")`
  margin: 1rem 0 !important;
  padding: 0 !important;
  border: none;
  border-top: var(--border) !important;
`

const Time = styled("time")`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--font-secondary) !important;
  line-height: 2 !important;
`

interface MoreInfoProps {
  title: string
  create_date: string
  date: string
  name: string
}

const MoreInfo = ({ title, create_date, date }: MoreInfoProps) => {
  const { isOpen, onOpen, onClose } = useDiclosure()

  return (
    <>
      <Action onClick={onOpen} title="更多信息">
        <RiMore2Line aria-label="更多信息" />
      </Action>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Content>
          <H1>{title}</H1>
          <Hr />
          <Time>
            <span>创建日期</span>
            {create_date}
          </Time>
          <Time>
            <span>最后修改日期</span>
            {date}
          </Time>
        </Content>
      </Modal>
    </>
  )
}
export default MoreInfo
