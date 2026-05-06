# Roadmap: Julio Morcillo Portfolio Launch Closeout

## Overview

This roadmap closes the portfolio in five phases. It starts with a grounded launch audit, then fixes the highest-risk mobile experience, preserves desktop magic while smoothing motion, optimizes image loading without flattening quality, and only then evaluates or integrates the separate `/works/` project directory as the final exploratory path.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work.
- Decimal phases (2.1, 2.2): Urgent insertions if a blocker appears.

- [ ] **Phase 1: Launch Audit Baseline** - Establish the real bug/performance/UX picture before fixing.
- [ ] **Phase 2: Mobile-First Editorial Polish** - Make mobile feel custom-fit and high-impact across home and priority cases.
- [ ] **Phase 3: Butterlike Motion and Desktop Preservation** - Smooth interaction while preserving desktop magic.
- [ ] **Phase 4: Premium Image and Loading Pass** - Optimize assets and loading without sacrificing mockup quality.
- [ ] **Phase 5: Ship Readiness and Project Directory Decision** - Final git/deploy readiness, then `/works/` go/no-go or implementation.

## Phase Details

### Phase 1: Launch Audit Baseline
**Goal**: Produce a prioritized launch-closeout audit from the real current site state.
**Depends on**: Nothing (first phase)
**Requirements**: QA-01, QA-02
**Success Criteria** (what must be TRUE):
  1. Maintainer has screenshot evidence for mobile, desktop, `?capture=1`, and reduced-motion states.
  2. Maintainer has a prioritized issue list split into blocking, important, and polish.
  3. Maintainer knows which current uncommitted files are production candidates and which are local artifacts.
  4. Syntax checks pass or failures are captured as blocking issues.
**Plans**: 3 plans

Plans:
- [ ] 01-01: Run static server audit and capture representative screenshots.
- [ ] 01-02: Run source syntax, metadata, i18n, and git hygiene checks.
- [ ] 01-03: Produce prioritized launch issue list with recommended fix order.

### Phase 2: Mobile-First Editorial Polish
**Goal**: Make mobile feel designed for the breakpoint, not adapted from desktop.
**Depends on**: Phase 1
**Requirements**: MOB-01, MOB-02, MOB-03, MOB-04, MOB-05, CASE-01, CASE-02, CASE-03, CASE-04
**Success Criteria** (what must be TRUE):
  1. Home page at 390px has strong hierarchy, no overlap, and no awkward text/media scaling.
  2. Mobile drawer is touch- and keyboard-safe with visible focus and logical return focus.
  3. VI Summit, Alfa Comunicaciones, ConSentido, and AMXiTech feel premium and legible on mobile.
  4. Mobile improvements do not flatten editorial identity or make the site feel template-like.
  5. Priority mobile screenshots look deliberate enough to present as launch evidence.
**Plans**: 4 plans

Plans:
- [ ] 02-01: Fix mobile home hierarchy, spacing, nav, sections, and contact.
- [ ] 02-02: Fix mobile priority case pages and media framing.
- [ ] 02-03: Verify mobile drawer, lightbox, outro navigation, and keyboard focus.
- [ ] 02-04: Re-capture mobile evidence and close remaining mobile blockers.

### Phase 3: Butterlike Motion and Desktop Preservation
**Goal**: Smooth the interactive feel while keeping desktop impact intact.
**Depends on**: Phase 2
**Requirements**: DESK-01, DESK-02, DESK-03, MOT-01, MOT-02, MOT-03, MOT-04, MOT-05
**Success Criteria** (what must be TRUE):
  1. Scroll, reveals, hovers, loader, cursor, and progress interactions feel smooth on supported desktop.
  2. Mobile motion feels restrained, responsive, and never jittery.
  3. `?capture=1` shows every relevant element statically with no clipped or hidden content.
  4. `prefers-reduced-motion: reduce` keeps all content usable without functional motion.
  5. Desktop 1280-1440px keeps the current editorial rhythm and visual authority.
**Plans**: 3 plans

Plans:
- [ ] 03-01: Audit and tune GSAP timing, scroll triggers, loader, cursor, and hover polish.
- [ ] 03-02: Verify and fix capture/reduced-motion fallbacks.
- [ ] 03-03: Re-check desktop framing and ensure mobile fixes did not degrade desktop.

### Phase 4: Premium Image and Loading Pass
**Goal**: Keep mockups beautiful while reducing avoidable load and layout risk.
**Depends on**: Phase 3
**Requirements**: IMG-01, IMG-02, IMG-03, IMG-04, IMG-05
**Success Criteria** (what must be TRUE):
  1. Priority project mockups retain premium quality on mobile and desktop.
  2. Heavy assets are inventoried and either optimized, justified, or kept out of critical paths.
  3. LCP/above-fold images use correct loading, decoding, dimensions, and fetch priority.
  4. Image pipeline behavior and docs agree, or the discrepancy is explicitly fixed.
  5. External video/media embeds do not define the first impression or block core evaluation.
**Plans**: 3 plans

Plans:
- [ ] 04-01: Inventory image weights, dimensions, references, and critical-path media.
- [ ] 04-02: Optimize or replace selected assets while protecting perceived quality.
- [ ] 04-03: Align markup and image pipeline docs/scripts, then verify load behavior.

### Phase 5: Ship Readiness and Project Directory Decision
**Goal**: Prepare the GitHub-ready state, then decide and optionally integrate `/works/` as the final exploratory path.
**Depends on**: Phase 4
**Requirements**: QA-03, QA-04, CASE-05, DIR-01, DIR-02, DIR-03, DIR-04, DIR-05
**Success Criteria** (what must be TRUE):
  1. Maintainer has a clean, intentional list of files to stage for the GitHub commit.
  2. Final static-server verification passes on home, priority cases, English mirrors, capture mode, and reduced motion.
  3. `/works/` receives a clear go/no-go decision based on the prototype and hiring-effectiveness criteria.
  4. If implemented, `/works/` feels editorial, interactive, and useful without becoming a catalog.
  5. If implemented, the home page CTA to `/works/` is small, well-placed, and does not compete with the main narrative.
**Plans**: 4 plans

Plans:
- [ ] 05-01: Final launch checklist, git hygiene, and deploy-readiness verification.
- [ ] 05-02: Evaluate `/works/` prototype against exploration, editorial impact, and hiring-effectiveness criteria.
- [ ] 05-03: If approved, implement `/works/` and home CTA within the existing static/GSAP system.
- [ ] 05-04: Final cross-route QA and prepare the GitHub commit set.

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Launch Audit Baseline | 0/3 | Not started | - |
| 2. Mobile-First Editorial Polish | 0/4 | Not started | - |
| 3. Butterlike Motion and Desktop Preservation | 0/3 | Not started | - |
| 4. Premium Image and Loading Pass | 0/3 | Not started | - |
| 5. Ship Readiness and Project Directory Decision | 0/4 | Not started | - |

---
*Roadmap created: 2026-05-05*
