import { useContext } from "react"
import { RiFileListFill } from "react-icons/ri"
import { useMedia } from "react-use"
import Button from "../../app/common/base/Button"
import { SidebarContext } from "../Layout"

const Nav = () => {
  const isMobile = useMedia("(max-width: 56rem)")
  const { setShow } = useContext(SidebarContext)

  return isMobile ? (
    <Button onClick={setShow}>
      <RiFileListFill aria-label="菜单图标" />
    </Button>
  ) : null
}

export default Nav
