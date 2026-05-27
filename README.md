# N7 Banking — Landing Page

A pixel-perfect, fully responsive recreation of the N7 digital banking marketing site, built from a Figma design. Dark editorial fintech aesthetic with a blue → deep-blue accent gradient, glass mockups, sticky scrolling layouts, a 3D laptop reveal, and a smooth case-study carousel.

## Tech Stack

- **Next.js 16** (App Router, React 19)
- **TypeScript**
- **Tailwind CSS v4** + custom CSS (`app/n7.css`) for the bespoke landing styles
- **Geist** + **Archivo** + **Chivo Mono** + **Fraunces** + **Inter** + **Roboto** (Google Fonts)

## What's Inside

- Locked-in **hero** with floating glass cards, photo, and trusted-by row
- **Sticky-intro solutions grid** (5 cards)
- **CB7 core-banking** section with a slide-in laptop showing the AML dashboard
- **CTA card** with watermark, cyan accent dot, radial glows
- **Digital Banking** sticky-left intro with three phone mockups (Bar chart / Home / Profile) scrolling past
- **Insights** grid + auto-advancing **Case Studies carousel** (scroll-snap, infinite loop)
- Custom **footer** with giant N7 gradient logo, three offices, and link columns

## Getting Started

### Prerequisites

- Node.js 20+
- npm (or pnpm / yarn / bun)

### Run locally

```bash
git clone https://github.com/karthikeyan18v/N7-landing-page-.git
cd N7-landing-page-
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The page hot-reloads on edits.

### Build for production

```bash
npm run build
npm start
```

## Project Structure

```
app/
  layout.tsx         # Root layout (fonts, metadata)
  page.tsx           # The N7 landing page (one big component)
  globals.css        # Tailwind base + shadcn defaults
  n7.css             # All bespoke landing styles
components/ui/       # shadcn primitives (kept for future use)
public/img/          # girl.jpg, dash.png, dash2.png
```

## Deploy on Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Click **Import Git Repository** and pick `N7-landing-page-`.
4. Vercel auto-detects Next.js, no settings change needed.
5. Click **Deploy**.

Within ~60 seconds you get a live URL and every future push to `main` auto-deploys.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/karthikeyan18v/N7-landing-page-)

## Responsive Breakpoints

| Width | Layout |
|---|---|
| ≥1280 | Full desktop |
| 1080–1280 | Tightened spacing, hero side-by-side |
| 900–1080 | iPad Pro: hero side-by-side smaller, solutions 2-col |
| 740–900 | iPad Air: hero stacks, solutions 2-col, footer single |
| 640–740 | Large phone: cards single col, hamburger nav prep |
| ≤640 | Mobile: hamburger, full-width buttons, floating cards hidden, laptops 100% width |
| ≤420 | Small phone: footer single col, tighter type |

All animations honor `prefers-reduced-motion: reduce`.

## License

MIT, feel free to fork and adapt.
