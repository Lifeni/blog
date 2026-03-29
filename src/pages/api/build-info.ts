import type { APIContext } from 'astro'
import {
  displayName,
  description,
  version,
  repository,
} from '../../package.json'
import dayjs from 'dayjs'

export const GET = ({ generator, site }: APIContext) => {
  return new Response(
    JSON.stringify({
      地址: site,
      名称: displayName,
      描述: description,
      版本: version,
      时间: dayjs().toISOString(),
      代码: repository.url,
      框架: generator,
    }),
    {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    },
  )
}
