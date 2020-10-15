import React from "react"
import "../styles/sidebar.less"

const Sidebar = ({ children, about, footer }) => (
  <aside>
    {children}
    {footer && (
      <footer>
        <a
          href="http://www.beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
        >
          鲁ICP备 19006085 号
        </a>
        <a
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=37132102371392"
          target="_blank"
          rel="noopener noreferrer"
        >
          鲁公网安备 37132102371392 号
        </a>
      </footer>
    )}
  </aside>
)

export default Sidebar
