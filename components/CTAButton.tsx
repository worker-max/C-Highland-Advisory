import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type LinkProps = BaseProps & {
  href: string;
  onClick?: never;
  type?: never;
  disabled?: never;
  ariaBusy?: never;
};

type ButtonProps = BaseProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaBusy?: boolean;
};

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "cta cta-primary",
  secondary: "cta cta-secondary",
  ghost: "cta cta-ghost",
};

export function CTAButton(props: LinkProps | ButtonProps) {
  const { children, variant = "primary", className } = props;
  const classes = clsx(VARIANT_CLASS[variant], className);

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
