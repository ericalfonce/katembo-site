# Katembo Safari — Ultra-Luxury Website Build

Build a world-class, immersive luxury safari website using vanilla HTML5, CSS3, and JavaScript with GSAP/ScrollTrigger for cinematic motion — delivering a premium "timeless, untethered luxury" experience.

## Approach: Static HTML + GSAP (No Framework)

Since the user's workspace is a single folder with a logo, and the spec mentions React/Next.js as optional components, I'll build this as a **high-performance static site** using:
- **HTML5** (semantic structure, WCAG 2.2 AA)
- **CSS3** (custom properties, grid/flexbox, `@media (prefers-reduced-motion)`)
- **JavaScript** with **GSAP 3 + ScrollTrigger** (CDN) for all motion/parallax
- **Generated images** for safari photography (hero, experiences, lodges)

This approach gives the fastest load time, zero build-step complexity, and the richest animation control — ideal for a luxury landing page.

> [!IMPORTANT]
> If you prefer a Next.js/React framework instead of a static HTML site, let me know and I'll adjust the plan. The static approach gives the best Core Web Vitals performance and the most direct GSAP integration.

## Proposed Changes

### Asset Generation

Generate high-quality safari images using AI for:
- **Hero banner** — Golden hour elephant silhouettes on the savanna
- **Experience cards** (3 images) — Serengeti migration, Ngorongoro crater, helicopter safari
- **Lodge cards** (3 images) — Luxury tented camp, private villa, wilderness suite
- **Storytelling section** — Aerial savanna landscape

The existing logo (`katemo safaris.jpeg`) will be used as-is in the navigation.

---

### File Structure

```
katembo site/
├── katemo safaris.jpeg          (existing logo)
├── index.html                   [NEW] — Main page with all 6 sections
├── styles.css                   [NEW] — Complete design system + responsive styles
├── script.js                    [NEW] — GSAP animations, ScrollTrigger, interactions
└── images/                      [NEW] — Generated safari photography
    ├── hero-safari.webp
    ├── exp-migration.webp
    ├── exp-crater.webp
    ├── exp-helicopter.webp
    ├── lodge-tented.webp
    ├── lodge-villa.webp
    ├── lodge-suite.webp
    └── story-aerial.webp
```

---

### [NEW] `styles.css` — Design System & All Styles

Complete CSS file implementing:
- **CSS Custom Properties** for the full brand palette (`--dark-chocolate`, `--sunset-gold`, `--warm-sand`)
- **Typography system** using Google Fonts (Cormorant Garamond + Plus Jakarta Sans)
- **Ambient float keyframes** (±6px over 8s for card weightlessness)
- **`prefers-reduced-motion: reduce`** media query to disable all heavy motion
- **Responsive breakpoints** (mobile-first: 375px → 768px → 1024px → 1440px)
- **Component styles**: sticky nav, hero overlay, floating card grid, split storytelling section, lodge carousel/tabs, editorial footer
- **WCAG 2.2 AA** contrast-compliant color combinations throughout

---

### [NEW] `index.html` — Semantic Structure

All 6 sections in a single-page layout:

1. **`<header>` — Sticky Navigation**
   - Logo (left), nav links (center), gold CTA button (right)
   - Transparent on scroll-top, frosted glass on scroll

2. **`<section id="hero">` — Cinematic Hero**
   - Full-viewport background image with gradient overlay
   - Serif headline "Escape the Ordinary Pull."
   - Dual CTAs (gold filled + outline)

3. **`<section id="experiences">` — Bespoke Expeditions**
   - Asymmetric floating card grid (3 cards)
   - Hover reveals golden micro-borders + elevation

4. **`<section id="difference">` — The Katembo Difference**
   - Split layout: dark chocolate bg, warm sand text
   - 4 brand pillars with elegant iconography

5. **`<section id="lodges">` — Luxury Lodges**
   - Interactive tab/card interface for 3 accommodations
   - Feature lists (plunge pools, butlers, stargazing)

6. **`<footer>` — Editorial Footer**
   - Deep dark chocolate background
   - Contact, newsletter subscription, social links

---

### [NEW] `script.js` — GSAP Animation Engine

- **GSAP 3 + ScrollTrigger** loaded via CDN
- **Hero parallax**: Background image moves at 0.3x scroll speed
- **Scroll-choreographed reveals**: Text elements glide in from below as user scrolls
- **Floating card animations**: Cards enter with staggered delays + subtle rotation
- **Nav state management**: Transparent → frosted glass on scroll
- **Lodge tab switching**: Smooth content transitions
- **Reduced motion detection**: `matchMedia('(prefers-reduced-motion: reduce)')` disables parallax + float
- **Mobile hamburger menu**: Slide-in navigation for mobile

---

## Verification Plan

### Manual Verification
- Open `index.html` directly in the browser to verify:
  - All 6 sections render correctly
  - Logo and generated images display properly
  - GSAP scroll animations fire correctly
  - Responsive layout works at mobile/tablet/desktop
  - Gold CTA buttons have proper hover effects
  - Floating card ambient animation is visible
  - Navigation becomes frosted on scroll
