import { lookup } from 'node:dns/promises';
import { API_USER_AGENT, DRAW_API_ORIGIN } from '../shared/api-config.js';

// Read-only diagnostics: no credentials, proxies, DNS settings or Git config are changed.
for (const url of ['https://github.com', 'https://registry.npmjs.org', `${DRAW_API_ORIGIN}/api/draws/latest`]) {
  const hostname = new URL(url).hostname;
  try {
    const resolved = await lookup(hostname);
    console.log(`${hostname}: DNS OK (${resolved.family === 6 ? 'IPv6' : 'IPv4'})`);
  } catch (error) {
    console.log(`${hostname}: DNS FAILED (${error.code}). HTTP and User-Agent negotiation have not started.`);
    process.exitCode = 1;
    continue;
  }
  for (const userAgent of [API_USER_AGENT, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36']) {
    try {
      const response = await fetch(url, { headers: { 'User-Agent': userAgent }, signal: AbortSignal.timeout(10000) });
      console.log(`  ${userAgent.startsWith('Mozilla') ? 'Browser' : 'App'} User-Agent: HTTP ${response.status}`);
      await response.body?.cancel();
    } catch (error) {
      console.log(`  HTTP FAILED (${error.cause?.code || error.name})`);
      process.exitCode = 1;
    }
  }
}
