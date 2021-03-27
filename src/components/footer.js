import { graphql, StaticQuery } from "gatsby"
import React from "react"
import "../styles/footer.less"

const Footer = () => (
  <footer>
    <div>
      <a
        href="https://www.cnblogs.com/liangfengning/"
        target="_blank"
        rel="noopener noreferrer"
      >
        博客园
      </a>
      <span> / </span>
      <a
        href="https://cloud.lifeni.life"
        target="_blank"
        rel="noopener noreferrer"
      >
        Seafile
      </a>
      <span> / </span>
      <a
        href="https://git.lifeni.life"
        target="_blank"
        rel="noopener noreferrer"
      >
        Gitea
      </a>
    </div>

    <div>
      <a
        href="https://lab.lifeni.life"
        target="_blank"
        rel="noopener noreferrer"
      >
        Space
      </a>
      <span> / </span>
      <a
        href="https://api.lifeni.life"
        target="_blank"
        rel="noopener noreferrer"
      >
        API
      </a>
      <span> / </span>
      <a
        href="https://status.lifeni.life"
        target="_blank"
        rel="noopener noreferrer"
      >
        Status
      </a>
      <span> / </span>
      <a
        href="https://dev.lifeni.life"
        target="_blank"
        rel="noopener noreferrer"
      >
        Console
      </a>
    </div>

    <div className="wrappable">
      <a
        href="http://www.beian.miit.gov.cn/"
        target="_blank"
        rel="noopener noreferrer"
      >
        鲁ICP备 19006085 号
      </a>
      <span className="break-line"> / </span>
      <a
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=37132102371392"
        target="_blank"
        rel="noopener noreferrer"
        className="last"
      >
        鲁公网安备 37132102371392 号
      </a>
    </div>
    <StaticQuery
      query={UPYunQuery}
      render={data => {
        return (
          <a
            href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"
            target="_blank"
            rel="noopener noreferrer"
            className="upyun last"
          >
            本网站由 <img src={data.file.publicURL} alt="又拍云" /> 提供 CDN
            加速与云储存服务
          </a>
        )
      }}
    />
  </footer>
)

export default Footer

export const UPYunQuery = graphql`
  query UPYunQuery {
    file(name: { regex: "/又拍云/" }) {
      publicURL
    }
  }
`
