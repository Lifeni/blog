import styled from "@emotion/styled"
import Code from "./article/Code"
import CodeBlock from "./article/CodeBlock"
import Del from "./article/Del"
import Details from "./article/Details"
import { H1, H2, H3, H4, Heading } from "./article/Heading"
import Hr from "./article/Hr"
import Image from "./article/Image"
import Link from "./article/Link"
import List from "./article/List"
import Paragraph from "./article/Paragraph"
import Quote from "./article/Quote"
import Table from "./article/Table"

const Markdown = styled("article")`
  width: 100%;
  max-width: var(--main-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  line-height: 2;

  p {
    ${Paragraph}
  }

  h1,
  h2,
  h3,
  h4 {
    ${Heading}
  }

  h1 {
    ${H1}
  }

  h2 {
    ${H2}
  }

  h3 {
    ${H3}
  }

  h4 {
    ${H4}
  }

  a {
    ${Link}
  }

  code {
    ${Code}
  }

  .gatsby-highlight {
    ${CodeBlock}
  }

  img {
    ${Image}
  }

  blockquote {
    ${Quote}
  }

  ul,
  ol {
    ${List}
  }

  .table-wrapper {
    ${Table}
  }

  details {
    ${Details}
  }

  hr {
    ${Hr}
  }

  del {
    ${Del}
  }
`

export default Markdown
