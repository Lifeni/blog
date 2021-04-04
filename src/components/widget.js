import React from "react"

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
          <h2>开源 × GitHub</h2>
          <p className="subtitle">
            <svg
              aria-label="Fire Icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16"
              height="16"
            >
              <path
                fillRule="evenodd"
                d="M7.998 14.5c2.832 0 5-1.98 5-4.5 0-1.463-.68-2.19-1.879-3.383l-.036-.037c-1.013-1.008-2.3-2.29-2.834-4.434-.322.256-.63.579-.864.953-.432.696-.621 1.58-.046 2.73.473.947.67 2.284-.278 3.232-.61.61-1.545.84-2.403.633a2.788 2.788 0 01-1.436-.874A3.21 3.21 0 003 10c0 2.53 2.164 4.5 4.998 4.5zM9.533.753C9.496.34 9.16.009 8.77.146 7.035.75 4.34 3.187 5.997 6.5c.344.689.285 1.218.003 1.5-.419.419-1.54.487-2.04-.832-.173-.454-.659-.762-1.035-.454C2.036 7.44 1.5 8.702 1.5 10c0 3.512 2.998 6 6.498 6s6.5-2.5 6.5-6c0-2.137-1.128-3.26-2.312-4.438-1.19-1.184-2.436-2.425-2.653-4.81z"
              ></path>
            </svg>
            Powered by&nbsp;
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
        <section className="mobile-text" onClick={() => openSidebar()}>
          Hi，这是我的个人网站「记录干杯」，我会在这里记录一些文章或者是想法，也会在网站上尝试一些新的技术。...
        </section>
      )}
    </>
  )
}

export default Widget
