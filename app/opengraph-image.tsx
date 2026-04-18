import { ImageResponse } from "next/og";
import { FIRM } from "@/lib/constants";

export const runtime = "edge";
export const alt = `${FIRM.name} — ${FIRM.discipline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F5F2ED",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          fontFamily: "serif",
          color: "#1A1A1A",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              border: "2px solid #1A1A1A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontFamily: "monospace",
              fontWeight: 500,
            }}
          >
            CH
          </div>
          <div style={{ fontSize: 28, letterSpacing: "-0.01em" }}>
            {FIRM.name}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            maxWidth: 900,
          }}
        >
          <div
            style={{
              fontSize: 84,
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              fontWeight: 300,
            }}
          >
            The space where{" "}
            <span style={{ color: "#2D4A38", fontStyle: "italic" }}>
              clinical intuition
            </span>
            , operational discipline, and applied AI converge.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 16,
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "#8A877F",
          }}
        >
          <span>— Charleston, SC · Est. 2025</span>
          <span>chighlandadvisory.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
