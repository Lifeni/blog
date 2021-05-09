import { Link } from "gatsby"
import React from "react"
import Header from "../components/header"
import Main from "../components/main"
import Seo from "../components/seo"
import "./404.less"

const NotFoundPage = () => (
  <>
    <Seo title="404 Not found" />
    <Header back />
    <Main
      main={
        <>
          <article id="main-content">
            <p className="article-subtitle error">404 / PAGE NOT FOUND</p>
            <h1 className="not-found-title">你要找的页面不在这里 :(</h1>
            <strong>Tips</strong>
            <ul className="not-found-list">
              <li>
                你正在访问&nbsp;
                <a href={window.location.href} target="_blank">
                  {window.location.pathname}
                </a>
                ，请检查一下链接有没有写错
              </li>
              <li>
                有可能是之前的页面已经被弃用，或者被修改了链接地址，去&nbsp;
                <Link to="/">主页</Link>&nbsp;找找看吧
              </li>
              <li>
                也可以通过&nbsp;
                <a
                  href="mailto:liangfengning@foxmail.com"
                  title="liangfengning@foxmail.com"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  邮箱
                </a>
                &nbsp;联系我
              </li>
            </ul>
          </article>
        </>
      }
    />
  </>
)

export default NotFoundPage
