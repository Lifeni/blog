import styled from "@emotion/styled"
import React from "react"
import svg from "../../assets/upyun-logo.svg"

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
  }

  a {
    width: fit-content;
    max-width: 100%;
    margin: 0 1.375rem 0 0;
    padding: 0.1875rem 0;
    display: flex;
    align-items: center;
    color: var(--font-secondary);
    font-size: 1rem;
    line-height: 2;
    text-decoration: none;
    transition: all 0.2s;

    svg {
      margin: 0 0.75rem 0 0;
    }

    img {
      margin: 0 0.75rem;
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
      <section>
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
      </section>

      <section>
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
        >
          鲁ICP备19006085号
        </a>
        <a
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=37132102371392"
          target="_blank"
          rel="noopener noreferrer"
        >
          鲁公网安备37132102371392号
        </a>
      </section>
    </FooterWrapper>
  )
}

export default Footer
