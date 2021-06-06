import React from "react"
import svg from "../assets/又拍云.svg"
import "./footer.less"

const Footer = () => (
  <footer>
    <a
      href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"
      target="_blank"
      rel="noopener noreferrer"
      className="upyun"
    >
      由
      <img src={svg} alt="又拍云" title="又拍云" aria-label="又拍云" />
      提供 CDN 加速与云储存服务
    </a>
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
)

export default Footer
