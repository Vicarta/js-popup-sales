# Architecture

**Analysis Date:** 2026-06-16

## Pattern Overview

**Overall:** Dual-surface frontend project: an embeddable vanilla TypeScript widget plus a React demo/configurator.

**Key Characteristics:**
- The widget is framework-free at runtime and manipulates the DOM directly.
- The demo app is a Vite/React single-page application.
- The widget build is separate from the demo build through `vite.js-popup-sales.config.ts`.
- Widget styling is isolated with Shadow DOM and an internal style string.
- Configuration can come from a global object, script data attributes, or manual API calls.

## Layers

**Widget Core:**
- Purpose: Create, display, hide, dismiss, and destroy the popup.
- Contains: `JSPopupSales` class, trigger setup, DOM creation, tracking, lifecycle methods.
- Location: `src/js-popup-sales/popup-sales.ts`.
- Depends on: `utils.ts` and `styles.ts`.
- Used by: Auto-init code, global helpers, and the React preview.

**Widget Utilities:**
- Purpose: Markdown parsing, config validation, numeric clamping, color validation, defaults.
- Location: `src/js-popup-sales/utils.ts`.
- Depends on: Browser DOM APIs for sanitization and CSS color validation.
- Used by: `JSPopupSales` constructor and content renderer.

**Widget Styles:**
- Purpose: Provide all isolated widget CSS as a string.
- Location: `src/js-popup-sales/styles.ts`.
- Used by: Shadow DOM style injection in `popup-sales.ts`.

**Demo Application:**
- Purpose: Let users configure popup settings, preview the widget, and copy embed code.
- Contains: React pages, shadcn-style UI components, router, toast UI.
- Locations: `src/pages/JsPopupSalesDemo.tsx`, `src/App.tsx`, `src/components`.
- Depends on: React, Vite, Radix UI, Tailwind.

**Build Configuration:**
- Purpose: Produce either the demo app or the standalone widget script.
- Locations: `vite.config.ts`, `vite.js-popup-sales.config.ts`, TypeScript configs.

## Data Flow

### Hosted Script Auto-Initialization

1. Browser loads `js-popup-sales.js`.
2. Module captures `document.currentScript`.
3. On DOM ready, `autoInit()` runs.
4. `autoInit()` first checks `window.JSPopupSalesConfig`.
5. If no global config exists, it searches script tags for `js-popup-sales` and valid `data-*` attributes.
6. Config is validated and merged with defaults in the `JSPopupSales` constructor.
7. `init()` creates the Shadow DOM popup and registers the selected trigger.
8. Trigger calls `show()`.
9. User actions call `dismiss()`, `hide()`, callbacks, and optional dataLayer tracking.

### Demo Preview

1. User edits React state in `src/pages/JsPopupSalesDemo.tsx`.
2. User clicks preview.
3. Existing `js-popup-sales-container` is removed.
4. Demo dynamically imports `JSPopupSales`.
5. It constructs a manual-trigger widget with the current form values.
6. `init()` and `show()` render the preview.

### Embed Snippet Generation

1. Demo converts form state to a `window.JSPopupSalesConfig` object.
2. It serializes the object into a script snippet.
3. It appends a hosted script tag based on the configured domain.
4. User copies the result through `navigator.clipboard`.

## State Management

- Widget instance state is private class state: overlay element, shadow root, event handlers, visibility, prior focus target, resolved theme.
- Dismissal state persists in `localStorage`.
- Demo state is local React `useState` in `JsPopupSalesDemo.tsx`.
- No global application store is used.

## Key Abstractions

**PopupConfig:**
- Purpose: Widget configuration contract.
- Location: interface in `src/js-popup-sales/popup-sales.ts`.
- Includes triggers, display content, style options, tracking, behavior, debug, and callbacks.

**JSPopupSales:**
- Purpose: Main widget class.
- Pattern: Instance object with lifecycle methods plus auto-initialization side effect.
- Public methods: `init`, `show`, `hide`, `dismiss`, `destroy`.

**DEFAULT_CONFIG and Validators:**
- Purpose: Normalize unsafe or missing user input before rendering.
- Location: `src/js-popup-sales/utils.ts`.

## Entry Points

**Demo App:**
- `src/main.tsx` mounts React.
- `src/App.tsx` defines routes.
- `/` renders `src/pages/JsPopupSalesDemo.tsx`.

**Widget Script:**
- `src/js-popup-sales/popup-sales.ts` is the library entry.
- Vite emits an IIFE named `js-popup-sales.js`.
- The script auto-runs initialization after load.

## Error Handling

**Strategy:**
- Runtime widget methods wrap key lifecycle sections in try/catch and call `trackError`.
- Storage operations are wrapped individually.
- Invalid config values warn and fall back to defaults.
- Invalid URL protocols are blocked by `sanitizeUrl`.

**Known Behavior:**
- Some warnings use `console.warn` even when debug is false.
- `trackError` logs to console and attempts a dataLayer error event.

## Cross-Cutting Concerns

**Security:**
- Markdown content is escaped before insertion into HTML wrappers.
- URL sanitization allows only http, https, or relative paths.
- CTA links use `rel="noopener noreferrer"`.

**Accessibility:**
- Popup uses `role="dialog"`, `aria-modal`, `aria-labelledby`, Escape handling, reduced-motion CSS, and focus trap for centered modal popups.

**Compatibility:**
- README claims support for Chrome 60+, Firefox 55+, Safari 11+, and Edge 79+.
- No automated compatibility tests currently validate this claim.

---
*Architecture analysis: 2026-06-16*
*Update when major runtime or build patterns change*
