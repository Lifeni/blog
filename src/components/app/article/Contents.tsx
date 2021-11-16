import styled from "@emotion/styled"

const Container = styled("div")`
  width: 100%;
  padding: 2.25rem 1rem;
  color: var(--font-primary);
  transition: all 0.2s;

  @media (max-width: 36rem) {
    padding: 1.5rem 1rem;
  }
`

const H3 = styled("h3")`
  padding: 0 0 0.75rem 0;
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  line-height: 2;
  font-family: var(--font-mono);
  font-weight: 700;
  transition: all 0.2s;

  @media (max-width: 36rem) {
    padding: 0 0 0.5rem 0;
  }
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
  transition: all 0.2s;

  &:hover {
    color: var(--font-link-hover);
  }
`

const List = styled("ul")`
  width: 100%;
  margin: 0.25rem 0 0.5rem 0;
  display: flex;
  flex-direction: column;
  list-style: none;
  font-size: 1rem;
  font-family: var(--font-mono);

  ul {
    margin: 0;
    padding: 0.25rem 0 0 1rem;
  }

  @media (max-width: 56rem) {
    font-size: 1rem;
  }
`

const ListItem = styled("li")`
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
