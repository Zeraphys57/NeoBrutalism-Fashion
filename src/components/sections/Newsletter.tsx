"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Pragmatic email check — non-empty local part, @, domain, dot, TLD.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Newsletter() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <section className="border-y-[3px] border-ink bg-acid px-6 py-20 md:px-16">
      <div ref={contentRef} className="mx-auto max-w-2xl text-center">
        <p
          className="font-mono text-xs uppercase tracking-[0.25em]"
          style={{ color: "var(--muted)" }}
        >
          DON&apos;T MISS THE DROP
        </p>
        <h2
          className="mt-4 font-display leading-[0.95] text-ink"
          style={{ fontSize: "clamp(52px, 9vw, 108px)" }}
        >
          <span className="block">GET EARLY</span>
          <span className="block">ACCESS.</span>
        </h2>

        {submitted ? (
          <div className="mt-10 w-full b-border bg-ink px-6 py-6 text-acid shadow-[7px_7px_0_0_#FFE600]">
            <span className="font-mono text-sm font-bold uppercase tracking-widest">
              ✓ YOU&apos;RE IN. STAY BRUTAL.
            </span>
          </div>
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-10 flex b-border shadow-[7px_7px_0_0_#0A0A0A]"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                aria-label="Email address"
                className="min-w-0 flex-1 appearance-none border-0 border-r-[3px] border-ink bg-chalk px-5 py-4 font-mono text-sm text-ink outline-none placeholder:text-ink/40"
              />
              <button
                type="submit"
                data-cursor-hover
                className="shrink-0 border-0 bg-ink px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest text-acid transition-colors duration-200 hover:bg-mid md:px-8"
              >
                NOTIFY ME →
              </button>
            </form>
            {error && (
              <p className="mt-3 font-mono text-xs text-ink">⚠ {error}</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
