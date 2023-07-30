import { useInterval } from 'ahooks'
import { useState } from 'react'

interface Now {
  date: string
  week: string
  time: string
}

const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

export const Time = () => {
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
  useInterval(() => setNow(getNow()), 1000 * 3, { immediate: true })

  return (
    <div z="10" w="full" h="full" flex="~ col" select="none" text="dark">
      <span text="sm" font="700">
        <span m="r-2">{date}</span>
        <span>{week}</span>
      </span>
      <span className="text-2xl" font="700" leading="8">
        {time}
      </span>
    </div>
  )
}
