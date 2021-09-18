import styled from "@emotion/styled"
import React from "react"
import { RiArchiveLine, RiTerminalBoxLine } from "react-icons/ri"

const 朋友 = [
  { name: "Nanako", url: "https://tanakarino.cn/" },
  { name: "bluebonnet27", url: "https://bluebonnet27.github.io" },
  { name: "GluttonK", url: "https://blog.csdn.net/GluttonK/" },
  { name: "YueChen", url: "http://www.yuechen.xyz/" },
]

const AboutWrapper = styled("div")`
  position: relative;
  padding: 0 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  line-height: 2;

  article {
    width: 100%;
    max-width: var(--article-width);
    padding: 2.5rem 1rem 2.625rem 1rem;
    display: flex;
    flex-direction: column;
    transition: all 0.2s;

    @media (max-width: 800px) {
      padding: 1.75rem 1rem;
    }

    a {
      color: var(--font-link);
      text-decoration: none;
      overflow-wrap: break-word;
      transition: all 0.2s;

      &:hover {
        color: var(--font-link-hover);
        text-underline-offset: 0.25em;
        text-decoration: underline;
      }
    }

    p {
      margin: 0.375rem 0;
      font-size: inherit;
      line-height: inherit;
      text-align: justify;
      text-justify: auto;
      overflow-wrap: break-word;
    }

    h1 {
      font-size: 1.375rem;
      padding: 0 0 1rem 0;
    }
  }
`

const Friends = styled("section")`
  padding: 0.75rem 0;
  display: flex;

  a {
    position: relative;
    width: 2.25rem;
    height: 2.25rem;
    margin: 0 1rem 0 0;
    border-radius: 100%;

    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      background-color: var(--element-background);
    }

    span {
      position: absolute;
      left: 50%;
      bottom: 3rem;
      padding: 0.125rem 0.625rem;
      visibility: hidden;
      opacity: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--border-radius);
      color: var(--font-light);
      background-color: var(--font-primary);
      font-size: 0.875rem;
      transform: translateX(-50%);
      transition: all 0.2s;
    }

    &:hover {
      span {
        visibility: visible;
        opacity: 1;
      }
    }
  }
`

const AboutLink = styled("a")`
  width: 100%;
  max-width: var(--main-width);
  height: 3.5rem;
  margin: 0.5rem 0;
  padding: 0.75rem 1.25rem;
  border-radius: var(--border-radius);
  border: none;
  display: flex;
  align-items: center;
  color: var(--font-secondary);
  background-color: var(--element-background);
  font-size: 1rem;
  font-family: inherit;
  font-weight: inherit;
  line-height: 2;
  outline: none;
  transition: all 0.2s;
  pointer-events: initial;
  cursor: pointer;
  text-decoration: none;

  @media (max-width: 800px) {
    margin: 1rem 0 0 0;
  }

  svg {
    margin: 0 1rem 0 0;
  }

  &:focus,
  &:focus-visible,
  &:hover {
    background-color: var(--element-background-hover);
  }

  small {
    display: flex;
    flex: 1;
    justify-content: flex-end;
  }
`

const About = () => {
  return (
    <AboutWrapper>
      <article>
        <h1>Hello</h1>
        <p>
          我是 <strong>梁峰宁</strong>，这是我的个人网站「记录干杯」。
        </p>
        <p>
          我比较感兴趣的方向是 Web 前端，喜欢好看的设计，在&nbsp;
          <a
            href="https://github.com/Lifeni"
            title="@Lifeni"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            GitHub
          </a>
          &nbsp;上可以找到我和我的项目，以及关于我的其他信息。
        </p>
        <p>
          如果你有一些问题或者好的想法，可以通过&nbsp;
          <a
            href="mailto:liangfengning@foxmail.com"
            title="liangfengning@foxmail.com"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            邮箱
          </a>
          &nbsp;联系我。
        </p>
        <Friends>
          {朋友.map((friend, index) => (
            <a
              href={friend.url}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <img
                src={`https://file.lifeni.life/avatar/friends/${friend.name}.webp`}
                alt={friend.name}
              />
              <span>{friend.name}</span>
            </a>
          ))}
        </Friends>
        <p>这些都是我的朋友，欢迎去他们的网站看看。</p>
      </article>

      <AboutLink
        href="https://lab.lifeni.life"
        target="_blank"
        rel="noopener noreferrer"
      >
        <RiTerminalBoxLine aria-label="茶杯图标" size="1.125em" />
        并不存在的实验室
        <small>Hello World</small>
      </AboutLink>

      <AboutLink
        href="https://dev.lifeni.life"
        target="_blank"
        rel="noopener noreferrer"
      >
        <RiArchiveLine aria-label="箱子图标" size="1.125em" />
        一些自己做的东西
        <small>Code Sandbox</small>
      </AboutLink>
    </AboutWrapper>
  )
}

export default About
