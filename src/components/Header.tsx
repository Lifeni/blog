import styled from "@emotion/styled"

const HeaderWrapper = styled("header")`
  position: sticky;
  top: -2.25rem;
  z-index: 10;
  width: 100%;
  margin: 0;
  padding: 4.25rem 1.25rem 1.25rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  pointer-events: none;
  transition: all 0.2s;

  @media (max-width: 800px) {
    top: -1.25rem;
    padding: 3.75rem 1.25rem 1.25rem 1.25rem;
  }

  @media (max-width: 720px) {
    top: 0;
    padding: 1.25rem;
  }
`

const HeaderBar = styled("div")`
  width: 100%;
  max-width: var(--main-width);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--font-secondary);
  border-radius: 0.5rem;
  background-color: var(--element-blur-background);
  backdrop-filter: blur(0.5rem);
  overflow: hidden;
  transition: all 0.2s;
  pointer-events: none;

  a,
  button {
    min-width: 3.5rem;
    height: 3.5rem;
    padding: 0.75rem 1.25rem;
    border: none;
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--font-secondary);
    background-color: transparent;
    font-size: 1rem;
    font-family: inherit;
    line-height: 2;
    outline: none;
    transition: all 0.2s;
    pointer-events: initial;
    cursor: pointer;
    text-decoration: none;

    &.reverse {
      transform: rotate(-180deg);
    }

    &:focus,
    &:focus-visible,
    &:hover {
      background-color: var(--element-blur-background-hover);
    }
  }
`

const Header = ({ children }) => {
  return (
    <HeaderWrapper>
      <HeaderBar>{children}</HeaderBar>
    </HeaderWrapper>
  )
}

export default Header
