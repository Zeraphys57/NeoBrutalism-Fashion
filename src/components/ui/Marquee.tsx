"use client";

import { MARQUEE_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  dark?: boolean;
  reverse?: boolean;
  className?: string;
}

/**
 * Infinite scrolling ticker. The item list is duplicated so the `.marquee-track`
 * (0 -> -50%) animation loops seamlessly. Per-item padding (not gap) keeps the
 * two halves identical so there is no jump at the seam.
 */
export default function Marquee({
  dark = false,
  reverse = false,
  className,
}: MarqueeProps) {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      className={cn(
        "relative w-full select-none overflow-hidden border-y-[3px] border-ink py-4",
        dark ? "bg-ink text-acid" : "bg-acid text-ink",
        className
      )}
    >
      <div
        className={cn(
          "marquee-track flex w-max items-center whitespace-nowrap",
          reverse && "marquee-track-reverse"
        )}
      >
        {items.map((item, index) => (
          <span
            key={index}
            className="shrink-0 px-6 font-mono text-sm font-bold uppercase tracking-[0.2em] md:text-base"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
