# Codebase Structure

**Analysis Date:** 2026-05-05

## Directory Layout

```text
Portafolio 2026 Abril/
+-- index.html                    # Main portfolio page
+-- works/                        # Spanish case-study pages
+-- en/works/                     # English case-study mirror pages
+-- content/                      # Homepage dictionaries and case JSON data
+-- styles/                       # Reset, global/home styles, case-study styles
+-- scripts/                      # Browser behavior and build-time utilities
+-- assets/                       # Fonts, images, videos, and media assets
+-- docs/                         # Motion, copy, interaction, and audit docs
+-- .agents/skills/               # Project skill/design-system reference for Codex
+-- .claude/                      # Local Claude tooling and worktrees (ignored)
+-- .playwright-cli/              # Local Playwright tooling/artifacts (ignored)
+-- .playwright-mcp/              # Local Playwright MCP state/artifacts
+-- .qodo/                        # Local Qodo tooling (ignored)
+-- output/                       # Generated output artifacts (ignored)
+-- test-results/                 # Playwright/test artifacts (ignored)
+-- uploads/                      # Local scratch uploads (ignored)
+-- package.json                  # Build-time npm manifest
+-- README.md                     # Human setup/deploy/QA docs
+-- AGENTS.md                     # Project rules for coding agents
+-- robots.txt                    # Search crawler instructions
+-- sitemap.xml                   # Static site map
+-- .gitignore                    # Repo hygiene and ignored local/generated files
+-- .gitattributes                # Git attributes
```

## Directory Purposes

**`works/`:**
- Purpose: Spanish case-study pages, one HTML file per project.
- Contains: Static shells with `body[data-case]`, `data-case-field`, `data-case-chapters`, `data-lightbox`, and case-specific media markup.
- Key files: `works/consentido.html`, `works/amxitech.html`, `works/vi-summit.html`, `works/chint.html`.
- Subdirectories: None.

**`en/works/`:**
- Purpose: English mirror case pages.
- Contains: Localized static HTML generated from `works/*.html` and `content/cases/*.json`.
- Key files: `en/works/consentido.html`, `en/works/amxitech.html`, `en/works/vi-summit.html`.
- Subdirectories: None.

**`content/`:**
- Purpose: Data source for text and case-study content.
- Contains: `content/es.json`, `content/en.json`, and `content/cases/*.json`.
- Key files: `content/es.json` and `content/en.json` for homepage text; `content/cases/consentido.json` as a representative case schema.
- Subdirectories: `content/cases/` stores one JSON file per case slug.

**`styles/`:**
- Purpose: CSS source of truth for layout, tokens, components, and responsive/capture/reduced states.
- Contains: Plain CSS.
- Key files: `styles/reset.css`, `styles/main.css`, `styles/case-study.css`.
- Subdirectories: None.

**`scripts/`:**
- Purpose: Browser behavior and build-time utilities.
- Contains: IIFE browser scripts (`*.js`) plus Node ES module scripts (`*.mjs`).
- Key files: `scripts/nav.js`, `scripts/i18n.js`, `scripts/animations.js`, `scripts/case-study.js`, `scripts/lightbox.js`, `scripts/asset-gallery.js`, `scripts/loader_queue.js`, `scripts/optimize-images.mjs`, `scripts/build-en-mirrors.mjs`.
- Subdirectories: None.

**`assets/`:**
- Purpose: Static production media.
- Contains: Variable fonts, project images, root-level AVIF case assets, and placeholder media directories.
- Key files: `assets/fonts/Fraunces-VariableFont_SOFT,WONK,opsz,wght.ttf`, `assets/fonts/Archivo-VariableFont_wdth,wght.ttf`, hero derivatives in `assets/images/`.
- Subdirectories: `assets/fonts/`, `assets/images/`, `assets/videos/`.

