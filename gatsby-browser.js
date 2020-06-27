require("prismjs/themes/prism-solarizedlight.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")

exports.onRouteUpdate = () => {
  const posts = document.querySelectorAll(".post")
  if (posts.length) {
    // posts.forEach((e, index) => {
    //   if (index >= 4) {
    //     e.classList.add("hide")
    //   }
    // })
    /*
    const expand = document.createElement("button")
    expand.classList.add("expand-post")
    expand.textContent = `Show All ${posts.length} Articles`
    document.querySelector(".post-list").appendChild(expand)
*/
    const expand = document.querySelector(".expand-post")
    expand.addEventListener("click", () => {
      if (expand.dataset.status === "expand") {
        posts.forEach((e, index) => {
          expand.dataset.status = "fold"
          expand.textContent = `Show All ${posts.length} Articles`
          if (index >= 3) {
            e.classList.add("hide")
          }
        })
      } else {
        expand.dataset.status = "expand"
        expand.textContent = `Collapse List`
        posts.forEach(e => {
          e.classList.remove("hide")
        })
      }
    })
  }
}
