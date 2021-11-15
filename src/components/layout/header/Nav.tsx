import { useContext } from "react"
import { RiMenuFoldLine, RiMenuLine, RiMenuUnfoldLine } from "react-icons/ri"
import { useMedia } from "react-use"
import Button from "../../app/common/base/Button"
import { Context } from "../Layout"

const Nav = () => {
  const isMobile = useMedia("(max-width: 56rem)")
  const { sidebar, show, hide } = useContext(Context)

  return (
    <Button
      data-name={sidebar === "hide" ? "显示侧栏" : "聚焦内容"}
      onClick={isMobile ? show : sidebar === "hide" ? show : hide}
    >
      {isMobile ? (
        <RiMenuLine aria-label="菜单图标" />
      ) : sidebar === "hide" ? (
        <RiMenuFoldLine aria-label="展开菜单图标" />
      ) : (
        <RiMenuUnfoldLine aria-label="折叠菜单图标" />
      )}
    </Button>
  )
}

export default Nav
