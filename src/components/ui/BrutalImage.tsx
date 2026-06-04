import Image from "next/image";
import { cn } from "@/lib/utils";
import type { BrutalImageVariant } from "@/types";

const ACID = "#FFE600";
const INK = "#0A0A0A";

interface BrutalImageProps {
  src?: string;
  alt: string;
  aspectRatio?: string;
  variant: BrutalImageVariant;
  /** Small centered caption shown over the placeholder (ignored when src is set). */
  label?: string;
  className?: string;
  /** Set for above-the-fold images; others lazy-load by default. */
  priority?: boolean;
}

// Translucent color used for the pattern / texture fills.
const mix = (color: string, pct: number) =>
  `color-mix(in srgb, ${color} ${pct}%, transparent)`;

/**
 * Artistic stand-in shown until a real photo is dropped in. Each variant is a
 * deliberate geometric composition so empty slots read as a design choice.
 */
function Placeholder({
  variant,
  label,
}: {
  variant: BrutalImageVariant;
  label?: string;
}) {
  const labelColor = variant === "yellow" || variant === "light" ? INK : ACID;

  return (
    <>
      {variant === "dark" && (
        <div className="absolute inset-0 bg-ink">
          {/* Solid acid block, top-left */}
          <div
            className="absolute"
            style={{
              top: "14%",
              left: "12%",
              width: "34%",
              height: "20%",
              backgroundColor: ACID,
            }}
          />
          {/* Acid circle outline, bottom-right */}
          <div
            className="absolute rounded-full"
            style={{
              bottom: "12%",
              right: "12%",
              width: "26%",
              aspectRatio: "1 / 1",
              border: `2px solid ${ACID}`,
            }}
          />
          {/* Faint stacked rules through the middle */}
          <div
            className="absolute left-[16%] right-[16%]"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          >
            <div style={{ height: 2, marginBottom: 8, backgroundColor: ACID, opacity: 0.3 }} />
            <div style={{ height: 2, marginBottom: 8, backgroundColor: ACID, opacity: 0.25 }} />
            <div style={{ height: 2, backgroundColor: ACID, opacity: 0.2 }} />
          </div>
        </div>
      )}

      {variant === "yellow" && (
        <div
          className="absolute inset-0 bg-acid"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, ${mix(INK, 4)} 0, ${mix(INK, 4)} 2px, transparent 2px, transparent 14px)`,
          }}
        >
          {/* Solid ink square, top-right */}
          <div
            className="absolute"
            style={{
              top: "12%",
              right: "12%",
              width: "26%",
              aspectRatio: "1 / 1",
              backgroundColor: INK,
            }}
          />
        </div>
      )}

      {variant === "light" && (
        <div
          className="absolute inset-0 bg-chalk"
          style={{
            backgroundImage: `radial-gradient(${mix(INK, 6)} 1.5px, transparent 1.5px)`,
            backgroundSize: "20px 20px",
          }}
        >
          {/* Centered ink outline frame */}
          <div
            className="absolute"
            style={{ inset: "22%", border: `2px solid ${INK}` }}
          />
        </div>
      )}

      {variant === "pattern" && (
        <div
          className="absolute inset-0 bg-mid"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, ${mix(ACID, 8)} 0, ${mix(ACID, 8)} 2px, transparent 2px, transparent 16px)`,
          }}
        >
          {/* Large centered acid circle outline */}
          <div
            className="absolute rounded-full"
            style={{
              top: "50%",
              left: "50%",
              width: "60%",
              height: "60%",
              transform: "translate(-50%, -50%)",
              border: `2px solid ${ACID}`,
            }}
          />
        </div>
      )}

      {label && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <span
            className="font-display tracking-widest"
            style={{ fontSize: 18, color: labelColor }}
          >
            {label}
          </span>
        </div>
      )}
    </>
  );
}

/**
 * Single wrapper for every image on the site. Pass `src` to render a real
 * photo (next/image, cover-cropped); omit it to render the artistic placeholder
 * for the given `variant`.
 */
export default function BrutalImage({
  src,
  alt,
  aspectRatio = "3/4",
  variant,
  label,
  className,
  priority = false,
}: BrutalImageProps) {
  const hasSrc = typeof src === "string" && src.trim() !== "";

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio }}
    >
      {hasSrc ? (
        <Image
          src={src as string}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
          {...(priority ? { priority: true } : { loading: "lazy" })}
        />
      ) : (
        <Placeholder variant={variant} label={label} />
      )}
    </div>
  );
}
