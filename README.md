# Movement website

Public website for Movement, a private capital firm with hubs in Toronto and Singapore.
Live at [www.invest-movement.com](https://www.invest-movement.com).

## Stack

- Next.js 16 (App Router, static rendering) and React 19
- Tailwind CSS 3 with semantic colour tokens (RGB channel variables, so opacity modifiers work)
- No animation library: the mobile menu, scroll reveals and hero entrance are CSS transitions that degrade to fully visible content without JavaScript
- Fonts: Jost, Work Sans, Cormorant via `next/font`
- Contact form posts directly to Web3Forms from the browser (public access key by design)
- Vercel Web Analytics and Speed Insights (enable both in the Vercel project settings)
- Deployed on Vercel (Node 24)

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # ESLint 9 flat config
npm run typecheck  # tsc --noEmit
```

## Structure

```
app/                 Routes: home, /team, /team/[slug], /privacy, /terms, 404, sitemap, robots, OG image, icons
components/
  layout/            Header (hide-on-scroll, CSS mobile menu), Footer, SkipLink
  sections/          Home page sections in order: Hero, Criteria, Firm, Backing, Strategies, Team, Contact
  ui/                Primitives: Logo, ButtonLink, SectionHeading, Reveal, LocalTime (live dials), TeamDialog, ContactForm, BioSections
  legal/             Shared legal page layout
data/content.ts      All copy and structured content (typed). Edit here, not in components.
lib/site.ts          Site URL, contact email, LinkedIn URL, form access key
public/assets/brand  Trimmed logo crops used by the Logo component (derived from public/assets/logos)
public/images/team   Portrait JPEGs named by slug (4:5 crop, head at ~20% from top works best)
public/images/hero   Hero poster frame
public/videos        720p hero loop (only loaded on wide screens without reduced motion / data saver)
```

## Editing content

- **Team**: add an object to `team` in `data/content.ts` with a unique `slug`, a portrait at `public/images/team/<slug>.jpg`,
  a one-sentence `summary`, and `bio` sections as arrays of strings. A profile page is generated automatically at `/team/<slug>`.
- **Criteria, strategies, sectors, offices, copy**: edit the corresponding export in `data/content.ts`.
- **Legal pages**: update the text in `app/privacy/page.tsx` or `app/terms/page.tsx` and set `legal.lastUpdated`.

## Conventions

- Colours come from tokens (`bg-paper`, `text-ink`, `text-ink-muted`, `border-line`, `text-accent`). Do not hardcode hex values in components. There is a single light theme by decision; the token layer would make a dark theme cheap to add later.
- Type: sentence case for headings; uppercase tracking only for the `eyebrow` class.
- Prefer hairline rules to boxed cards. No text shadows, gradients or decorative animation.
- Every interactive element must be a real `<a>` or `<button>`.
