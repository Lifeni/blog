import styled from "@emotion/styled"
import { RiSearchLine } from "react-icons/ri"

const SearchWrapper = styled("div")`
  width: 100%;
  max-width: var(--main-width);
  margin: 0;
  padding: 1.25rem 0;
  pointer-events: none;

  @media (max-width: 720px) {
    padding: 1.25rem 0 0.5rem 0;
  }
`

const SearchBar = styled("div")`
  width: 100%;
  padding: 0 0 0 1.25rem;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  color: var(--font-secondary);
  background-color: var(--element-blur-background);
  backdrop-filter: blur(0.5rem);
  overflow: hidden;
  transition: all 0.2s;

  input {
    width: 100%;
    padding: 0.75rem 1.25rem 0.75rem 1rem;
    border: none;
    color: var(--font-primary);
    background-color: transparent;
    font-size: 1rem;
    font-family: inherit;
    line-height: 2;
    outline: none;
    transition: all 0.2s;
    pointer-events: initial;
  }

  &:hover {
    background-color: var(--element-blur-background-hover);
  }
`

const Search = ({ search }) => {
  return (
    <SearchWrapper>
      <SearchBar>
        <RiSearchLine size="1.125em" />
        <input
          type="search"
          placeholder="在「记录干杯」中搜索"
          onChange={search}
        />
      </SearchBar>
    </SearchWrapper>
  )
}

export default Search
