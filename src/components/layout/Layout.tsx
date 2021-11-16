import styled from "@emotion/styled"
import {
  createContext,
  DetailedHTMLProps,
  Fragment,
  HTMLAttributes,
  ReactNode,
  useContext,
  useState,
} from "react"
import { Helmet } from "react-helmet"
import { useMedia } from "react-use"
import Overlay from "../app/common/base/Overlay"
import GoTop from "../app/common/global/GoTop"
import Footer from "./footer/Footer"
import Header from "./header/Header"

export const Context = createContext<LayoutContext>({
  sidebar: null,
  show: () => {},
  hide: () => {},
})

const Container = styled("div")`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Content = styled("div")`
  position: relative;
  width: 100%;
  padding: 1.25rem 2rem;
  display: flex;
  justify-content: center;
  flex: 1;
  gap: 4rem;

  @media (max-width: 72rem) {
    gap: 2.5rem;
  }

  @media (max-width: 56rem) {
    padding: 1.25rem 1.5rem;
  }

  @media (max-width: 48rem) {
    padding: 0.25rem 1.25rem;
  }
`

interface LayoutProps {
  noSidebar?: boolean
  title?: string
  description?: string
  children: ReactNode | ReactNode[]
}

const Layout = ({ noSidebar, title, description, children }: LayoutProps) => {
  const [sidebar, setSidebar] = useState<SidebarState>(null)

  return (
    <Container>
      <Helmet
        htmlAttributes={{
          lang: "zh-hans",
        }}
      >
        <title>{title ? `${title} | 记录干杯` : "记录干杯"}</title>
        <meta
          name="description"
          content={
            description ||
            "个人网站「记录干杯」，在这里记录一些技术相关的文章、尝试一些新的技术。"
          }
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700&family=JetBrains+Mono:wght@500;700&family=Noto+Sans+SC:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <GoTop />
      <Context.Provider
        value={{
          sidebar,
          show: () => setSidebar("show"),
          hide: () => setSidebar("hide"),
        }}
      >
        <Header noSidebar={noSidebar} />
        <Content>{children}</Content>
        <Footer />
      </Context.Provider>
    </Container>
  )
}

export default Layout

interface MainElementProps {
  sidebar: SidebarState
}

const MainElement = styled("main")<MainElementProps>`
  position: relative;
  width: ${props =>
    props.sidebar === "hide" ? "var(--focus-width)" : "var(--main-width)"};
  max-width: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const Main = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
) => {
  const { sidebar } = useContext(Context)
  return <MainElement {...props} sidebar={sidebar} />
}

interface SidebarElementProps {
  sidebar: SidebarState
}

const SidebarElement = styled("aside")<SidebarElementProps>`
  position: relative;
  width: var(--sidebar-width);
  max-width: 100%;
  display: ${props => (props.sidebar === "hide" ? "none" : "flex")};
  flex-direction: column;

  @media (max-width: 56rem) {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: ${props => (props.sidebar === "show" ? 2000 : 1)};
    width: 32rem;
    max-width: calc(100vw - 2rem);
    height: auto;
    max-height: calc(66vh - 2rem);
    padding: 0 2rem;
    display: flex;
    border-radius: var(--border-radius);
    border: var(--border);
    background-color: var(--background);
    overflow-y: auto;
    visibility: ${props => (props.sidebar === "show" ? "visible" : "hidden")};
    opacity: ${props => (props.sidebar === "show" ? "1" : "0")};
    transform: translate(-50%, -50%);
    transition: ${props =>
      props.sidebar === "show"
        ? "opacity 0.2s, background-color 0.2s, visibility 0.2"
        : "none"};
  }

  @media (max-width: 36rem) {
    padding: 0 1.25rem;
  }
`

export const Sidebar = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
) => {
  const isMobile = useMedia("(max-width: 56rem)")
  const { sidebar, hide } = useContext(Context)

  return (
    <Fragment>
      <SidebarElement {...props} sidebar={sidebar} />
      <Overlay isOpen={isMobile && sidebar === "show"} onClick={hide} />
    </Fragment>
  )
}
