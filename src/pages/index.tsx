import About from "../components/app/home/about/About"
import PostList from "../components/app/home/post-list/PostList"
import Layout, { Main, Sidebar } from "../components/layout/Layout"

const IndexPage = () => {
  return (
    <Layout>
      <Main>
        <PostList />
      </Main>
      <Sidebar isPinned={true}>
        <About />
      </Sidebar>
    </Layout>
  )
}

export default IndexPage
