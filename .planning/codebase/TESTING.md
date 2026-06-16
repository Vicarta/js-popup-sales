# Testing

**Analysis Date:** 2026-06-16

## Current Test Setup

No automated test framework is currently configured.

Observed state:

- No `test` script in `package.json`.
- No Vitest config.
- No Playwright config.
- No test files found under the repository.
- ESLint is configured and available through `npm run lint`.
- Production build is available through `npm run build` for the demo app.
- Widget build is configured through `vite.js-popup-sales.config.ts` but lacks a package script.

## Current Manual Verification Surface

The demo page supports manual checks for:

- Trigger selection.
- Dismiss duration.
- Title, subtitle, feature copy.
- CTA URL and text.
- Image URL.
- Theme, position, layout, inherited font, colors, radius, content alignment.
- GTM tracking flags.
- Generated embed snippet.
- Live preview using dynamic import of the widget module.

Primary file:

- `src/pages/JsPopupSalesDemo.tsx`

## Recommended Unit Tests

Add unit tests for `src/js-popup-sales/utils.ts`:

- `parseMarkdown` escapes plain HTML.
- `parseMarkdown` supports bold, italic, bold-italic, strikethrough, links, emoji, and line breaks.
- `validateEnum` accepts allowed values and falls back on invalid values.
- `clampNumber` handles undefined, NaN, min, max, and valid values.
- `validateColor` accepts known safe formats and rejects invalid values.
- `MAX_FEATURES` behavior is exercised through the widget constructor.

## Recommended Browser Tests

Add Playwright or equivalent browser tests for the widget:

- Global config path initializes and shows the popup.
- Data attribute path initializes outside GTM-style usage.
- Manual API path exposes `showJSPopupSales`.
- Delay, scroll, exit-intent, and manual triggers work.
- Dismissal writes and respects localStorage.
- Escape closes the popup.
- CTA click pushes dataLayer event and navigates or opens a tab as expected.
- Shadow DOM styles render and do not leak into the host page.
- Mobile and landscape responsive layouts remain usable.

## Recommended Demo Tests

For the React configurator:

- Generated code includes the current form settings.
- Domain normalization strips protocol and emits an https script URL.
- Preview removes the previous widget container before rendering a new one.
- Copy action writes the generated code to clipboard and shows a toast.

## CI Baseline

Minimum useful CI once tests are added:

1. `npm ci`
2. `npm run lint`
3. `npm run test`
4. `npm run build`
5. `npm run build:js-popup-sales`

The `build:js-popup-sales` script needs to be added before the final step can run.

## Risks Without Tests

- Markdown/XSS behavior can regress silently.
- GTM integration is easy to break because script loading context differs from normal pages.
- Accessibility promises in README are not enforced.
- Browser support claims are not verified.
- README and build config can drift, as already seen with the widget output path/script mismatch.

---
*Testing analysis: 2026-06-16*
*Update after adding the test framework or CI*
