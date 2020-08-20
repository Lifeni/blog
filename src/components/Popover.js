import React from "react"
import "../styles/Popover.less"

const Popover = ({ children, big }) => (
  <section className={`popover${big ? " big" : ""}`} id="popover">
    {children}
  </section>
)

export default Popover
