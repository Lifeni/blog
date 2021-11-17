import styled from "@emotion/styled"
import {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  Fragment,
  ImgHTMLAttributes,
  TableHTMLAttributes,
} from "react"
import Zoom from "react-medium-image-zoom"

export const Null = () => <Fragment />

export const H2 = styled("h2")`
  width: fit-content;
  padding: 1.25rem 0;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 2;

  & + h3 {
    padding: 0.5rem 0 1rem 0;
  }
`

export const H3 = styled("h3")`
  width: fit-content;
  padding: 1rem 0;
  font-size: 1.125rem;
  line-height: 2;
  font-weight: 700;
`

export const H4 = styled("h4")`
  width: fit-content;
  padding: 0.75rem 0;
  font-size: 1rem;
  line-height: 2;
  font-weight: 700;
`

export const Paragraph = styled("p")`
  margin: 0.375rem 0;
  font-size: inherit;
  line-height: inherit;
  text-align: justify;
  text-justify: auto;
  overflow-wrap: break-word;
`

export const Link = styled("a")`
  color: var(--font-link);
  text-decoration: none;
  word-break: break-all;
  transition: all 0.2s;

  &:hover {
    color: var(--font-link-hover);
    text-underline-offset: 0.25em;
    text-decoration: underline;
  }
`

export const ExternalLink = (
  props: DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
) =>
  props.href?.startsWith("#") || props.href === "/" ? (
    <Link {...props} />
  ) : (
    <Link {...props} target="_blank" rel="noopener noreferrer" />
  )

export const List = styled("ul")`
  margin: 0.125rem 0;
  padding: 0 0 0 1.125rem;
`

export const OrderedList = List.withComponent("ol")

export const ListItem = styled("li")`
  margin: 0.25rem 0;
  padding: 0 0 0 0.5rem;
`

export const Code = styled("code")`
  font-size: 0.875em;
  padding: 0.2em 0.4em;
  border: var(--border);
  border-radius: var(--border-radius);
  background-color: var(--element-background);
  font-family: var(--font-mono);
  transition: all 0.2s;
  overflow-wrap: break-word;
`

export const Pre = styled("pre")`
  position: relative;
  width: calc(100% + 2rem);
  margin: 1rem -1rem;
  padding: 1.125rem 1.5rem;
  display: flex;
  border: var(--border);
  border-radius: var(--border-radius);
  background-color: var(--element-background);
  transition: all 0.2s;
  overflow: auto;

  & + pre {
    margin-top: 0.25rem;
  }

  &::after {
    content: "";
    display: inline-block;
    width: 1.5rem;
  }
`

export const PreCode = styled("code")`
  padding: 0;
  display: inline-block;
  border: none;
  font-size: 0.875em;
  line-height: 1.875;
  font-family: var(--font-mono);
  transition: all 0.2s;
`

export const Image = styled("img")`
  width: 100%;
  display: flex;
`

export const LazyImage = (
  props: DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
) => (
  <Zoom
    overlayBgColorEnd="rgba(0, 0, 0, 0.5)"
    wrapStyle={{
      width: "calc(100% + 2rem)",
      margin: "1rem -1rem",
      borderRadius: "var(--border-radius)",
      overflow: "hidden",
    }}
  >
    <Image {...props} loading="lazy" />
  </Zoom>
)

export const BlockQuote = styled("blockquote")`
  margin: 1rem 0;
  padding: 0.25rem 0 0.25rem 1.5rem;
  border-left: var(--border-block);
  color: var(--font-secondary);
  transition: all 0.2s;
  display: flex;
  flex-direction: column;

  pre {
    width: 100%;
    margin: 0.75rem 0;
  }
`

const TableElement = styled("table")`
  width: 100%;
  display: table;
  border-collapse: collapse;
  table-layout: auto;
  text-align: center;
  overflow-x: auto;
  transition: all 0.2s;

  tr {
    border-bottom: var(--border);
    transition: all 0.2s;

    &:nth-of-type(even) {
      background-color: var(--element-background);
    }
  }

  tbody tr:last-of-type {
    border: none;
  }

  th,
  td {
    padding: 0.5rem 1rem;
    color: inherit;
    text-align: start;
    border-right: var(--border);
    text-align: justify;
    text-justify: auto;
    overflow-wrap: break-word;
    white-space: nowrap;
    transition: all 0.2s;

    &:last-of-type {
      border: none;
    }

    code[class*="language-"] {
      white-space: nowrap;
    }
  }

  th {
    font-weight: 700;
    background-color: var(--element-background);
  }
`

const TableWrapper = styled("div")`
  width: calc(100% + 2rem);
  margin: 1rem -1rem;
  display: flex;
  border-radius: var(--border-radius);
  transition: all 0.2s;
  border: var(--border);
  overflow-x: auto;
`

export const Table = (
  props: DetailedHTMLProps<
    TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  >
) => (
  <TableWrapper>
    <TableElement {...props} />
  </TableWrapper>
)

export const Delete = styled("del")`
  color: var(--font-secondary);
`

export const Details = styled("details")`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;

  summary {
    width: fit-content;
    padding: 0.375rem 1rem;
    border-radius: var(--border-radius);
    background-color: var(--element-background);
    cursor: pointer;
    user-select: none;
  }

  &[open] summary {
    margin-bottom: 1.75rem;
  }
`

export const Hr = styled("hr")`
  height: 1rem;
  margin: 0.375rem 0;
  border: none;
`
