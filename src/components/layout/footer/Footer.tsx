import styled from "@emotion/styled"
import { links } from "../../../data/links"

const Container = styled("footer")`
  position: relative;
  width: 100%;
  padding: 1.375rem 2.875rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  column-gap: 1rem;
  row-gap: 0.25rem;
  background-color: var(--element-background);
  border-top: var(--border);
  transition: all 0.2s;

  @media (max-width: 64rem) {
    padding: 1.375rem 2.5rem;
  }

  @media (max-width: 56rem) {
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  @media (max-width: 48rem) {
    padding: 1.375rem 1.5rem;
  }
`

const Section = styled("section")`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 0.75rem;
  row-gap: 0.25rem;
`

const Logo = styled("img")`
  height: 1.25rem;
  margin: 0 0.5rem;
  filter: grayscale(100%);
  transition: all 0.2s;
`

const Link = styled("a")`
  width: fit-content;
  margin: 0 0.5rem;
  display: flex;
  align-items: center;
  font-size: 1rem;
  line-height: 2;
  color: var(--font-secondary);
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    color: var(--font-primary);

    ${Logo} {
      filter: grayscale(0);
    }
  }
`

const Footer = () => {
  return (
    <Container>
      <Section>
        <Link
          href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"
          target="_blank"
          rel="noopener noreferrer"
        >
          由
          <Logo
            src="https://file.lifeni.life/upyun-logo.svg"
            alt="又拍云"
            width="50px"
            height="17.5px"
          />
          提供 CDN 加速与云储存服务
        </Link>
      </Section>
      <Section>
        {links.map(({ name, link }) => (
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            key={name}
          >
            {name}
          </Link>
        ))}
      </Section>
    </Container>
  )
}

export default Footer
