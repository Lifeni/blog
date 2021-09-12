import styled from "@emotion/styled"
import React from "react"
import { RiAtLine, RiTerminalBoxLine } from "react-icons/ri"
import svg from "../../assets/upyun-logo.svg"

const FooterWrapper = styled("footer")`
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
`

const FooterArea = styled("div")`
  width: 100%;
  max-width: var(--main-width);
  padding: 1.25rem 1rem 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 800px) {
    display: none;
  }

  section {
    width: 100%;
    display: flex;

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

const FooterLink = styled("a")`
  width: 100%;
  max-width: var(--main-width);
  height: 3.5rem;
  margin: -0.75rem 0 1.75rem 0;
  padding: 0.75rem 1.25rem;
  border-radius: var(--border-radius);
  border: none;
  display: flex;
  align-items: center;
  color: var(--font-secondary);
  background-color: var(--element-background);
  font-size: 1rem;
  font-family: inherit;
  font-weight: inherit;
  line-height: 2;
  outline: none;
  transition: all 0.2s;
  pointer-events: initial;
  cursor: pointer;
  text-decoration: none;

  @media (max-width: 800px) {
    margin: 1rem 0 0 0;
  }

  svg {
    margin: 0 1rem 0 0;
  }

  &:focus,
  &:focus-visible,
  &:hover {
    background-color: var(--element-background-hover);
  }

  small {
    display: flex;
    flex: 1;
    justify-content: flex-end;
  }
`

const Footer = () => {
  return (
    <>
      <FooterWrapper>
        <FooterLink
          href="https://dev.lifeni.life"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiAtLine aria-label="@ 图标" size="1.125em" />
          关于我和这个网站
          <small>About Me</small>
        </FooterLink>
        <FooterLink
          href="https://lab.lifeni.life"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiTerminalBoxLine aria-label="茶杯图标" size="1.125em" />
          并不存在的实验室
          <small>Hello World</small>
        </FooterLink>

        <FooterArea>
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
        </FooterArea>
      </FooterWrapper>
    </>
  )
}

export default Footer
