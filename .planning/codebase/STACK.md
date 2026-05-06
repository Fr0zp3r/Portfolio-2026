# Technology Stack

**Analysis Date:** 2026-05-05

## Languages

**Primary:**
- HTML5 - Static page markup in `index.html`, Spanish case pages in `works/*.html`, and English mirrors in `en/works/*.html`.
- CSS3 - Global and section styling in `styles/reset.css`, `styles/main.css`, and `styles/case-study.css`.
- JavaScript ES6+ - Browser behavior in `scripts/nav.js`, `scripts/i18n.js`, `scripts/animations.js`, `scripts/case-study.js`, `scripts/lightbox.js`, `scripts/asset-gallery.js`, and `scripts/loader_queue.js`.

**Secondary:**
- Node.js ES modules - Build-time utilities in `scripts/optimize-images.mjs` and `scripts/build-en-mirrors.mjs`.
- JSON - Homepage dictionaries in `content/es.json` and `content/en.json`; case data in `content/cases/*.json`.
- Markdown - Project guidance in `AGENTS.md`, `README.md`, `docs/*.md`, and `assets/fonts/*.md`.

## Runtime

**Environment:**
- Browser static-site runtime - Files are served directly from the repo root or GitHub Pages.
- Node.js - Build-time only for image optimization and English mirror generation.
- No backend runtime, database runtime, SPA runtime, or server-side rendering layer detected.

**Package Manager:**
- npm - `package.json` defines `npm run optimize:images`.
- Lockfile: Not detected. There is no `package-lock.json`, `npm-shrinkwrap.json`, `pnpm-lock.yaml`, or `yarn.lock` in the repo root.
- Node version: Not pinned. No `.nvmrc`, `.node-version`, or `engines` field detected in `package.json`.

## Frameworks

**Core:**
- None - Production UI is vanilla HTML/CSS/JavaScript by contract in `AGENTS.md`.
- GSAP 3.12.5 - Runtime animation library loaded from cdnjs in `index.html` and `works/*.html`.
- ScrollTrigger 3.12.5 - GSAP plugin loaded from cdnjs and registered in `scripts/animations.js`.

**Testing:**
- No automated test runner detected.
- QA is syntax and manual browser verification, documented in `README.md` and `AGENTS.md`.

**Build/Dev:**
- sharp 0.34.0 - Only npm dependency, used by `scripts/optimize-images.mjs` to generate optimized image derivatives.
- Node built-ins - `scripts/build-en-mirrors.mjs` uses `fs/promises`, `path`, and `url` to create `en/works/*.html` from `works/*.html` plus `content/cases/*.json`.
- Static server - Local development uses any static HTTP server such as `python -m http.server 8000` or `npx serve`.

## Key Dependencies

**Critical:**
- `gsap@3.12.5` via `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js` - Primary motion system for hero, reveals, case media, cursor, hover polish, and scroll progress.
- `ScrollTrigger@3.12.5` via `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js` - Scroll-linked reveal and motion orchestration.
- `sharp@^0.34.0` - Build-time image optimization from `assets/images/_originals/` into `assets/images/`.

**Infrastructure:**
- Local variable fonts - Fraunces and Archivo TTF variables in `assets/fonts/`, declared in `styles/main.css`.
- Browser Fetch API - Used by `scripts/i18n.js` for `content/*.json` and by `scripts/case-study.js` for `content/cases/*.json`.
- Browser storage - `scripts/i18n.js` persists homepage language in `localStorage`.
- DOM and Web APIs - `IntersectionObserver`, `ResizeObserver`, `CustomEvent`, `requestAnimationFrame`, Pointer Events, and media queries are used across `scripts/*.js`.

## Configuration

**Environment:**
- No runtime environment variables required.
- `.env` and `.env.*` are ignored by `.gitignore` as a precaution, but no production code reads them.
- Runtime configuration is encoded in static files: `index.html`, `works/*.html`, `content/*.json`, `content/cases/*.json`, `styles/*.css`, and `scripts/*.js`.

**Build:**
- `package.json` exposes only `optimize:images`.
- `scripts/optimize-images.mjs` reads originals from `assets/images/_originals/` and writes derivatives to `assets/images/`.
- `scripts/build-en-mirrors.mjs` exists for English case mirrors but is not wired into `package.json` scripts.
- No bundler config detected: no Vite, Webpack, Parcel, Astro, Next, Tailwind, ESLint, Prettier, or TypeScript config.

## Platform Requirements

**Development:**
- Any OS with a static HTTP server and Node.js for optional build-time scripts.
- Use a static server for reliable JSON `fetch()` behavior; direct `file://` opening may block content loading in some browsers.
- Run `node --check` against browser scripts after JavaScript edits.

**Production:**
- Static hosting from repo root, documented for GitHub Pages in `README.md`.
- CDN access to cdnjs is required for full GSAP animation behavior.
- The site degrades to visible/static content when GSAP is unavailable or when `?capture=1` / `prefers-reduced-motion: reduce` applies.

---

*Stack analysis: 2026-05-05*
*Update after dependency, hosting, build-script, or runtime changes.*
