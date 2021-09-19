import styled from "@emotion/styled"
import React from "react"

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
    padding: 2.5rem 1rem 2.625rem 1rem;
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
      margin: 0.5rem 0;
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

const Friend = styled("section")`
  padding: 0.75rem 1px;
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

const About = () => {
  return (
    <Wrapper>
      <article>
        <h1>你好</h1>
        <p>
          我是 <strong>梁峰宁</strong>
          ，这是我的个人网站「记录干杯」。
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
          &nbsp;上可以找到我和我的项目，以及关于我的其他信息。如果你有一些问题或者好的想法，可以通过&nbsp;
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
        <p>另外，这些都是我的朋友，有时间可以去他们的网站看看。</p>
        <Friend>
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
        </Friend>
      </article>
    </Wrapper>
  )
}

export default About
