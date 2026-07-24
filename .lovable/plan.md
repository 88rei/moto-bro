# SportJKT — Motorcycle Crew Website

Building a mobile-first, dark aesthetic site using the **Nocturnal Telemetry** direction (Anton display / JetBrains Mono / red `#ff1e1e` accent on `#080808`, scanline overlays, clipped-corner panels, ticker marquee, bottom nav).

## Routes (TanStack Start, file-based)

```
src/routes/
  __root.tsx        → shell: fonts (<link>), sticky ticker header, bottom nav, <Outlet/>
  index.tsx         → / — hero + section teasers
  roster.tsx        → /roster — grid of rider cards
  roster.$handle.tsx → /roster/:handle — full rider profile
  rides.tsx         → /rides — upcoming + past timeline
  vault.tsx         → /vault — masonry gallery + lightbox
  reels.tsx         → /reels — vertical short-video feed
```

Every route gets its own `head()` with unique title, description, og:title, og:description.

## Design tokens (src/styles.css)

Add on top of existing shadcn tokens (kept for component compatibility):

- `--background: #080808`, `--foreground: #f2f2f2`, `--primary: #ff1e1e`, `--border: rgba(255,255,255,0.1)`
- Fonts: Anton (display), Inter (body), JetBrains Mono (mono) loaded via `<link>` in `__root.tsx` head
- `@theme` custom vars: `--font-display`, `--font-sans`, `--font-mono`
- Keyframes: `marquee`, `scanline`, `entrance` + `.scanline` and `.clip-path-corner` utilities

## Data model (modular, static TS for now)

`src/data/riders.ts` — array of `{ handle, unit, name, bike, mods[], portrait, bikePhoto, bio }`
`src/data/rides.ts` — array of `{ id, title, date, meetTime, location, mapUrl, pace, status: 'upcoming'|'past' }`
`src/data/vault.ts` — array of `{ src, w, h, alt }` for masonry
`src/data/reels.ts` — array of `{ id, videoSrc, poster, author, caption }`

User can extend these files to add members/events/media.

## Components

- `src/components/site/TickerHeader.tsx` — sticky top telemetry marquee
- `src/components/site/BottomNav.tsx` — fixed floating bottom nav with active state via `useRouterState`
- `src/components/site/SectionHeader.tsx` — `<h2>` + mono tag pattern
- `src/components/site/RiderCard.tsx` — clipped panel with portrait, unit#, handle, bike, mods
- `src/components/site/RideTimelineItem.tsx` — timeline dot + details, upcoming vs past variants
- `src/components/site/Lightbox.tsx` — click image → fullscreen overlay with prev/next + swipe (touch handlers)
- `src/components/site/ReelPlayer.tsx` — `<video>` with IntersectionObserver autoplay/pause, tap-to-mute

## Pages

**Home (`/`)** — hero (full-height bg image + scanline overlay, headline "SportJKT", tagline, two CTAs → Roster/Rides), plus condensed section previews (top 2 riders, next ride, 4 vault thumbs, top reel).

**Roster (`/roster`)** — grid of `RiderCard`s (1 col mobile, 2 col ≥sm). Each links to `/roster/$handle`.

**Rider profile (`/roster/$handle`)** — large portrait, unit/name, bike headline, spec sheet (make/model/mods in mono table), bike photo, back link. Uses `notFound()` if handle missing.

**Rides (`/rides`)** — Upcoming list first (highlighted red dots), Past list second (muted). Each event shows date, meet time, location, pace, difficulty tag, "Open Route" button linking to `mapUrl` (Google Maps).

**Vault (`/vault`)** — CSS `columns-2 md:columns-3` masonry. Click opens `Lightbox` overlay with prev/next arrows + touch swipe + Esc to close.

**Reels (`/reels`)** — vertical scroll-snap container (`h-[100dvh] overflow-y-scroll snap-y snap-mandatory`), each reel `aspect-[9/16]`, `IntersectionObserver` autoplays visible video and pauses others. Infinite feel via looping/repeating dataset.

## Images

Generate hero + a few sample rider portraits/bike shots + vault images + reel posters via `imagegen` (fast tier, dark cinematic motorcycle prompts from the prototype's `data-lov-image-placeholder` prompts). Store under `src/assets/` as `.jpg`. Placeholder mp4s: use small looping video URLs or omit `<source>` and rely on poster (user can drop real files in `src/data/reels.ts` later).

## Technical notes

- All frontend, no backend needed. No Lovable Cloud.
- Fully responsive; mobile-first with bottom nav; ≥md gets 2-column layouts on roster/vault.
- Preserve router bootstrap (`src/router.tsx`, `__root.tsx`, `src/routes/index.tsx`).
- Replace placeholder home page.
- Ensure `<Outlet />` remains in `__root.tsx`.
