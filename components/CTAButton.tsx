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
  disabled?: never;
};

type ButtonProps = BaseProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaBusy?: boolean;
};

export function CTAButton(props: LinkProps | ButtonProps) {
  const { children, variant = "primary", size = "md", className } = props;

  const classes = clsx(
    "cta-base",
    size === "sm" ? "cta-sm" : "cta-md",
    variant === "primary" ? "cta-primary" : "cta-ghost",
    className,
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const btn = props as ButtonProps;
  return (
    <button
      type={btn.type ?? "button"}
      onClick={btn.onClick}
      disabled={btn.disabled}
      aria-busy={btn.ariaBusy}
      className={classes}
      style={btn.disabled ? { opacity: 0.55, cursor: "not-allowed" } : undefined}
    >
      {children}
    </button>
  );
}
