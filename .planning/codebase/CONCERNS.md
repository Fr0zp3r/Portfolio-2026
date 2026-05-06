# Codebase Concerns

**Analysis Date:** 2026-05-05

## Tech Debt

**No automated test or CI safety net:**
- Issue: Verification relies on manual QA plus `node --check`; no committed automated tests or CI workflows were detected.
- Files: `package.json`, `README.md`, `.gitignore`, `scripts/*.js`, `works/*.html`.
- Impact: i18n, drawer focus behavior, lightbox interactions, case hydration, and capture/reduced states can regress without a failing check.
- Fix approach: Add a small static-site test harness or Playwright smoke suite that serves the repo, verifies `index.html`, one `works/*.html`, one `en/works/*.html`, keyboard flows, `?capture=1`, and reduced-motion behavior.

**English mirror generator is a large regex rewrite script:**
- Issue: `scripts/build-en-mirrors.mjs` rewrites HTML using many string maps and regex helpers rather than a structured HTML parser.
- Files: `scripts/build-en-mirrors.mjs`, `works/*.html`, `en/works/*.html`, `content/cases/*.json`.
- Impact: Markup changes in `works/*.html` can silently produce incomplete or stale English mirrors.
- Fix approach: Add smoke tests around `scripts/build-en-mirrors.mjs`, wire it into `package.json`, and consider a structured HTML parser if mirror generation keeps growing.

**Image pipeline script and documented contract differ:**
- Issue: The project rules describe generating `name.jpg`, `name@2x.jpg`, `name.webp`, and `name@2x.webp`, but `scripts/optimize-images.mjs` currently writes `name.jpg`, `name.webp`, and `name@2x.webp` only.
- Files: `AGENTS.md`, `assets/fonts/styleguide.md`, `scripts/optimize-images.mjs`, `assets/images/`.
- Impact: New image sets can miss `@2x.jpg` fallback assets unless generated manually or by an older process.
- Fix approach: Either update `scripts/optimize-images.mjs` to write `@2x.jpg` or update docs/markup expectations to remove that derivative.

**Build scripts are not fully surfaced through npm scripts:**
- Issue: `package.json` exposes `optimize:images` but not the English mirror generator.
- Files: `package.json`, `scripts/build-en-mirrors.mjs`.
- Impact: Case updates may skip regenerating `en/works/*.html`, leaving language mirrors out of sync.
- Fix approach: Add a documented npm script such as `build:en-mirrors` and include it in the case-study update checklist.

## Known Bugs

**No confirmed runtime bug from this scan:**
- Symptoms: Not applicable.
- Files: `index.html`, `works/*.html`, `scripts/*.js`.
- Trigger: Not applicable.
- Workaround: Continue using the manual QA checklist in `README.md` and `AGENTS.md`.

## Security Considerations

**Case hydration inserts trusted JSON as HTML:**
- Risk: `scripts/case-study.js` assigns resolved JSON fields via `innerHTML` and builds HTML strings for chapters/credits/navigation without the same allowlist sanitizer used by `scripts/i18n.js`.
- Files: `scripts/case-study.js`, `content/cases/*.json`.
- Current mitigation: Case JSON is local repo content, not user-submitted runtime input.
- Recommendations: Keep `content/cases/*.json` trusted and reviewed. If any external CMS/import flow is added, reuse or extend `sanitizeHtmlFragment` from `scripts/i18n.js` before writing HTML.

**Lightbox captions use raw dataset HTML:**
- Risk: `scripts/lightbox.js` writes `el.dataset.caption` into `.lightbox__caption` with `innerHTML`.
- Files: `scripts/lightbox.js`, `works/*.html`, `en/works/*.html`.
- Current mitigation: Captions are authored in static HTML by the maintainer.
- Recommendations: Keep captions trusted/static or sanitize before insertion if captions become data-driven.

**No secrets should enter generated docs or static source:**
- Risk: Static hosting would expose any committed secret.
- Files: `.gitignore`, `.planning/codebase/*.md`, `content/*.json`, `content/cases/*.json`, `scripts/*.js`.
- Current mitigation: `.gitignore` excludes `.env`, `.env.*`, and common local/tooling artifacts.
- Recommendations: Keep environment values out of docs and source; document variable names only if future integrations require them.

## Performance Bottlenecks

**Large media assets can harm LCP and bandwidth:**
- Problem: Several production image assets in `assets/images/` are multi-megabyte PNG/JPG files, including mockups over 9 MB and a large local archive in the workspace.
- Files: `assets/images/*.png`, `assets/images/*.jpg`, `works/*.html`, `index.html`.
- Cause: Case pages and galleries sometimes reference detailed project mockups directly; not all assets appear to have optimized webp/jpg derivative sets.
- Improvement path: Run `npm run optimize:images` for new originals, prefer webp/jpg derivatives in `<picture>`, keep large source files out of critical paths, and avoid referencing scratch/heavy files directly.

**Runtime depends on external CDN/media availability:**
- Problem: Full animation requires cdnjs GSAP, and some case media loads from YouTube/Imgur.
- Files: `index.html`, `works/*.html`, `en/works/*.html`.
- Cause: External scripts and embeds are loaded at runtime.
- Improvement path: Preserve the current GSAP fallback path, keep critical content visible without embeds, and consider local/static thumbnails or poster fallbacks for external videos.

**Animation file is large and multi-responsibility:**
- Problem: `scripts/animations.js` owns hero, reveal, parallax, counters, cursor, magnetic hover, scroll progress, section rail, and case motion.
- Files: `scripts/animations.js`.
- Cause: All GSAP behavior is centralized by project convention.
- Improvement path: Keep additions as named `init*` functions, avoid cross-cutting side effects, and broaden smoke/manual QA when editing this file.

