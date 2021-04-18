import { MeterIcon, ChevronDownIcon } from "@primer/octicons-react"
import React from "react"
import "../styles/widget.less"

const Widget = ({ chart, bio }) => {
  const openSidebar = () => {
    const aside = document.querySelector("aside")
    const header = document.querySelector("header")
    aside?.classList.add("expand")
    header?.classList.add("expand")
  }

  return (
    <>
      {chart && (
        <article className="github-chart">
          <p className="caption">
            <MeterIcon aria-label="Fire Icon" size={16} />
            Lifeni's Github Chart - Powered by&nbsp;
            <a
              href="https://github.com/2016rshah/githubchart-api"
              target="_blank"
              rel="noopener noreferrer"
              className="friend"
            >
              GitHub Chart API
            </a>
          </p>
          <div className="image-wrapper">
            <img
              src="https://ghchart.rshah.org/Lifeni"
              alt="Lifeni's Github chart"
              aria-label="Lifeni's Github chart"
            />
          </div>
        </article>
      )}

      {bio && (
        <section
          aria-hidden
          className="mobile-text"
          onClick={() => openSidebar()}
        >
          <p>
            Hi，这是我的个人网站「记录干杯」，
            我会在这里记录一些文章或者是想法， 也会在网站上尝试一些新的技术。
          </p>
          <p className="right" aria-hidden="true">
            <ChevronDownIcon
              aria-hidden="true"
              aria-label="查看更多"
              size={24}
            />
          </p>
        </section>
      )}
    </>
  )
}

export default Widget
