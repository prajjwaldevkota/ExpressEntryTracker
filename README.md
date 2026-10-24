# Express Entry Tracker

A responsive React dashboard for Canadian Express Entry draw results, history, invitation trends, candidate-pool distribution, occupation search and CRS score estimates.

## Development

```sh
npm ci
npm run dev
npm test
npm run lint
npm run build
```

Use Node 22 or later. `npm run dev` includes the API proxy. A plain static preview does not provide the production serverless function; use the development server or a Netlify deployment when testing live API requests.

## Interface

The dashboard places the latest round, recent draw statistics and history together. It includes a responsive sidebar/mobile dialog, keyboard navigation, light/dark themes, English/French dashboard copy, loading placeholders and retry states. Calculator input remains in the current tab and is not sent to the API.

## API requests and User-Agent

The browser calls same-origin `/api` endpoints. Netlify forwards them through `netlify/functions/api.mjs`; Vite uses the same upstream hosts and User-Agent during development. This avoids relying on cross-origin browser requests or browser support for overriding the User-Agent header.

The server User-Agent is declared in `shared/api-config.js`:

```text
ExpressEntryTracker/2.0 (+https://expressentrytracker.netlify.app)
```

The production function accepts GET requests to `/draws`, `/draws/latest`, `/categories`, `/pool`, and `/nocs`. It restricts upstream hosts and forwarded query parameters, times out failed upstream calls, preserves rate-limit responses, and briefly caches successful JSON responses. No API keys are required by the existing data sources.

The draw data service is maintained by [sagunji](https://github.com/sagunji). This site is independent of IRCC.

For terminal connectivity diagnostics:

```sh
npm run check:network
```

A DNS failure occurs before HTTP headers are sent; changing a User-Agent cannot fix DNS or session network restrictions.

## CRS rules

The calculator distinguishes rules through November 2, 2026 from the announced November 3, 2026 labour market integration rules. Users can preview either, and the default changes on the effective Toronto date. See [scoring sources and regression coverage](CRS_CALCULATOR_VERIFICATION.md).

## Deployment

Netlify runs `npm run build`, publishes `dist`, and deploys the API function from `netlify/functions`. The `/api/*` rewrite must remain ahead of the SPA fallback. There is no additional database or account setup.

See [verification results and environment limits](docs/verification.md).
