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
        网站使用{" "}
        <a
          href="https://www.gatsbyjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          GatsbyJS
        </a>{" "}
        构建，大概每过一段时间就会改动。
      </p>
      <p>如果想添加友链，那就给我发邮件吧。</p>
      <br />
      <blockquote>
        <address> 联系我：liangfengning@foxmail.com</address>
      </blockquote>
      <br />
      <br />
      <time style={{ float: "right" }}>修改于 2020 年 7 月 6 日</time>
    </article>
    <nav>
      <button className="fab like" id="like-it" aria-label="喜欢">
        喜欢
      </button>
      <Link to="/" className="fab back-home" aria-label="Home" title="回到主页">
        返回
      </Link>
    </nav>
  </Layout>
)

export default AboutPage
