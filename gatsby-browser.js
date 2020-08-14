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

  const top = document.querySelector("#go-top")
  const title = document.querySelector("#header-title")
  const about = document.querySelector("#about")
  window.addEventListener("scroll", () => {
    window.requestAnimationFrame(() => {
      const scrollTop = document.querySelector("html").scrollTop
      if (scrollTop > 160) {
        if (top) {
          top.classList.remove("hide")
          title.classList.add("show")
        }

        if (about) {
          about.classList.add("light")
        }
      } else {
        if (top) {
          top.classList.add("hide")
          title.classList.remove("show")
        }

        if (about) {
          about.classList.remove("light")
        }
      }
    })
  })
  if (top) {
    top.addEventListener("click", () => {
      window.scrollTo(0, 0)
    })
  }

  const like = document.querySelector("#like-it")
  if (like) {
    const popover = document.querySelector("#popover")
    const h2 = document.querySelector("#popover h2")
    const h3 = document.querySelector("#popover h3")
    like.addEventListener("click", () => {
      fetch("https://api.lifeni.life/like", {
        method: "POST",
      })
        .then(response => response.text())
        .then(count => {
          h2.textContent = `❤ × ${count}`
          h3.textContent = `感谢支持`
          popover.classList.add("show")
          like.classList.add("fill")
        })
    })

    like.addEventListener("blur", () => {
      popover.classList.remove("show")
    })
  }

  const info = document.querySelector("#article-info")
  if (info) {
    const popover = document.querySelector("#popover")
    info.addEventListener("click", () => {
      popover.classList.add("show")
    })

    info.addEventListener("blur", () => {
      popover.classList.remove("show")
    })
  }

  const expand = document.querySelector("#expand-aside")
  if (expand) {
    expand.addEventListener("click", () => {
      const aside = document.querySelector("aside")
      aside.classList.toggle("expand")
    })
  }

  const expand2 = document.querySelector("#expand-aside-header")
  if (expand2) {
    expand2.addEventListener("click", () => {
      const aside = document.querySelector("aside")
      aside.classList.toggle("expand")
    })
  }

  const closeTips = document.querySelector("#close-tips")
  if (closeTips) {
    closeTips.addEventListener("click", () => {
      const outdatedTips = document.querySelector("#outdated-tips")
      outdatedTips.classList.add("hide")
    })
  }
}
