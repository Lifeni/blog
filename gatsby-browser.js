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
      copy.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`
      copy.setAttribute("aria-label", "Copy")
      copy.title = "Copy"
      copy.onclick = () => {
        const code = e.querySelector("pre code")
        navigator.clipboard
          .writeText(code.textContent)
          .then(() => {
            copy.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"/></svg>`
          })
          .catch(err => {
            console.log("复制出错", err)
          })
      }

      const inner = e.firstElementChild
      e.insertBefore(copy, inner)
    })
  }

  const comment = document.querySelector("#article-comment")
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
  if (!prevLocation) {
    // 第一次进入页面
    domOperation(location)
  }

  if (prevLocation && location.pathname !== prevLocation.pathname) {
    // 站内页面跳转
    domOperation(location)
  }

  if (prevLocation && location.pathname === prevLocation.pathname) {
    // Hash 锚点的情况
    const body = document.querySelector("body")
    const aside = document.querySelector("aside")
    const main = document.querySelector("main")
    const header = document.querySelector("header")
    if (aside?.classList.contains("expand")) {
      body.classList.remove("expand")
      aside.classList.remove("expand")
      header.classList.remove("expand")
      main.classList.remove("expand")
    }
  }
}

const onServiceWorkerUpdateReady = () => {
  document.querySelector("#update-now").classList.add("show")
}

export { onRouteUpdate, onServiceWorkerUpdateReady }
