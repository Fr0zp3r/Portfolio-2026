# External Integrations

**Analysis Date:** 2026-05-05

## APIs & External Services

**Animation CDN:**
- cdnjs - Hosts GSAP and ScrollTrigger for runtime animation.
  - SDK/Client: Browser `<script>` tags in `index.html` and `works/*.html`.
  - Auth: None.
  - URLs: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js` and `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js`.

**Embedded Media:**
- YouTube no-cookie - Embedded video case media in `works/vi-summit.html` and `en/works/vi-summit.html`.
  - Integration method: `<iframe src="https://www.youtube-nocookie.com/...">`.
  - Auth: None.
- Imgur - Externally hosted video clips in `works/chint.html` and `en/works/chint.html`.
  - Integration method: `<video src="https://i.imgur.com/...mp4">`.
  - Auth: None.

**External Links:**
- Behance - Portfolio archive links in `index.html` and case footers.
  - Integration method: outbound anchors.
  - Auth: None.
- LinkedIn - Profile links in `index.html` and case footers.
  - Integration method: outbound anchors.
  - Auth: None.
- `juliomorcillo.com` - Canonical URLs, Open Graph URLs, Twitter image URLs, JSON-LD URLs, sitemap entries, and hreflang references across `index.html`, `works/*.html`, `en/works/*.html`, and `sitemap.xml`.
  - Integration method: static metadata and anchors.
  - Auth: None.

**Referenced Client Platforms:**
- WordPress / Elementor - Mentioned as project delivery context for AMXiTech and footer tool copy.
  - Integration method: content reference only; no runtime API client detected in this repo.
  - Files: `index.html`, `works/amxitech.html`, `en/works/amxitech.html`, `content/es.json`, `content/en.json`.

## Data Storage

**Databases:**
- Not detected.
  - Connection: Not applicable.
  - Client: Not applicable.
  - Migrations: Not applicable.

**File Storage:**
- Local repo filesystem only.
  - Images: `assets/images/`.
  - Original image pipeline input: `assets/images/_originals/`.
  - Fonts: `assets/fonts/`.
  - Videos: `assets/videos/` is present but production video files are ignored by `.gitignore`.
  - PDFs: `assets/pdfs/` is referenced in `AGENTS.md` as a planned/allowed location but not present in the current top-level listing.

**Caching:**
- Browser HTTP cache for static assets.
- In-memory dictionary cache in `scripts/i18n.js`.
- `localStorage` persists selected homepage language in `scripts/i18n.js`.
- No Redis, service worker, CDN config, or app-level cache layer detected.

## Authentication & Identity

**Auth Provider:**
- None.
  - Implementation: Static public portfolio.
  - Token storage: Not applicable.
  - Session management: Not applicable.

**OAuth Integrations:**
- None detected.

## Monitoring & Observability

**Error Tracking:**
- None detected. No Sentry, LogRocket, Datadog, or analytics SDK imports.

**Analytics:**
- None detected. No Google Analytics, Plausible, Fathom, Segment, or similar script tags found.

**Logs:**
- Browser console only.
  - `scripts/i18n.js` uses `console.error` when dictionaries fail to load.
  - Build scripts use `console.log` / `console.error` for local CLI output.

## CI/CD & Deployment

**Hosting:**
- GitHub Pages is the documented production target in `README.md`.
  - Deployment: Push to `main`, GitHub Pages source branch `main` and folder `/`.
  - Environment vars: None.

**CI Pipeline:**
- None detected.
  - No `.github/workflows/` directory found in the scanned project root.
  - No npm test, lint, or build scripts beyond `optimize:images`.

## Environment Configuration

**Development:**
- Required env vars: None.
- Secrets location: Not applicable; `.env` and `.env.*` are ignored defensively.
- Mock/stub services: Not applicable.
- Local server: Use `python -m http.server 8000` or `npx serve` so JSON fetches work reliably.

**Staging:**
- Not detected.

**Production:**
- Static files served from `juliomorcillo.com` / GitHub Pages.
- Secrets management: Not applicable.
- Failover/redundancy: Not detected.

## Webhooks & Callbacks

**Incoming:**
- None. No backend endpoints or webhook handlers detected.

**Outgoing:**
- None. Runtime outbound behavior is limited to static links, CDN script requests, media embeds, and JSON fetches from local files.

---

*Integration audit: 2026-05-05*
*Update when adding/removing third-party scripts, embeds, analytics, hosting, or external media.*
