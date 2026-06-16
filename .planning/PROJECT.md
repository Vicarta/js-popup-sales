# JS Popup Sales

## What This Is

JS Popup Sales is a lightweight, customizable popup widget for advertising messages and announcements on any website. The core product is a dependency-free browser script built with vanilla TypeScript and Shadow DOM, with a React/Vite demo configurator that helps users preview settings and copy an embed snippet.

This milestone is not a rewrite. It is a brownfield hardening pass to make the existing widget easier to build, test, release, document, and safely embed through direct HTML or Google Tag Manager.

## Core Value

Website owners can reliably embed a small sales popup script, configure it without code changes, and trust that it will not break their page, analytics, accessibility, or styling.

## Requirements

### Validated

- [x] Widget renders inside Shadow DOM for style isolation - existing
- [x] Widget supports global `window.JSPopupSalesConfig` configuration for GTM-style installation - existing
- [x] Widget supports direct script data attributes for non-GTM installation - existing
- [x] Widget supports delay, scroll, exit-intent, and manual triggers - existing
- [x] Widget supports markdown-enhanced title, subtitle, features, and CTA text - existing
- [x] Widget supports theme, position, layout, image, color, radius, and alignment options - existing
- [x] Widget exposes manual global helpers for show, hide, and dismiss - existing
- [x] Demo configurator can generate an embed snippet and preview the widget - existing

### Active

- [ ] Align package scripts, README build instructions, and widget output path.
- [ ] Add automated tests for widget utilities, config validation, markdown safety, and browser behavior.
- [ ] Add a reliable release/build checklist for the demo app and standalone widget.
- [ ] Harden and document public embed contracts: config fields, globals, dataLayer events, dismissal behavior, and GTM usage.
- [ ] Improve configurator maintainability without changing the public widget API.

### Out of Scope

- Replacing the vanilla widget with a React runtime - the distributable script must stay dependency-free.
- Adding a backend, database, accounts, or hosted campaign manager - current product is a static script plus configurator.
- Selling/payment flows inside the repository - license and distribution can be documented, but checkout infrastructure is not part of this milestone.
- Changing public global names or config fields without a migration plan - existing embed users may depend on them.

## Context

The repository was cloned from `https://github.com/Vicarta/js-popup-sales.git` on 2026-06-16. It contains a Vite/React demo app and a standalone widget build config. Public documentation points to `https://js-popup-sales.pages.dev/` and the hosted script `https://js-popup-sales.pages.dev/js-popup-sales.js`.

The codebase is already functional but lacks GSD planning artifacts, automated tests, CI/release definition, and a package script for the documented widget build. The README documents a `build:js-popup-sales` script that is not present in `package.json`, and the README output path does not match `vite.js-popup-sales.config.ts`.

Codebase map documents live in `.planning/codebase/` and should be read before planning or executing phases.

## Constraints

- **Runtime**: The embeddable widget must remain dependency-free after build - it is intended for third-party websites.
- **Compatibility**: Existing global APIs and config names are public contracts - preserve unless a versioned migration is planned.
- **Security**: User-provided markdown, URLs, and script configuration must be treated as untrusted input.
- **Accessibility**: README promises dialog semantics, focus trap, Escape close, and reduced-motion support - changes must preserve or verify these claims.
- **Build**: Demo app and widget builds are separate Vite outputs - both must be considered in release work.
- **Deployment**: Hosted examples currently assume Cloudflare Pages/static hosting - no backend should be introduced for v1 hardening.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Treat this as a brownfield hardening milestone | Existing code already implements the main product behavior | Pending |
| Keep widget runtime framework-free | The README promises a lightweight no-dependency script | Pending |
| Prioritize build, test, and release reliability before new features | Public embed scripts need regression protection before expanding scope | Pending |
| Track `.planning/` in git | GSD artifacts are useful project infrastructure for future phases | Pending |

---
*Last updated: 2026-06-16 after initialization*
