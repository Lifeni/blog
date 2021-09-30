import React, { useEffect, useState } from "react"
import { RiShareLine } from "react-icons/ri"
import IconAction from "../../../base/action/Icon"

const Share = () => {
  const [share, setShare] = useState(false)

  useEffect(() => setShare(!!window?.navigator?.share), [])

  const handleShare = () => {
    share &&
      window.navigator.share({
        title: "记录干杯",
        text: "个人网站「记录干杯」，在这里记录一些技术相关的文章、尝试一些新的技术。",
        url: "https://lifeni.life",
      })
  }

  return (
    <IconAction
      title={share ? "分享" : "你的浏览器不支持 Web Share API"}
      disabled={!share}
      onClick={handleShare}
    >
      <RiShareLine aria-label="分享" />
    </IconAction>
  )
}

export default Share
