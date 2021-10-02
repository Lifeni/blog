import styled from "@emotion/styled"
import React, { ReactNode } from "react"
import Overlay from "./Overlay"

interface ContainerProps {
  open: boolean
}

const Container = styled("div")<ContainerProps>`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 200;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${props => (props.open ? "visible" : "hidden")};
  opacity: ${props => (props.open ? 1 : 0)};
  transition: all 0.2s;
`

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode | ReactNode[]
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <Container open={isOpen}>
      {children}
      <Overlay onClick={onClose} />
    </Container>
  )
}

export default Modal
