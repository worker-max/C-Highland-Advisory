import type { ReactNode } from "react";
import { LenisProvider } from "./LenisProvider";
import { Preloader } from "./Preloader";
import { CustomCursor } from "./CustomCursor";
import { ScrollProgress } from "./ScrollProgress";
import { PillNav } from "./PillNav";

/*
  ChromeRoot — single client-island wrapper for all global chrome.

  Mounted at the App Router body root in app/layout.tsx so the chrome
  primitives bootstrap once and persist across route changes.

  Order matters in the DOM tree: the Preloader sits at z:250 above
  everything, the custom cursor at z:200, the pill nav at z:100, and
  the scroll progress at z:90 — see globals.css for the full stack.
*/

export function ChromeRoot({ children }: { children: ReactNode }) {
  return (
    <>
      <LenisProvider />
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <PillNav />
      <main>{children}</main>
    </>
  );
}
