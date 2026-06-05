import { ImageResponse } from "next/og";

// Social share card (Open Graph + Twitter). Next auto-wires this into the
// page metadata via the file convention, resolved against `metadataBase`.
export const alt = "BRUTAL COUTURE — Wear Your Rage";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACID = "#FFE600";
const INK = "#0A0A0A";
const CHALK = "#F5F0E8";

// Brutalist by composition (hard color blocks, a thick frame, an inverted
// tagline tile) rather than by font weight — no external fonts are fetched, so
// the route renders identically in every build environment.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: INK,
          border: `12px solid ${ACID}`,
          padding: "56px 64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              color: CHALK,
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 6,
            }}
          >
            SS25 — SILENT DYSTOPIA
          </div>
          <div style={{ display: "flex", width: 64, height: 64, backgroundColor: ACID }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: ACID,
              fontSize: 184,
              fontWeight: 800,
              lineHeight: 0.88,
              letterSpacing: -8,
            }}
          >
            BRUTAL
          </div>
          <div
            style={{
              display: "flex",
              color: CHALK,
              fontSize: 184,
              fontWeight: 800,
              lineHeight: 0.88,
              letterSpacing: -8,
            }}
          >
            COUTURE
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              backgroundColor: ACID,
              color: INK,
              fontSize: 32,
              fontWeight: 800,
              letterSpacing: 2,
              padding: "14px 24px",
            }}
          >
            WEAR YOUR RAGE →
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
