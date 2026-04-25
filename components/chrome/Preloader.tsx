"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";

/*
  Preloader — first-session-only black overlay with logo + tag.

  Sequence:
   1. On mount, show full-viewport ink-black overlay with animated logo (size 88)
      + "Senior Advisory · Charleston, SC" tag in mono
   2. After ~1300ms: trigger 'out' phase — top + bottom decks slide outward
      via translateY(±100%) with a 900ms cubic-bezier
   3. After ~2300ms: hide entirely; persist sessionStorage["ch-preloader-played"]

  Subsequent visits in the same session: bypass to "done" immediately.
*/

export function Preloader() {
  const [phase, setPhase] = useState<"in" | "out" | "done">(() => {
    if (typeof window === "undefined") return "done";
    try {
      if (sessionStorage.getItem("ch-preloader-played") === "1") return "done";
    } catch {
      /* sessionStorage unavailable */
    }
    return "in";
  });

  useEffect(() => {
    if (phase === "done") return;
    const t1 = setTimeout(() => setPhase("out"), 1300);
    const t2 = setTimeout(() => {
      setPhase("done");
      try {
        sessionStorage.setItem("ch-preloader-played", "1");
      } catch {
        /* sessionStorage unavailable */
      }
    }, 2300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [phase]);

  if (phase === "done") return null;
  return (
    <div className={`preloader ${phase === "out" ? "done" : ""}`}>
      <div className="preloader-deck top" />
      <div className="preloader-deck bottom" />
      <div className="preloader-content">
        <Logo size={88} intro="always" hover={false} />
        <div className="preloader-tag">Senior Advisory · Charleston, SC</div>
      </div>
    </div>
  );
}
