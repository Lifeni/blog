import React from "react"
import "../styles/showcase.css"

const Showcase = () => (
  <section className="showcase" id="showcase">
    <div className="tabs">
      <button className="tab active" data-target="friend-list">
        朋友
      </button>
      <button className="tab" data-target="page-list">
        页面
      </button>
    </div>
    <div className="lists">
      <ul className="list friend show" id="friend-list">
        <li className="list-item">
          <a
            href="https://tanakarino.cn/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Nanako
            <small>tanakarino.cn</small>
          </a>
        </li>
      </ul>
      <ul className="list page" id="page-list">
        <li className="list-item small">
          <time>
            网站更新于 {new Date().toLocaleString("zh-CN", { hour12: false })}
          </time>
        </li>
        <li className="list-item small">
          <span>文章的日期是最后修改日期</span>
        </li>
        <li className="list-item small">
          文章按照
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/deed.zh-Hans"
            target="_blank"
            rel="noreferrer noopener"
          >
            &nbsp;CC-BY-SA-4.0&nbsp;
          </a>
          共享
        </li>
      </ul>
    </div>
  </section>
)

export default Showcase
