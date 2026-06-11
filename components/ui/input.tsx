import { cn } from "@/lib/utils/cn";

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-base text-gray-900 shadow-sm transition-colors",
        "placeholder:text-gray-400",
        "focus-visible:border-brand-navy/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-navy/10",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
