import { cn } from "@/lib/utils/cn";

function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 shadow-sm transition-colors",
        "placeholder:text-gray-400",
        "focus-visible:border-brand-navy/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-navy/10",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
