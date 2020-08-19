import React from "react"
import "../styles/Popover.less"

const Popover = ({ children }) => (
  <section className="popover" id="popover">
    {children}
  </section>
)

export default Popover
