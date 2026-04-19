"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/*
  Gentler scroll-in than the editorial build:
  24px rise, 800ms, easing [0.16, 1, 0.3, 1] — matches --ease-quiet in globals.css.
  Fires once, triggered 80px before element enters view.
  Duration stays inline because framer-motion can't consume CSS vars for numerics.
*/
export function Reveal({ children, delay = 0, y = 24, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
