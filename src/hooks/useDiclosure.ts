import { useState } from "react"

const useDiclosure = () => {
  const [open, setOpen] = useState(false)

  return {
    isOpen: open,
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
  }
}

export default useDiclosure
