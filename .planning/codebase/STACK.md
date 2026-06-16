# Technology Stack

**Analysis Date:** 2026-06-16

## Languages

**Primary:**
- TypeScript 5.8 - Widget implementation, React demo app, Vite configuration.
- TSX - React page and component code in `src/pages` and `src/components`.

**Secondary:**
- CSS - Tailwind global styles in `src/index.css`; widget runtime styles are generated as a TypeScript string in `src/js-popup-sales/styles.ts`.
- HTML - Vite shell in `index.html`.

## Runtime

**Environment:**
- Browser runtime - The distributed widget is an IIFE script intended to run directly on customer websites.
- Node.js - Required for local development, linting, and Vite builds. No explicit `engines` field is present in `package.json`.

**Package Manager:**
- npm - `package-lock.json` is present.

## Frameworks

**Core:**
- React 18.3 - Demo/configurator application.
- Vite 5.4 - Development server and production builds.
- Vanilla TypeScript DOM API - The embeddable widget uses no runtime framework dependency.
- Shadow DOM - Used by the widget for style isolation.

**UI:**
- Tailwind CSS 3.4 - Demo app styling.
- Radix UI primitives - Installed for shadcn-style components.
- lucide-react - Icons in the demo/configurator.

**Build/Dev:**
- `vite.config.ts` - Builds the React demo app on port 8080.
- `vite.js-popup-sales.config.ts` - Builds `src/js-popup-sales/popup-sales.ts` as an IIFE file named `js-popup-sales.js`.
- TypeScript configs: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`.
- ESLint 9 with `typescript-eslint`, React Hooks, and React Refresh plugins.

**Testing:**
- No test framework is currently configured.
- No `test` script, Vitest config, Playwright config, or test files were found.

## Key Dependencies

**Critical:**
- `react`, `react-dom` - Demo/configurator runtime.
- `react-router-dom` - Routes for `/`, `/about`, `/terms`, and not found page.
- `@vitejs/plugin-react-swc` - React transform in Vite.
- `tailwindcss`, `tailwind-merge`, `class-variance-authority`, `clsx` - Styling and component class composition.
- `@radix-ui/*` packages - UI primitives used by the shadcn component set.

**Widget Runtime:**
- No external npm dependency should be required by the emitted widget script.
- The widget optionally imports Inter from Google Fonts unless `inheritFont` is true.

## Configuration

**Environment:**
- No `.env` contract is documented.
- Public demo examples point at `https://js-popup-sales.pages.dev`.

**Build:**
- `npm run build` currently runs the React/Vite app build through `vite.config.ts`.
- The README documents a `build:js-popup-sales` script, but `package.json` does not currently define it.
- Widget build can still be run directly with `npx vite build --config vite.js-popup-sales.config.ts`.

## Platform Requirements

**Development:**
- Node.js plus npm.
- Browser for manual widget verification.

**Production:**
- Static hosting/CDN for `js-popup-sales.js` and public assets.
- Customer websites load the generated script through either global `window.JSPopupSalesConfig` or data attributes.

---
*Stack analysis: 2026-06-16*
*Update after major dependency or build changes*
