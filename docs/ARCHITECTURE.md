# Architecture

## Context
A personal portfolio that must feel cinematic, load as static files, and need no server.

## Shape
Static site: Vite bundles `index.html` + `src/*` into `dist/`, served from a CDN. Third-party calls: FormSubmit (contact form), Google Fonts.

```
 visitor ─► CDN (dist/) ─► browser
                              │  scroll (Lenis) + pointer feed every layer
   z-order, back to front:    ▼
   1 CSS background photo (parallax)   4 #h3  WebGL: warp streaks + 26k-particle galaxy (hero.js, lazy)
   2 shade (readability)               5 #fx  2D canvas: meteors, dust, constellations, shockwave
   3 #gl  WebGL: dust + rocks          6 DOM: glass cards, modals (resume, arenas list)
 contact form ─► FormSubmit ─► Gmail   (fallback: mailto:)
```

## Modules
| File | Responsibility |
|---|---|
| `index.html` | All content, semantic structure, SEO tags |
| `src/style.css` | Design tokens, glass UI, animations, responsive rules |
| `src/main.js` | Reveals, tilt, form, modals, 2D FX, #gl scene, mouse/scroll reactions |
| `src/hero.js` | Hero shaders (lazy-loaded chunk) |
| `tools/` | Resume generator, post-build smoke test |

## Runtime safeguards
Reduced-motion users get no smooth scroll, canvases or parallax. Touch/low-core devices run "LITE" mode (fewer particles, no chip physics, lower pixel ratio). Every loop pauses when the tab is hidden; per-frame work only touches on-screen elements.

## Decisions
**ADR-1 Vanilla JS + Vite, not React/Next.** One page, no routing or shared state. *Easier:* tiny runtime, full control of animation. *Harder:* manual DOM; would need refactor if the site grows into many pages.
**ADR-2 Three.js pinned at 0.128.** Matches the shaders/materials already written. *Cost:* older API, ~550 KB bundle (the library is not tree-shakeable in this version). *Revisit:* upgrade to a current Three.js and trim imports.
**ADR-3 Static hosting + FormSubmit.** Zero servers to run or patch. *Cost:* depends on a third party; first message needs a one-time activation. *Fallback:* mailto.
**ADR-4 Layered effects with a performance budget.** Visual richness comes from stacked canvases; LITE mode and visibility pausing keep it usable on weaker devices. *Known limit:* 5 independent animation loops remain (Lenis, #gl, #h3, #fx, parallax) — merging them into one scheduler is the next optimisation.
