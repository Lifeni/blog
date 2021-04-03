import React from "react"
import About from "../components/about"
import Footer from "../components/footer"
import Header from "../components/header"
import ProjectList from "../components/project-list"
import Seo from "../components/seo"
import Sidebar from "../components/sidebar"
import UpdateCard from "../components/update-card"

const OpenSourcePage = () => (
  <>
    <Seo title="开源项目" />
    <Header back aside />
    <main>
      <Sidebar>
        <About project page={["friend"]} />
      </Sidebar>
      <div className="container">
        <UpdateCard />
        <article className="github-chart">
          <h2>Lifeni's GitHub Chart</h2>
          <p>
            Powered by{" "}
            <a
              href="https://github.com/2016rshah/githubchart-api"
              target="_blank"
              rel="noopener noreferrer"
              className="friend"
            >
              GitHub Chart API
            </a>
          </p>
          <img
            src="https://ghchart.rshah.org/Lifeni"
            alt="Lifeni's Github chart"
            aria-label="Lifeni's Github chart"
          />
        </article>
        <ProjectList />
        <Footer />
      </div>
    </main>
  </>
)

export default OpenSourcePage
