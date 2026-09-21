# Katembo Safari — Implementation Plan

Production-ready, multi-page bespoke safari site. **Static vanilla HTML/CSS/JS** — no framework, no build step, no GSAP CDN. Every page, component and interaction is hand-built, data-driven from a single content file, and verifiable.

> Decision note: the earlier draft planned a GSAP single-page landing site. Mid-build we moved to a **static multi-page site with zero runtime dependencies** — faster, more honest, easier to maintain, and it turns Vercel rewrites into elegant `/journeys/serengeti-migration` style URLs.

---

## 1. Vision & Positioning

- **Who**: discerning private travellers planning a first or fifth East African safari.
- **Promise**: "Timeless, untethered luxury." Tailored journeys, private guides, conservation that pays.
- **Tone**: editorial, restrained, confident. No stock-salesmanship, no stats we cannot prove.

## 2. Architecture

```
katembo site/
├── katemo safaris.jpeg        existing logo
├── index.html                 homepage
├── about.html                 story + pillars + fact sheet
├── plan.html                  10-step enquiry wizard
├── contact.html               contact form + direct channel card
├── journal.html               field notes (3 full essays)
├── privacy.html / terms.html / responsible-tourism.html
├── 404.html                   custom not-found
├── styles.css                 full design system (no frameworks)
├── script.js                  all behaviour (data-driven renderers + wizard)
├── data.js                    single source of truth for all content
├── vercel.json                rewrites (/x/:slug → detail.html?slug=:slug) + security headers
├── sitemap.xml                generated (43 URLs)
├── robots.txt
├── images/                    hero + 5 jpgs (queued for solid recompression)
└── /journeys, /destinations, /experiences, /stays
    └── index.html + detail.html   (listing + detail template per collection)
```

**Principles enforced:**
- Root-absolute asset paths (`/styles.css`, `/data.js`, `/images/...`) so pages work at any depth and on Vercel.
- One content file (`data.js`) drives every card, aside and trail.
- Detail pages are a single template per collection — `?slug=` drives title, hero, aside, gallery, related.
- No `href="#"`, no fake success states, no unverified stats on the public site.

## 3. Design System (`styles.css`)

- Palette: `--ink #241a12`, `--sand`/`--ivory` surfaces, `--gold-ink`, `--forest`, dark-on-amethyst sections.
- Type: Cormorant Garamond (display, via Google Fonts) + Plus Jakarta Sans (body). `data-split` for lazy-loaded display headlines.
- Section rhythm: `page-hero` (dark) + alternating `iVory`/`section--ink`/`section--forest` bands; `sectionHead` eyebrow + serif heading pattern.
- Cards: layered media, `card__meta` like "7 nights · Private guide". Gold hairline hover, `data-badge` ribbons on featured cards.
- `[hidden] { display:none !important }` added so filter logic can hide flex cards.
- `@media (prefers-reduced-motion: reduce)` disables all reveals/floats. WCAG AA contrast throughout.

## 4. Content (`data.js`)

- 8 journeys, 10 destinations, 10 experiences, 3 stays, 3 journal essays, 5 testimonials-upgrade slots, 5 gallery images.
- `siteConfig` holds baseUrl + socials (empty URL → JS hides the link), verified-flags on stats.
- **Honesty rules**: testimonial rail shows its "on the way" state; unverified marketing stats stay flagged `verified:false` and are not rendered on the homepage.

## 5. Behaviour (`script.js`)

- Shared: header scroll/toggle, IntersectionObserver reveals, data-split headlines, newsletter (**mailto** — real client email, honest note), year, footer socials, footer checkers.
- Listings: `renderCardsInto` (with `data-limit`, `data-filterable`, category pills for stays).
- Details: `renderDetail` per collection — breadcrumb, hero, aside, gallery, related — with a **not-found block** when `?slug` matches nothing.
- Wizard: 9 questions + a 10th **review panel** ("Review your safari"), validation-tight, back/next/progress ("Step X of 10"), success = `mailto:` handoff.

## 6. Build Status (as of the latest pass)

| Step | Status |
| --- | --- |
| data.js content layer + asset map | DONE |
| Verified old markup removed; index.html replaced | DONE |
| styles.css design system | DONE |
| script.js (all renderers + wizard) | DONE |
| 4 detail templates | DONE |
| 4 listing pages (+ stay filters) | DONE |
| Homepage, plan, contact, about | DONE |
| journal / privacy / terms / responsible-tourism / 404 | DONE |
| vercel.json + sitemap.xml (43 URLs) + robots.txt | DONE |
| `node --check data.js script.js` + jsdom suite (36/36) | DONE |
| image optimisation (sharp recompress 6 jpgs) | **NEXT** |
| implementation_plan.md rewrite | this document |
| final audit (dead links, href="", console.log, TODO) | **NEXT** |
| git commit + push (branch `main`) | **NEXT** |

## 7. Remaining Steps

1. **Image optimisation** — recompress the 6 JPGS in `images/` via sharp (npm prefix under `C:\Users\HP\AppData\Local\Temp\opencode\`), keeping filenames so existing references stay valid.
2. **Final audit** — grep dead links (incl. the suspected Nyerere "Boat Safari & Walking Safari" slug mismatch), `href="#"`, `console.log`, TODO/FIXME; re-run `node --check` + the jsdom suite; confirm all internal nav targets resolve.
3. **Ship** — commit, push to `github.com/ericalfonce/katembo-site` (`main`), confirm the Vercel rewrites serve `/journeys/great-migration` etc.

## 8. Backend Integration (post-static handoff)

This build is front-end complete by design. The wizard, contact form and newsletter are honest `mailto:` flows — ready to be swapped for real endpoints without touching markup:

- **Wizard / contact** → exchange the `mailto:` composition for POST to `/api/enquiry` (Flask: Pydantic validation, rate limiting 5/15min, Google OAuth behind admin inbox, PesaPal only once payment is needed).
- **Newsletter** → POST to `/api/newsletter` or a provider.MIGRATE the existing `newsletterEmail` + `newsletterNote` IDs unchanged.
- Swap `data.js` → `gerda` API later; the renderers only read `.slug`, `.image`, `.excerpt`, `.details`, `.sideLabel`.
- Follow the IklwaLabs security rules (env-only keys, httpOnly sessions, PDPA 2022) when wiring the Flask layer.

## 9. Owner Verification List

- Confirm `siteConfig` **phone** (+255 700 000 000), **email** (journeys@katembosafari.com), **baseUrl** (katembo-site.vercel.app).
- Confirm the 5 "sleeper" testimonials and the flagged stats before enabling them.
- Review the two FAQ facts on about.html (area = **"≈32,000 km² across Serengeti & Ngorongoro"**, foundation year = 2019) — both flagged as unverified.
- Confirm camp imagery matches reality (images are tasteful safari representations).
- After deploy: eyeball `/journeys/great-migration` and one unknown URL (404 page) on the live site.