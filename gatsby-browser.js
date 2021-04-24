import mediumZoom from "medium-zoom"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"

const domOperation = location => {
  if (location.pathname.startsWith("/article/")) {
    const imgs = document.querySelectorAll("article img")
    imgs.forEach(e => {
      e.setAttribute("tabindex", "0")
      e.onkeypress = event => {
        if (event.key === "Enter") {
          e.click()
        }
      }
    })
    setTimeout(() => {
      mediumZoom(imgs, {
        background: "rgba(0, 0, 0, .8)",
      })
    }, 300)
  }

  const block = document.querySelectorAll(".gatsby-highlight")
  if (block.length) {
    block.forEach(e => {
      const copy = document.createElement("button")
      copy.className = "code-copy-button"
      copy.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z"/><path d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z"/></svg>`
      copy.setAttribute("aria-label", "Copy")
      copy.title = "Copy"
      copy.onclick = () => {
        const code = e.querySelector("pre code")
        navigator.clipboard
          .writeText(code.textContent)
          .then(() => {
            copy.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z"/><path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"/></svg>`
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
  const exist = document.querySelector(".utterances-frame")
  if (comment && !exist) {
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
  document.querySelector("#update-now").classList.add("show")
}

export { onRouteUpdate, onServiceWorkerUpdateReady }
