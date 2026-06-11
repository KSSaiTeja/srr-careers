import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

const variantStyles = {
  primary:
    "bg-brand-navy text-white hover:bg-brand-navy-dark rounded-2xl px-6 py-3 text-xl font-medium transition-colors",
  secondary:
    "border-2 border-brand-navy bg-white/10 text-brand-navy backdrop-blur-sm hover:bg-brand-navy hover:text-white rounded-2xl px-6 py-3 text-xl font-medium transition-colors",
  accent:
    "bg-brand-gold text-black hover:bg-brand-gold-dark rounded-full px-5 py-3 text-sm font-semibold transition-colors sm:px-6 sm:py-4 sm:text-base",
  outline:
    "border border-white/30 text-white hover:bg-white/10 rounded-full px-6 py-3 font-semibold transition-colors",
  ghost:
    "bg-white text-brand-purple hover:bg-gray-100 rounded-full px-6 py-3 font-semibold shadow-lg transition-colors",
  muted:
    "bg-gray-600 text-gray-50 hover:bg-gray-700 rounded-lg p-2 transition-colors",
} as const;

const sizeStyles = {
  default: "",
  sm: "text-sm px-4 py-2",
  lg: "text-xl px-8 py-4",
} as const;

export type ButtonVariant = keyof typeof variantStyles;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: keyof typeof sizeStyles;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "default",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
