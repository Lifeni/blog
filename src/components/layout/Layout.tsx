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

export const SidebarContext = createContext<ISidebarContext>({
  showSidebar: false,
  setShow: () => {},
  setHide: () => {},
})

const Container = styled("div")`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

interface ContentProps {
  isCentered?: boolean
}

const Content = styled("div")<ContentProps>`
  position: relative;
  width: 100%;
  padding: 1.25rem 2rem;
  display: flex;
  align-items: ${props => (props.isCentered ? "center" : "flex-start")};
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
    padding: 0.75rem 1.25rem;
  }

  @media (max-width: 36rem) {
    padding: 0.25rem 1.25rem;
  }
`

interface LayoutProps {
  hasSidebar?: boolean
  isCentered?: boolean
  title?: string
  description?: string
  children: ReactNode | ReactNode[]
}

const Layout = ({
  hasSidebar = true,
  isCentered = false,
  title,
  description,
  children,
}: LayoutProps) => {
  const [showSidebar, setSidebar] = useState(false)

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
      <SidebarContext.Provider
        value={{
          showSidebar,
          setShow: () => setSidebar(true),
          setHide: () => setSidebar(false),
        }}
      >
        <Header hasSidebar={hasSidebar} />
        <Content isCentered={isCentered}>{children}</Content>
        <Footer />
      </SidebarContext.Provider>
    </Container>
  )
}

export default Layout

export const Main = styled("main")`
  position: relative;
  width: var(--main-width);
  max-width: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 36rem) {
    overflow: unset;
  }
`

interface SidebarElementProps {
  showSidebar: boolean
}

const SidebarWrapper = styled("aside")<SidebarElementProps>`
  position: sticky;
  top: 0;
  overflow: hidden;
  width: var(--sidebar-width);
  max-width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 56rem) {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: ${props => (props.showSidebar ? 2000 : 1)};
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
    visibility: ${props => (props.showSidebar ? "visible" : "hidden")};
    opacity: ${props => (props.showSidebar ? "1" : "0")};
    transform: translate(-50%, -50%);
    transition: ${props =>
      props.showSidebar
        ? "opacity 0.2s, background-color 0.2s, visibility 0.2s, border 0.2s"
        : "none"};
  }

  @media (max-width: 36rem) {
    padding: 0 1.25rem;
    max-height: calc(75vh - 2rem);
  }
`

const SidebarElement = styled("div")`
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 56rem) {
    max-height: unset;
  }
`

export const Sidebar = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
) => {
  const isMobile = useMedia("(max-width: 56rem)")
  const { showSidebar, setHide } = useContext(SidebarContext)

  return (
    <Fragment>
      <SidebarWrapper {...props} showSidebar={showSidebar}>
        <SidebarElement>{props.children}</SidebarElement>
      </SidebarWrapper>
      <Overlay isOpen={isMobile && showSidebar} onClick={setHide} />
    </Fragment>
  )
}
