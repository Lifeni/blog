import { $, start, _ } from './$'

start(async () => {
  const count = $('[data-count]')

  try {
    const data = await get('Lifeni')
    const num = Number(data.count)
    const emoji =
      num > 1000
        ? '😎'
        : num > 500
        ? '🥳'
        : num > 100
        ? '😀'
        : num === 0
        ? '😅'
        : '🙂'

    $('[data-grid]').html().set(html(data.map))
    count.text().set(`过去一年贡献了 ${num} 次代码 ${emoji}`)
    $('[data-grid]').scroll().right()
  } catch (error) {
    console.log(error)
    count.text().set(`${error.message} - 获取数据失败 🤔`)
  } finally {
    $('[data-spinner]').attr('data-remove').add()
  }
})

type ContributionMap = Map<string, { count: string; level: string }>

const html = (map: ContributionMap) =>
  [...map].reduce(
    (pre, [date, { count, level }]) =>
      `${pre}
      <span
        class="${$('[data-grid] span').class().get()}"
        data-level="${level}"
        aria-label="${date} 贡献了 ${count} 次代码"
        title="${date} 贡献了 ${count} 次代码"
      ></span>
    `,
    ''
  )

interface Contributions {
  count: string
  map: ContributionMap
}

const get = async (name: string): Promise<Contributions> => {
  const url: string = `https://proxy.lifeni.workers.dev/github.com/users/${name}/contributions`
  const response: Response = await fetch(url)
  const data: string = await response.text()

  const parser = new DOMParser()
  const root = _(parser.parseFromString(data, 'text/html'))

  const count = root.$('h2').text().get().replace(/,/g, '').match(/\d+/g)[0]
  const points = root.$('svg rect')

  const map = new Map()

  for (const point of points.all()) {
    const date = point.attr('data-date').get()

    if (date)
      map.set(date, {
        count: point.attr('data-count').get(),
        level: point.attr('data-level').get(),
      })
  }

  return { count, map }
}
