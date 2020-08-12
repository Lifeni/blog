import React from "react"
import "../styles/Popover.less"

const Popover = ({ children, title }) => (
  <section className="popover" id="popover">
    {title ? <h1>{title}</h1> : null}
    {children}
  </section>
)

export default Popover
