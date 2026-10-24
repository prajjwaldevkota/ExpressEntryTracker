# UI and API change verification — October 24, 2026

## Completed

- Production Vite build passed.
- ESLint: zero errors; one pre-existing Fast Refresh warning in ThemeContext.jsx.
- 16 Node tests passed for CRS arithmetic, effective dates, additional-point caps, language selection, and the API proxy.
- 48 temporary server-render smoke checks passed: six pages × English/French × ready/loading/error/empty states, using explicit test fixtures. These are render checks, not browser interaction or translation-completeness tests.
- `git diff --check` passed.

Dependencies were recovered from local copies/caches because npm could not resolve its registry. The build used cached Vite 6.4.1, esbuild 0.25.4 and Rollup 4.60.4; the committed dependency declarations and lockfile were not regenerated. A clean `npm ci` build remains recommended in CI.

## Environment limitations

The terminal could not resolve `github.com`, `registry.npmjs.org`, or the upstream API host (`ENOTFOUND`). `curl` failed with exit 6 for both its normal User-Agent and a browser-style User-Agent. The failure happens before an HTTP connection or request header is sent. `scutil --dns` reported no DNS configuration visible to this session. The session is configured with restricted terminal networking; these results do not establish a problem with the user's normal network, Git credentials, or the upstream service.

The separate web-research tool could read the official IRCC pages, but could not fetch the application's API endpoints. It does not provide Git push access.

Installed Chrome failed to launch in the restricted session (SIGABRT). No successful browser screenshot, mobile interaction, or live upstream API validation is claimed.

## Repeatable network check

```sh
npm run check:network
```

This performs read-only DNS and HTTP checks. When DNS works, it compares the application User-Agent with a browser-style User-Agent. It prints no credentials and changes no machine or Git configuration.
