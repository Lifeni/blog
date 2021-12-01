import styled from "@emotion/styled"

const Container = styled("div")`
  position: relative;
  width: 100%;
  padding: 2.5rem 1rem 2rem 1rem;
  display: flex;
  flex-direction: column;
  color: inherit;
  overflow: hidden;
  transition: all 0.2s;

  @media (max-width: 36rem) {
    padding: 2rem 1rem;
  }

  @media (min-width: 56rem) {
    &::before {
      content: "";
      position: absolute;
      top: 4.625rem;
      left: 0;
      z-index: 10;
      width: 100%;
      height: 1rem;
      box-shadow: 0 0 0 1rem var(--background);
      pointer-events: none;
      transition: all 0.2s;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: 0.625rem;
      left: 0;
      z-index: 10;
      width: 100%;
      height: 1rem;
      box-shadow: 0 0 0 1rem var(--background);
      pointer-events: none;
      transition: all 0.2s;
    }
  }
`

const Wrapper = styled("div")`
  position: relative;
  display: flex;
  padding: 0 1rem 0 0;
  flex-direction: column;
  flex: 1;
  scrollbar-width: thin;
  scrollbar-color: var(--border-color) var(--element-background);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 100%;
    background-color: var(--element-background);
  }

  &::-webkit-scrollbar-thumb {
    margin: 1rem 0;
    background-color: var(--border-color);
  }
`

const H3 = styled("h3")`
  position: relative;
  padding: 0.25rem 0 1.125rem 0;
  z-index: 20;
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  line-height: 2;
  font-weight: 700;
  transition: all 0.2s;
`

const Link = styled("a")`
  position: relative;
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
  position: relative;
  width: 100%;
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
        left: -1.375rem;
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
  padding: 0.125rem 0;
`

interface ContentsProps {
  items: TableOfContents
}

const Contents = ({ items }: ContentsProps) => {
  return (
    <Container>
      <H3>目录</H3>
      <Wrapper>
        {items.items ? (
          <Recursion data={items.items} />
        ) : (
          <Null>这篇文章没有目录</Null>
        )}
      </Wrapper>
    </Container>
  )
}

export default Contents
