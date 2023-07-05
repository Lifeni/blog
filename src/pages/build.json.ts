import type { APIRoute } from 'astro'

export const get: APIRoute = () => {
  return {
    body: JSON.stringify({
      with: 'Astro & Vercel',
      name: '记录干杯',
      url: 'https://lifeni.life',
      logo: '/favicon.svg',
      description:
        '个人网站「记录干杯」，在这里记录一些技术相关的文章、尝试一些新的技术。',
      color: '#feec44',
    }),
  }
}
