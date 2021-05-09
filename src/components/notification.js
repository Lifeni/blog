import React, { useState } from "react"
import { RiCloseFill, RiRefreshFill } from "react-icons/ri"
import "./notification.less"

const UpdateNow = () => {
  return (
    <div className="notification update-now" id="update-now">
      <section>
        <p>网站做好了更新准备，请刷新页面以更新</p>
        <button
          className="reload-page"
          id="reload-page"
          onClick={() => window.location.reload()}
          aria-label="刷新页面"
          title="刷新页面"
        >
          <RiRefreshFill aria-label="Refresh Icon" size={24} />
        </button>
      </section>
    </div>
  )
}

const OutdatedContent = ({ date }) => {
  const [showNotification, setShowNotification] = useState(true)

  return (
    <div
      className={`notification outdated-content ${showNotification && "show"}`}
      id="outdated-content"
    >
      <section>
        <p>
          这篇文章修改于 <strong>{date}</strong>，其中有些信息可能已经过时
        </p>
        <button
          className="close-notification"
          id="close-notification"
          onClick={() => setShowNotification(false)}
          aria-label="关闭通知"
          title="关闭通知"
        >
          <RiCloseFill aria-label="Close Icon" size={24} />
        </button>
      </section>
    </div>
  )
}

export { UpdateNow, OutdatedContent }
