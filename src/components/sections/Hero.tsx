"use client";

import { useRef, type CSSProperties } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_STATS, HERO_IMAGE_SRC } from "@/lib/data";
import { cn } from "@/lib/utils";
import BrutalImage from "@/components/ui/BrutalImage";
import { smoothScrollTo } from "@/lib/scrollTo";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const headingStyle: CSSProperties = {
  fontSize: "clamp(80px, 15vw, 196px)",
  letterSpacing: "-2px",
  lineHeight: 1,
};
const SQUARE = "clamp(280px, 45vw, 380px)";
const badgeLabel: CSSProperties = { fontSize: "clamp(7px, 1vw, 10px)" };

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".hero-line", {
        y: 130,
        opacity: 0,
        duration: 1,
        stagger: 0.14,
        ease: "power4.out",
        delay: 0.1,
      });
      gsap.from(".hero-geo", {
        scale: 0.7,
        opacity: 0,
        duration: 1,
        delay: 0.3,
      });
      gsap.from(".hero-image", {
        x: 80,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });
      gsap.from(".hero-sub", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.7,
      });
      gsap.from(".hero-cta", {
        scale: 0.85,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.9,
        ease: "back.out(1.5)",
      });
      gsap.from(".hero-stat", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        delay: 1,
      });
      gsap.fromTo(
        ".hero-badge",
        { scale: 0, rotate: -30, opacity: 0 },
        {
          scale: 1,
          rotate: -12,
          opacity: 1,
          duration: 0.8,
          delay: 1.1,
          ease: "back.out(2)",
        }
      );

      // Parallax — scrubbed across the Hero's own scroll range. Each layer moves
      // at a different rate. These animate `y`, while the entrance tweens above
      // animate other transform sub-properties (or other elements), so the two
      // sets coexist without fighting over the same property.
      const parallax = () => ({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      });
      gsap.to(".hero-text", { y: -80, ease: "none", scrollTrigger: parallax() });
      gsap.to(".hero-geo", { y: -120, ease: "none", scrollTrigger: parallax() });
      gsap.to(".hero-badge", { y: -60, ease: "none", scrollTrigger: parallax() });
      gsap.to(".hero-image", { y: -100, ease: "none", scrollTrigger: parallax() });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="noise-overlay relative flex min-h-screen flex-col justify-end overflow-hidden bg-chalk"
    >
      {/* Grid texture */}
      <div className="grid-bg absolute inset-0 z-0" aria-hidden />

      {/* Geometric blocks, top-right */}
      <div
        className="hero-geo pointer-events-none absolute z-0"
        aria-hidden
        style={{
          top: "clamp(40px, 8vh, 96px)",
          right: 0,
          width: `calc(${SQUARE} + 32px)`,
          height: `calc(${SQUARE} + 32px)`,
        }}
      >
        <div
          className="b-border absolute right-0 top-0 bg-acid"
          style={{ width: SQUARE, height: SQUARE }}
        />
        <div
          className="absolute bg-ink"
          style={{ width: SQUARE, height: SQUARE, top: "32px", right: "32px" }}
        />
      </div>

      {/* Hero image zone — swaps to a photo once HERO_IMAGE_SRC is set.
          Outer div owns the static translateY(-50%) centering; the inner
          `.hero-image` owns the GSAP-animated transforms (entrance x + parallax y). */}
      <div
        className="absolute z-[5] hidden md:block"
        style={{
          top: "50%",
          right: "clamp(48px, 9vw, 140px)",
          transform: "translateY(-50%)",
          width: "clamp(280px, 24vw, 340px)",
        }}
      >
        <div className="hero-image">
          <BrutalImage
            src={HERO_IMAGE_SRC}
            alt="SS25 hero look"
            variant="dark"
            aspectRatio="4/5"
            label="SS25 HERO"
            priority
            className="b-border shadow-[10px_10px_0_0_#FFE600]"
          />
        </div>
      </div>

      {/* Season badge */}
      <div
        className="hero-badge absolute z-20 flex flex-col items-center justify-center overflow-hidden rounded-full b-border bg-acid px-3 text-center text-ink"
        style={{
          top: "clamp(160px, 22vw, 300px)",
          right: "clamp(120px, 18vw, 280px)",
          width: "clamp(96px, 12vw, 144px)",
          height: "clamp(96px, 12vw, 144px)",
        }}
      >
        <span
          className="font-mono font-bold uppercase tracking-[0.2em]"
          style={badgeLabel}
        >
          SEASON
        </span>
        <span
          className="font-display leading-none"
          style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
        >
          SS25
        </span>
        <span
          className="font-mono font-bold uppercase tracking-[0.2em]"
          style={badgeLabel}
        >
          NEW DROP
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 px-6 pb-10 md:px-12">
        <h1 aria-label="Wear Your Rage" className="hero-text select-none text-ink">
          <span className="flex overflow-hidden">
            <span className="hero-line text-ink" style={headingStyle}>
              WEAR
            </span>
          </span>
          <span className="flex overflow-hidden">
            <span
              className="hero-line text-outlined"
              style={{ ...headingStyle, WebkitTextStroke: "3px var(--ink)" }}
            >
              YOUR
            </span>
          </span>
          <span className="flex overflow-hidden">
            <span className="hero-line relative text-ink" style={headingStyle}>
              RAGE.
              <span className="glitch-layer" aria-hidden style={headingStyle}>
                RAGE.
              </span>
            </span>
          </span>
        </h1>

        {/* Subtext + CTAs */}
        <div className="hero-sub mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xs font-mono text-sm leading-relaxed text-ink/70">
            Fashion for those who refuse
            <br />
            to be invisible. Brutally honest.
            <br />
            Brutally beautiful.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="hero-cta">
              <a
                href="#collections"
                data-cursor-hover
                aria-label="Shop the SS25 collection"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo("collections");
                }}
                className="inline-block b-border bg-ink px-7 py-4 font-mono text-xs font-bold uppercase tracking-widest text-acid shadow-[6px_6px_0_0_#FFE600] transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_0_#FFE600]"
              >
                SHOP SS25 →
              </a>
            </div>
            <div className="hero-cta">
              <Link
                href="/lookbook"
                data-cursor-hover
                aria-label="View the SS25 lookbook"
                className="inline-block b-border bg-transparent px-7 py-4 font-mono text-xs font-bold uppercase tracking-widest text-ink transition-colors duration-200 hover:bg-ink hover:text-acid"
              >
                LOOKBOOK
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative z-10 flex w-full border-t-[3px] border-ink">
        {HERO_STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={cn(
              "hero-stat flex-1 px-4 py-5 md:px-6",
              i < HERO_STATS.length - 1 && "border-r-[3px] border-ink"
            )}
          >
            <div
              className="font-display leading-none"
              style={{ fontSize: "clamp(20px, 3vw, 40px)" }}
            >
              {stat.value}
            </div>
            <div
              className="mt-1 font-mono uppercase tracking-[0.2em]"
              style={{ fontSize: "10px" }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
