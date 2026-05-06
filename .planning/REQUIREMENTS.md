# Requirements: Julio Morcillo Portfolio Launch Closeout

**Defined:** 2026-05-05
**Core Value:** The portfolio must feel like a high-criterion, premium design piece on mobile first, while preserving the desktop impact and making Julio's judgment memorable.

## v1 Requirements

### Launch QA

- [ ] **QA-01**: Maintainer can run a repeatable launch audit that checks source syntax, responsive pages, capture mode, reduced motion, keyboard focus, and SEO basics.
- [ ] **QA-02**: Maintainer has a prioritized fix list split into blocking, important, and polish items before the final GitHub commit.
- [ ] **QA-03**: Maintainer can distinguish existing user work from launch-closeout changes and avoid committing local tooling, backups, archives, or scratch artifacts.
- [ ] **QA-04**: Maintainer can verify the final shipping state from a clean static server run.

### Mobile Experience

- [ ] **MOB-01**: Visitor can open `index.html` at mobile widths around 390px and feel the layout was designed for mobile first.
- [ ] **MOB-02**: Visitor can read hero, selected work, mini gallery, approach, experience, contact, and footer on mobile without cramped text, overlaps, awkward scaling, or broken hierarchy.
- [ ] **MOB-03**: Visitor can navigate the mobile drawer with touch and keyboard, including Escape, Tab loop, focus return, and visible focus.
- [ ] **MOB-04**: Visitor can open priority case pages on mobile and inspect hero, media, chapter index, production blocks, proof band, credits, outro nav, and lightbox without layout breakage.
- [ ] **MOB-05**: Mobile polish preserves the same editorial intensity and brand confidence that the desktop index already suggests.

### Desktop Preservation

- [ ] **DESK-01**: Visitor can open the site at desktop widths around 1280-1440px and retain the current editorial impact of the index.
- [ ] **DESK-02**: Desktop hover, cursor, media polish, and section rhythm remain premium after mobile fixes.
- [ ] **DESK-03**: Priority case pages still frame large project mockups with enough breathing room and visual authority on desktop.

### Motion Smoothness

- [ ] **MOT-01**: Visitor experiences smooth scroll-linked reveals with no obvious jank, flicker, delayed hydration flashes, or layout jumps.
- [ ] **MOT-02**: GSAP hero, case, hover, loader, cursor, and progress interactions feel fluid on supported devices.
- [ ] **MOT-03**: `?capture=1` shows all content in a deterministic static state with no hidden clips, timelines, parallax, cursor, or progress artifacts.
- [ ] **MOT-04**: `prefers-reduced-motion: reduce` removes functional motion while keeping all content visible and usable.
- [ ] **MOT-05**: Motion changes do not animate long reading blocks or alter layout structure.

### Image Quality and Loading

- [ ] **IMG-01**: Priority mockups for VI Summit, ConSentido, AMXiTech, and Alfa Comunicaciones render at premium quality on mobile and desktop.
- [ ] **IMG-02**: LCP and above-the-fold imagery use appropriate dimensions, eager/lazy loading, decoding, and fetch priority.
- [ ] **IMG-03**: Heavy images are reviewed and optimized where meaningful without degrading the premium perception of the work.
- [ ] **IMG-04**: New optimized derivatives and markup align with the documented image pipeline or the pipeline docs are corrected.
- [ ] **IMG-05**: External video/media embeds have acceptable fallbacks or do not block the core portfolio impression.

### Priority Case Narrative

- [ ] **CASE-01**: VI Summit communicates scale, range, efficiency, and event-system execution clearly on mobile and desktop.
- [ ] **CASE-02**: Alfa Comunicaciones communicates integrated branding capability from logo to templates, cards, and voice.
- [ ] **CASE-03**: ConSentido communicates brand rollout and system consistency without overstating authorship.
- [ ] **CASE-04**: AMXiTech communicates web/UI ability and honestly frames the rebrand translation and non-selected earlier design direction.
- [ ] **CASE-05**: Case-to-case navigation supports exploration without forcing the footer as the only movement path.

### Project Directory

- [ ] **DIR-01**: Maintainer can make a clear go/no-go decision for a separate `/works/` project directory after launch-critical QA.
- [ ] **DIR-02**: If implemented, visitor can use `/works/` as an exploratory path to compare projects without reducing the home page's linear impact.
- [ ] **DIR-03**: If implemented, `/works/` feels editorial and interactive, not like a generic catalog grid.
- [ ] **DIR-04**: If implemented, the home page includes a small CTA after selected projects that opens the directory without distracting from the main narrative.
- [ ] **DIR-05**: If implemented, `/works/` follows the same static vanilla/GSAP stack, tokens, BEM, i18n, capture mode, and reduced-motion rules.

## v2 Requirements

### Automation

- **AUTO-01**: Maintainer can run an automated visual regression suite across representative mobile/desktop/capture/reduced states.
- **AUTO-02**: Maintainer can run schema validation for homepage i18n keys and case-study JSON paths.

### Content Expansion

- **CONT-01**: Maintainer can add future case studies with less manual duplication between `works/` and `en/works/`.
- **CONT-02**: Maintainer can generate project directory data from existing case JSON instead of duplicating project metadata.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Framework migration | Violates the immutable static vanilla stack. |
| Runtime build system | GitHub Pages/static serving and performance goals depend on no runtime build step. |
| Pure Lighthouse optimization | Image quality and hiring impression are more important than chasing abstract numeric perfection. |
| Generic project catalog | Would reduce editorial impact and work against the desired memory of criterion. |
| Directory before audit | User explicitly wants project list last and is prototyping it in another chat. |
| Rewriting all cases from scratch | The work is launch closeout and polish, not a full content rebuild. |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| QA-01 | Phase 1 | Pending |
| QA-02 | Phase 1 | Pending |
| QA-03 | Phase 5 | Pending |
| QA-04 | Phase 5 | Pending |
| MOB-01 | Phase 2 | Pending |
| MOB-02 | Phase 2 | Pending |
| MOB-03 | Phase 2 | Pending |
| MOB-04 | Phase 2 | Pending |
| MOB-05 | Phase 2 | Pending |
| DESK-01 | Phase 3 | Pending |
| DESK-02 | Phase 3 | Pending |
| DESK-03 | Phase 3 | Pending |
| MOT-01 | Phase 3 | Pending |
| MOT-02 | Phase 3 | Pending |
| MOT-03 | Phase 3 | Pending |
| MOT-04 | Phase 3 | Pending |
| MOT-05 | Phase 3 | Pending |
| IMG-01 | Phase 4 | Pending |
| IMG-02 | Phase 4 | Pending |
| IMG-03 | Phase 4 | Pending |
| IMG-04 | Phase 4 | Pending |
| IMG-05 | Phase 4 | Pending |
| CASE-01 | Phase 2 | Pending |
| CASE-02 | Phase 2 | Pending |
| CASE-03 | Phase 2 | Pending |
| CASE-04 | Phase 2 | Pending |
| CASE-05 | Phase 5 | Pending |
| DIR-01 | Phase 5 | Pending |
| DIR-02 | Phase 5 | Pending |
| DIR-03 | Phase 5 | Pending |
| DIR-04 | Phase 5 | Pending |
| DIR-05 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 32 total
- Mapped to phases: 32
- Unmapped: 0

---
*Requirements defined: 2026-05-05*
*Last updated: 2026-05-05 after initialization*
