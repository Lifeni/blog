import styled from "@emotion/styled"

const Container = styled("div")`
  position: relative;
  width: 100%;
  padding: 2.75rem 1rem 1.75rem 1rem;
  color: inherit;
  transition: all 0.2s;

  @media (max-width: 36rem) {
    padding: 2rem 1rem 1.625rem 1rem;
  }
`

const H3 = styled("h3")`
  padding: 0 0 0.75rem 0;
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  line-height: 2;
  font-weight: 700;
  transition: all 0.2s;
`

const Link = styled("a")`
  max-width: 100%;
  width: fit-content;
  display: inline-block;
  color: inherit;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: var(--font-link-hover);
  }
`

const List = styled("ul")`
  width: 100%;
  margin: 0.25rem 0 0.25rem 0;
  padding: 0 1px;
  display: flex;
  flex-direction: column;
  list-style: none;

  ul {
    margin: 0;
    padding: 0.25rem 0 0 1.25rem;

    li {
      &::before {
        content: "•";
        position: absolute;
        left: -1.25rem;
        color: inherit;
        font-family: var(--font-mono);
        transition: all 0.2s;
      }

      &:hover::before {
        content: "→";
        color: var(--font-link-hover);
      }
    }
  }
`

const ListItem = styled("li")`
  position: relative;
  max-width: 100%;
  width: fit-content;
  padding: 0.125rem 0;
  display: flex;
  flex-direction: column;
`

interface RecursionProps {
  data: TableOfContents[]
}

const Recursion = ({ data }: RecursionProps) => {
  return (
    <List>
      {data.map(item =>
        item.items ? (
          <ListItem key={item.url}>
            <Link href={item.url}>{item.title}</Link>
            <Recursion data={item.items} />
          </ListItem>
        ) : (
          <ListItem key={item.url}>
            <Link href={item.url}>{item.title}</Link>
          </ListItem>
        )
      )}
    </List>
  )
}

const Null = styled("span")`
  display: flex;
  padding: 0.375rem 0 0.875rem 0;
`

interface ContentsProps {
  items: TableOfContents
}

const Contents = ({ items }: ContentsProps) => {
  return (
    <Container>
      <H3>目录</H3>
      {items.items ? (
        <Recursion data={items.items} />
      ) : (
        <Null>这篇文章没有目录</Null>
      )}
    </Container>
  )
}

export default Contents
