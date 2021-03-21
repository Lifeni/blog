import React from "react"
import { HashIcon } from "./icon"
import LinkCard from "./link-card"

const About = ({ hello, project, friend, me, page }) => (
  <section className="about" id="about">
    {hello ? (
      <>
        <h3>
          <HashIcon />
          你好
        </h3>
        <p>
          这是我的个人网站「&nbsp;记录干杯&nbsp;」，我会在这里记录一些文章或者是想法，也会在网站上尝试一些新的技术。
        </p>
      </>
    ) : null}

    {project ? (
      <>
        <h3>
          <HashIcon />
          关于
        </h3>
        <p>
          这里有一些我做过的的开源项目，都是根据自己的需求写的，我的&nbsp;
          <a
            href="https://github.com/Lifeni"
            target="_blank"
            rel="noopener noreferrer"
            title="@Lifeni"
            aria-label="GitHub"
          >
            GitHub
          </a>
          &nbsp;上还有其他的项目，也可以去看看。
        </p>
      </>
    ) : null}

    {friend ? (
      <>
        <h3>
          <HashIcon />
          关于
        </h3>
        <p>
          这里是放置友链的地方，排名不分先后，如果要申请友链，可以在页面下面留言。
        </p>
      </>
    ) : null}

    {me ? (
      <>
        <h3>
          <HashIcon />
          关于我
        </h3>
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
      </>
    ) : null}

    {page ? (
      <>
        <h3>
          <HashIcon />
          页面
        </h3>
        <LinkCard page="hello-friend" />
        <LinkCard page="open-source" />
      </>
    ) : null}
  </section>
)

export default About
