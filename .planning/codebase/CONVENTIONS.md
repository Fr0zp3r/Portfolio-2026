# Coding Conventions

**Analysis Date:** 2026-05-05

## Naming Patterns

**Files:**
- Use lowercase kebab-case for pages and case data: `works/diamond-soft.html`, `content/cases/neuromuscular-mid.json`.
- Use lowercase descriptive names for browser scripts: `scripts/case-study.js`, `scripts/lightbox.js`.
- Use `.mjs` only for Node build-time scripts: `scripts/optimize-images.mjs`, `scripts/build-en-mirrors.mjs`.
- Keep English mirrors under `en/works/` with the same filename as `works/`.

**Functions:**
- Use camelCase for browser and build-time functions: `setDrawer`, `focusTargetFromHash`, `sanitizeHtmlFragment`, `tryFetch`, `applyNavCard`, `initHero`.
- Use `init*` names for behavior initializers in `scripts/animations.js`: `initScrollReveals`, `initCustomCursor`, `initMagneticTargets`.
- Use small local helpers inside IIFEs rather than exposing broad globals.

**Variables:**
- Use camelCase for local values: `currentLang`, `hasAppliedLang`, `lastFocused`, `focusableSelector`.
- Use UPPER_SNAKE_CASE for module-level constants in scripts: `SUPPORTED_LANGS`, `FALLBACK_LANG`, `FADE_MS`, `ALLOWED_HTML_TAGS`.
- Use CSS custom property names in lowercase kebab-case: `--bone`, `--ink-soft`, `--trans-fast`, `--space-section`.

**Types:**
- No TypeScript types, interfaces, or enums detected.
- Use HTML `data-*` attributes for declarative data contracts: `data-i18n`, `data-i18n-attr`, `data-case-field`, `data-lightbox`, `data-counter`.

## Code Style

**Formatting:**
- No Prettier or ESLint config detected.
- Match existing style manually: 2-space indentation, semicolons, single quotes in JavaScript, and compact guard clauses.
- Browser scripts use an IIFE with strict mode: `(function () { 'use strict'; ... })();` or `(() => { 'use strict'; ... })();`.
- Node scripts use ES module imports at top level, as in `scripts/optimize-images.mjs` and `scripts/build-en-mirrors.mjs`.
- CSS uses grouped component sections and compact one-line rules where appropriate.

**Linting:**
- No lint tool detected.
- Use `node --check` for JavaScript syntax verification:
  - `node --check scripts/nav.js`
  - `node --check scripts/i18n.js`
  - `node --check scripts/animations.js`
  - `node --check scripts/case-study.js`
  - `node --check scripts/lightbox.js`

## Import Organization

**Order:**
1. Browser scripts: no imports; use IIFE-local constants/functions and Web APIs.
2. Node build scripts: Node/package imports first, then derived path constants, then configuration constants, then functions.
3. HTML: CSS links before body, local scripts and CDN scripts at the end or with `defer` on case pages.

**Grouping:**
- Keep behavior modules separated by responsibility: navigation in `scripts/nav.js`, i18n in `scripts/i18n.js`, animation in `scripts/animations.js`, case hydration in `scripts/case-study.js`.
- Avoid mixing build-time Node logic into browser scripts.

**Path Aliases:**
- None. Use relative paths in HTML and scripts.

## CSS Conventions

**BEM:**
- Use `.block__element--modifier` only.
- Existing home blocks include `.nav`, `.drawer`, `.hero`, `.index`, `.clients`, `.manifesto`, `.work`, `.mini-gallery`, `.mini-piece`, `.archive`, `.approach`, `.principle`, `.quote`, `.xp`, `.contact`, `.foot`.
- Existing case blocks include `.case-hero`, `.heroCard`, `.snapshot`, `.sectionHead`, `.chapter`, `.assetGrid`, `.factCard`, `.caseInterlude`, `.production`, `.proofBand`, `.credits`, `.outro`, `.lightbox`, `.mediaBlock`.

