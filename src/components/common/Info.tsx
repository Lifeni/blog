import styled from "@emotion/styled"
import React, { useState } from "react"
import { RiMore2Line } from "react-icons/ri"

const Action = styled("button")`
  width: 2.25rem;
  height: 2.25rem;
  margin: 0 -0.5rem 0 auto;
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
`

interface InfoWrapperProps {
  open: boolean
}

const InfoWrapper = styled("div")<InfoWrapperProps>`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 200;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${props => (props.open ? "visible" : "hidden")};
  opacity: ${props => (props.open ? 1 : 0)};
  transition: all 0.2s;
`

const InfoContent = styled("article")`
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

  h1 {
    width: 100%;
    font-size: 1.125rem !important;
    font-weight: 700;
    line-height: 1.75 !important;
    margin: 0 !important;
    padding: 0 !important;
    white-space: normal;
  }

  hr {
    margin: 1rem 0 !important;
    padding: 0 !important;
    border: none;
    border-top: var(--border) !important;
  }

  time {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--font-secondary) !important;
    line-height: 2 !important;
  }

  span {
    color: var(--font-secondary) !important;
    line-height: 2 !important;
  }
`

const InfoOverlay = styled("div")`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
`

interface InfoProps {
  title: string
  create_date: string
  date: string
  name: string
}

const Info = ({ title, create_date, date }: InfoProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Action onClick={() => setOpen(true)} title="更多信息">
        <RiMore2Line aria-label="更多信息" size="1.125rem" />
      </Action>

      <InfoWrapper open={open}>
        <InfoContent>
          <h1>{title}</h1>
          <hr />
          <time>
            <span>创建日期</span>
            {create_date}
          </time>
          <time>
            <span>最后修改日期</span>
            {date}
          </time>
        </InfoContent>
        <InfoOverlay onClick={() => setOpen(false)} />
      </InfoWrapper>
    </>
  )
}

export default Info
