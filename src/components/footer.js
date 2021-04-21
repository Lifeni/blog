import { graphql, StaticQuery } from "gatsby"
import React from "react"
import links from "../data/links.json"
import "./footer.less"

const Footer = () => (
  <footer>
    {links.map((line, index) => (
      <div key={index}>
        {line.map((link, index) => (
          <React.Fragment key={link.url}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.name}
            </a>
            {index !== line.length - 1 && <span> / </span>}
          </React.Fragment>
        ))}
      </div>
    ))}
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
            本网站由
            <img
              src={data.file.publicURL}
              alt="又拍云"
              title="又拍云"
              aria-label="又拍云"
            />
            提供 CDN 加速与云储存服务
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
