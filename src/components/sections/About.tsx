"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND_STATS, MANIFESTO_LINES, PRESS_MENTIONS } from "@/lib/data";
import { useTextReveal } from "@/hooks/useTextReveal";

gsap.registerPlugin(ScrollTrigger);

const INK = "#0A0A0A";

// Editorial voice for the bare numbers — keyed by the stat label in the data.
const STAT_SUBTITLES: Record<string, string> = {
  FOUNDED: "Born in Melbourne, raised by streets.",
  DROPS: "Every season, every year, no repeats.",
  COMMUNITY: "Wearers who actually give a damn.",
};

// Transparent fill + ink stroke = the brutalist "outlined" typographic treatment.
const OUTLINED_TEXT = {
  color: "transparent",
  WebkitTextFillColor: "transparent",
  WebkitTextStroke: `2px ${INK}`,
} as const;

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const manifestoWrapRef = useRef<HTMLDivElement>(null);
  const statsWrapRef = useRef<HTMLDivElement>(null);
  const pressWrapRef = useRef<HTMLDivElement>(null);

  useTextReveal(titleRef);

  useEffect(() => {
    const section = sectionRef.current;
    const manifestoWrap = manifestoWrapRef.current;
    const statsWrap = statsWrapRef.current;
    const pressWrap = pressWrapRef.current;
    if (!section || !manifestoWrap || !statsWrap || !pressWrap) return;

    const ctx = gsap.context(() => {
      gsap.from(".manifesto-line", {
        x: -70,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: { trigger: manifestoWrap, start: "top 78%", once: true },
      });

      gsap.from(".stat-row", {
        y: 40,
        opacity: 0,
        duration: 0.65,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: { trigger: statsWrap, start: "top 80%", once: true },
      });

      gsap.from(".press-name", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: { trigger: pressWrap, start: "top 85%", once: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="bg-chalk px-6 py-24 md:px-16">
      <h2
        ref={titleRef}
        className="mb-14 font-display leading-[0.85] text-ink"
        style={{ fontSize: "clamp(52px, 9vw, 120px)" }}
      >
        ABOUT
      </h2>

      <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-2">
        {/* Left — Manifesto */}
        <div ref={manifestoWrapRef} className="manifesto-wrap">
          <p
            className="mb-8 font-mono uppercase tracking-widest"
            style={{ fontSize: 12, color: "var(--muted)" }}
          >
            — OUR MANIFESTO
          </p>

          {MANIFESTO_LINES.map((line) => (
            <div
              key={line.text}
              className="manifesto-line font-display"
              style={{
                fontSize: "clamp(38px, 5.5vw, 68px)",
                lineHeight: 1.05,
                ...(line.outlined ? OUTLINED_TEXT : { color: INK }),
              }}
            >
              {line.text}
            </div>
          ))}

          <Link
            href="/lookbook"
            data-cursor-hover
            className="mt-10 inline-block b-border bg-acid px-7 py-4 font-mono text-xs font-bold uppercase tracking-widest text-ink shadow-[6px_6px_0_0_#0A0A0A] transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_0_#0A0A0A]"
          >
            READ OUR STORY →
          </Link>
        </div>

        {/* Right — Stats & Press */}
        <div className="flex flex-col">
          <div ref={statsWrapRef} className="stats-wrap">
            {BRAND_STATS.map((stat) => (
              <div
                key={stat.label}
                className="stat-row flex items-start gap-8 border-b-[3px] border-ink py-8"
              >
                <div
                  className="shrink-0 font-display leading-none"
                  style={{ fontSize: "clamp(52px, 7vw, 80px)", ...OUTLINED_TEXT }}
                >
                  {stat.value}
                </div>
                <div className="pt-2">
                  <div
                    className="font-mono font-bold uppercase tracking-widest text-ink"
                    style={{ fontSize: 12 }}
                  >
                    {stat.label}
                  </div>
                  <p
                    className="mt-2 font-mono"
                    style={{ fontSize: 13, lineHeight: 1.6, color: "var(--muted)" }}
                  >
                    {STAT_SUBTITLES[stat.label]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Press mentions */}
          <div ref={pressWrapRef} className="press-wrap mt-12">
            <p
              className="font-mono uppercase tracking-widest text-ink"
              style={{ fontSize: 9, opacity: 0.6 }}
            >
              AS SEEN IN
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              {PRESS_MENTIONS.map((name) => (
                <span
                  key={name}
                  className="press-name font-mono font-bold uppercase tracking-widest text-ink"
                  style={{ fontSize: 12, opacity: 0.3 }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
