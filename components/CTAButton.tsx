import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost";
type Size = "sm" | "md";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type LinkProps = BaseProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type ButtonProps = BaseProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function CTAButton(props: LinkProps | ButtonProps) {
  const { children, variant = "primary", size = "md", className } = props;

  const classes = clsx(
    "inline-flex items-center justify-center font-mono uppercase transition-all duration-200",
    "border",
    size === "sm" ? "px-[18px] py-[10px] text-[11px]" : "px-7 py-4 text-[11px]",
    variant === "primary" && "cta-primary",
    variant === "ghost" && "cta-ghost",
    className,
  );

  const style = { letterSpacing: "0.12em" } as const;

  const inner = (
    <>
      <span>{children}</span>
      <style>{`
        .cta-primary {
          background: var(--color-ink);
          color: var(--color-paper);
          border-color: var(--color-ink);
        }
        .cta-primary:hover {
          background: var(--color-accent);
          border-color: var(--color-accent);
        }
        .cta-ghost {
          background: transparent;
          color: var(--color-ink);
          border-color: var(--color-ink);
        }
        .cta-ghost:hover {
          background: var(--color-ink);
          color: var(--color-paper);
        }
      `}</style>
    </>
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes} style={style}>
        {inner}
      </Link>
    );
  }
  return (
    <button
      type={(props as ButtonProps).type ?? "button"}
      onClick={(props as ButtonProps).onClick}
      className={classes}
      style={style}
    >
      {inner}
    </button>
  );
}
