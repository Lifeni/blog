import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import PostList from "../components/postlist"
import ProjectList from "../components/projectlist"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <PostList />
    <ProjectList />
  </Layout>
)

export default IndexPage
