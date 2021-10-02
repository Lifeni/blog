import React, { useEffect } from "react"
import { RiFileListLine } from "react-icons/ri"
import useDiclosure from "../../../hooks/useDiclosure"
import BlockAction from "../../base/action/Block"
import Modal from "../../base/modal/Modal"
import Content from "./Content"

interface TableOfContentsProps {
  content: string
}

const TableOfContents = ({ content }: TableOfContentsProps) => {
  const { isOpen, onOpen, onClose, onToggle } = useDiclosure()

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault()
        onToggle()
      }
    }

    window.addEventListener("keypress", listener)
    return () => window.removeEventListener("keypress", listener)
  }, [])

  return (
    <>
      <BlockAction
        as="button"
        action={onOpen}
        icon={RiFileListLine}
        label="文章目录"
        title="使用 / 键切换目录窗口"
        right
      >
        目录
      </BlockAction>

      <Modal isOpen={isOpen} onClose={onClose}>
        <Content
          dangerouslySetInnerHTML={{ __html: content || "" }}
          onClick={e => {
            const target = e.target as HTMLElement

            if (target?.tagName === "A") {
              onClose()
              history.replaceState(null, "", (target as HTMLAnchorElement).href)
            } else if (target?.tagName === "CODE") {
              onClose()
              history.replaceState(
                null,
                "",
                (target.parentElement as HTMLAnchorElement).href
              )
            }
          }}
        />
      </Modal>
    </>
  )
}

export default TableOfContents
