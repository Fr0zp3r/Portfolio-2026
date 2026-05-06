# Julio Morcillo Portfolio Launch Closeout

## What This Is

This is the final launch-readiness project for Julio Morcillo's static portfolio. The site already exists and the work now is to make it publishable with confidence: mobile-first polish, butter-smooth interaction, premium image quality, and a clean path to commit and publish through GitHub.

The portfolio should feel editorial, precise, and high-criterion on both desktop and mobile. A future `/works/` project directory is part of the strategy, but it must come last and only help exploration without turning the portfolio into a generic catalog.

## Core Value

The portfolio must feel like a high-criterion, premium design piece on mobile first, while preserving the desktop impact and making Julio's judgment memorable.

## Requirements

### Validated

- [x] Static vanilla HTML/CSS/JS site exists with no runtime framework - existing
- [x] Spanish and English content system exists through `content/es.json`, `content/en.json`, and `content/cases/*.json` - existing
- [x] Case-study pages exist for the active portfolio set in `works/*.html` and `en/works/*.html` - existing
- [x] GSAP/ScrollTrigger motion system exists with capture and reduced-motion fallbacks - existing
- [x] Current codebase map exists in `.planning/codebase/` - existing

### Active

- [ ] Mobile experience feels intentionally designed for the breakpoint, not merely responsive.
- [ ] Desktop experience keeps its editorial magic while mobile polish happens.
- [ ] Core pages and priority cases are visually correct on mobile and desktop.
- [ ] Motion feels butterlike: smooth scroll, elegant GSAP, stable hovers, no jank.
- [ ] Images remain premium quality even if that allows more weight than a purely numeric optimization pass.
- [ ] Image loading is optimized enough for launch without sacrificing mockup presence.
- [ ] Launch QA covers syntax, mobile/desktop screenshots, capture mode, reduced motion, keyboard focus, SEO basics, and git hygiene.
- [ ] A clear yes/no/product-direction decision exists for a separate `/works/` project list page.
- [ ] If `/works/` is implemented, it creates an exploratory path without lowering the editorial impact of the home page.

### Out of Scope

- Migrating to React, Vue, Svelte, Astro, Next, Tailwind, Framer Motion, anime.js, or any runtime build system - violates the project stack.
- Chasing Lighthouse numbers at the cost of image quality or premium mockup presence - not aligned with the portfolio's hiring value.
- Implementing the project list before mobile, motion, and image QA - the directory is last by decision.
- Turning the project list into a generic grid catalog - it must preserve the editorial voice.
- Rewriting the whole portfolio structure - the home page already works as the linear quick-read path.

## Context

The site is close to launch but the working tree still contains many uncommitted changes and new image assets. The user wants to publish this week if it can be made fine enough, but there is no hard deadline that justifies shipping a weak mobile experience.

The most important proof projects are `vi-summit`, `consentido`, and `amxitech`. VI Summit communicates scale, efficiency, and the ability to land a full event system. ConSentido communicates brand rollout and applied system consistency. AMXiTech communicates web/UI work and the ability to translate a rebrand into a live web experience even when an earlier design direction was not selected.

If a visitor only sees two projects, the desired pair is VI Summit and Alfa Comunicaciones. VI Summit shows scope and production range; Alfa Comunicaciones shows integrated branding from logo through templates, business cards, and voice.

The home page already provides a linear path for fast visits. A separate `/works/` directory could unlock a second exploratory path for clients or employers who want to compare projects, but that page must be decided after the launch-critical audit and after the external prototype work is available.

## Constraints

- **Tech stack**: Vanilla HTML/CSS/JS plus GSAP via CDN only - fixed by `AGENTS.md`.
- **Runtime**: Static hosting from disk or GitHub Pages - no backend, bundler, or framework.
- **Brand system**: Bone/ink/rust palette, Fraunces/Archivo, BEM, and `<em>` as the only editorial accent - fixed by `AGENTS.md` and `assets/fonts/styleguide.md`.
- **Motion**: Every animation must respect `?capture=1` and `prefers-reduced-motion: reduce` - fixed by `docs/motion-system.md`.
- **Quality bar**: Mobile must feel mobile-first and custom-fit to the breakpoint - not just unbroken.
- **Image tradeoff**: Preserve premium mockup quality even if assets are heavier than an aggressively compressed site.
- **Priority order**: Mobile QA first, then motion smoothness, then image/loading optimization, then project directory.
- **Git safety**: Do not include local tooling, backups, archives, or scratch artifacts in the final shipping commit.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Treat this as a launch closeout, not a redesign | The portfolio already exists; the value is in polish, QA, and shipping confidence | Pending |
| Prioritize mobile-first polish before desktop refinements | Desktop already feels closer; mobile must feel intentionally designed and equally impactful | Pending |
| Preserve image quality over strict byte minimization | Premium mockups are central to the portfolio's perceived value | Pending |
| Keep the separate project list page last | It depends on a prototype and should not distract from launch-critical quality work | Pending |
| Use `/works/` only if it improves exploration without becoming catalog-like | The home page already serves fast linear visits; the directory must add a second path | Pending |
| Keep all implementation inside the existing vanilla/GSAP stack | Stack is a hard project constraint | Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition**:
1. Requirements invalidated? Move to Out of Scope with reason.
2. Requirements validated? Move to Validated with phase reference.
3. New requirements emerged? Add to Active.
4. Decisions to log? Add to Key Decisions.
5. "What This Is" still accurate? Update if drifted.

**After each milestone**:
1. Full review of all sections.
2. Core Value check - still the right priority?
3. Audit Out of Scope - reasons still valid?
4. Update Context with current state.

---
*Last updated: 2026-05-05 after initialization*
