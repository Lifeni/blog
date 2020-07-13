require("prismjs/themes/prism-solarizedlight.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")
require("./src/styles/color.css")

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
      focus.classList.toggle("max")
      layout.classList.toggle("max")
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
      console.log("click")
      const toc = document.querySelector(".post-toc")
      toc.classList.toggle("show")
      toggle.classList.toggle("show")
      toggle.textContent = toggle.textContent === "目录" ? "收起" : "目录"
    })
  }

  const avatar = document.querySelector(".avatar")
  if (avatar) {
    avatar.addEventListener("mouseout", e => {
      avatar.style.transform = `perspective(300px)
                     rotateX(0deg)
                     rotateY(0deg)
                     rotateZ(0deg)`
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
}