**`assets/fonts/`:**
- Purpose: Local font files and design-system docs.
- Contains: Fraunces and Archivo variable TTF files, `assets/fonts/styleguide.md`, and `assets/fonts/type-specimens.md`.
- Key files: `assets/fonts/styleguide.md` and `assets/fonts/type-specimens.md`.

**`assets/images/`:**
- Purpose: Project mockups, hero images, gallery images, and optimized derivatives.
- Contains: JPG, PNG, WEBP, AVIF, and `.gitkeep`.
- Key patterns: `*-hero.jpg`, `*-hero.webp`, `*-hero@2x.jpg`, `*-hero@2x.webp`, and project-specific mockup PNG/JPG files.
- Subdirectories: `assets/images/_originals/` is the source input for the image optimization pipeline when present.

**`docs/`:**
- Purpose: Project documentation and governance.
- Contains: Motion system, copy rules, audits, and briefs.
- Key files: `docs/motion-system.md`, `docs/copy-rules.md`, `docs/interaction-audit.md`, `docs/audit-copy-2026.md`.

**`.agents/skills/`:**
- Purpose: Codex project skill/design-system memory.
- Contains: `julio-morcillo-design` skill docs, tokens, previews, and UI kits.
- Key files: `.agents/skills/julio-morcillo-design/SKILL.md`, `.agents/skills/julio-morcillo-design/README.md`.
- Use as reference only; UI kits are not production code.

## Key File Locations

**Entry Points:**
- `index.html`: Main portfolio route.
- `works/*.html`: Spanish case routes.
- `en/works/*.html`: English case routes.

**Configuration:**
- `package.json`: npm metadata and `optimize:images` command.
- `.gitignore`: Defines ignored local tooling, archives, backup HTMLs, env files, test artifacts, uploads, and heavy videos.
- `AGENTS.md`: Mandatory project rules for stack, tokens, components, motion, i18n, and workflow.
- `README.md`: Local serving, deploy, and QA instructions.

**Core Logic:**
- `scripts/nav.js`: Active nav and drawer accessibility behavior.
- `scripts/i18n.js`: Homepage language loading and text/attribute swap.
- `scripts/animations.js`: GSAP and reduced/capture motion orchestration.
- `scripts/case-study.js`: Case JSON hydration.
- `scripts/lightbox.js`: Case media viewer.
- `scripts/asset-gallery.js`: Responsive asset strip layout.
- `scripts/loader_queue.js`: Shuffle loader animation.

**Build Tooling:**
- `scripts/optimize-images.mjs`: Sharp-based asset optimization.
- `scripts/build-en-mirrors.mjs`: English case mirror generation.

**Content:**
- `content/es.json`: Spanish homepage dictionary.
- `content/en.json`: English homepage dictionary.
- `content/cases/*.json`: Case-study data and bilingual case copy.

**Design System:**
- `styles/main.css`: Global tokens and home components.
- `styles/case-study.css`: Case-study components.
- `assets/fonts/styleguide.md`: Visual system guidance.
- `docs/motion-system.md`: Motion contract.
- `docs/copy-rules.md`: Copy contract.

**Testing / QA:**
- No committed test source tree detected.
- `test-results/` exists locally but is ignored and should not be used as production source.

## Naming Conventions

**Files:**
- Lowercase kebab-case for case slugs: `works/alfa-comunicaciones.html`, `content/cases/los-pollos-giros.json`.
- Lowercase simple module names for browser scripts: `scripts/nav.js`, `scripts/i18n.js`, `scripts/case-study.js`.
- Node build scripts use `.mjs`: `scripts/optimize-images.mjs`, `scripts/build-en-mirrors.mjs`.
- CSS files are simple lowercase module names: `styles/main.css`, `styles/case-study.css`, `styles/reset.css`.
- Optimized hero image derivatives use `name.jpg`, `name.webp`, `name@2x.jpg`, `name@2x.webp`.
- Backup HTML files match `*backup*.html` and are ignored.

