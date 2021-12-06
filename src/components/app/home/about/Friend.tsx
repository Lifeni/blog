import styled from "@emotion/styled"
import { Fragment } from "react"
import { friends } from "../../../../data/friends"

const Container = styled("div")`
  position: relative;
  width: 100%;
  padding: 0.75rem 1px 1.25rem 1px;
  display: flex;
  flex-wrap: wrap;
  gap: calc((var(--sidebar-width) - 2rem - 2px - (2.25rem * 6)) / 5);
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
  background-color: var(--element-background);
  user-select: none;
  color: transparent;

  &:hover::after {
    content: attr(data-name);
    position: absolute;
    left: 50%;
    bottom: calc(100% + 0.5rem);
    padding: 0.375rem 0.625rem;
    display: flex;
    align-items: center;
    border-radius: var(--border-radius);
    font-size: 0.925rem;
    line-height: 1.5;
    color: var(--font-light);
    background-color: var(--font-primary);
    white-space: nowrap;
    transform: translateX(-50%);
  }
`

const Friend = () => {
  return (
    <Container>
      {friends.map(({ name, link, theme }) => (
        <AvatarLink
          key={name}
          href={link}
          data-name={name}
          target="_blank"
          rel="noopener noreferrer"
        >
          {theme ? (
            <Fragment>
              <Avatar
                src={`https://file.lifeni.life/avatar/friends/${name}-light.webp`}
                alt={name}
                className="light"
              />
              <Avatar
                src={`https://file.lifeni.life/avatar/friends/${name}-dark.webp`}
                alt={name}
                className="dark"
              />
            </Fragment>
          ) : (
            <Avatar
              src={`https://file.lifeni.life/avatar/friends/${name}.webp`}
              alt={name}
            />
          )}
        </AvatarLink>
      ))}
    </Container>
  )
}

export default Friend
