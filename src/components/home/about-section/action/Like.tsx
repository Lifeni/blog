import React, { useState } from "react"
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri"
import IconAction from "../../../base/action/Icon"

const LikeIcon = <RiHeart3Line aria-label="点赞" />

const UnLikeIcon = <RiHeart3Fill aria-label="取消点赞" />

const Like = () => {
  const [like, setLike] = useState(false)

  const handleLike = () => setLike(!like)

  return (
    <IconAction
      toggle={like}
      title={like ? "取消点赞" : "点赞"}
      onClick={handleLike}
    >
      {like ? UnLikeIcon : LikeIcon}
    </IconAction>
  )
}

export default Like
