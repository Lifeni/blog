import { useState } from "react"

const useDiclosure = () => {
  const [open, setOpen] = useState(false)

  return {
    isOpen: open,
    onToggle: () => setOpen(open => !open),
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
  }
}

export default useDiclosure
