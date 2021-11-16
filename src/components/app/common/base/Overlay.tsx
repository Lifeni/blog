import styled from "@emotion/styled"

interface OverlayProps {
  isOpen: boolean
}

const Overlay = styled("div")<OverlayProps>`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1500;
  width: 100vw;
  height: 100vh;
  visibility: ${props => (props.isOpen ? "visible" : "hidden")};
  opacity: ${props => (props.isOpen ? 1 : 0)};
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.2s, visibility 0.2s;
`

export default Overlay
