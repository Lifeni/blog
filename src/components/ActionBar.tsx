import styled from "@emotion/styled"
import { Link } from "gatsby"
import * as React from "react"
import { RiDownloadLine, RiHome2Line } from "react-icons/ri"

const ActionBarWrapper = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`

const ActionBar = () => {
  return (
    <ActionBarWrapper>
      <Link to="/">
        <RiHome2Line aria-label="主页图标" size="1.125em" />
        <span className="text">回到「记录干杯」</span>
      </Link>
      <button className="reverse" onClick={() => window.scrollTo(0, 0)}>
        <RiDownloadLine aria-label="回到顶部图标" size="1.125em" />
      </button>
    </ActionBarWrapper>
  )
}

export default ActionBar
