import styled from "@emotion/styled"

const Message = styled("span")`
  position: absolute;
  right: 0;
  top: 0;
  min-width: 3.5rem;
  height: 3.5rem;
  padding: 0.75rem 1.25rem;
  display: flex;
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
    content: "]";
    padding: 0 0 0 0.125rem;
  }
`

export default Message
