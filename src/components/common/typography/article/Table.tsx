import { css } from "@emotion/react"

const Table = css`
  width: calc(100% + 2rem);
  margin: 1rem -1rem;
  display: flex;
  border-radius: var(--border-radius);
  transition: all 0.2s;
  border: var(--border);
  overflow-x: auto;

  table {
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
  }
`

export default Table
