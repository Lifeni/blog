import React from "react"
import "../styles/showcase.css"

const Showcase = () => (
  <section className="showcase" id="showcase">
    <div className="tabs">
      <button className="tab active" id="friend-tab" data-target="friend-list">
        朋友
      </button>
      <button className="tab" id="contact-tab" data-target="contact-list">
        联系我
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
      <ul className="list contact" id="contact-list">
        <li className="list-item">
          <a href="mailto:liangfengning@foxmail.com">
            liangfengning@foxmail.com
          </a>
        </li>
      </ul>
    </div>
  </section>
)

export default Showcase
