# Requirements: JS Popup Sales

**Defined:** 2026-06-16
**Core Value:** Website owners can reliably embed a small sales popup script, configure it without code changes, and trust that it will not break their page, analytics, accessibility, or styling.

## v1 Requirements

### Build and Release

- [ ] **BUILD-01**: Maintainer can run a documented npm script to build the standalone `js-popup-sales.js` widget.
- [ ] **BUILD-02**: Maintainer can run a documented npm script to build the React demo app.
- [ ] **BUILD-03**: README build output paths match the actual Vite output paths.
- [ ] **BUILD-04**: Release checklist verifies lint, tests, demo build, widget build, and hosted script readiness.

### Widget Contract

- [ ] **WIDG-01**: Widget global config, data attribute config, and manual API paths are documented and verified.
- [ ] **WIDG-02**: Public globals `JSPopupSales`, `jsPopupSalesInstance`, `showJSPopupSales`, `hideJSPopupSales`, and `dismissJSPopupSales` remain available.
- [ ] **WIDG-03**: Trigger behavior for delay, scroll, exit-intent, and manual modes is covered by browser-level tests or documented manual verification.
- [ ] **WIDG-04**: Dismissal behavior with `dismissDays` and localStorage is covered by tests or documented manual verification.
- [ ] **WIDG-05**: GTM/dataLayer events are documented and verified for show, CTA click, close, and error cases.

### Security and Accessibility

- [ ] **SAFE-01**: Markdown parsing escapes user-provided HTML while preserving supported formatting.
- [ ] **SAFE-02**: CTA, image, and markdown link URLs reject unsafe protocols or have an explicit documented policy.
- [ ] **SAFE-03**: Center popup focus trap, Escape close, and focus restoration are verified.
- [ ] **SAFE-04**: Reduced-motion behavior is verified.

### Demo Configurator

- [ ] **DEMO-01**: Configurator generated code includes the current form values and valid hosted script URL.
- [ ] **DEMO-02**: Preview flow removes existing widget container before rendering a fresh preview.
- [ ] **DEMO-03**: Configurator code is split or structured enough for targeted tests without changing user-visible behavior.

### Codebase Infrastructure

- [ ] **INFRA-01**: Unit test framework is installed and wired into npm scripts.
- [ ] **INFRA-02**: Browser smoke test framework is installed or documented for embed verification.
- [ ] **INFRA-03**: CI or local verification command sequence is documented.
- [ ] **INFRA-04**: GSD planning artifacts are present and pass the GSD health expectations for project, requirements, roadmap, state, and codebase map.

## v2 Requirements

### Distribution

- **DIST-01**: Publish the widget as an npm package in addition to hosted script distribution.
- **DIST-02**: Add semantic versioning and changelog automation.
- **DIST-03**: Add size budget reporting for the standalone widget script.

### Product Features

- **FEAT-01**: Add campaign presets to the configurator.
- **FEAT-02**: Add import/export of configurator JSON.
- **FEAT-03**: Add more analytics provider examples beyond GTM dataLayer.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Backend campaign manager | Current milestone is static widget hardening, not SaaS infrastructure |
| Authentication | No backend user accounts are needed for the current product |
| Payment flow | Not required to make the widget buildable, testable, and releasable |
| React runtime inside widget | Would violate the lightweight no-dependency widget constraint |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| BUILD-01 | Phase 1 | Pending |
| BUILD-02 | Phase 1 | Pending |
| BUILD-03 | Phase 1 | Pending |
| BUILD-04 | Phase 4 | Pending |
| WIDG-01 | Phase 2 | Pending |
| WIDG-02 | Phase 2 | Pending |
| WIDG-03 | Phase 3 | Pending |
| WIDG-04 | Phase 3 | Pending |
| WIDG-05 | Phase 3 | Pending |
| SAFE-01 | Phase 2 | Pending |
| SAFE-02 | Phase 2 | Pending |
| SAFE-03 | Phase 3 | Pending |
| SAFE-04 | Phase 3 | Pending |
| DEMO-01 | Phase 4 | Pending |
| DEMO-02 | Phase 4 | Pending |
| DEMO-03 | Phase 4 | Pending |
| INFRA-01 | Phase 2 | Pending |
| INFRA-02 | Phase 3 | Pending |
| INFRA-03 | Phase 4 | Pending |
| INFRA-04 | Phase 1 | Pending |

**Coverage:**
- v1 requirements: 20 total
- Mapped to phases: 20
- Unmapped: 0

---
*Requirements defined: 2026-06-16*
*Last updated: 2026-06-16 after initialization*
