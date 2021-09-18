import styled from "@emotion/styled"
import React from "react"
import svg from "../../assets/upyun-logo.svg"

const Wrapper = styled("footer")`
  position: relative;
  width: 100%;
  padding: 1.25rem 1.25rem 4rem 1.25rem;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 800px) {
    margin: -0.5rem 0 0 0;
    padding: 0 1.25rem 1.25rem 1.25rem;
  }

  section {
    width: 100%;
    max-width: var(--main-width);
    padding: 0 1rem;
    display: flex;

    @media (max-width: 800px) {
      display: none;
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
  }
`

const Footer = () => {
  return (
    <>
      <Wrapper>
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

        <section>
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/deed.zh"
            target="_blank"
            rel="noopener noreferrer"
          >
            署名-相同方式共享 4.0 国际 (CC BY-SA 4.0)
          </a>
        </section>
      </Wrapper>
    </>
  )
}

export default Footer
