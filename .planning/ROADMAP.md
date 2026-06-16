# Roadmap: JS Popup Sales

## Overview

This roadmap turns the existing JS Popup Sales repository into a reliable maintainable public widget project. It starts by aligning the build and documentation baseline, then adds safety-focused unit coverage, browser-level embed verification, and finishes by hardening the demo configurator plus release workflow.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work.
- Decimal phases (2.1, 2.2): Urgent insertions if needed.

- [ ] **Phase 1: Build Baseline and GSD Setup** - Align documented build commands and confirm GSD project infrastructure.
- [ ] **Phase 2: Widget Contract and Unit Safety** - Lock down config validation, markdown safety, URL policy, and public API contracts.
- [ ] **Phase 3: Browser Embed Verification** - Verify real browser behavior for triggers, dismissal, accessibility, Shadow DOM, and dataLayer events.
- [ ] **Phase 4: Demo and Release Readiness** - Make the configurator easier to maintain and document the release path.

## Phase Details

### Phase 1: Build Baseline and GSD Setup
**Goal:** Maintainers can understand the current codebase and run the correct builds for both deliverables.
**Depends on:** Nothing (first phase)
**Requirements**: [BUILD-01, BUILD-02, BUILD-03, INFRA-04]
**Success Criteria** (what must be TRUE):
  1. `package.json` exposes a working widget build script.
  2. README build instructions match the actual script names and output paths.
  3. Demo app build and widget build both run locally.
  4. `.planning/` contains project, requirements, roadmap, state, config, and codebase map files.
**Plans**: 2 plans

Plans:
- [ ] 01-01: Align package scripts, README build docs, and widget output path.
- [ ] 01-02: Run GSD health/build verification and repair planning metadata if needed.

### Phase 2: Widget Contract and Unit Safety
**Goal:** Public configuration and security-sensitive utilities are protected by focused tests and clearer contracts.
**Depends on:** Phase 1
**Requirements**: [WIDG-01, WIDG-02, SAFE-01, SAFE-02, INFRA-01]
**Success Criteria** (what must be TRUE):
  1. Unit test framework runs through an npm script.
  2. Markdown parsing behavior is covered for supported formatting and escaped HTML.
  3. URL handling has a single explicit policy for CTA, image, and markdown links.
  4. Public globals and configuration paths are documented as compatibility contracts.
**Plans**: 3 plans

Plans:
- [ ] 02-01: Add unit test framework and tests for `utils.ts`.
- [ ] 02-02: Harden or document URL policy for all user-provided links.
- [ ] 02-03: Document public widget API and compatibility expectations.

### Phase 3: Browser Embed Verification
**Goal:** The widget is verified in a real browser as an embedded third-party script, not only as imported source code.
**Depends on:** Phase 2
**Requirements**: [WIDG-03, WIDG-04, WIDG-05, SAFE-03, SAFE-04, INFRA-02]
**Success Criteria** (what must be TRUE):
  1. Browser smoke tests or an equivalent scripted verification cover global config, data attributes, and manual API.
  2. Delay, scroll, exit-intent, and manual trigger behavior are verified.
  3. Dismissal through localStorage is verified.
  4. dataLayer events are verified for show, CTA click, close, and error where practical.
  5. Accessibility behavior for focus trap, Escape close, focus restoration, and reduced motion is verified.
**Plans**: 3 plans

Plans:
- [ ] 03-01: Add browser smoke harness for embedded script scenarios.
- [ ] 03-02: Cover trigger and dismissal behavior.
- [ ] 03-03: Cover tracking, Shadow DOM, and accessibility behavior.

### Phase 4: Demo and Release Readiness
**Goal:** The configurator and release workflow are maintainable enough for future changes.
**Depends on:** Phase 3
**Requirements**: [BUILD-04, DEMO-01, DEMO-02, DEMO-03, INFRA-03]
**Success Criteria** (what must be TRUE):
  1. Configurator code generation and preview behavior have targeted tests or a documented verification path.
  2. Demo component structure is easier to maintain without changing visible behavior.
  3. Release checklist covers install, lint, tests, demo build, widget build, and hosted script verification.
  4. README troubleshooting and build/release sections reflect the final workflow.
**Plans**: 2 plans

Plans:
- [ ] 04-01: Refactor configurator logic into testable helpers and verify generated snippets.
- [ ] 04-02: Add release checklist and final documentation pass.

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Build Baseline and GSD Setup | 0/2 | Not started | - |
| 2. Widget Contract and Unit Safety | 0/3 | Not started | - |
| 3. Browser Embed Verification | 0/3 | Not started | - |
| 4. Demo and Release Readiness | 0/2 | Not started | - |
