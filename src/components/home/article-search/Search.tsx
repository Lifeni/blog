import styled from "@emotion/styled"
import React, { ChangeEvent, FormEvent, useEffect, useRef } from "react"
import { RiSearchLine } from "react-icons/ri"
import Message from "../../common/typography/Message"

const SearchBar = styled("form")`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  transition: all 0.2s;
`

const Icon = styled("svg")`
  position: absolute;
  left: 0;
  top: 0;
  width: 1.125rem;
  height: 1.125rem;
  margin: 1.25rem;
`

interface InputProps {
  round?: boolean
}

const Input = styled("input")<InputProps>`
  width: 100%;
  padding: 0.75rem 1.5rem 0.75rem 3.5rem;
  border: none;
  color: var(--font-primary);
  background-color: transparent;
  border-radius: ${props =>
    props.round
      ? "var(--border-radius)"
      : "var(--border-radius) 0 0 var(--border-radius)"};
  font-size: 1rem;
  font-family: inherit;
  font-weight: inherit;
  line-height: 2;
  outline: none;
  transition: all 0.2s;
  pointer-events: initial;

  &:focus {
    background-color: var(--element-background-hover);
  }

  &::placeholder,
  &::-moz-placeholder {
    color: var(--font-secondary);
    font-weight: inherit;
    opacity: 1;
  }
`

interface SearchProps {
  search: (e: ChangeEvent) => void
  enter: (e: FormEvent) => void
}

const Search = ({ search, enter }: SearchProps) => {
  const searchRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "/" && searchRef.current) {
        if (searchRef.current.value === "") {
          e.preventDefault()
          window.scrollTo(0, 0)
          searchRef.current.focus()
        }
      }
    }
    window.addEventListener("keypress", listener)
    return () => window.removeEventListener("keypress", listener)
  }, [])

  return (
    <SearchBar onSubmit={enter}>
      <Icon as={RiSearchLine} aria-label="搜索图标" />
      <Input
        type="search"
        placeholder="在「记录干杯」中搜索 ..."
        onChange={search}
        ref={searchRef}
        title="使用 / 键聚焦搜索框"
        round={!!searchRef.current?.value}
      />
      {!searchRef.current?.value && <Message>/</Message>}
    </SearchBar>
  )
}

export default Search
