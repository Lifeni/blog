import { NumberIcon, XIcon } from "@primer/octicons-react"
import React from "react"

const UpdateCard = () => {
  return (
    <div className="update-card" id="update-card">
      <section>
        <p>网站做好了更新准备，请刷新页面以更新</p>
        <button
          className="reload-page"
          id="reload-page"
          onClick={() => window.location.reload()}
        >
          <XIcon aria-label="Close Icon" size={24} />
        </button>
      </section>
      <section>
        <p className="title">
          <NumberIcon aria-label="Hash Icon" size={16} />
          Update Now
        </p>
      </section>
    </div>
  )
}

export default UpdateCard
