import styled from "@emotion/styled"
import React from "react"
import upyun from "../../../../assets/upyun-logo.svg"
import Link from "./Link"
import Logo from "./Logo"

const Container = styled("footer")`
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
    padding: 0 1.25rem 4rem 1.25rem;
  }

  @media (max-width: 720px) {
    padding: 0 1.25rem 1.25rem 1.25rem;
  }

  @media (max-width: 480px) {
    padding: 0 1rem 1rem 1rem;
  }
`

const Section = styled("section")`
  width: 100%;
  max-width: var(--main-width);
  padding: 0 1rem;
  display: flex;

  @media (max-width: 800px) {
    display: none;
  }
`

const Footer = () => {
  return (
    <Container>
      <Section>
        <Link link="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral">
          由
          <Logo src={upyun} alt="又拍云" title="又拍云" aria-label="又拍云" />
          提供 CDN 加速与云储存服务
        </Link>
      </Section>

      <Section>
        <Link link="https://beian.miit.gov.cn/">鲁ICP备19006085号</Link>
        <Link link="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=37132102371392">
          鲁公网安备37132102371392号
        </Link>
      </Section>

      <Section>
        <Link link="https://creativecommons.org/licenses/by-sa/4.0/deed.zh">
          署名-相同方式共享 4.0 国际 (CC BY-SA 4.0)
        </Link>
      </Section>
    </Container>
  )
}

export default Footer
