import {
  BookIcon,
  DesktopDownloadIcon,
  EyeIcon,
  LinkIcon,
  MarkGithubIcon,
  PackageIcon,
  RepoIcon,
} from "@primer/octicons-react"
import { graphql, StaticQuery } from "gatsby"
import React from "react"
import apps from "../data/apps.json"
import "../styles/project-list.less"

const ProjectList = () => (
  <div className="project-list" id="main-content">
    {apps.map(app => (
      <div className="project" key={app.name}>
        <p className="title">
          <StaticQuery
            query={LogoQuery}
            render={data => {
              return (
                <img
                  src={
                    data.allFile.edges.find(edge => edge.node.name === app.name)
                      .node.publicURL
                  }
                  alt="应用图标"
                  aria-label="应用图标"
                  className="logo"
                />
              )
            }}
          />

          <span className="name">{app.title}</span>
        </p>
        <p className="description">{app.description}</p>

        <p className="features">
          {app.features.map((feature, index) => (
            <span key={feature} className="feature">
              {feature}
              {index !== app.features.length - 1 && <br />}
            </span>
          ))}
        </p>

        <p className="links">
          {app.links.map(link => (
            <a
              href={link.url}
              key={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons type={link.type} />
              <span> {link.name} </span>
            </a>
          ))}
        </p>
      </div>
    ))}
  </div>
)

const Icons = ({ type }) => {
  return (
    <>
      {type === "github" ? (
        <MarkGithubIcon aria-label="GitHub Icon" size={16} />
      ) : type === "link" ? (
        <LinkIcon aria-label="Link Icon" size={16} />
      ) : type === "documentation" ? (
        <BookIcon aria-label="Doc Icon" size={16} />
      ) : type === "install" ? (
        <DesktopDownloadIcon aria-label="Install Icon" size={16} />
      ) : type === "app" ? (
        <PackageIcon aria-label="App Icon" size={16} />
      ) : type === "see" ? (
        <EyeIcon aria-label="View Icon" size={16} />
      ) : type === "repo" ? (
        <RepoIcon aria-label="Repo Icon" size={16} />
      ) : null}
    </>
  )
}

export default ProjectList

export const LogoQuery = graphql`
  query LogoQuery {
    allFile(filter: { relativeDirectory: { eq: "app-logo" } }) {
      edges {
        node {
          publicURL
          name
        }
      }
    }
  }
`
