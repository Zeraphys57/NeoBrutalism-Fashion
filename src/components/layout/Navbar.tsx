"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { smoothScrollTo } from "@/lib/scrollTo";

gsap.registerPlugin(useGSAP);

// Hash links scroll the homepage; path links route via Next <Link>.
const isRoute = (href: string) => href.startsWith("/");

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openCart, totalItems } = useCart();

  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const firstRender = useRef(true);

  // Toggle the scrolled state past 60px.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while the menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close on Escape, and close if the viewport grows to desktop.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  // Open / close animation.
  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;
      const links = linksRef.current.filter(
        (el): el is HTMLAnchorElement => el !== null
      );

      // Initialise the closed state without animating on mount.
      if (firstRender.current) {
        firstRender.current = false;
        gsap.set(panel, { yPercent: -100 });
        return;
      }

      gsap.killTweensOf([panel, ...links]);

      if (menuOpen) {
        gsap.set(panel, { display: "flex" });
        gsap
          .timeline()
          .fromTo(
            panel,
            { yPercent: -100 },
            { yPercent: 0, duration: 0.7, ease: "power4.inOut" }
          )
          .fromTo(
            links,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.08,
              ease: "power3.out",
            },
            0.35
          );
      } else {
        gsap.to(panel, {
          yPercent: -100,
          duration: 0.7,
          ease: "power4.inOut",
          onComplete: () => {
            gsap.set(panel, { display: "none" });
          },
        });
      }
    },
    { dependencies: [menuOpen] }
  );

  const logoColor = scrolled || menuOpen ? "text-acid" : "text-ink";
  const lineColor = scrolled || menuOpen ? "bg-acid" : "bg-ink";
  const linkColor = scrolled ? "text-chalk" : "text-ink";
  const ctaColors = scrolled
    ? "bg-acid text-ink hover:bg-ink hover:text-acid"
    : "bg-ink text-acid hover:bg-acid hover:text-ink";

  return (
    <>
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b-[3px] px-6 py-5 transition-colors duration-300 md:px-12",
          scrolled ? "border-acid bg-ink" : "border-transparent bg-transparent"
        )}
      >
        <Link
          href="/"
          className={cn(
            "font-display text-2xl leading-none tracking-wide transition-colors duration-300 md:text-3xl",
            logoColor
          )}
        >
          BRUTAL COUTURE
        </Link>

        {/* Desktop links + CTA */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const linkClass = cn(
              "group relative font-mono text-[11px] uppercase tracking-widest transition-colors duration-300",
              linkColor
            );
            const underline = (
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-acid transition-[width] duration-300 ease-out group-hover:w-full" />
            );
            return isRoute(link.href) ? (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
                {underline}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className={linkClass}
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo(link.href);
                }}
              >
                {link.label}
                {underline}
              </a>
            );
          })}

          {/* Cart icon */}
          <button
            type="button"
            onClick={openCart}
            data-cursor-hover
            aria-label={`Open cart${totalItems > 0 ? ` (${totalItems} items)` : ""}`}
            className={cn(
              "relative flex h-10 w-10 items-center justify-center border-[3px] border-current font-display text-xs leading-none tracking-wide transition-colors duration-300 hover:border-acid hover:bg-acid hover:text-ink",
              linkColor
            )}
          >
            BAG
            {totalItems > 0 && (
              <span
                className="absolute flex items-center justify-center rounded-full bg-acid font-display leading-none text-ink"
                style={{
                  top: -8,
                  right: -8,
                  width: 18,
                  height: 18,
                  fontSize: 12,
                  border: "2px solid #0A0A0A",
                }}
              >
                {totalItems}
              </span>
            )}
          </button>

          <button
            type="button"
            className={cn(
              "ml-1 border-[3px] border-current px-5 py-2 font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-300",
              ctaColors
            )}
          >
            SHOP NOW
          </button>
        </div>

        {/* Mobile controls — cart + hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Cart (mobile) — desktop has its own BAG button in the links row. */}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              openCart();
            }}
            aria-label={`Open cart${totalItems > 0 ? ` (${totalItems} items)` : ""}`}
            className={cn(
              "relative flex h-10 w-10 items-center justify-center border-[3px] border-current font-display text-[11px] leading-none tracking-wide transition-colors duration-300",
              logoColor
            )}
          >
            BAG
            {totalItems > 0 && (
              <span
                className="absolute flex items-center justify-center rounded-full bg-acid font-display leading-none text-ink"
                style={{
                  top: -8,
                  right: -8,
                  width: 18,
                  height: 18,
                  fontSize: 12,
                  border: "2px solid #0A0A0A",
                }}
              >
                {totalItems}
              </span>
            )}
          </button>

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[6px]"
          >
          <span
            className={cn("block h-[2px] w-6 origin-center", lineColor)}
            style={{
              transition: "transform 0.3s ease, background-color 0.3s ease",
              transform: menuOpen ? "translateY(8px) rotate(45deg)" : "none",
            }}
          />
          <span
            className={cn("block h-[2px] w-6 origin-center", lineColor)}
            style={{
              transition:
                "transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease",
              transform: menuOpen ? "scaleX(0)" : "none",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className={cn("block h-[2px] w-6 origin-center", lineColor)}
            style={{
              transition: "transform 0.3s ease, background-color 0.3s ease",
              transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none",
            }}
          />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
        className="fixed inset-0 z-40 hidden flex-col justify-center bg-ink px-6"
      >
        <nav className="flex flex-col gap-2">
          {NAV_LINKS.map((link, index) => {
            const refCb = (el: HTMLAnchorElement | null) => {
              linksRef.current[index] = el;
            };
            const className =
              "font-display leading-[0.95] text-chalk transition-colors duration-200 hover:text-acid";
            const style = { fontSize: "clamp(52px, 14vw, 96px)" };
            return isRoute(link.href) ? (
              <Link
                key={link.href}
                href={link.href}
                ref={refCb}
                onClick={() => setMenuOpen(false)}
                className={className}
                style={style}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                ref={refCb}
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  smoothScrollTo(link.href);
                }}
                className={className}
                style={style}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
        <p
          className="absolute bottom-8 left-6 font-mono text-xs tracking-wide"
          style={{ color: "var(--muted)" }}
        >
          © 2025 BRUTAL COUTURE — JAKARTA, IDN
        </p>
      </div>
    </>
  );
}
