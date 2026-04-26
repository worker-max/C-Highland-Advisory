# C Highland Advisory — Section-by-section Review Notes (2026-04-26)

Running notes from Colin's per-page review pass. **Take no action; batch-execute at the end.** Each page section gets its own block; cross-cutting items get flagged as such for global application.

Process agreed:
1. Colin reviews each page, returns notes
2. Claude captures notes here, **no immediate action**
3. After full review pass, Claude triages cross-cutting vs section-specific
4. Claude implements in batches (cross-cutting first)
5. Final QA + production push

---

## Cross-cutting (apply globally)

### `[CC-1]` Founded year: 2026 → 2023

- **Reason**: Colin has been advising since 2023. The LLC formation date doesn't matter for credibility; "Founded 2023" reads as "operator with track record" rather than "brand new entity."
- **Where this appears today** (audit before applying):
  - `lib/constants.ts` — `FIRM.founded` currently `"2026"`
  - `components/sections/Hero.tsx` — hero panel 1 top tag: "C Highland Advisory · Charleston, SC · Est. 2026"
  - `components/sections/Hero.tsx` — hero panel 2 stats: "2026 / Founded"
  - `components/sections/SiteFooter.tsx` — footer base: "South Carolina · Est. 2026"
  - Possibly OG metadata, sitemap, etc.
- **Action**: change every "2026" referring to founding date → "2023". Single-source via `FIRM.founded` constant where possible.

### `[CC-2]` All "Begin engagement" / contact emails route to `colinhighland@outlook.com`

- **Reason**: free inbox until a revenue-funded domain inbox can be set up. Need site live this week without DNS/email setup blocking it.
- **Where this appears today**:
  - `components/chrome/PillNav.tsx` — `Begin engagement` CTA → `/#contact` anchor (which is the SiteFooter contact email)
  - `components/sections/SiteFooter.tsx` — `mailto:engage@chighlandadvisory.com` (footer email pill)
  - `components/sections/SiteFooter.tsx` — same email in office column
  - `app/engagement/page.tsx` — `mailto:engage@chighlandadvisory.com`
  - `app/login/page.tsx` — `mailto:engage@chighlandadvisory.com` (request access link, form `action`)
  - `app/toolkits/page.tsx` — `mailto:engage@chighlandadvisory.com` (inquire about partnership)
- **Action**: replace ALL `engage@chighlandadvisory.com` mailto refs → `colinhighland@outlook.com`. Single-source via a new `FIRM.contactEmail` constant in `lib/constants.ts` so the future domain switch is one-line.

### `[CC-3]` Add Education + Youth Sports to translatable industries list

- See `[H2-3]` — full industries list is now (in this order):
  1. Healthcare
  2. Home Health
  3. Home Services
  4. Hospitality
  5. Dentistry
  6. Politics
  7. Municipal Governments
  8. Education
  9. Youth Sports
- 9 items total. Highlight cycle: ~1.2-1.5s rest per item × 9 = ~12-13s total loop.

---

## Page: `/` (Homepage)

### Hero panel 1 (dark atmosphere panel)

`[H1-1]` *(applied immediately, not part of batch)* **Logo bottom-node pulse** — ring should be static, only the node pulses. Current behavior had ring also pulsing (scale + opacity), too distracting. **Status: APPLIED.**

### Hero panel 2 (white slide-in panel — "I design operational programs...")

`[H2-1]` **Remove "Boutique. Quiet authority. Operator-grade pragmatism. Not academic. Not consultancy-glossy."** — Colin: "Get rid of that weird statement." It's positioning copy that reads as marketing self-description; better to let the work speak. Drop the entire `body-sm` paragraph in `hero-2-bottom`.

`[H2-2]` **Founded stat: 2026 → 2023** (covered by CC-1).

