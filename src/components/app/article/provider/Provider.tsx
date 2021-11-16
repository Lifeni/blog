import { MDXProvider } from "@mdx-js/react"
import { ReactNode } from "react"
import {
  Null,
  H2,
  H3,
  H4,
  Paragraph,
  ExternalLink,
  List,
  ListItem,
  Code,
  Pre,
  PreCode,
  LazyImage,
  BlockQuote,
  Delete,
  Details,
  Table,
  Hr,
} from "./Component"

interface ProviderProps {
  children: ReactNode | ReactNode[]
}

const Provider = ({ children }: ProviderProps) => {
  return (
    <MDXProvider
      components={{
        h1: Null,
        h2: H2,
        h3: H3,
        h4: H4,
        p: Paragraph,
        a: ExternalLink,
        ul: List,
        ol: List,
        li: ListItem,
        inlineCode: Code,
        pre: Pre,
        code: PreCode,
        img: LazyImage,
        blockquote: BlockQuote,
        del: Delete,
        details: Details,
        table: Table,
        hr: Hr,
      }}
    >
      {children}
    </MDXProvider>
  )
}

export default Provider
