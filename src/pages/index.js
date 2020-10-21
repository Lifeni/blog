import React from "react"
import Header from "../components/header"
import PostList from "../components/postlist"
import SEO from "../components/seo"
import Showcase from "../components/showcase"
import Sidebar from "../components/sidebar"
import "../styles/layout.less"

const IndexPage = () => (
  <>
    <a href="#content" className="skip-link">
      Skip to main content | 跳转到主要内容
    </a>
    <SEO title="Home" />
    <Header app aside title="记录干杯" />
    <main>
      <Sidebar footer>
        <section className="about" id="about">
          <p>
            Hi，这是我的个人网站「 记录干杯
            」，我会在这里记录一些技术相关的文章、尝试一些新的技术。
          </p>
          <p>
            我比较感兴趣的方向是 Web 前端，喜欢好看的设计，目前正在尝试使用
            TypeScript。在
            <a
              href="https://github.com/Lifeni"
              target="_blank"
              rel="noopener noreferrer"
            >
              &nbsp;GitHub&nbsp;
            </a>
            上可以找到我和我的项目。
          </p>
          <p>
            还有，
            <a
              href="https://tanakarino.cn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nanako&nbsp;
            </a>
            是我的朋友，有时间可以去他的网站看一看。
          </p>
        </section>
      </Sidebar>
      <div className="container">
        {/* <Showcase /> */}
        <PostList />
      </div>
    </main>
  </>
)

export default IndexPage
