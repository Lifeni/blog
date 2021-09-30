import styled from "@emotion/styled"

interface BaseProps {
  toggle?: boolean
}

const IconAction = styled("button")<BaseProps>`
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--border-radius);
  color: var(--font-secondary);
  background-color: var(--background);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: var(--font-primary);
    background-color: var(--element-background);
  }

  &:disabled {
    cursor: not-allowed;
  }

  svg {
    width: 1.125rem;
    height: 1.125rem;
    color: ${props => (props.toggle ? "var(--red)" : "inhert")};
    animation: ${props => (props.toggle ? "beat 0.2s forwards" : "none")};
    transition: all 0.2s;
  }

  @keyframes beat {
    0% {
      transform: scale(0.9);
    }

    50% {
      transform: scale(1.1);
    }

    100% {
      transform: scale(1.05);
    }
  }
`

export default IconAction
