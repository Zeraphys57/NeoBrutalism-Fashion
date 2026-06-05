"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BrutalImage from "@/components/ui/BrutalImage";
import { getRelatedProducts } from "@/lib/data";
import type { Product } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const INK = "#0A0A0A";

export default function RelatedProducts({ product }: { product: Product }) {
  const sectionRef = useRef<HTMLElement>(null);
  const related = getRelatedProducts(product.relatedSlugs);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || related.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.from(".related-card", {
        y: 60,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        // Drop the inline transform afterwards so the Tailwind hover-translate
        // (which also writes transform) isn't shadowed by a leftover inline one.
        clearProps: "transform",
        scrollTrigger: { trigger: section, start: "top 80%", once: true },
      });
    }, section);
    return () => ctx.revert();
    // Re-run when navigating between related products (component is remounted by
    // the route transition, but keep the dep explicit for safety).
  }, [product.slug, related.length]);

  if (related.length === 0) return null;

  return (
    <section ref={sectionRef} className="border-t-[3px] border-ink bg-chalk">
      <div className="px-6 pt-16 md:px-16">
        <h2
          className="border-b-[3px] border-ink pb-8 font-display leading-[0.9] text-ink"
          style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
        >
          YOU MIGHT ALSO WANT
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 px-6 py-12 md:grid-cols-3 md:px-16">
        {related.map((p) => (
          <Link
            key={p.slug}
            href={`/products/${p.slug}`}
            data-cursor-text="VIEW"
            className="related-card group flex flex-col b-border bg-chalk shadow-[6px_6px_0_0_#FFE600] transition-all duration-200 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[9px_9px_0_0_#FFE600]"
          >
            <div className="border-b-[3px] border-ink">
              <BrutalImage
                src={p.imageSrc}
                alt={p.name}
                variant={p.colorScheme}
                aspectRatio="3/4"
                label={p.name}
              />
            </div>
            <div className="flex flex-1 items-end justify-between gap-3 p-5">
              <div>
                <div
                  className="font-display leading-none text-ink"
                  style={{ fontSize: 24 }}
                >
                  {p.name}
                </div>
                <div
                  className="mt-2 font-display leading-none"
                  style={{ fontSize: 28, color: "#FFE600", WebkitTextStroke: `1px ${INK}` }}
                >
                  {p.price}
                </div>
              </div>
              <span
                className="shrink-0 font-mono text-[9px] font-bold uppercase tracking-widest text-ink transition-colors duration-200 group-hover:bg-acid"
                style={{ border: `2px solid ${INK}`, padding: "4px 8px" }}
              >
                VIEW →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
