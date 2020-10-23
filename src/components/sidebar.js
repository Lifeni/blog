import { graphql, StaticQuery } from "gatsby"
import React from "react"
import "../styles/sidebar.less"

const Sidebar = ({ children, footer }) => (
  <aside>
    {children}
    {footer && (
      <footer>
        <StaticQuery
          query={UPYunQuery}
          render={data => {
            return (
              <a
                href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"
                target="_blank"
                rel="noopener noreferrer"
                className="upyun"
              >
                本网站由 <img src={data.imageSharp.original.src} alt="又拍云" />{" "}
                提供 CDN 加速/云储存服务
              </a>
            )
          }}
        />

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

export const UPYunQuery = graphql`
  query UPYunQuery {
    imageSharp(original: { src: { regex: "/又拍云/" } }) {
      original {
        height
        src
        width
      }
    }
  }
`
