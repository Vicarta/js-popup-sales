# Structure

**Analysis Date:** 2026-06-16

## Repository Layout

```text
.
|-- README.md
|-- LICENSE
|-- package.json
|-- package-lock.json
|-- index.html
|-- vite.config.ts
|-- vite.js-popup-sales.config.ts
|-- tsconfig.json
|-- tsconfig.app.json
|-- tsconfig.node.json
|-- tailwind.config.ts
|-- postcss.config.js
|-- eslint.config.js
|-- components.json
|-- public/
|-- src/
`-- .planning/
```

## Widget Source

`src/js-popup-sales/`

- `popup-sales.ts` - Main widget class, auto-init logic, global helpers, trigger behavior, tracking, lifecycle.
- `utils.ts` - Markdown parsing, HTML escaping, enum validation, numeric clamping, color validation, default config.
- `styles.ts` - Full Shadow DOM CSS string for popup layout, themes, responsive states, and reduced motion.

This folder is the core deliverable. Changes here affect the hosted `js-popup-sales.js` script and customer websites.

## Demo App Source

`src/pages/`

- `JsPopupSalesDemo.tsx` - Main configurator and preview page.
- `About.tsx` - Informational page.
- `Terms.tsx` - Terms page.
- `NotFound.tsx` - Catch-all route page.

`src/App.tsx`

- Sets up providers, router, and route table.

`src/main.tsx`

- React mount entry.

## Components

`src/components/`

- `Footer.tsx` - Shared footer.
- `ui/` - shadcn-style UI primitives used by the demo.

The UI component set is broader than current usage because this appears to be scaffolded from a Lovable/shadcn template.

## Hooks and Utilities

`src/hooks/`

- `use-toast.ts` - Toast helper.
- `use-mobile.tsx` - Mobile detection hook.

`src/lib/utils.ts`

- Shared class utility for React components.

## Assets

`public/`

- Static assets served by Vite, including the default demo image and favicons.

`src/assets/`

- Project image assets, including founder image files.

## Build and Tooling Files

- `vite.config.ts` - Demo app dev server and build.
- `vite.js-popup-sales.config.ts` - Standalone widget build.
- `tailwind.config.ts` - Tailwind configuration.
- `eslint.config.js` - ESLint flat config.
- `components.json` - shadcn/ui configuration.

## Generated or Expected Output

- Demo app build output is normally `dist/`.
- Widget build output is configured as `dist/js-popup-sales.js`.
- README currently mentions `dist-js-popup-sales/js-popup-sales.js`, which does not match the current Vite widget config.

## Naming Conventions

- Widget CSS classes use the `js-popup-sales-*` prefix.
- Global browser APIs use `JSPopupSales`, `jsPopupSalesInstance`, and helper names with `JSPopupSales`.
- React components use PascalCase.
- UI component files under `src/components/ui` use lowercase filenames.

---
*Structure analysis: 2026-06-16*
*Update when files move or new subsystems appear*
