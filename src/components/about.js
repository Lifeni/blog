import React from "react"
import LinkCard from "./link-card"

const About = () => (
  <section className="about" id="about">
    <h3># 你好</h3>
    <p>
      这是我的个人网站「&nbsp;记录干杯&nbsp;」，我会在这里记录一些文章或者是想法，也会在网站上尝试一些新的技术。
    </p>

    <h3># 关于我</h3>
    <p>
      我比较感兴趣的方向是 Web 前端，喜欢好看的设计，在&nbsp;
      <a
        href="https://github.com/Lifeni"
        target="_blank"
        rel="noopener noreferrer"
        title="@Lifeni"
        aria-label="GitHub"
      >
        GitHub
      </a>
      &nbsp;上可以找到我和我的项目，以及关于我的其他信息。
    </p>
    <p>
      如果你有一些问题或者好的想法，可以通过{" "}
      <a
        href="mailto:liangfengning@foxmail.com"
        title="liangfengning@foxmail.com"
        aria-label="邮箱"
      >
        邮箱
      </a>{" "}
      联系我。
    </p>
    <h3># 页面</h3>
    <LinkCard page="hello-friend" />
    <LinkCard page="open-source" />
  </section>
)

export default About
