# Almost Gods — Homepage Replica

An unofficial, non-commercial **front-end study replica** of the
[almostgods.com](https://almostgods.com) homepage, built to reproduce its layout,
type system, and interaction patterns as a web-development exercise.

> See [`NOTICE.md`](./NOTICE.md). Not affiliated with Almost Gods. The brand name,
> logo, imagery, and copy belong to their owner and are referenced from the live
> site's CDN — they are **not** redistributed in this repository.

## What's here

| File | Purpose |
| --- | --- |
| `index.html` | Semantic page structure — announcement bar, center-logo header + mega-menu, five hero banners, footer |
| `assets/style.css` | The full design system: Inter/Outfit type scale, black-on-white light scheme, dark footer, sharp corners, full-bleed banners, responsive layout |
| `assets/app.js` | Announcement rotator, mobile drawer, scroll reveals, sticky header |
| `assets/fonts/` | Inter + Outfit (SIL Open Font License) embedded locally |

## Reproduced from the original

- **Layout:** black announcement bar → sticky center-logo header (nav left, icons right) → five full-bleed hero sections → dark 4-column footer
- **Type:** Inter (uppercase, wide tracking) for headings/nav/buttons; Outfit for body
- **Sections:** End of Season Sale → SS26 New Arrivals → Men/Women split → Tether → Chapters, each with the real copy and destination links
- **Nav:** full Men / Women / Sale mega-menus + Explore, matching the live collection URLs
- **Interactions:** rotating announcements, hover mega-menus, hover image zoom, scroll-reveal, mobile burger drawer

## Run locally

```bash
# any static server works
python3 -m http.server 8000
# then open http://localhost:8000
```

Brand imagery loads from the live CDN, so an internet connection is needed to see
the hero photos; the layout, type, and interactions render regardless.

## Reuse

The HTML/CSS/JS here is original. Before reusing it, **replace the brand assets and
name** — do not deploy this as, or in a way that could be confused with, Almost Gods.
