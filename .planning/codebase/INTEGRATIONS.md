# Integrations

**Analysis Date:** 2026-06-16

## External Runtime Integrations

### Google Tag Manager / dataLayer

The widget supports GTM-style configuration and analytics:

- Global config: `window.JSPopupSalesConfig`.
- Events pushed to `window.dataLayer` when `enableTracking` is true.
- Event names include `js_popup_sales_shown`, `js_popup_sales_primary_click`, `js_popup_sales_closed`, and `js_popup_sales_error`.
- The README explicitly says data attributes do not work in GTM and recommends global config for GTM.

Relevant files:
- `src/js-popup-sales/popup-sales.ts`
- `README.md`

### Customer Website DOM

The widget injects a single container into `document.body`:

- Container ID: `js-popup-sales-container`.
- Shadow root mode: `open`.
- Existing container with the same ID is removed before a new popup is created.
- Global helpers are exposed on `window`: `JSPopupSales`, `jsPopupSalesInstance`, `showJSPopupSales`, `hideJSPopupSales`, and `dismissJSPopupSales`.

### Browser Storage

Dismissal state uses `localStorage`:

- Key: `js_popup_sales_dismissed`.
- Value: timestamp until which the popup should stay hidden.
- `dismissDays: 0` means always show on the next trigger.
- Access is wrapped in try/catch for blocked or unavailable storage.

### Browser APIs

The widget uses:

- `matchMedia('(prefers-color-scheme: dark)')` for auto theme.
- `requestAnimationFrame` for scroll trigger throttling.
- `document.currentScript` and script tag search for data attribute configuration.
- `document.addEventListener('mouseleave')` for exit-intent.
- Focus APIs for modal focus trapping and restoration.

## Network Integrations

### CDN / Static Hosting

The README points to:

- Demo/configurator: `https://js-popup-sales.pages.dev/`
- Hosted script: `https://js-popup-sales.pages.dev/js-popup-sales.js`

No deployment config file for Cloudflare Pages was found in the repository.

### Google Fonts

When `inheritFont` is false, widget styles include:

- `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap')`

This creates an external network dependency for customer pages unless `inheritFont: true` is used.

## Application Integrations

### React Demo Configurator

The demo imports the widget module dynamically for preview:

- `src/pages/JsPopupSalesDemo.tsx` uses `import("@/js-popup-sales/popup-sales")`.
- The generated embed snippet points at the configured domain plus `/js-popup-sales.js`.

### Public Assets

The demo default image references:

- `https://js-popup-sales.pages.dev/blonde_red_dress_359x663.webp`

Local public assets include:

- `public/blonde_red_dress_359x663.webp`
- `public/favicon.ico`
- `public/favicon.png`
- `public/robots.txt`

## Non-Integrations

- No backend API.
- No database.
- No authentication provider.
- No payment provider.
- No server-side rendering.

---
*Integration analysis: 2026-06-16*
*Update when new external services or runtime contracts are introduced*
