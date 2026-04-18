# C Highland Advisory

Boutique strategy, operations, and applied AI advisory. Charleston, SC.

## Stack

- Next.js 16 App Router + TypeScript
- Tailwind CSS v4 (CSS-first `@theme` tokens)
- Fonts: Fraunces / Inter Tight / JetBrains Mono via `next/font/google`
- Resend for the engagement form
- Deployed on Vercel

## Develop

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Environment

Copy `.env.example` → `.env.local` and fill in:

- `RESEND_API_KEY` — optional in dev; the form logs to console without it
- `CONTACT_EMAIL` — destination address for brief submissions
- `SITE_URL` — canonical URL used in sitemap + OG metadata

## Structure

```
app/              # App Router routes
  page.tsx        # Homepage
  practice/       # /practice + /practice/[slug] for 6 divisions
  founder/
  engagement/     # contact form + API route
  transmissions/  # placeholder
  api/brief/      # Resend-backed submission endpoint
components/       # Nav, Footer, Hero, DivisionRow, etc.
content/          # divisions.ts (single source of truth)
lib/              # constants
```

Content for every division lives in [`content/divisions.ts`](./content/divisions.ts).
