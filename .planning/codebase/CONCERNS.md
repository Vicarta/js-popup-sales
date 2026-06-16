# Concerns

**Analysis Date:** 2026-06-16

## High Priority

### Missing Widget Build Script

README tells users to add or run `build:js-popup-sales`, but `package.json` does not define it. The widget Vite config exists, so the fix is likely straightforward.

Files:
- `README.md`
- `package.json`
- `vite.js-popup-sales.config.ts`

Impact:
- Contributors may run the wrong build and miss the actual distributable script.
- Release process is ambiguous.

### No Automated Tests

The widget handles untrusted content, URLs, browser storage, Shadow DOM, focus trapping, tracking, and multiple initialization paths, but no automated tests are configured.

Impact:
- Regressions in public embed behavior can ship unnoticed.
- Security-sensitive markdown/URL behavior is not locked down.

### Current Lint Fails

`npm run lint` currently exits with errors in existing source files:

- `src/components/ui/textarea.tsx` - empty interface equivalent to its supertype.
- `src/pages/JsPopupSalesDemo.tsx` - `let code` should be `const`.
- `tailwind.config.ts` - `require()` style import is forbidden by the TypeScript ESLint config.

There are also two React Refresh warnings in `src/components/ui/button.tsx` and `src/components/ui/sonner.tsx`.

Impact:
- CI cannot safely gate changes on lint until these are fixed.
- Phase 1 should either repair these or explicitly document them in the verification baseline.

### Documentation / Build Output Mismatch

README says widget output is `dist-js-popup-sales/js-popup-sales.js`, while current Vite widget config writes to `dist/js-popup-sales.js`.

Impact:
- Users and maintainers may publish or look for the wrong artifact.

## Medium Priority

### Markdown Link URL Escaping Is Not URL Policy

`parseMarkdown()` escapes link URL text before inserting it in `href`, but it does not enforce the same protocol whitelist used by CTA and image URLs. If markdown links are allowed in title/subtitle/features, this should be covered by tests and possibly refactored to share URL sanitization.

Files:
- `src/js-popup-sales/utils.ts`
- `src/js-popup-sales/popup-sales.ts`

### Auto-Init Has Multiple Script Detection Paths

The GTM/direct script detection logic is necessarily defensive, but it is complex and currently untested.

Risk areas:
- `document.currentScript` timing.
- Dynamically inserted scripts.
- Duplicate script tags.
- Empty data attributes.
- Global config vs data attribute precedence.

### Public API Is Not Versioned

The README documents global functions, global instance access, dataLayer events, and config fields. There is no formal changelog, versioning, package distribution metadata, or release checklist.

Impact:
- Breaking changes may be hard for users to detect.

### External Font Import by Default

The widget imports Inter from Google Fonts unless `inheritFont` is true.

Impact:
- Extra request on customer websites.
- Possible privacy/compliance concern for some users.
- Potential content security policy issue.

## Low Priority

### Demo Component Is Large

`src/pages/JsPopupSalesDemo.tsx` contains state, code generation, preview behavior, and a long form in one component.

Impact:
- Harder to test and evolve, but acceptable until test/build foundations exist.

### Broad Dependency Surface

The demo app includes many Radix/shadcn dependencies. The embeddable widget should remain independent from these dependencies, and future changes should keep that separation clear.

### Dependency Audit Findings

`npm ci` completed, but npm reported 17 audit findings: 5 moderate and 12 high. No automatic audit fix was applied during initialization because it can update dependency resolution and should be handled as a scoped dependency maintenance task.

## Suggested First Fixes

1. Add `build:js-popup-sales` and align README with actual output.
2. Add unit tests for utilities and constructor validation.
3. Add Playwright smoke tests for global config, manual API, and dataLayer.
4. Add a release checklist covering `npm ci`, lint, tests, demo build, widget build, and manual hosted script verification.

---
*Concern analysis: 2026-06-16*
*Update when issues are fixed or new risks are found*
