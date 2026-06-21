import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type BlogPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function BlogPagination({
  page,
  totalPages,
  onPageChange,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="mt-4 flex items-center gap-2.5" aria-label="Blog pagination">
      {pages.map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => onPageChange(value)}
          aria-current={value === page ? "page" : undefined}
          className={cn(
            "inline-flex size-11 items-center justify-center rounded-full text-sm font-semibold transition-colors",
            value === page
              ? "bg-brand-navy text-white"
              : "border border-gray-200 text-gray-700 hover:border-brand-navy/40 hover:text-brand-navy",
          )}
        >
          {value}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        aria-label="Next page"
        className="inline-flex size-11 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-colors hover:border-brand-navy/40 hover:text-brand-navy disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ArrowRight className="size-4" strokeWidth={2.5} aria-hidden />
      </button>
    </nav>
  );
}
