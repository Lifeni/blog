import { useContext } from "react"
import { RiFileListLine } from "react-icons/ri"
import { useMedia } from "react-use"
import Button from "../../app/common/base/Button"
import { GlobalContext } from "../Layout"

const Nav = () => {
  const isMobile = useMedia("(max-width: 56rem)")
  const { setShowSidebar: setShow } = useContext(GlobalContext)

  return (
    isMobile && (
      <Button onClick={setShow}>
        <RiFileListLine aria-label="菜单图标" />
      </Button>
    )
  )
}

export default Nav
