import { ChevronRight } from "lucide-react";
import type { BlogBodyBlock } from "@/lib/types/blog";

type BlogBodyProps = {
  blocks: BlogBodyBlock[];
};

export function BlogBody({ blocks }: BlogBodyProps) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={index}
                className="mt-4 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl"
              >
                {block.text}
              </h2>
            );
          case "quote":
            return (
              <blockquote
                key={index}
                className="my-2 rounded-3xl bg-gradient-to-br from-brand-navy to-brand-navy-deep p-8 text-xl font-medium leading-relaxed text-white sm:p-10 sm:text-2xl"
              >
                {block.text}
              </blockquote>
            );
          case "list":
            return (
              <ul key={index} className="flex flex-col gap-3">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <ChevronRight
                      className="mt-1 size-5 shrink-0 text-brand-navy"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                    <span className="text-lg leading-relaxed text-gray-700">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "image":
            return (
              <figure key={index} className="my-2">
                {block.url ? (
                  <span
                    className="block aspect-[16/9] w-full overflow-hidden rounded-3xl bg-cover bg-center"
                    style={{ backgroundImage: `url(${block.url})` }}
                  />
                ) : (
                  <span className="block aspect-[16/9] w-full rounded-3xl bg-gradient-to-br from-brand-navy to-brand-purple" />
                )}
                {block.caption ? (
                  <figcaption className="mt-3 text-center text-sm text-gray-500">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          case "paragraph":
          default:
            return (
              <p
                key={index}
                className="text-lg leading-relaxed text-gray-700"
              >
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
