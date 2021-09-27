import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"
import {
  RiHeart3Fill,
  RiHeart3Line,
  RiPushpin2Line,
  RiShareLine,
} from "react-icons/ri"

const 朋友 = [
  { name: "Nanako", url: "https://tanakarino.cn/" },
  { name: "bluebonnet27", url: "https://bluebonnet27.github.io/" },
  { name: "GluttonK", url: "https://blog.csdn.net/GluttonK/" },
  { name: "YueChen", url: "http://www.yuechen.xyz/" },
  { name: "开往", url: "https://travellings.link/" },
]

const Wrapper = styled("div")`
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
    padding: 2.5rem 1rem;
    display: flex;
    flex-direction: column;
    border-bottom: var(--border);
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

    strong {
      font-weight: 700;
    }
  }
`

const Title = styled("div")`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 1.375rem;
    font-weight: 700;
    padding: 0.5rem 0 0.75rem 0;
    display: flex;
    align-items: center;

    @media (max-width: 720px) {
      padding: 0 0 1rem 0;
    }

    section {
      margin: 0 0 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        display: flex;
        align-items: center;
      }
    }
  }
`

const Footer = styled("div")`
  width: 100%;
  margin: 0 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  code {
    font-size: 0.875rem;
    font-weight: 400;

    color: var(--font-secondary);
    font-family: var(--font-mono);
    transition: all 0.2s;
    overflow-wrap: break-word;

    svg {
      margin: 0 0.75rem 0 0;
    }
  }
`

const Friend = styled("div")`
  padding: 0.875rem 0 0.5rem 1px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 400px) {
    padding: 0.75rem 0 0.5rem 1px;
  }

  section {
    width: 100%;
    padding: 0 0 0.75rem 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;

    @media (max-width: 720px) {
      padding: 0 0 1rem 0;
    }
  }

  a {
    position: relative;
    max-width: 2.25rem;
    max-height: 2.25rem;
    border-radius: 100%;

    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      background-color: var(--element-background);
      color: transparent;
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
      white-space: nowrap;
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

interface ActionProps {
  like?: boolean
}

const Action = styled("button")<ActionProps>`
  float: right;
  width: 2.25rem;
  height: 2.25rem;
  margin: 0 -0.5rem 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--border-radius);
  color: var(--font-secondary);
  background-color: var(--background);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: var(--font-primary);
    background-color: var(--element-background);
  }

  &:disabled {
    cursor: not-allowed;
  }

  svg {
    color: ${props => (props.like ? "var(--red)" : "inhert")};
    animation: ${props => (props.like ? "like 0.2s forwards" : "none")};
    transition: all 0.2s;
  }

  @keyframes like {
    0% {
      transform: scale(0.9);
    }

    50% {
      transform: scale(1.1);
    }

    100% {
      transform: scale(1.05);
    }
  }
`

const About = () => {
  const [like, setLike] = useState(false)
  const [share, setShare] = useState(false)

  useEffect(() => {
    // @ts-ignore
    if (window?.navigator?.share) setShare(true)
  }, [])

  const handleShare = () => {
    if (share) {
      window.navigator.share({
        title: "记录干杯",
        text: "个人网站「记录干杯」，在这里记录一些技术相关的文章、尝试一些新的技术。",
        url: "https://lifeni.life",
      })
    }
  }

  return (
    <Wrapper>
      <article>
        <Title>
          <h1>你好</h1>
          <section>
            {share ? (
              <Action title="分享" onClick={handleShare}>
                <RiShareLine aria-label="分享" size="1.125rem" />
              </Action>
            ) : (
              <Action title="你的浏览器不支持 Web Share API" disabled>
                <RiShareLine aria-label="分享" size="1.125rem" />
              </Action>
            )}

            <Action
              like={like}
              title={like ? "取消点赞" : "点赞"}
              onClick={() => setLike(!like)}
            >
              {like ? (
                <RiHeart3Fill aria-label="取消点赞" size="1.125rem" />
              ) : (
                <RiHeart3Line aria-label="点赞" size="1.125rem" />
              )}
            </Action>
          </section>
        </Title>

        <p>
          我是 <strong>梁峰宁</strong>
          ，这里是我的个人网站 <strong>记录干杯</strong>。
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
          &nbsp;上可以找到我做过的一些项目，以及关于我的其他信息。如果你有一些问题或者好的想法，欢迎通过&nbsp;
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
        <p>
          另外，这些都是我的朋友，可以去他们的网站看看，或者&nbsp;
          <a
            href="https://github.com/volfclub/travellings"
            title="开往 - 友链接力"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            开往
          </a>
          &nbsp;下一站。
        </p>
        <Friend>
          <section>
            {朋友.map((friend, index) => (
              <a
                href={friend.url}
                target="_blank"
                rel="nofollow noopener noreferrer"
                key={index}
              >
                <img
                  src={`https://file.lifeni.life/avatar/friends/${friend.name}.webp`}
                  alt={friend.name}
                />
                <span>{friend.name}</span>
              </a>
            ))}
          </section>
        </Friend>

        <Footer>
          <code># BLOG / README.mdx</code>
        </Footer>
      </article>
    </Wrapper>
  )
}

export default About
