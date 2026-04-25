"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/*
  Scroll progress indicator — Von Lyncker pattern.

  A thin lime hairline pinned to the bottom of the viewport. transform-origin
  left, scaleX driven from 0 to 1 as the user scrolls top → bottom of page.

  Implementation uses Framer Motion's useScroll + useSpring so the bar
  doesn't jitter on every wheel tick — it eases into position with a
  damped spring. Stiffness/damping tuned so it lags about 80ms behind the
  raw scroll, giving the indicator a sense of physicality without feeling
  laggy on long scrolls.

  z-index 109 sits beneath the navbar (101 host) ... wait — actually the
  hairline sits ABOVE everything except a modal. We pin it bottom-fixed
  at z-50 (under nav z-101) so the nav can still float over it cleanly.
  In practice the bottom is empty space anyway.
*/

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.0008,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 bottom-0 z-50 h-[2.5px] origin-left"
      style={{
        scaleX,
        backgroundColor: "var(--color-lime)",
      }}
    />
  );
}
