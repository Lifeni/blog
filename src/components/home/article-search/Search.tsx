import styled from "@emotion/styled"
import React, { ChangeEvent, FormEvent, useEffect, useRef } from "react"
import { RiSearchLine } from "react-icons/ri"

interface SearchBarProps {
  shortcut?: boolean
}

const SearchBar = styled("form")<SearchBarProps>`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  transition: all 0.2s;

  svg {
    position: absolute;
    left: 0;
    top: 0;
    margin: 1.25rem;
  }

  input {
    width: 100%;
    padding: 0.75rem 1.5rem 0.75rem 3.5rem;
    border: none;
    color: var(--font-primary);
    background-color: transparent;
    border-radius: var(--border-radius);
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
  }

  .message {
    position: absolute;
    right: 0;
    top: 0;
    height: 3.5rem;
    margin: 0;
    padding: 0 1.25rem;
    display: ${props => (props.shortcut ? "none" : "flex")};
    align-items: center;
    font-size: 0.875rem;
    font-family: var(--font-mono);
    color: inherit;
    user-select: none;
    pointer-events: none;
    transition: all 0.2s;

    &::before {
      content: "[";
      padding: 0 0.125rem 0 0;
    }

    &::after {
      content: " ]";
      padding: 0 0 0 0.125rem;
    }
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
    <SearchBar onSubmit={enter} shortcut={!!searchRef.current?.value}>
      <RiSearchLine aria-label="搜索图标" size="1.125em" />
      <input
        type="search"
        placeholder="在「记录干杯」中搜索 ..."
        onChange={search}
        ref={searchRef}
        title="使用 / 键聚焦搜索框"
      />
      <span className="message">/</span>
    </SearchBar>
  )
}

export default Search
