import type { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main";
};

/*
  Single source of truth for horizontal rhythm. 24px mobile / 48px desktop
  padding, 1320px max content width. Every section wrapper uses this
  so we stop repeating the same px-6 md:px-12 incantation across files.
*/
export function Container({ children, className, as: Tag = "div" }: Props) {
  return (
    <Tag className={clsx("mx-auto w-full max-w-[1320px] px-6 md:px-12", className)}>
      {children}
    </Tag>
  );
}
