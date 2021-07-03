import styled from "@emotion/styled"
import { RiSearchLine } from "react-icons/ri"

const SearchBar = styled("div")`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0 0 0 1.25rem;
  transition: all 0.2s;

  input {
    width: 100%;
    padding: 0.75rem 0 0.75rem 1rem;
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
    <SearchBar>
      <RiSearchLine size="1.125em" />
      <input
        type="search"
        placeholder="在「记录干杯」中搜索"
        onChange={search}
      />
    </SearchBar>
  )
}

export default Search
