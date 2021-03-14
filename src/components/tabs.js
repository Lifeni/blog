import { Link } from "gatsby"
import React from "react"
import "../styles/tabs.less"

const Tabs = ({ page }) => (
  <nav className="top-tabs">
    <ul className="tab-bar">
      <li className={page === "article" ? "current" : ""}>
        <Link to={"/"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fillRule="evenodd"
              d="M0 3.75A.75.75 0 01.75 3h7.497c1.566 0 2.945.8 3.751 2.014A4.496 4.496 0 0115.75 3h7.5a.75.75 0 01.75.75v15.063a.75.75 0 01-.755.75l-7.682-.052a3 3 0 00-2.142.878l-.89.891a.75.75 0 01-1.061 0l-.902-.901a3 3 0 00-2.121-.879H.75a.75.75 0 01-.75-.75v-15zm11.247 3.747a3 3 0 00-3-2.997H1.5V18h6.947a4.5 4.5 0 012.803.98l-.003-11.483zm1.503 11.485V7.5a3 3 0 013-3h6.75v13.558l-6.927-.047a4.5 4.5 0 00-2.823.971z"
            ></path>
          </svg>
          文章
        </Link>
      </li>
      <li className={page === "open-source" ? "current" : ""}>
        <Link to={"/open-source"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fillRule="evenodd"
              d="M12.876.64a1.75 1.75 0 00-1.75 0l-8.25 4.762a1.75 1.75 0 00-.875 1.515v9.525c0 .625.334 1.203.875 1.515l8.25 4.763a1.75 1.75 0 001.75 0l8.25-4.762a1.75 1.75 0 00.875-1.516V6.917a1.75 1.75 0 00-.875-1.515L12.876.639zm-1 1.298a.25.25 0 01.25 0l7.625 4.402-7.75 4.474-7.75-4.474 7.625-4.402zM3.501 7.64v8.803c0 .09.048.172.125.216l7.625 4.402v-8.947L3.501 7.64zm9.25 13.421l7.625-4.402a.25.25 0 00.125-.216V7.639l-7.75 4.474v8.947z"
            ></path>
          </svg>
          开源项目
        </Link>
      </li>
    </ul>
    {page === "article" ? (
      <ul className="tab-description">
        <li>
          <p>这里有一些文章，大部分是与技术相关的，也有一些转载和翻译。</p>
        </li>
        <li>
          <p>写文章只是为了记录，而不是分享。</p>
        </li>
      </ul>
    ) : null}
    {page === "open-source" ? (
      <ul className="tab-description">
        <li>
          <p>这里有一些做过开源项目，有时会用一些之前没有尝试过的技术。</p>
        </li>
        <li>
          <p>大部分项目都是基于自己的的需求做的。</p>
        </li>
      </ul>
    ) : null}
  </nav>
)

export default Tabs
