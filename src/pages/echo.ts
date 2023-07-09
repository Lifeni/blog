import type { APIRoute } from 'astro'

export const get: APIRoute = ({ request, redirect }) => {
  const host = request.headers.get('host')
  const name = host?.split('.')[0] || ''
  const domains = ['dev', 'lab', 'server']

  return redirect(domains.includes(name) ? `/${name}` : '/404', 302)
}

