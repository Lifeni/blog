import styled from "@emotion/styled"

interface ButtonProps {
  hasBackground?: boolean
}

const Button = styled("button")<ButtonProps>`
  position: relative;
  width: 3rem;
  height: 3rem;
  margin: 0 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border: ${props =>
    props.hasBackground
      ? "var(--border)"
      : "solid var(--border-width) transparent"};
  color: var(--font-primary);
  background-color: ${props =>
    props.hasBackground ? "var(--element-background)" : "transparent"};
  font-family: inherit;
  font-weight: inherit;
  line-height: inherit;
  transition: all 0.2s;
  cursor: pointer;

  @media (max-width: 48rem) {
    margin: 0 0.25rem;
  }

  &:hover {
    border: var(--border);
    background-color: var(--element-background-hover);

    &::after {
      content: attr(data-name);
      position: absolute;
      left: 50%;
      top: calc(100% + 0.5rem);
      padding: 0.125rem 0.625rem;
      display: flex;
      border-radius: var(--border-radius);
      font-size: 0.925rem;
      color: var(--font-light);
      background-color: var(--font-primary);
      white-space: nowrap;
      transform: translateX(-50%);

      @media (max-width: 48rem) {
        content: none;
        display: none;
      }
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`

export default Button
