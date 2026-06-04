"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface LoaderProps {
  onComplete?: () => void;
}

/**
 * Full-screen intro loader. Counts 0 -> 100 while a progress bar fills, holds
 * briefly, then slides up and out and calls onComplete.
 */
export default function Loader({ onComplete }: LoaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  // Keep the latest callback without re-running the timeline.
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useGSAP(
    () => {
      const counter = { value: 0 };
      gsap.set(barRef.current, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline();
      tl.to(
        counter,
        {
          value: 100,
          duration: 1.8,
          ease: "power2.inOut",
          onUpdate: () => setCount(Math.round(counter.value)),
        },
        0
      )
        .to(
          barRef.current,
          { scaleX: 1, duration: 1.8, ease: "power2.inOut" },
          0
        )
        .to(
          rootRef.current,
          {
            yPercent: -100,
            duration: 0.9,
            ease: "power4.inOut",
            onComplete: () => onCompleteRef.current?.(),
          },
          2.2
        );
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-ink"
    >
      <div className="p-6 md:p-10">
        <span className="font-display text-3xl leading-none tracking-wide text-acid md:text-4xl">
          BRUTAL COUTURE
        </span>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <span
          className="text-outlined-acid font-display leading-none"
          style={{ fontSize: "clamp(80px, 18vw, 200px)" }}
        >
          {count}
        </span>
      </div>

      <div className="p-6 md:p-10">
        <p
          className="mb-3 font-mono text-xs uppercase tracking-[0.3em]"
          style={{ color: "var(--muted)" }}
        >
          LOADING SS25 COLLECTION
        </p>
        <div className="h-[3px] w-full bg-mid">
          <div ref={barRef} className="h-full w-full bg-acid" />
        </div>
      </div>
    </div>
  );
}
