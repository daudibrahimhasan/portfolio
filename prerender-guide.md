# Pre-rendering

The checked-in HTML includes a rendered snapshot for /, /engineer/ and /researcher/.
It is visible without JavaScript. support.js removes it when the interactive page mounts.
Do not manually edit the section between prerender:start and prerender:end.

After changing content or UI, refresh the snapshots before committing:

1. Run npm ci.
2. On a new machine, run npx playwright install chromium.
3. Run npm run build.
4. Check both JavaScript-enabled and JavaScript-disabled pages.

Commit the generated HTML with the source changes. Static hosting can serve these
files directly; no runtime server or crawler-specific response is required.
If running this build in CI, provision Playwright Chromium and its system dependencies.

Only the default routes are pre-rendered. Client-side views selected with query
parameters still use the interactive runtime.
