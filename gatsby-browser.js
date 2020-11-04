require("prismjs/themes/prism-solarizedlight.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")

exports.onRouteUpdate = () => {
  const block = document.querySelectorAll(".gatsby-highlight")
  if (block.length) {
    block.forEach(e => {
      const copy = document.createElement("button")
      const copy$ = document.createElement("button")
      copy.className = "copy-button"
      copy$.className = "copy-button dollar"
      copy.textContent = "Copy"
      copy$.textContent = "Copy Without $"
      copy.onclick = b => {
        navigator.clipboard
          .writeText(
            b.target.parentElement.firstElementChild.firstElementChild
              .textContent
          )
          .then(() => {
            b.target.textContent = "Copied"
          })
          .catch(err => {
            console.log("复制出错", err)
          })
      }
      copy$.onclick = b => {
        navigator.clipboard
          .writeText(
            b.target.parentElement.firstElementChild.firstElementChild.textContent.replace(
              /\$ /g,
              ""
            )
          )
          .then(() => {
            b.target.textContent = "Copied"
          })
          .catch(err => {
            console.log("复制出错", err)
          })
      }
      e.appendChild(copy)
      if (e.dataset.language === "bash") {
        e.appendChild(copy$)
      }
    })
  }

  const title = document.querySelector("#header-title")
  if (title) {
    title.addEventListener("click", () => {
      window.scrollTo(0, 0)
    })
  }

  const toggleAside = () => {
    const aside = document.querySelector("aside")
    const header = document.querySelector("header")
    aside.classList.toggle("expand")
    header.classList.toggle("expand")
  }

  const expand = document.querySelector("#expand-aside")
  if (expand) {
    expand.addEventListener("click", toggleAside)
  }

  const expandHeader = document.querySelector("#expand-aside-header")
  if (expandHeader) {
    expandHeader.addEventListener("click", toggleAside)
  }

  const closeTips = document.querySelector("#close-tips")
  if (closeTips) {
    closeTips.addEventListener("click", () => {
      const outdatedTips = document.querySelector("#outdated-tips")
      outdatedTips.classList.add("hide")
    })
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
