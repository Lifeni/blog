import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <article>
      <p className="subtitle">About</p>
      <h1>关于我和这个网站</h1>
      <p>东北某大学学生，大二，未来也许是前端程序员。</p>
      <p>
        网站使用
        <a
          href="https://www.gatsbyjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          &nbsp;GatsbyJS&nbsp;
        </a>
        构建，大概每过一段时间就会改动。
      </p>
      <p>
        背景图片来自
        <a
          href="https://www.pixiv.net/artworks/75961171"
          target="_blank"
          rel="noopener noreferrer"
        >
          &nbsp;https://www.pixiv.net/artworks/75961171
        </a>
        ，作者是
        <a
          href="https://www.pixiv.net/users/23223750"
          target="_blank"
          rel="noopener noreferrer"
        >
          &nbsp;@banishment
        </a>
        。
      </p>
      <br />
      <blockquote>
        <address>
          我的邮箱：
          <a href="mailto:liangfengning@foxmail.com">
            liangfengning@foxmail.com
          </a>
        </address>
        <address>
          我的 GitHub：
          <a
            href="https://github.com/Lifeni"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub @Lifeni
          </a>
        </address>
      </blockquote>
      <br />
      <br />
      <time style={{ float: "right" }}>修改于 2020 年 7 月 19 日</time>
    </article>
    <nav>
      <Link to="/" className="fab back-home" aria-label="Home" title="回到主页">
        返回
      </Link>
    </nav>
  </Layout>
)

export default AboutPage
