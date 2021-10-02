import React from "react"
import { RiHome2Line } from "react-icons/ri"
import BlockAction from "../base/action/Block"
import Spacer from "../common/layout/Spacer"
import Message from "../common/typography/Message"
import TableOfContents from "./table-of-contents/TableOfContents"

interface BarProps {
  back?: boolean
  toc?: string
  message?: string
}

const ArticleBar = ({ back, toc, message }: BarProps) => {
  return (
    <>
      {back ? (
        <BlockAction
          as="button"
          action={() => window.history.back()}
          icon={RiHome2Line}
          label="主页图标"
          left
        >
          回到「记录干杯」
        </BlockAction>
      ) : (
        <BlockAction
          as="link"
          link="/"
          icon={RiHome2Line}
          label="主页图标"
          left
        >
          回到「记录干杯」
        </BlockAction>
      )}
      <Spacer />
      {toc && <TableOfContents content={toc} />}
      {message && <Message>{message}</Message>}
    </>
  )
}

export default ArticleBar
