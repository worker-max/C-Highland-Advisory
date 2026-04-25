import { Hero } from "@/components/sections/Hero";
import { Approach } from "@/components/sections/Approach";
import { Divisions } from "@/components/sections/Divisions";
import { Operator } from "@/components/sections/Operator";
import { Clients } from "@/components/sections/Clients";
import { FounderExcerpt } from "@/components/sections/FounderExcerpt";
import { SiteFooter } from "@/components/sections/SiteFooter";

/*
  Homepage — assembled in DESIGN_HANDOFF order:
   Hero (2-panel sticky slide-in)
   → Approach (3-card window-pane)
   → Divisions (sticky horizontal scroll, 7 cards + black-hole CTA)
   → Operator (2-card window-pane)
   → Clients (marquee + sectors)
   → FounderExcerpt (pull quote)
   → SiteFooter (dark)
*/

export default function Home() {
  return (
    <>
      <Hero />
      <Approach />
      <Divisions />
      <Operator />
      <Clients />
      <FounderExcerpt />
      <SiteFooter />
    </>
  );
}
