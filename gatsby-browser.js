import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import mediumZoom from "medium-zoom"

const onRouteUpdate = ({ location, prevLocation }) => {
  if (!prevLocation || location.pathname !== prevLocation.pathname) {
    if (location.pathname.startsWith("/article/")) {
      setTimeout(() => {
        mediumZoom(document.querySelectorAll("img"), {
          background: "rgba(0, 0, 0, .8)",
        })
      }, 300)
    }

    const block = document.querySelectorAll(".gatsby-highlight")
    const bars = document.querySelectorAll(".code-bar")
    if (block.length && !bars.length) {
      block.forEach(e => {
        const bar = document.createElement("div")
        const span = document.createElement("span")
        bar.className = "code-bar"
        span.className = "code-language"
        span.textContent = e.dataset.language
        bar.appendChild(span)

        const group = document.createElement("div")

        const fold = document.createElement("button")
        fold.className = "code-button fold"
        fold.textContent = "折叠代码"

        fold.onclick = () => {
          const pre = e.querySelector("pre")
          if (pre.classList.contains("folded")) {
            pre.classList.remove("folded")
            fold.textContent = "折叠代码"
          } else {
            pre.classList.add("folded")
            fold.textContent = "展开代码"
          }
        }

        group.appendChild(fold)

        const copy = document.createElement("button")
        const copyNoDollar = document.createElement("button")
        const copyNoGreater = document.createElement("button")

        copy.className = "code-button copy"
        copyNoDollar.className = "code-button copy dollar"
        copyNoGreater.className = "code-button copy greater"
        copy.textContent = "复制"
        copyNoDollar.textContent = "复制并去掉 $"
        copyNoGreater.textContent = "复制并去掉 >"

        copy.onclick = b => {
          const code =
            b.target.parentElement.parentElement.parentElement.lastElementChild
              .firstElementChild
          navigator.clipboard
            .writeText(code.textContent)
            .then(() => {
              b.target.textContent = "已复制"
            })
            .catch(err => {
              console.log("复制出错", err)
            })
        }

        copyNoDollar.onclick = b => {
          const code =
            b.target.parentElement.parentElement.parentElement.lastElementChild
              .firstElementChild
          navigator.clipboard
            .writeText(code.textContent.replace(/\$ /g, ""))
            .then(() => {
              b.target.textContent = "已复制"
            })
            .catch(err => {
              console.log("复制出错", err)
            })
        }

        copyNoGreater.onclick = b => {
          const code =
            b.target.parentElement.parentElement.parentElement.lastElementChild
              .firstElementChild
          navigator.clipboard
            .writeText(code.textContent.replace(/> /g, ""))
            .then(() => {
              b.target.textContent = "已复制"
            })
            .catch(err => {
              console.log("复制出错", err)
            })
        }

        group.appendChild(copy)

        if (e.dataset.language === "bash") {
          group.appendChild(copyNoDollar)
        } else if (e.dataset.language === "powershell") {
          group.appendChild(copyNoGreater)
        }

        bar.appendChild(group)

        const inner = e.firstElementChild
        e.insertBefore(bar, inner)
      })
    }

    const article = document.querySelector("article")
    const articleH1 = document.querySelector("article h1")
    const articleMeta = document.querySelector("#article-meta")
    if (article && articleH1 && articleMeta) {
      article.insertBefore(articleH1, articleMeta)
      articleMeta.style.display = "block"
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
    }
  }

  const openSidebar = document.querySelector("#expand-aside")
  if (openSidebar) {
    openSidebar.onclick = () => {
      const aside = document.querySelector("aside")
      const header = document.querySelector("header")
      aside.classList.toggle("expand")
      header.classList.toggle("expand")
    }
  }

  const closeTips = document.querySelector("#close-tips")
  if (closeTips) {
    closeTips.onlick = () => {
      const outdatedTips = document.querySelector("#outdated-tips")
      outdatedTips.classList.add("hide")
    }
  }

  const openDialog = document.querySelector("#open-dialog")
  if (openDialog) {
    const dialog = document.querySelector("#home-dialog")
    const search = document.querySelector("#article-search")
    openDialog.addEventListener("click", () => {
      dialog.classList.add("show")
      setTimeout(() => {
        search.focus()
      }, 300)
    })

    window.addEventListener("keypress", e => {
      if (e.key === "/") {
        e.preventDefault()
        dialog.classList.toggle("show")
        if (dialog.classList.contains("show")) {
          setTimeout(() => {
            search.focus()
          }, 300)
        }
      }
    })

    window.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        dialog.classList.remove("show")
      }
    })

    document.querySelector(".search-tips a").setAttribute("tabindex", "-1")
  }

  const closeDialog = document.querySelector("#close-dialog")
  if (closeDialog) {
    closeDialog.addEventListener("click", () => {
      const dialog = document.querySelector("#home-dialog")
      dialog.classList.remove("show")
    })
  }

  const closeSearch = document.querySelector("#close-search")
  if (closeSearch) {
    closeSearch.addEventListener("click", () => {
      const dialog = document.querySelector("#home-dialog")
      dialog.classList.remove("show")
    })
  }
}

export { onRouteUpdate }