**Tokens:**
- Add new visual values through `styles/main.css :root` or derive from existing tokens.
- Preserve the core palette: `--bone`, `--bone-deep`, `--ink`, `--ink-soft`, `--ink-mute`, `--rust`, `--rust-deep`, `--line`, `--line-strong`.
- Use `clamp()` or multiples of `--pad` / `--gutter` for new spacing.
- Preserve `:focus-visible` as the single focus signal.

**Motion CSS:**
- Keep `html.capture-mode` rules visible/static in `styles/main.css` and `styles/case-study.css`.
- New animated states must also define reduced/capture behavior when needed.

## HTML Conventions

**Structure:**
- Use semantic landmarks: `nav`, `main`, `section`, `header`, `footer`, `figure`, `nav` for case chapter indexes.
- Keep accessible labels on drawer, case media, lightbox-triggering figures, CTAs, and language controls.
- Use explicit image dimensions, `loading`, `decoding`, and `fetchpriority` for LCP images.

**Editorial Accent:**
- Use `<em>` as the only rust editorial accent inside headings and selected display copy.
- Do not add arbitrary rust spans, underlines, or decorative icons for emphasis.

**i18n:**
- Use `data-i18n="key"` for homepage text.
- Use `data-i18n-attr="attribute:key"` for `alt`, `aria-label`, and metadata attributes.
- Use `data-case-field="path"` and case JSON for case pages.

## Error Handling

**Patterns:**
- Return early when required DOM elements are missing, as in `scripts/nav.js`, `scripts/lightbox.js`, and `scripts/asset-gallery.js`.
- Wrap browser storage access in `try/catch`, as in `scripts/i18n.js`.
- Fall back rather than fail hard for optional enhancements: `scripts/animations.js` has no-GSAP and reduced/capture paths.
- Keep fetch failures contained: `scripts/i18n.js` falls back to Spanish/empty dictionaries; `scripts/case-study.js` dispatches completion even without data.

**Error Types:**
- No custom error classes.
- Build scripts log readable CLI messages and exit where needed.

## Logging

**Framework:**
- No logging framework.
- Use `console.error` sparingly for boundary failures such as dictionary loading in `scripts/i18n.js`.
- Build scripts may use `console.log` and `console.error` for local progress and failures.

**Patterns:**
- Do not log noisy runtime state in production browser scripts.
- Prefer graceful UI fallback over runtime console output for expected missing optional features.

## Comments

**When to Comment:**
- Use short orienting comments for non-obvious sections, especially script regions and performance-sensitive measurement/write ordering.
- Existing examples: section dividers in `scripts/case-study.js` and layout-measurement notes in `scripts/animations.js`.

**JSDoc/TSDoc:**
- Not used.

**TODO Comments:**
- No production TODO/FIXME convention detected.
- If needed, keep TODOs specific and actionable; avoid broad placeholder comments.

## Function Design

**Size:**
- Prefer small pure helpers for repeated behavior: `getNested`, `pickLocalized`, `parseRatio`, `clamp`, `getGap`.
- Large orchestration functions exist in `scripts/animations.js`; add new motion as named `init*` functions to keep the file navigable.

**Parameters:**
- Existing JavaScript uses positional parameters for small helpers.
- Use options objects when a function needs multiple boolean/config values, following `setDrawer(open, options = {})` in `scripts/nav.js`.

**Return Values:**
- Prefer early returns for missing DOM or unsupported runtime state.
- Return Promises from async i18n/build workflows.
- Avoid throwing inside browser enhancement code unless the failure should stop the module.

## Module Design

**Exports:**
- Browser scripts do not use module exports.
- Public globals are rare and intentional: `window.i18n`, `window.setLang`, `window.initShuffleLoaders`.
- Node scripts execute directly via top-level code.

**Barrel Files:**
- Not used.

**Boundaries:**
- Keep source-of-truth content in JSON, not hardcoded into browser behavior, except for small UI strings in `scripts/case-study.js`.
- Keep visual rules in CSS, not inline styles, except dynamic layout properties or data-derived image backgrounds.
- Keep build-time generation scripts out of runtime dependencies.

---

*Convention analysis: 2026-05-05*
*Update when formatting, naming, i18n, or module patterns change.*
