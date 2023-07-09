import type { APIRoute } from 'astro'

export const get: APIRoute = ({ request, redirect }) => {
  console.log(request.headers)
  const referer = request.headers.get('referer')
  const name = referer?.split('.')[0] || ''
  const domains = ['dev', 'lab', 'server']

  return redirect(domains.includes(name) ? `/${name}` : '/404', 302)
}

