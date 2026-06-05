"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BrutalImage from "@/components/ui/BrutalImage";
import type { BrutalImageVariant } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const MINI_INFO = ["SEASON 4", "SILENT DYSTOPIA", "LIMITED RUN"];

function SeasonCard({
  name,
  collection,
  variant,
  aspectRatio,
  imageSrc,
}: {
  name: string;
  collection: string;
  variant: BrutalImageVariant;
  aspectRatio: string;
  imageSrc?: string;
}) {
  return (
    <div className="this-card">
      <BrutalImage
        src={imageSrc}
        alt={name}
        variant={variant}
        aspectRatio={aspectRatio}
        label={name}
        className="b-border-acid"
      />
      <div className="mt-3">
        <h3 className="font-display leading-none text-chalk" style={{ fontSize: 24 }}>
          {name}
        </h3>
        <div
          className="mt-1 font-mono text-[10px] uppercase tracking-widest"
          style={{ color: "var(--muted)" }}
        >
          {collection}
        </div>
      </div>
    </div>
  );
}

export default function ThisSeason() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.from(".this-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: section, start: "top 80%", once: true },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-ink px-6 py-24 md:px-16">
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2
          className="font-display leading-[0.85] text-acid"
          style={{ fontSize: "clamp(80px, 14vw, 160px)" }}
        >
          <span className="block">THIS</span>
          <span className="block">SEASON</span>
        </h2>
        <div className="flex flex-col gap-1 md:items-end md:text-right">
          {MINI_INFO.map((info) => (
            <span
              key={info}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-acid"
            >
              {info}
            </span>
          ))}
        </div>
      </div>

      {/* Asymmetric card grid */}
      <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left — two stacked cards */}
        <div className="flex flex-col gap-8">
          <SeasonCard
            name="THE MONOLITHIC PRESENCE"
            collection="SILENT DYSTOPIA — S4"
            variant="dark"
            aspectRatio="3/4"
            imageSrc="/images/couture season 4/s4_editorial_full_1780647341081.png"
          />
          <SeasonCard
            name="STRUCTURAL ARMOR"
            collection="SILENT DYSTOPIA — S4"
            variant="pattern"
            aspectRatio="3/4"
            imageSrc="/images/couture season 4/s4_garment_focus_1780647387806.png"
          />
        </div>
        {/* Right — two stacked cards */}
        <div className="flex flex-col gap-8">
          <SeasonCard
            name="THE CRIMSON ANOMALY"
            collection="SILENT DYSTOPIA — S4"
            variant="yellow"
            aspectRatio="2/3"
            imageSrc="/images/couture season 4/s4_wide_landscape_1780647403276.png"
          />
          <SeasonCard
            name="KINETIC WASTELAND"
            collection="SILENT DYSTOPIA — S4"
            variant="dark"
            aspectRatio="3/4"
            imageSrc="/images/couture season 4/s4_action_motion_1780647366405.png"
          />
        </div>
      </div>

      {/* Separator + CTA */}
      <div className="mt-16 flex flex-col gap-8 border-t-[3px] border-acid pt-10 md:flex-row md:items-center md:justify-between">
        <p
          className="font-display leading-[0.95] text-chalk"
          style={{ fontSize: "clamp(36px, 6vw, 80px)", maxWidth: "16ch" }}
        >
          NO RESTOCK. NO REPEAT. ONCE IT&apos;S GONE.
        </p>
        <a
          href="#"
          data-cursor-hover
          className="inline-block shrink-0 b-border bg-acid px-7 py-4 font-mono text-xs font-bold uppercase tracking-widest text-ink shadow-[6px_6px_0_0_#0A0A0A] transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_0_#0A0A0A]"
        >
          SHOP THE DROP →
        </a>
      </div>
    </section>
  );
}
