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

---

## Page: `/` (Homepage)

### Hero panel 1 (dark atmosphere panel)

`[H1-1]` *(applied immediately, not part of batch)* **Logo bottom-node pulse** — ring should be static, only the node pulses. Current behavior had ring also pulsing (scale + opacity), too distracting. **Status: APPLIED.**

### Hero panel 2 (white slide-in panel — "I design operational programs...")

`[H2-1]` **Remove "Boutique. Quiet authority. Operator-grade pragmatism. Not academic. Not consultancy-glossy."** — Colin: "Get rid of that weird statement." It's positioning copy that reads as marketing self-description; better to let the work speak. Drop the entire `body-sm` paragraph in `hero-2-bottom`.

`[H2-2]` **Founded stat: 2026 → 2023** (covered by CC-1).

`[H2-3]` **Add "translatable across" list to the right of the headline** — Colin's positioning need: healthcare leaders should see him as a healthcare expert, but other-industry leaders should NOT think the work doesn't apply to them. Show translatability.
  - **Position**: to the right of "I design operational programs..." headline (in the hero panel 2's grid)
  - **Items** (bolded, in this order):
    1. Healthcare
    2. Home Health
    3. Home Services
    4. Hospitality
    5. Dentistry
    6. Politics
    7. Municipal Governments
  - **Behavior**: Brand-green (signal `#00e676`) highlight that **pulses through each item, resting on each in turn** — like a walking spotlight visiting each industry. Implementation thought: CSS `@keyframes` with item-specific timing, or single highlight element that translates through positions. ~1.2-1.5s rest per item; total cycle ~10s for 7 items.
  - **Eyebrow above the list**: probably something like "Translatable across" or "Sectors served" (decide during implementation)
  - **Layout**: hero-panel-2 currently uses `grid-template-columns: 1fr 1fr` — headline currently spans both columns. Need to change to: headline left col, list right col. May need to adjust the bottom row (stats + CTA) to accommodate.

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

## Triage table (filled in after full review pass)

| Item | Type | Files affected | Effort |
| --- | --- | --- | --- |
| CC-1 (2023 founded) | cross-cutting | constants, Hero, SiteFooter | small |
| H2-1 (drop boutique copy) | section | Hero | trivial |
| H2-3 (translatable list w/ pulsing highlight) | section + new component | Hero | medium |

---

*End of running notes. Updated as Colin reviews each page.*
