import { API_USER_AGENT, DRAW_API_ORIGIN, NOC_API_ORIGIN } from '../../shared/api-config.js';

const allowedPaths = new Set(['/draws', '/draws/latest', '/categories', '/pool', '/nocs']);
const allowedParams = new Set(['page', 'limit', 'search', 'category', 'sort', 'lang']);
const errorResponse = (message, status) => Response.json({ error: message }, { status, headers: { 'Cache-Control': 'no-store' } });

export default async function api(request) {
  if (request.method !== 'GET') return new Response(null, { status: 405, headers: { Allow: 'GET' } });
  const incoming = new URL(request.url);
  const path = incoming.pathname.replace(/^\/(?:\.netlify\/functions\/api|api)/, '');
  if (!allowedPaths.has(path)) return errorResponse('Unknown API endpoint', 404);
  const upstream = new URL(`/api${path}`, path === '/nocs' ? NOC_API_ORIGIN : DRAW_API_ORIGIN);
  for (const [key, value] of incoming.searchParams) {
    if (allowedParams.has(key)) upstream.searchParams.set(key, value);
  }
  try {
    const response = await fetch(upstream, {
      headers: { Accept: 'application/json', 'User-Agent': API_USER_AGENT },
      signal: AbortSignal.timeout(15000),
      redirect: 'error',
    });
    if (!response.ok) return errorResponse('Upstream data service unavailable', response.status === 429 ? 429 : 502);
    const data = await response.json();
    return Response.json(data, { headers: { 'Cache-Control': 'public, max-age=60, s-maxage=120' } });
  } catch (error) {
    return errorResponse('Unable to reach the data service', error.name === 'TimeoutError' ? 504 : 502);
  }
}
