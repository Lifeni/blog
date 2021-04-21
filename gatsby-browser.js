import mediumZoom from "medium-zoom"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"

const domOperation = location => {
  if (location.pathname.startsWith("/article/")) {
    setTimeout(() => {
      mediumZoom(document.querySelectorAll("article img"), {
        background: "rgba(0, 0, 0, .8)",
      })
    }, 300)
  }

  const block = document.querySelectorAll(".gatsby-highlight")
  if (block.length) {
    block.forEach(e => {
      const copy = document.createElement("button")
      copy.className = "code-copy-button"
      copy.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z"></path></svg>`
      copy.setAttribute("aria-label", "Copy")
      copy.title = "Copy"
      copy.onclick = b => {
        const code = e.querySelector("pre code")
        navigator.clipboard
          .writeText(code.textContent)
          .then(() => {
            b.target.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>`
          })
          .catch(err => {
            console.log("复制出错", err)
          })
      }

      const inner = e.firstElementChild
      e.insertBefore(copy, inner)
    })
  }

  const comment = document.querySelector("#comment")
  if (comment) {
    const utterances = document.createElement("script")
    utterances.setAttribute("src", "https://utteranc.es/client.js")
    utterances.setAttribute("repo", "Lifeni-Site/Comment")
    utterances.setAttribute("issue-term", "pathname")
    utterances.setAttribute("theme", "preferred-color-scheme")
    utterances.setAttribute("crossOrigin", "anonymous")
    utterances.setAttribute("async", "true")
    comment.appendChild(utterances)

    utterances.onload = () => {
      const iframe = comment.querySelector("iframe")
      iframe.onload = () => {
        comment.querySelector("#comment-loading").classList.add("hide")
      }

      iframe.onerror = () => {
        comment.querySelector("#comment-loading").classList.add("hide")
        comment.querySelector("#comment-error").classList.remove("hide")
      }
    }

    utterances.onerror = () => {
      comment.querySelector("#comment-loading").classList.add("hide")
      comment.querySelector("#comment-error").classList.remove("hide")
    }
  }
}

const onRouteUpdate = ({ location, prevLocation }) => {
  if (prevLocation && location.pathname === prevLocation.pathname) {
    // Hash 锚点的情况
    const aside = document.querySelector("aside")
    const header = document.querySelector("header")
    if (aside.classList.contains("expand")) {
      aside.classList.remove("expand")
      header.classList.remove("expand")
    }
  }

  if (!prevLocation) {
    // 第一次进入页面
    domOperation(location)
    const header = document.querySelector("header")
    if (header) {
      header.dataset.ref = "null"
    }
  }

  if (prevLocation && location.pathname !== prevLocation.pathname) {
    // 站内页面跳转
    domOperation(location)
    const header = document.querySelector("header")
    if (header) {
      header.dataset.ref = prevLocation.pathname
    }
  }
}

const onServiceWorkerUpdateReady = () => {
  document.querySelector("#update-card").classList.add("show")
}

export { onRouteUpdate, onServiceWorkerUpdateReady }