## Fragile Areas

**i18n and motion event ordering:**
- Files: `scripts/i18n.js`, `scripts/case-study.js`, `scripts/animations.js`.
- Why fragile: Motion measurements depend on translated/hydrated DOM; `animations.js` waits on `window.i18n.ready` and `casehydrated`.
- Safe modification: Preserve `langchange` and `casehydrated` dispatches; after copy/schema changes, test homepage language toggle and at least one case page in ES and EN.
- Test coverage: No automated coverage.

**Drawer and lightbox inert/focus management:**
- Files: `scripts/nav.js`, `scripts/lightbox.js`, `index.html`, `works/*.html`.
- Why fragile: Both modules manage focus traps, `inert`, `aria-hidden`, keyboard events, and return focus.
- Safe modification: Test Tab/Shift+Tab/Escape after every change; check screen-reader labels and focus-visible rings.
- Test coverage: No automated coverage.

**Case page shell and JSON schema coupling:**
- Files: `works/*.html`, `en/works/*.html`, `content/cases/*.json`, `scripts/case-study.js`.
- Why fragile: `data-case-field` paths must match nested JSON keys; mirror generation assumes specific markup and data structure.
- Safe modification: When adding or renaming fields, update Spanish shell, English mirror, case JSON, and mirror generator together.
- Test coverage: No automated coverage.

**Capture and reduced-motion states:**
- Files: `index.html`, `works/*.html`, `scripts/animations.js`, `scripts/case-study.js`, `scripts/lightbox.js`, `scripts/loader_queue.js`, `styles/main.css`, `styles/case-study.css`.
- Why fragile: Several modules must independently honor `window.PORTFOLIO_CAPTURE_MODE` and `prefers-reduced-motion`.
- Safe modification: Any new animation needs an explicit static path and CSS visibility state for `?capture=1`.
- Test coverage: Manual only.

## Scaling Limits

**Static manual page growth:**
- Current capacity: 11 case pages in `works/` plus 11 English mirrors in `en/works/`.
- Limit: As more cases are added, maintaining static HTML shells and generated mirrors becomes increasingly error-prone without tests.
- Scaling path: Keep the stack static, but improve generation/check scripts and validations rather than introducing a runtime framework.

**No dependency lockfile:**
- Current capacity: One npm dependency (`sharp`) used build-time.
- Limit: Fresh installs can resolve different transitive dependency versions.
- Scaling path: Add `package-lock.json` if reproducible image builds become important.

## Dependencies at Risk

**cdnjs GSAP / ScrollTrigger runtime:**
- Risk: CDN outage or blocked third-party script prevents enhanced motion.
- Impact: Animations, ScrollTrigger reveals, cursor polish, and loader motion do not run.
- Migration plan: Keep current no-GSAP fallback valid; if needed, self-host exact GSAP files while respecting license/CDN policy.

**sharp build-time dependency without lockfile:**
- Risk: Native package install or version drift issues on a new machine.
- Impact: `npm run optimize:images` may fail or produce different output.
- Migration plan: Add a lockfile and document supported Node/npm versions.

## Missing Critical Features

**Automated accessibility/visual smoke checks:**
- Problem: The project has detailed accessibility and visual requirements but no automated checks.
- Files: `README.md`, `AGENTS.md`, `scripts/nav.js`, `scripts/lightbox.js`, `styles/main.css`.
- Blocks: Fast confidence when changing nav, lightbox, language toggles, motion, and responsive layouts.
- Implementation complexity: Medium. A small Playwright smoke suite can cover the highest-risk flows without changing the production stack.

**Content/schema validation:**
- Problem: `content/*.json` and `content/cases/*.json` have no schema validation.
- Files: `content/es.json`, `content/en.json`, `content/cases/*.json`, `scripts/case-study.js`, `scripts/build-en-mirrors.mjs`.
- Blocks: Reliable detection of missing bilingual keys, broken `data-case-field` paths, or incomplete case mirror data.
- Implementation complexity: Low to medium. Add a Node validation script that checks key parity and case schema shape.

## Test Coverage Gaps

**Homepage i18n:**
- What's not tested: Dictionary fetch fallback, sanitizer allowlist, metadata updates, language persistence, and `langchange`.
- Files: `scripts/i18n.js`, `content/es.json`, `content/en.json`, `index.html`.
- Risk: Broken or unsafe copy swaps can reach production.
- Priority: High.

**Case hydration and mirrors:**
- What's not tested: JSON path resolution, chapters, credits, prev/next nav, and generated English mirrors.
- Files: `scripts/case-study.js`, `scripts/build-en-mirrors.mjs`, `content/cases/*.json`, `works/*.html`, `en/works/*.html`.
- Risk: Missing copy or stale EN pages after case edits.
- Priority: High.

**Keyboard accessibility:**
- What's not tested: Drawer trap, lightbox trap, Escape behavior, focus return, and disabled anchor prevention.
- Files: `scripts/nav.js`, `scripts/lightbox.js`, `index.html`, `works/*.html`.
- Risk: Accessibility regressions are easy to miss visually.
- Priority: High.

**Capture/reduced-motion:**
- What's not tested: Static visibility and no functional motion under `?capture=1` and `prefers-reduced-motion: reduce`.
- Files: `scripts/animations.js`, `scripts/case-study.js`, `scripts/loader_queue.js`, `styles/main.css`, `styles/case-study.css`.
- Risk: Screenshot/export workflows and accessibility preferences can break.
- Priority: Medium.

---

*Concerns audit: 2026-05-05*
*Update as issues are fixed or new risks are discovered.*
