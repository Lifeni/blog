import React from "react"

const Utterances = () => (
  <div
    className="comment"
    dangerouslySetInnerHTML={{
      __html: `
        <script
        src="https://utteranc.es/client.js"
        repo="Lifeni-Site/Utterance"
        issue-term="pathname"
        theme="github-light"
        crossorigin="anonymous"
        async
      ></script>`,
    }}
  ></div>
)

export default Utterances
