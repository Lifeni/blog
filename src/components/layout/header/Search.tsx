import styled from "@emotion/styled"
import { FormEvent, Fragment, useEffect, useRef, useState } from "react"
import { RiSearchLine } from "react-icons/ri"
import { useKey } from "react-use"
import Button from "../../app/common/base/Button"
import Overlay from "../../app/common/base/Overlay"

interface ContainerProps {
  isOpen: boolean
}

const Container = styled("form")<ContainerProps>`
  position: fixed;
  top: 30%;
  left: 50%;
  z-index: 2000;
  width: calc(100vw - 2rem);
  max-width: 32rem;
  height: auto;
  max-height: calc(66vh - 2rem);
  display: flex;
  border-radius: var(--border-radius);
  border: var(--border);
  background-color: var(--background);
  overflow-y: auto;
  visibility: ${props => (props.isOpen ? "visible" : "hidden")};
  opacity: ${props => (props.isOpen ? "1" : "0")};
  transform: translate(-50%, 0);
  transition: all 0.2s;

  @media (max-width: 36rem) {
    top: 1rem;
  }
`

const Input = styled("input")`
  width: 100%;
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
  font-weight: inherit;
  line-height: 2;
  font-family: inherit;
  border: none;
  color: inherit;
  background-color: transparent;
  outline: none;
  transition: all 0.2s;
`

const Search = () => {
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useKey("/", () => setIsOpen(true))
  useKey("Escape", () => setIsOpen(false))

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.value = ""
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    window.open(
      `https://www.google.com/search?q=site:lifeni.life+${inputRef.current?.value}`
    )
  }

  return (
    <Fragment>
      <Button data-name="搜索" onClick={() => setIsOpen(true)}>
        <RiSearchLine aria-label="搜索图标" />
      </Button>

      <Container isOpen={isOpen} onSubmit={handleSearch}>
        <Input
          ref={inputRef}
          type="search"
          autoFocus={isOpen}
          placeholder="使用 Google 搜索文章"
        />
      </Container>
      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} />
    </Fragment>
  )
}

export default Search
