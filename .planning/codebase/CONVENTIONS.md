# Conventions

**Analysis Date:** 2026-06-16

## Code Style

- TypeScript is used for both widget and demo code.
- Imports use the `@` alias for `src` in React/demo code.
- Widget internals use relative imports: `./styles`, `./utils`.
- Semicolons are used.
- The project mixes English comments with some Ukrainian comments in `popup-sales.ts`.
- The widget prefers explicit DOM creation over template strings for most content nodes.

## React Patterns

- The demo is built with function components.
- `JsPopupSalesDemo.tsx` keeps all configurator state in one local `useState` object.
- shadcn-style components are imported from `@/components/ui`.
- Toast feedback uses `useToast`.
- Routes are defined in `src/App.tsx` with `react-router-dom`.

## Widget Patterns

- Configuration is normalized in the `JSPopupSales` constructor.
- Runtime DOM state is held in private class fields.
- Event handlers are stored on the instance so they can be removed by `cleanup()` and `destroy()`.
- Popup rendering uses Shadow DOM with injected CSS.
- Content HTML is produced by `parseMarkdown()` and assigned through `innerHTML` after escaping supported markdown captures.
- URLs are filtered through `sanitizeUrl()` before assignment to `href` or `src`.

## Error Handling

- Widget lifecycle methods use try/catch around high-risk browser operations.
- Storage APIs are wrapped in `safeGetItem`, `safeSetItem`, and `safeRemoveItem`.
- Invalid config values warn and fall back to defaults.
- Errors are pushed to dataLayer where possible.

## Configuration Contracts

- Global config is preferred for GTM: `window.JSPopupSalesConfig`.
- Data attributes are supported for direct HTML usage but explicitly not for GTM.
- `dismissDays: 0` means do not persist dismissal.
- Feature items are capped by `MAX_FEATURES`.
- Theme, trigger, position, layout, and alignment are validated against explicit allowlists.

## Build Conventions

- The React demo and widget have separate Vite configs.
- The widget should be built from `vite.js-popup-sales.config.ts`.
- The distributed script name is configured as `js-popup-sales.js`.

## Documentation Conventions

- README is the primary public API documentation.
- It includes usage examples, configuration option table, browser support, troubleshooting, and license notes.
- Some README build instructions are currently stale against `package.json` and `vite.js-popup-sales.config.ts`.

## Git / GSD Conventions

- GSD planning artifacts live under `.planning/`.
- Planning docs should be committed when `commit_docs` is true in `.planning/config.json`.
- Current branch after clone is `main` tracking `origin/main`.

## Areas to Preserve

- The widget runtime should remain dependency-free.
- Shadow DOM isolation is a central design decision.
- GTM/global-config support is a documented first-class integration.
- Public API names should remain stable unless versioned/migrated intentionally.

---
*Convention analysis: 2026-06-16*
*Update when style or API conventions change*