**Directories:**
- Plural names for collections: `works/`, `styles/`, `scripts/`, `assets/`, `docs/`.
- `en/works/` mirrors `works/`.
- `content/cases/` mirrors case slugs.

**Special Patterns:**
- BEM CSS classes: `.block__element--modifier`.
- Homepage i18n keys: dotted flat keys such as `nav.projects` and `work.consentido.title`.
- Case content schema: nested `i18n.es` and `i18n.en` objects in `content/cases/<slug>.json`.
- Editorial numbering in markup/copy: section tags, work numbers, and case chapters follow the conventions in `AGENTS.md`.

## Where to Add New Code

**New Homepage Section:**
- Markup: `index.html`.
- Styles: `styles/main.css`.
- Copy: `content/es.json` and `content/en.json`.
- Motion: `scripts/animations.js`, using `.reveal` and existing capture/reduced guards.
- Documentation: Update `AGENTS.md` or `docs/` only if the system rules change.

**New Case Study:**
- Case data: `content/cases/<slug>.json`.
- Spanish page shell: `works/<slug>.html`.
- English mirror: generate/update `en/works/<slug>.html` through `scripts/build-en-mirrors.mjs` or mirror the established structure.
- Styles: Prefer existing `styles/case-study.css` components.
- Images: Place originals in `assets/images/_originals/`, run `npm run optimize:images`, then reference `assets/images/` derivatives.

**New Browser Behavior:**
- Implementation: Add a small IIFE module in `scripts/` or extend the closest existing module.
- Markup hooks: Prefer declarative `data-*` attributes or existing BEM classes.
- Fallbacks: Respect `window.PORTFOLIO_CAPTURE_MODE` and `prefers-reduced-motion` when motion or dynamic visibility is involved.

**New CSS Component:**
- Home/global component: `styles/main.css`.
- Case-only component: `styles/case-study.css`.
- Naming: BEM only.
- Tokens: Derive color, spacing, typography, and transition values from `:root`.

**New Image Asset:**
- Original: `assets/images/_originals/`.
- Output: `assets/images/`.
- Markup: Use `<picture>` when optimized derivatives exist, with explicit `width`, `height`, `loading`, and `decoding`.

**New Documentation:**
- Project rules: `AGENTS.md`.
- Motion: `docs/motion-system.md`.
- Copy: `docs/copy-rules.md`.
- Visual system: `assets/fonts/styleguide.md`.

## Special Directories

**`.planning/codebase/`:**
- Purpose: GSD codebase intelligence documents.
- Generated: Yes, by `$gsd-map-codebase`.
- Committed: Intended to be committed as planning/docs artifacts.

**`.agents/skills/`:**
- Purpose: Project-local agent skills and design-system references.
- Generated: No, project support asset.
- Committed: Currently untracked in the working tree; use as reference when available.

**`.claude/`:**
- Purpose: Local Claude tooling, skills, worktrees, and settings.
- Generated: Tooling/local.
- Committed: No; ignored by `.gitignore`.

**`.playwright-cli/`, `.playwright-mcp/`, `output/`, `test-results/`:**
- Purpose: Browser/test automation tooling and artifacts.
- Generated: Yes.
- Committed: `.playwright-cli/`, `output/`, and `test-results/` are ignored; `.playwright-mcp/` exists locally and should be treated as tooling state.

**`uploads/`:**
- Purpose: Drag/drop or scratch asset staging.
- Generated: Local scratch.
- Committed: No; ignored by `.gitignore`.

**`assets/images/_originals/`:**
- Purpose: High-resolution source images for optimization.
- Generated: No, source input.
- Committed: Allowed except `_temp/`, which is ignored.

**`works/*backup*.html`:**
- Purpose: Local backup history.
- Generated: Manual/local.
- Committed: No; ignored and explicitly not a production source.

---

*Structure analysis: 2026-05-05*
*Update when directories, entry points, or placement rules change.*
