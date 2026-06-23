# NZ Afghan Sports Events

Marketing & community website for **NZ Afghan Sports Events** — a volunteer-led
non-profit running futsal, football, volleyball and netball events for the
Afghan-Kiwi community across Aotearoa.

Built with **Next.js 16** (App Router), **React 19**, **TypeScript** and
**Tailwind CSS v4**.

> _Bringing the Afghan-Kiwi community together through sport._

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
```

## What's inside

A single-page site with anchor navigation:

- **Hero** — headline, CTAs, and a community stat strip
- **Events** — upcoming tournaments/leagues with status pills (open / filling / closed)
- **About** — who we are + the belonging / health / culture pillars
- **Get involved** — play, volunteer, coach + featured teams
- **Sponsors** — donate / become-a-sponsor CTA and a sponsor wall
- **Register** — client-side sign-up form (play / volunteer / coach / sponsor)

SEO is wired up: metadata, Open Graph / Twitter tags, `sitemap.xml`,
`robots.txt`, a generated favicon, and `SportsOrganization` JSON-LD.

## Design direction

Bold, sporty energy with Afghan cultural accents. The palette is derived from
the Afghan flag (black / red / green) lifted with a gold accent; headings use
the condensed **Oswald** display face over **Inter** body text. Section
dividers and dark panels carry a subtle girih-style geometric tile motif
(`.tile-band` in `globals.css`).

## Project structure

```
src/
  app/
    layout.tsx        # fonts (Oswald + Inter), metadata, Header/Footer
    page.tsx          # composes the homepage + JSON-LD
    globals.css       # Tailwind v4 theme tokens (brand palette) + helpers
    icon.svg          # favicon (star mark)
    sitemap.ts, robots.ts
  components/
    Header.tsx        # sticky nav + mobile menu (client)
    Footer.tsx
    Logo.tsx          # wordmark + star mark
    Reveal.tsx        # scroll-reveal wrapper (client)
    sections/         # Hero, About, Events, GetInvolved, Sponsors, Register
  lib/
    site.ts           # 👈 ALL content lives here (events, teams, sponsors…)
```

## Customising

1. **Content** (events, teams, sponsors, contact, stats) → `src/lib/site.ts`
2. **Brand colours / fonts** → `src/app/globals.css` and `src/app/layout.tsx`
3. **Wiring up the form** → in `src/components/sections/Register.tsx`, replace the
   simulated submit (currently logs to the console) with a POST to an API route
   or a service like Resend / Formspree.
4. **Domain** → update the `https://nzafghansports.nz` URLs in `layout.tsx`,
   `sitemap.ts`, `robots.ts`, and `page.tsx`.

## CI

`.github/workflows/ci.yml` runs lint, build and type-check on every PR to
`main`.

## Deploy

Deploys anywhere Next.js runs. Easiest is [Vercel](https://vercel.com): push to
a Git repo and import, or run `npx vercel`.
