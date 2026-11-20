# 001 — Ember & Oak

Neighbourhood coffee shop concept. Existing permanent folder mapping: `001` → `ember-oak-site/`.

## Current status — 2026-11-20

Existing single-page landing website; motion revision approved for GitHub delivery. This is a Home/landing-page update, not a Full Site or Full House expansion. The user approved the 2026-11-20 changes and requested a GitHub push. Live Vercel deployment verification is separate. Earlier GitHub/Vercel delivery exists in the project history; no live deployment was changed during this revision.

## Preview and setup

No dependencies or build step. From the Quick Sites root:

```powershell
python -m http.server 4173 --bind 127.0.0.1 --directory ember-oak-site
```

Preview: http://127.0.0.1:4173/ . Stop with Ctrl+C. Static hosting uses this directory as its document root. Publication requires a separate user request.

## Source and assets

- `index.html`: semantic page, image slots, decorative steam/ring SVGs and arrival hooks.
- `styles.css`: existing approved warm café design and responsive layout.
- `script.js`: mobile navigation, sample menu expansion and pending-address message.
- `motion.css` / `motion.js`: the independent daily-ritual motion layer.
- `images/`: existing web JPEGs, used unchanged. Photography is illustrative and AI generated; original generated source files were kept outside this legacy folder during earlier work.
- `../ember-oak-showcase.png`: earlier generated portfolio design presentation, not an exact website screenshot. Preserved unchanged.

No credentials, external motion libraries, package installation or new raster imagery are involved.

## Motion direction — the daily ritual

Adapted after inspecting the current 031 Copperline motion, navigation, project scripts, layout and Home/component patterns. Ember & Oak has its own pacing and motifs:

- Three steam strokes unfurl once beside the hero copy; the coffee photo settles into warm light as the two heading lines arrive.
- A crema-coloured ring around the header cup fills with reading progress. The sticky header keeps navigation available.
- Text, reviews and menu cards arrive in soft staggered groups. Photos reveal inside fixed slots; heading rules draw without moving the page layout.
- The hero has restrained desktop-only scroll drift. Menu cards respond with a slight pointer tilt and photo push-in; touch devices retain a static interaction target.
- A warm line and soft highlights progress through the existing sourcing/baking/brewing benefits.
- Buttons receive press and light-sweep feedback; menu expansion, mobile navigation and FAQ responses remain immediate.

Reveals are progressive: the page is visible without motion.js; only below-viewport elements are staged after observer setup. Focus exposes staged ancestors immediately, anchors expose destinations, fast scroll exposes passed content, and caught update failures restore the static design. OS reduced-motion preferences bypass the effects. No infinite animation or scroll hijacking; scroll calculations are frame-batched, fine-pointer effects are gated, and background work is suspended.

## Verification — 2026-11-20

- JS syntax and static HTML checks: 15 image slots with alt text and dimensions; all 19 local resource references and 18 section anchors resolve; IDs are unique.
- Browser review at 1440px and 1920px desktop and 390px mobile; no horizontal overflow observed. The three-photo row remains contained and the care heading sits below it. Story photo wrapper has no unintended padding.
- Menu expansion, mobile menu selection, Enter/Escape navigation, pending-address feedback and FAQ expansion checked.
- Fast anchor travel leaves no passed content hidden.
- Temporary QA documents exercised simulated reduced-motion startup (no enabled effects, no pending content) and a script-free copy (visible content and mobile navigation). This is not an OS settings change. Temporary QA documents removed after verification.
- Exact motion timing remains subject to user review. The wider five-page build and full release-readiness audit are outside this revision.

## Pending business integrations

Menu pricing/availability, address, opening hours, sourcing claims, business history and reviews remain placeholders. Directions show a pending message. No ordering, payment, booking or message-delivery integrations are present. Do not treat the concept as a verified operating café.

## Review refinement — 2026-11-20

001: user approved the café motion direction and requested removal of the decorative final-CTA ring and floating Pause/Resume button. Both UI elements, their CSS and associated runtime logic were removed. OS reduced-motion support and all other motion remain. The user subsequently approved this refinement and authorised GitHub delivery on 2026-11-20.
