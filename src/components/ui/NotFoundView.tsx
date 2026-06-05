import Link from "next/link";

const ACID = "#FFE600";

/**
 * Shared, on-brand 404 view. Rendered both by the root `app/not-found.tsx`
 * (which serves invalid /products/[slug] requests once dynamicParams=false
 * rejects them with a real 404 status) and by the co-located product
 * not-found boundary.
 */
export default function NotFoundView() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center">
      <span
        className="font-display leading-none"
        style={{
          fontSize: "clamp(120px, 30vw, 240px)",
          color: "transparent",
          WebkitTextFillColor: "transparent",
          WebkitTextStroke: `3px ${ACID}`,
        }}
      >
        404
      </span>

      <h1
        className="mt-2 font-display uppercase leading-none text-chalk"
        style={{ fontSize: "clamp(32px, 6vw, 48px)" }}
      >
        PRODUCT NOT FOUND
      </h1>

      <p
        className="mt-4 font-mono"
        style={{ fontSize: 13, color: "#888888", maxWidth: 360, lineHeight: 1.7 }}
      >
        Either it sold out or you typed something wrong.
      </p>

      <Link
        href="/"
        data-cursor-hover
        className="mt-10 inline-block b-border bg-acid px-7 py-4 font-mono text-xs font-bold uppercase tracking-widest text-ink shadow-[6px_6px_0_0_#F5F0E8] transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_0_#F5F0E8]"
      >
        ← BACK TO SHOP
      </Link>
    </main>
  );
}
