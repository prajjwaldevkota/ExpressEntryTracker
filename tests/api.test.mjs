import test from 'node:test';
import assert from 'node:assert/strict';
import api from '../netlify/functions/api.mjs';
import { API_USER_AGENT } from '../shared/api-config.js';

test('API forwards only supported query parameters and sets the server User-Agent', async t => {
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url.origin, 'https://ee-backend.expressentrytracker.workers.dev');
    assert.equal(url.pathname, '/api/draws');
    assert.equal(url.searchParams.get('category'), 'French language');
    assert.equal(url.searchParams.has('url'), false);
    assert.equal(options.headers['User-Agent'], API_USER_AGENT);
    assert.ok(options.signal instanceof AbortSignal);
    return Response.json({ draws: [{ drawNumber: 1 }] });
  });
  const response = await api(new Request('https://example.test/api/draws?category=French%20language&url=https://example.com'));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { draws: [{ drawNumber: 1 }] });
});
test('Netlify rewritten endpoint uses the NOC upstream', async t => {
  t.mock.method(globalThis, 'fetch', async url => {
    assert.equal(url.hostname, 'e6276813-noc-canada.karanjit-sagun01.workers.dev');
    assert.equal(url.pathname, '/api/nocs');
    return Response.json({ data: [] });
  });
  assert.equal((await api(new Request('https://example.test/.netlify/functions/api/nocs'))).status, 200);
});
test('API rejects unsupported paths and methods without fetching', async t => {
  const fetchMock = t.mock.method(globalThis, 'fetch', async () => { throw new Error('Must not fetch'); });
  assert.equal((await api(new Request('https://example.test/api/unknown'))).status, 404);
  assert.equal((await api(new Request('https://example.test/api/draws', { method: 'POST' }))).status, 405);
  assert.equal(fetchMock.mock.callCount(), 0);
});
test('API distinguishes rate limits and failures; errors are not cached', async t => {
  t.mock.method(globalThis, 'fetch', async () => new Response('rate limited', { status: 429 }));
  let response = await api(new Request('https://example.test/api/draws'));
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  globalThis.fetch = async () => { throw new DOMException('Timeout', 'TimeoutError'); };
  response = await api(new Request('https://example.test/api/draws'));
  assert.equal(response.status, 504);
  globalThis.fetch = async () => new Response('<html>not JSON</html>');
  assert.equal((await api(new Request('https://example.test/api/draws'))).status, 502);
});
