import React from "react"
import "./main.less"

const Main = ({ aside, main }) => (
  <div className="container">
    <aside>{aside}</aside>
    <main>{main}</main>
  </div>
)

export default Main
