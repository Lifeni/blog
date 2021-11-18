import styled from "@emotion/styled"
import { friends } from "../../../../data/friends"

const Container = styled("div")`
  position: relative;
  width: 100%;
  padding: 0.75rem 1px 1.25rem 1px;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`

const Avatar = styled("img")`
  width: 100%;
  height: 100%;
  border-radius: 100%;
`

const AvatarLink = styled("a")`
  position: relative;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 100%;
  display: flex;
  user-select: none;
  color: transparent;

  &:hover::after {
    content: attr(data-name);
    position: absolute;
    left: 50%;
    bottom: calc(100% + 0.5rem);
    padding: 0.125rem 0.625rem;
    display: flex;
    border-radius: var(--border-radius);
    font-size: 0.925rem;
    color: var(--font-light);
    background-color: var(--font-primary);
    white-space: nowrap;
    transform: translateX(-50%);
  }
`

const Friend = () => {
  return (
    <Container>
      {friends.map(({ name, link }) => (
        <AvatarLink
          key={name}
          href={link}
          data-name={name}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Avatar
            src={`https://file.lifeni.life/avatar/friends/${name}.webp`}
            alt={name}
          />
        </AvatarLink>
      ))}
    </Container>
  )
}

export default Friend
