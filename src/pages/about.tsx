import styled from "@emotion/styled"
import { graphql } from "gatsby"
import * as React from "react"
import { Helmet } from "react-helmet"
import ActionBar from "../components/ActionBar"
import Article from "../components/Article"
import Comment from "../components/Comment"
import Header from "../components/Header"

const AboutWrapper = styled("div")`
  article {
    h1 + h2 {
      margin-top: 0;
    }

    h2 {
      font-size: 1.25rem;
    }
  }

  .friends ul {
    position: relative;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    li {
      position: relative;
      margin: 0;
      padding: 0.5rem 0;
      list-style: none;

      a {
        position: relative;
        width: 2.25rem;
        height: 2.25rem;
        margin: 0;
        display: block;

        &::before {
          content: attr(title);
          position: absolute;
          left: 50%;
          top: -2.75rem;
          width: fit-content;
          padding: 0.125rem 0.5rem;
          border-radius: 0.25rem;
          background-color: var(--popover-background);
          opacity: 0;
          visibility: hidden;
          z-index: 10;
          color: var(--popover-color);
          font-size: 0.925rem;
          white-space: nowrap;
          transform: translateX(-50%);
          box-shadow: var(--shadow-normal);
          transition: all 0.2s;
        }

        &::after {
          content: "";
          position: absolute;
          left: 50%;
          top: -0.75rem;
          width: fit-content;
          border: solid 0.5rem transparent;
          border-top: solid 0.5rem var(--popover-background);
          opacity: 0;
          visibility: hidden;
          z-index: 10;
          transform: translateX(-50%);
          box-shadow: var(--shadow-normal);
          transition: all 0.2s;
        }

        &:hover::before,
        &:hover::after {
          opacity: 1;
          visibility: visible;
        }
      }

      img {
        width: 2.25rem;
        height: 2.25rem;
        margin: 0;
        border-radius: 100%;
        box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.08);
      }
    }
  }
`
const AboutPage = ({ data }) => {
  return (
    <>
      <Helmet>
        <title>关于我和这个网站 | 记录干杯</title>
        <meta
          name="description"
          content="这是我的个人网站「记录干杯」，我会在这里记录一些文章或者是想法，也会在网站上尝试一些新的技术。"
        ></meta>
      </Helmet>
      <Header>
        <ActionBar />
      </Header>
      <AboutWrapper>
        <Article>{data.allMarkdownRemark.edges[0].node.html}</Article>
      </AboutWrapper>
      <Comment />
    </>
  )
}

export default AboutPage

export const query = graphql`
  {
    allMarkdownRemark(filter: { frontmatter: { path: { eq: "about" } } }) {
      edges {
        node {
          frontmatter {
            path
          }
          html
        }
      }
    }
  }
`
