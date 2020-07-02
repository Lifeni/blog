require("prismjs/themes/prism-solarizedlight.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")
require("./src/styles/color.css")

exports.onRouteUpdate = () => {
  const block = document.querySelectorAll(".gatsby-highlight")
  if (block.length) {
    block.forEach(e => {
      const copy = document.createElement("button")
      copy.className = "copy-button"
      copy.textContent = "Copy"
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

      e.appendChild(copy)
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
      toggle.textContent =
        toggle.textContent === "查看目录" ? "关闭目录" : "查看目录"
    })
  }

  const header = document.querySelector("header")
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
}
