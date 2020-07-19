require("prismjs/themes/prism-solarizedlight.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")
require("./src/styles/color.css")
require("./src/styles/fab.css")

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

  const focus = document.querySelector("#focus")
  if (focus) {
    const layout = document.querySelector(".layout")
    const aside = document.querySelector("aside")
    const main = document.querySelector("main")
    focus.addEventListener("click", () => {
      layout.classList.toggle("max")
      focus.classList.toggle("max")
      aside.classList.toggle("hide")
      main.classList.toggle("max")
    })
  }

  const top = document.querySelector("#top")
  if (top) {
    top.addEventListener("click", () => {
      window.scrollTo(0, 0)
    })
  }

  const toggle = document.querySelector("#toggle")
  if (toggle) {
    toggle.addEventListener("click", () => {
      const toc = document.querySelector(".post-toc")
      toc.classList.toggle("show")
      toggle.classList.toggle("show")
      toggle.textContent = toggle.textContent === "目录" ? "收起" : "目录"
    })
  }

  const avatar = document.querySelector(".avatar")
  if (avatar) {
    avatar.addEventListener("mouseout", e => {
      window.requestAnimationFrame(() => {
        avatar.style.transform = `perspective(300px)
        rotateX(0deg)
        rotateY(0deg)
        rotateZ(0deg)`
      })
    })

    avatar.addEventListener("mousemove", e => {
      let w = avatar.clientWidth
      let h = avatar.clientHeight
      let y = ((e.offsetX - w * 0.5) / w) * 45
      let x = ((1 - (e.offsetY - h * 0.5)) / h) * 45
      avatar.style.transform = `perspective(300px)
      rotateX(${x}deg)
      rotateY(${y}deg)`
    })
  }

  const like = document.querySelector("#like-it")
  if (like) {
    like.addEventListener("click", () => {
      const notice = document.querySelector("#notice")
      const title = notice.querySelector("#notice-title")
      const subtitle = notice.querySelector("#notice-subtitle")
      fetch("https://api.lifeni.life/like", {
        method: "POST",
      })
        .then(response => response.text())
        .then(count => {
          title.textContent = `❤ × ${count}`
          subtitle.textContent = `感谢支持`
          notice.classList.add("show")
          setTimeout(() => {
            notice.classList.remove("show")
          }, 2000)
        })
    })
  }

  const showcase = document.querySelector("#showcase")
  if (showcase) {
    const html = document.querySelector("html")
    window.addEventListener("scroll", () => {
      window.requestAnimationFrame(() => {
        if (html.scrollTop > html.clientHeight * 0.4 - 108) {
          showcase.classList.add("show")
        } else {
          showcase.classList.remove("show")
        }
      })
    })

    const tabs = document.querySelectorAll(".tab")
    const lists = document.querySelectorAll(".list")
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(e => e.classList.remove("active"))
        lists.forEach(e => e.classList.remove("show"))
        tab.classList.add("active")
        document.querySelector(`#${tab.dataset.target}`).classList.add("show")
      })
    })

    const pageList = document.querySelector("#page-list")
    let currentPageItem = 0
    pageList.style.marginTop = `${currentPageItem}px`
    setInterval(() => {
      currentPageItem = currentPageItem - 64
      if (currentPageItem === pageList.children.length * -64) {
        currentPageItem = 0
      }
      pageList.style.marginTop = `${currentPageItem}px`
    }, 3000)
  }
}
