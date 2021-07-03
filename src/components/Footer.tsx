import styled from "@emotion/styled"
import * as React from "react"
import svg from "../assets/upyun-logo.svg"

const FooterWrapper = styled("footer")`
  position: relative;
  width: 100%;
  max-width: var(--main-width);
  margin: 0 auto;
  padding: 1rem 1rem 4.5rem 1rem;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;

  @media (max-width: 800px) {
    display: none;
  }

  section {
    display: flex;
    gap: 1.5rem;
  }

  a {
    width: fit-content;
    max-width: 100%;
    display: flex;
    align-items: center;
    color: var(--font-secondary);
    font-size: 1rem;
    line-height: 2.25;
    text-decoration: none;
    transition: all 0.2s;

    img {
      margin: 0 0.5rem;
      height: 1.25rem;
      filter: grayscale(1);
      transition: all 0.2s;
    }

    &:hover {
      color: var(--font-primary);

      img {
        filter: grayscale(0);
      }
    }
  }
`

const Footer = () => {
  return (
    <FooterWrapper>
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
      <section>
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
      </section>
    </FooterWrapper>
  )
}

export default Footer
