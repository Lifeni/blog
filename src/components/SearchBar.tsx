import styled from "@emotion/styled"
import { RiSearchLine } from "react-icons/ri"

const SearchBar = styled("form")`
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
    padding: 0.75rem 1.25rem 0.75rem 3.5rem;
    border: none;
    color: var(--font-primary);
    background-color: transparent;
    font-size: 1rem;
    font-family: inherit;
    line-height: 2;
    outline: none;
    transition: all 0.2s;
    pointer-events: initial;

    @media (max-width: 400px) {
      padding: 0.75rem 0 0.75rem 3.5rem;
    }

    &:focus {
      background-color: var(--element-blur-background-hover);
    }
  }

  ::placeholder {
    color: var(--font-secondary);
  }
`

const Search = ({ search, enter }) => {
  return (
    <SearchBar onSubmit={enter}>
      <RiSearchLine aria-label="搜索图标" size="1.125em" />
      <input
        type="search"
        placeholder="在「记录干杯」中搜索"
        onChange={search}
      />
    </SearchBar>
  )
}

export default Search