`[H2-3]` **Add "translatable across" list to the right of the headline** — Colin's positioning need: healthcare leaders should see him as a healthcare expert, but other-industry leaders should NOT think the work doesn't apply to them. Show translatability.
  - **Position**: to the right of "I design operational programs..." headline (in the hero panel 2's grid)
  - **Items** (bolded, in this order — see CC-3 for final list):
    1. Healthcare
    2. Home Health
    3. Home Services
    4. Hospitality
    5. Dentistry
    6. Politics
    7. Municipal Governments
    8. Education
    9. Youth Sports
  - **Behavior**: Brand-green (signal `#00e676`) highlight that **pulses through each item, resting on each in turn** — like a walking spotlight visiting each industry. Implementation thought: single absolute-positioned highlight strip that translates between item positions (rather than per-item CSS animation toggling) — smoother, simpler. ~1.2-1.5s rest per item; total cycle ~12-13s for 9 items.
  - **Eyebrow above the list**: candidate "Translatable across" or "Where this works"
  - **Layout**: hero-panel-2 currently uses `grid-template-columns: 1fr 1fr` — headline currently spans both columns. Need to change to: headline left col, list right col. May need to adjust the bottom row (stats + CTA) to accommodate.

---

### Approach section — restructure: 3 STEPS → 4 TIERS

**Major restructure.** Current "Approach" section shows 3 process steps (Operating diagnostic → Program architecture → Embedded execution). Colin: those 3 steps are actually **Tier 1's contents** — not the Approach itself. The Approach section should show **4 engagement tiers** instead.

Each tier needs:
- Concise summary on the homepage Approach section
- A dedicated `/engagement/[slug]` sub-page (looks fully baked, light content, pricing-via-form)

#### `[A-1]` Tier 1 — Embedded program (current 3-step content)

- **Slug**: `/engagement/program` (or `/engagement/embedded`)
- **One-liner**: "Embedded operator engagement — diagnose, design, run."
- **Contents**: the existing 3 steps (Operating diagnostic → Program architecture → Embedded execution) become the *body* of this tier's sub-page.
- **Pricing**: TBD based on scope. Scales down to either $0 or retainer (based on scope + size of company). Pricing provided within 24 hours via fillable form.

#### `[A-2]` Tier 2 — Charleston Symposium (working seminar in Charleston, SC)

- **Slug**: `/engagement/symposium`
- **Word choice**: Colin asked. My pick: **Symposium** (formal but warm; accommodates both working depth + cultural-reset framing). Alternatives noted: Residency, Intensive.
- **Format**: 2 or 5-day in-person Working Symposium hosted at Charleston, SC (or Colin travels to client; Charleston package is less expensive).
- **Audience**: solo entrepreneur OR full leadership team.
- **Charleston package includes**:
  - Custom Charleston-based AI concierge agent/program (during stay)
  - Curated VIP city experience
  - 1 non-working half-day on the company boat
  - Optional weekend extension
- **Concept**: a point-in-time *reset for innovation and culture* while experiencing the city.
- **Pricing**: TBD via form, within 24 hours.

#### `[A-3]` Tier 3 — Virtual Advisory

- **Slug**: `/engagement/virtual`
- **One-liner**: "Purely virtual advisory — any scope, any length."
- **Format**: fully remote. Cadence and scope flexible to client need.
- **Pricing**: TBD via form, within 24 hours.

#### `[A-4]` Tier 4 — Small Business Co-op (free consultation + AI Tool Co-op + innovation partners)

- **Slug**: `/engagement/co-op` (or `/engagement/small-business`)
- **One-liner**: "For small businesses — a free consultation, shared tools, and partner network."
- **Contents**:
  - Free consultation
  - Optional access to the **AI Tool Co-op**
  - Retainer-based innovation relationship (scope/size dependent)
  - Free access to shared tools
  - Discounted advisory activities + tool development
  - Free access to **innovation partners** specializing in branding, marketing, sales, public relations, automation, etc.
- **Pricing**: free / discounted / retainer-based — via form, within 24 hours.

#### `[A-5]` Homepage Approach section: layout change

- **Was**: 3-card grid of Steps 01/02/03
- **Becomes**: 4-card grid of Tiers (or 2×2 grid for breathing room — decide during impl). Each card carries:
  - Tier number/label (mono uppercase)
  - Tier name (serif)
  - 1-2 sentence summary
  - Format/audience tag
  - "Learn more →" link to sub-page
- **Section eyebrow**: keep `01 Approach` or rename to `01 Engagement` / `01 Tiers` (decide). Headline candidate: "Four ways to work with us." (italic second clause optional)

#### `[A-6]` New `/engagement/[slug]` sub-page template

- One reusable template, parameterized by tier data.
- Looks fully baked: hero with tier name + lede, 4-cell meta strip (format, audience, length, posture), 1-2 paragraphs of "what this is," a simple "Inquire about pricing" form (name + email + company + brief about-the-need + submit), routes form via mailto to `colinhighland@outlook.com` (CC-2).
- Confirmation copy: "We&rsquo;ll get back to you within 24 hours with a tailored package and pricing."
- Reuses the SiteFooter at the bottom.

#### `[A-7]` `/engagement` index page → tier hub

- Currently a stub with just a CTA. Becomes the canonical hub showing all 4 tiers laid out in fuller form than the homepage section. Each entry links to its `/engagement/[slug]`.
- Same fillable form on this page so visitors can self-route to the tier they want.

---

## Page: `/practice/[slug]`

*(awaiting review)*

---

## Page: `/founder`

*(awaiting review)*

---

## Page: `/toolkits`

*(awaiting review)*

---

## Page: `/login`

*(awaiting review)*

---

## Page: `/engagement`

*(awaiting review)*

---

## Page: `/transmissions`

*(awaiting review)*

---

## Triage table (running)

| Item | Type | Files affected | Effort | Status |
| --- | --- | --- | --- | --- |
| **CC-1** (2023 founded) | cross-cutting | constants, Hero, SiteFooter | small | ✅ DONE (commit pending) |
| **CC-2** (route all emails to colinhighland@outlook.com) | cross-cutting | constants, SiteFooter, /login, /toolkits | small | ✅ DONE |
| **CC-3** (Education + Youth Sports added to industries list) | cross-cutting | lib/content/industries.ts | trivial | ✅ DONE |
| **H2-1** (drop boutique copy) | section | Hero | trivial | ✅ DONE |
| **H2-3** (translatable list w/ pulsing highlight) | section + data | Hero, globals.css, industries.ts | medium | ✅ DONE |
| **A-1..A-7** (4 engagement tiers + sub-pages + homepage restructure + hub) | major restructure | Approach, `/engagement/[slug]`, `/engagement`, engagement.ts | large | ✅ DONE (commits 2493537 + 1a2c706) |
| **H1-1** (logo bottom-node pulse, ring static) | section | globals.css, Logo | small | ✅ DONE (commit 7a25948) |
| Founder bio: drop healthcare disclaimer | section | /founder | trivial | ✅ DONE (commit 1a2c706) |

---

*End of running notes. Updated as Colin reviews each page.*
