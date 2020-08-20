require("prismjs/themes/prism-solarizedlight.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")

exports.onRouteUpdate = () => {
  fetch("https://api.lifeni.life/😎", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "@",
      from: window.location.href,
      agent: navigator.userAgent,
      language: navigator.language,
    }),
  })
    .then(res => res.json())
    .then(data => {
      console.log("API", data)
    })

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
    const count = document.querySelector("#like-count")
    const text = document.querySelector("#like-text")
    like.addEventListener("click", () => {
      fetch("https://api.lifeni.life/😘", {
        credentials: "include",
      })
        .then(res => res.json())
        .then(data => {
          if (data.code === 200) {
            count.textContent = `❤ × ${data.count}`
            text.textContent = `感谢支持`
          } else if (data.code === 401) {
            count.textContent = `❤ 不认识你`
            text.textContent = `听说刷新页面...`
          } else if (data.code === 429) {
            count.textContent = `❤ 溢出了`
            text.textContent = `等一会再点吧`
          }

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

  const toggleAside = () => {
    const aside = document.querySelector("aside")
    aside.classList.toggle("expand")
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

  const privacy = document.querySelector("#privacy-snackbar")
  if (privacy) {
    if (window.localStorage.getItem("privacy")) {
      privacy.classList.remove("show")
    } else {
      privacy.classList.add("show")
    }

    const closeSnackbar = document.querySelector("#close-snackbar")
    closeSnackbar.addEventListener("click", () => {
      privacy.classList.remove("show")
      window.localStorage.setItem("privacy", "ok")
    })
  }

  if (window.location.pathname.includes("/privacy")) {
    window.localStorage.setItem("privacy", "ok")
  }
}
