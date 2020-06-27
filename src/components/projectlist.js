import React from "react"
// import { Link } from "gatsby"
import "../styles/project.css"

const ProjectList = () => (
  <div className="project-list">
    <p className="subtitle">Recent Projects</p>
    <h2>最近的项目</h2>
    <div className="project">
      <p className="project-name">here-just-record</p>
      <a href={`https://github.com/Lifeni/here-just-record`}>
        <h3>在这里记录，一个数据记录应用</h3>
      </a>
    </div>
    <div className="project">
      <p className="project-name">see-you-next-id</p>
      <a href={`https://github.com/Lifeni/see-you-next-id`}>
        <h3>下个 ID 见！一个论坛项目</h3>
      </a>
    </div>
    <div className="project">
      <p className="project-name">java-restful-api-server</p>
      <a href={`https://github.com/Lifeni/java-restful-api-server`}>
        <h3>Java 搭建简单的 RESTful API 服务器</h3>
      </a>
    </div>
    {/* <Link to="/" className="float-link home">
      <p>@</p>
    </Link> */}
    <a
      href="https://github.com/Lifeni"
      target="_blank"
      className="github-link"
      rel="noreferrer"
    >
      Projects on GitHub
    </a>
  </div>
)

export default ProjectList
