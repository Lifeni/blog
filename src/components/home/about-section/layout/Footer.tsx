import styled from "@emotion/styled"

const Footer = styled("div")`
  width: 100%;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--font-secondary);
  font-family: var(--font-mono);
  transition: all 0.2s;
  overflow-wrap: break-word;

  @media (max-width: 520px) {
    padding: 2rem 0 0 0;
  }
`

export default Footer
