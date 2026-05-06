<!-- refreshed: 2026-05-05 -->
# Architecture

**Analysis Date:** 2026-05-05

## System Overview

```text
Browser
  |
  v
Static HTML entry points
  `index.html`
  `works/*.html`
  `en/works/*.html`
  |
  +--> Styling layer
  |     `styles/reset.css`
  |     `styles/main.css`
  |     `styles/case-study.css`
  |
  +--> Content data layer
  |     `content/es.json`
  |     `content/en.json`
  |     `content/cases/*.json`
  |
  +--> Client behavior layer
  |     `scripts/nav.js`
  |     `scripts/i18n.js`
  |     `scripts/animations.js`
  |     `scripts/case-study.js`
  |     `scripts/lightbox.js`
  |     `scripts/asset-gallery.js`
  |     `scripts/loader_queue.js`
  |
  v
Progressively enhanced static portfolio

Build-time only
  `scripts/optimize-images.mjs` -> `assets/images/`
  `scripts/build-en-mirrors.mjs` -> `en/works/*.html`
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| Home document | Primary Spanish/default portfolio page, SEO metadata, nav, hero, works, approach, experience, contact, footer | `index.html` |
| Spanish case pages | Static case-study shells with `data-case` and `data-case-field` hooks | `works/*.html` |
| English case mirrors | Localized static mirrors generated from Spanish case pages | `en/works/*.html` |
| Global styles | Tokens, local fonts, home layout, nav/drawer, work cards, contact, footer, capture/reduced styles | `styles/main.css` |
| Case styles | Case hero, media ratios, asset grids, lightbox, production blocks, outro navigation | `styles/case-study.css` |
| Navigation | Active nav state, mobile drawer state, focus trapping, inert background management | `scripts/nav.js` |
| Homepage i18n | Loads `content/es.json` and `content/en.json`, sanitizes allowed inline HTML, swaps `data-i18n` and `data-i18n-attr` | `scripts/i18n.js` |
| Motion system | GSAP guarded boot, hero word masking, reveals, counters, parallax, cursor, scroll progress, hover polish | `scripts/animations.js` |
| Case hydration | Loads `content/cases/<slug>.json`, fills `data-case-*` hooks, hydrates chapter/credits/prev-next cards | `scripts/case-study.js` |
| Lightbox | Accessible image viewer for `[data-lightbox]` case media | `scripts/lightbox.js` |
| Asset strip layout | Justified gallery sizing for `.assetGrid--strip` | `scripts/asset-gallery.js` |
| Loader animation | GSAP-powered shuffle loader with reduced/capture fallbacks | `scripts/loader_queue.js` |
| Image build | Sharp-based image derivative generation from originals | `scripts/optimize-images.mjs` |
| English mirror build | Generates localized `en/works/*.html` files from case JSON and Spanish HTML | `scripts/build-en-mirrors.mjs` |

## Pattern Overview

**Overall:** Static editorial portfolio with progressive enhancement.

**Key Characteristics:**
- Production code is framework-free: HTML, CSS, JavaScript, and JSON are served directly.
- HTML owns structure and SEO; JSON owns translatable copy; CSS owns the design system; JavaScript progressively enhances behavior.
- GSAP is optional at runtime: `scripts/animations.js` exits to static fallback if GSAP is unavailable.
- Motion is disabled by two global states: `?capture=1` and `prefers-reduced-motion: reduce`.
- Case studies use reusable static shells plus `content/cases/*.json` hydration rather than a router or templating framework.

## Layers

**Document Layer:**
- Purpose: Provide semantic structure, SEO metadata, script/style references, and stable hydration hooks.
- Location: `index.html`, `works/*.html`, `en/works/*.html`.
- Contains: Navigation, section markup, case shells, JSON-LD, canonical/hreflang metadata, image/media markup.
- Depends on: Static CSS, static JS, local JSON content, local assets, GSAP CDN for full animation.
- Used by: Browser runtime and search/social crawlers.

**Design System Layer:**
- Purpose: Provide tokens, typography, responsive layout, BEM components, focus styles, and capture/reduced fallbacks.
- Location: `styles/reset.css`, `styles/main.css`, `styles/case-study.css`, `assets/fonts/styleguide.md`.
- Contains: `:root` tokens, `@font-face`, BEM block styles, media queries, motion fallbacks.
- Depends on: Local fonts and CSS custom properties.
- Used by: All HTML entry points.

**Content Layer:**
- Purpose: Store localized and case-study content outside the behavior scripts.
- Location: `content/es.json`, `content/en.json`, `content/cases/*.json`.
- Contains: Flat homepage i18n keys plus nested per-case `i18n.es` / `i18n.en` objects.
- Depends on: Browser Fetch API.
- Used by: `scripts/i18n.js`, `scripts/case-study.js`, and `scripts/build-en-mirrors.mjs`.

**Client Behavior Layer:**
- Purpose: Add navigation, language switching, case hydration, motion, lightbox, counters, and layout polish.
- Location: `scripts/*.js`.
- Contains: IIFE modules, DOM queries, event listeners, CustomEvents, GSAP timelines, Web API observers.
- Depends on: Existing DOM hooks and, for motion, GSAP/ScrollTrigger when available.
- Used by: Browser runtime.

**Build-Time Tooling Layer:**
- Purpose: Generate optimized images and English case mirrors before deployment.
- Location: `scripts/optimize-images.mjs`, `scripts/build-en-mirrors.mjs`, `package.json`.
- Contains: Node ES modules using `sharp` and Node built-ins.
- Depends on: Node.js, npm dependency installation, source image/content files.
- Used by: Maintainer during asset/content updates.

## Data Flow

### Homepage Load

1. Browser requests `index.html`.
2. HTML loads local fonts/CSS from `assets/fonts/`, `styles/reset.css`, and `styles/main.css`.
3. `scripts/nav.js` binds active link state and drawer interactions.
4. `scripts/i18n.js` fetches `content/es.json` and `content/en.json`, applies `data-i18n` / `data-i18n-attr`, updates `<html lang>`, persists language to `localStorage`, and dispatches `langchange`.
5. cdnjs GSAP and ScrollTrigger load, then `scripts/loader_queue.js` and `scripts/animations.js` add motion when allowed.

### Case Study Load

1. Browser requests `works/<slug>.html` or `en/works/<slug>.html`.
2. The page identifies the case with `body[data-case="<slug>"]`.
3. `scripts/i18n.js` determines route language from `/works/` vs `/en/works/`.
4. `scripts/case-study.js` fetches `content/cases/<slug>.json`, resolves `i18n[lang]` fields, fills `[data-case-field]`, `[data-case-chapters]`, `[data-case-credits]`, and prev/next cards, then dispatches `casehydrated`.
5. `scripts/animations.js` waits for `casehydrated` before measuring and animating case elements.
6. Optional `scripts/asset-gallery.js` sizes `.assetGrid--strip`, and `scripts/lightbox.js` enables `[data-lightbox]` media.

### English Mirror Generation

1. Maintainer runs `node scripts/build-en-mirrors.mjs`.
2. Script reads `content/cases/<slug>.json` and `works/<slug>.html`.
3. Script rewrites metadata, paths, nav labels, copy blocks, hero data, snapshot, credits, and outro.
4. Script writes `en/works/<slug>.html`.

### Image Optimization

1. Originals are placed in `assets/images/_originals/`.
2. Maintainer runs `npm run optimize:images`.
3. `scripts/optimize-images.mjs` uses `sharp` to write optimized derivatives to `assets/images/`.
4. HTML references optimized files with explicit dimensions, lazy/eager loading, and webp fallbacks.

**State Management:**
- Homepage language state is `localStorage` plus `window.i18n.lang`.
- Case page language state is route-derived.
- Drawer/lightbox state is DOM class/attribute state (`drawer-open`, `inert`, `aria-hidden`, `aria-expanded`).
- Motion state is derived from `window.PORTFOLIO_CAPTURE_MODE`, media queries, and GSAP availability.
- No server state or database state exists.

## Key Abstractions

**BEM Blocks:**
- Purpose: Stable styling and component ownership.
- Examples: `.nav`, `.drawer`, `.hero`, `.work`, `.s-head`, `.case-hero`, `.assetGrid`, `.production`, `.outro`.
- Pattern: `.block__element--modifier`, documented in `AGENTS.md` and `assets/fonts/styleguide.md`.

**i18n Attribute Hooks:**
- Purpose: Keep homepage markup static while allowing ES/EN text swap.
- Examples: `data-i18n="nav.projects"` and `data-i18n-attr="aria-label:drawer.nav"` in `index.html`.
- Pattern: Flat dotted keys in `content/es.json` and `content/en.json`; values are sanitized by `scripts/i18n.js`.

**Case Data Hooks:**
- Purpose: Reuse case page shells while filling copy from JSON.
- Examples: `[data-case-field="hero.title"]`, `[data-case-chapters]`, `[data-case-credits]` in `works/*.html`.
- Pattern: Nested `content/cases/<slug>.json` with `i18n.es` and `i18n.en`.

**Motion Hooks:**
- Purpose: Declarative animation targets.
- Examples: `.reveal`, `.work__visual`, `.case-hero__title .word`, `.parallax`, `[data-counter]`.
- Pattern: `scripts/animations.js` measures DOM and applies GSAP only after content hydration is ready.

**Capture Mode:**
- Purpose: Make pages deterministic for screenshots/export.
- Examples: Inline script in `index.html` and case pages sets `window.PORTFOLIO_CAPTURE_MODE`; `styles/main.css` and `styles/case-study.css` force static visible states.
- Pattern: Query string `?capture=1`.

## Entry Points

**Home Page:**
- Location: `index.html`.
- Triggers: Browser request to site root.
- Responsibilities: Present the portfolio landing experience and load global assets/scripts.

**Spanish Case Pages:**
- Location: `works/*.html`.
- Triggers: Portfolio project links and direct URLs.
- Responsibilities: Present case shell, load localized data, image/media assets, case JS, and lightbox/gallery behavior.

**English Case Pages:**
- Location: `en/works/*.html`.
- Triggers: Language toggle on case pages and direct `/en/works/` URLs.
- Responsibilities: Serve hardcoded English mirror content while retaining case hydration behavior.

**Homepage i18n Module:**
- Location: `scripts/i18n.js`.
- Triggers: Script load, language toggle clicks, drawer state changes.
- Responsibilities: Fetch dictionaries, sanitize allowed HTML, update text/attributes/meta, persist language.

**Case Hydration Module:**
- Location: `scripts/case-study.js`.
- Triggers: Script load on pages with `body[data-case]`.
- Responsibilities: Fetch case JSON, fill case fields, build chapter/credit/nav fragments, dispatch `casehydrated`.

**Motion Module:**
- Location: `scripts/animations.js`.
- Triggers: Script load, `window.i18n.ready`, `casehydrated`, `langchange`, scroll/resize/pointer events.
- Responsibilities: Motion boot/fallback, scroll reveals, hero animation, cursor, hover polish.

**Build Scripts:**
- Location: `scripts/optimize-images.mjs`, `scripts/build-en-mirrors.mjs`.
- Triggers: Manual Node execution.
- Responsibilities: Generate production-ready images and English case HTML.

## Architectural Constraints

- **Static-only:** Do not add server routes, databases, framework routers, or runtime build systems.
- **No SPA framework:** React, Vue, Svelte, Astro, Next, Tailwind, shadcn/ui, Framer Motion, anime.js, Three.js, and particle systems are explicitly rejected by `AGENTS.md`.
- **GSAP optionality:** Any new animation must check GSAP availability and respect `?capture=1` and `prefers-reduced-motion: reduce`.
- **Global state:** `window.i18n`, `window.setLang`, `window.PORTFOLIO_CAPTURE_MODE`, and `window.initShuffleLoaders` are the known global APIs.
- **Content parity:** New homepage copy must be added to both `content/es.json` and `content/en.json`; new case copy belongs in both `i18n.es` and `i18n.en` inside `content/cases/*.json`.
- **Design tokens:** New colors, spacing, typography, and transitions should derive from `styles/main.css :root`.
- **Project hygiene:** `.claude/`, `.qodo/`, `.playwright-cli/`, `.playwright-mcp/`, `output/`, `test-results/`, `uploads/`, `works/*backup*.html`, and archive files are not production sources.

## Anti-Patterns

### Framework Migration

**What happens:** Adding React/Vue/Svelte/Astro/Next or a bundler to solve templating or interaction needs.
**Why it is wrong:** The site is intentionally static for performance, GitHub Pages compatibility, and editorial control.
**Do this instead:** Extend `index.html`, `works/*.html`, `content/*.json`, and `scripts/*.js` using the existing vanilla patterns.

### Unsynced Copy

**What happens:** Adding only Spanish or only English keys for homepage or case content.
**Why it is wrong:** Language toggles and English mirrors depend on complete bilingual data.
**Do this instead:** Update `content/es.json` and `content/en.json` together, or both `i18n.es` and `i18n.en` in `content/cases/<slug>.json`.

### Ad Hoc Styling

**What happens:** Adding one-off colors, utility classes, gradients, glow, arbitrary spacing, or non-BEM class names.
**Why it is wrong:** The portfolio identity depends on a strict editorial token system.
**Do this instead:** Extend BEM components and derive values from `styles/main.css :root`.

### Direct Use of Backup/Tooling Folders

**What happens:** Copying from `.claude/worktrees/`, `.qodo/`, `works/*backup*.html`, or generated Playwright outputs.
**Why it is wrong:** These are history, tools, or scratch artifacts rather than production sources.
**Do this instead:** Use `index.html`, `works/*.html`, `en/works/*.html`, `styles/`, `scripts/`, `content/`, `assets/`, and `docs/`.

## Error Handling

**Strategy:** Graceful degradation in browser modules, with failures contained at the boundary.

**Patterns:**
- `scripts/animations.js` exits to `runStaticInit()` when GSAP is unavailable.
- `scripts/i18n.js` falls back to Spanish keys and caches `{}` after dictionary fetch failures.
- `scripts/case-study.js` tries multiple relative paths for case JSON and dispatches `casehydrated` even when data is missing.
- `scripts/lightbox.js` and `scripts/nav.js` return early when required DOM hooks are missing.
- Build scripts log errors and continue/exit at CLI boundaries.

## Cross-Cutting Concerns

**Logging:** Browser console only in `scripts/i18n.js`; CLI logging in `scripts/optimize-images.mjs` and `scripts/build-en-mirrors.mjs`.

**Validation:** Light validation exists in code paths: language normalization in `scripts/i18n.js`, allowed-tag sanitization for homepage i18n HTML, ratio parsing in `scripts/asset-gallery.js`, and extension checks in `scripts/optimize-images.mjs`.

**Authentication:** Not applicable.

**Accessibility:** Focus-visible styling in `styles/main.css`, skip link in `index.html`, drawer focus trap in `scripts/nav.js`, lightbox focus trap in `scripts/lightbox.js`, reduced-motion CSS/JS paths, and semantic landmarks in HTML.

**SEO:** Static metadata, JSON-LD, canonical/hreflang links, `sitemap.xml`, and `robots.txt`.

---

*Architecture analysis: 2026-05-05*
*Update when major page, content, motion, build, or deployment patterns change.*
