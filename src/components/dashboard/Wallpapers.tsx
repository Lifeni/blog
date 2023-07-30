import { useState } from 'react'
import { useInterval } from 'usehooks-ts'
import { wallpapers } from '../../libs/wallpapers'

interface Now {
  date: string
  week: string
  time: string
}

const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const wallpaper = wallpapers[0]

export const Wallpapers = () => {
  const getNow = () => {
    const now = new Date()
    const date = `${now.getMonth() + 1} 月 ${now.getDate()} 日`
    const week = weeks[now.getDay()]
    const time = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}`
    return { date, week, time }
  }

  const [{ date, week, time }, setNow] = useState<Now>(getNow())
  useInterval(() => setNow(getNow()), 1000 * 3)

  return (
    <div flex="~ col">
      <div
        position="relative"
        w="full"
        h="48 xs:64 sm:80"
        p="x-5 y-4"
        flex="~ row items-center justify-center"
        border="~ 1 color-line"
        shadow="lg"
        bg="muted"
        rounded="md"
        overflow="hidden"
      >
        <div z="10" w="full" h="full" flex="~ col" select="none" text="dark">
          <span text="sm" font="700">
            <span m="r-2">{date}</span>
            <span>{week}</span>
          </span>
          <span className="text-2xl" font="700" leading="8">
            {time}
          </span>
        </div>
        <img
          src={wallpaper.href}
          alt={wallpaper.copyright}
          position="absolute"
          z="0"
          left="0"
          top="0"
          w="full"
          h="full"
          object="cover"
          filter="dark:brightness-85"
        />
      </div>
      <div flex="~ row items-center justify-end" w="full" p="x-1 y-2.5">
        <span text="subtle xs">{wallpaper.copyright}</span>
      </div>
    </div>
  )
}
