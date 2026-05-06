# Testing Patterns

**Analysis Date:** 2026-05-05

## Test Framework

**Runner:**
- No automated test runner detected.
- No Jest, Vitest, Mocha, Playwright config, Cypress config, or package test script detected in the production repo root.

**Assertion Library:**
- Not applicable.

**Run Commands:**
```bash
node --check scripts/nav.js             # Syntax check nav behavior
node --check scripts/i18n.js            # Syntax check homepage i18n
node --check scripts/animations.js      # Syntax check GSAP/motion orchestration
node --check scripts/case-study.js      # Syntax check case hydration
node --check scripts/lightbox.js        # Syntax check lightbox
node scripts/optimize-images.mjs        # Manually verify image build script when changing asset pipeline
node scripts/build-en-mirrors.mjs       # Manually verify English mirror generation when changing case mirror logic
```

## Test File Organization

**Location:**
- No committed test source files detected.
- `test-results/` exists locally but is ignored by `.gitignore` and should be treated as generated artifact storage.
- `.playwright-cli/`, `.playwright-mcp/`, and `output/` are local tooling/artifact directories, not production test source.

**Naming:**
- No `*.test.*` or `*.spec.*` files detected in the scanned production source tree.

**Structure:**
```text
Portafolio 2026 Abril/
+-- scripts/*.js                 # Syntax-checked manually with node --check
+-- scripts/*.mjs                # Build-time scripts; run manually when changed
+-- test-results/                # Ignored local artifacts, not source
+-- .playwright-cli/             # Ignored local tooling/artifacts
+-- .playwright-mcp/             # Local browser tooling state
```

## Test Structure

**Suite Organization:**
```javascript
// No in-repo automated test suite currently exists.
// New tests should be introduced intentionally and kept compatible with the static/no-runtime-build contract.
```

**Patterns:**
- Current verification is a combination of JS syntax checks and manual browser QA.
- Manual QA is documented in `README.md` and `AGENTS.md`.
- Visual/motion changes require viewport and state verification rather than only syntax checks.

## Mocking

**Framework:**
- None detected.

**Patterns:**
```javascript
// No mocking pattern exists yet.
// If tests are added, mock browser boundaries such as fetch, localStorage,
// IntersectionObserver, ResizeObserver, matchMedia, and GSAP/ScrollTrigger.
```

**What to Mock:**
- Local JSON `fetch()` responses for `scripts/i18n.js` and `scripts/case-study.js`.
- Browser storage for language persistence in `scripts/i18n.js`.
- DOM observers and `matchMedia` for reduced-motion/capture paths.
- GSAP and ScrollTrigger when unit-testing `scripts/animations.js` without a browser.
- File system and `sharp` calls if testing `scripts/optimize-images.mjs`.

**What NOT to Mock:**
- Static HTML/CSS integration when doing visual QA; use a real browser.
- The actual content schema in `content/*.json` and `content/cases/*.json` when validating page hydration.

## Fixtures and Factories

**Test Data:**
```javascript
// Recommended future fixture shape for i18n tests:
const esDictionary = { 'nav.projects': 'Proyectos' };
const enDictionary = { 'nav.projects': 'Projects' };

// Recommended future fixture shape for case tests:
const caseData = {
  slug: 'example',
  i18n: {
    es: { hero: { title: 'Example' }, chapters: [] },
    en: { hero: { title: 'Example' }, chapters: [] }
  }
};
```

**Location:**
- No fixture directory exists.
- If adding tests, use a small `tests/fixtures/` directory or inline fixtures near tests.

## Coverage

**Requirements:**
- No enforced coverage target.
- No coverage tooling detected.

**Configuration:**
- Not applicable.

**View Coverage:**
```bash
# No coverage command exists.
```

## Test Types

**Unit Tests:**
- Not currently used.
- Highest-value future targets: `scripts/i18n.js` sanitization/fallbacks, `scripts/case-study.js` field resolution, `scripts/asset-gallery.js` ratio/layout helpers, and `scripts/build-en-mirrors.mjs` rewrite helpers.

**Integration Tests:**
- Not currently used.
- Highest-value future targets: loading `index.html` through a static server and verifying ES/EN swaps; loading `works/<slug>.html` and verifying case JSON hydration.

**E2E Tests:**
- Not currently committed as source.
- Manual E2E/visual QA expectations:
  - Mobile width around 390px.
  - Desktop 1280-1440px.
  - `?capture=1` state.
  - `prefers-reduced-motion: reduce`.
  - Keyboard tab order, focus-visible state, drawer focus trap, lightbox focus trap.

## Common Patterns

**Static Server QA:**
```bash
python -m http.server 8000
# Open http://localhost:8000
```

**Homepage Manual QA:**
```text
1. Load `index.html` through a static server.
2. Verify ES default and EN language toggle.
3. Verify `content/es.json` and `content/en.json` changes are visible.
4. Verify drawer opens/closes, Escape works, Tab is trapped while open, and focus returns.
5. Verify GSAP-enhanced state and no-GSAP/static fallback where practical.
```

**Case Page Manual QA:**
```text
1. Load a representative Spanish case such as `works/consentido.html`.
2. Load the matching English mirror such as `en/works/consentido.html`.
3. Verify `content/cases/consentido.json` hydrates hero, chapters, credits, and prev/next cards.
4. Verify media lightbox, arrow keys, Escape, focus trap, zoom/pan, and touch swipe.
5. Verify `asset-gallery.js` layout on wide and narrow viewports where `.assetGrid--strip` exists.
```

**Error Testing:**
```text
No automated pattern exists. Manual checks should include missing/failed JSON fetch behavior and no-GSAP fallback.
```

**Snapshot Testing:**
- Not used.
- If visual regression is introduced later, run it through real browser screenshots for `index.html`, representative `works/*.html`, `en/works/*.html`, `?capture=1`, and reduced-motion states.

---

*Testing analysis: 2026-05-05*
*Update when an automated test runner, CI workflow, or visual regression setup is added.*
