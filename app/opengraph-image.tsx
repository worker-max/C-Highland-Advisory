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
          background: "#F7F5F1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          fontFamily: "sans-serif",
          color: "#0F0F10",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 9999,
              border: "2px solid #0F0F10",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            CH
          </div>
          <div style={{ fontSize: 28, fontWeight: 500 }}>{FIRM.name}</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              fontSize: 86,
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
              fontWeight: 500,
            }}
          >
            Strategy, operations, and applied AI — from someone who has actually done all three.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 15,
            color: "#6B6B6E",
          }}
        >
          <span>{FIRM.location} · Est. {FIRM.founded}</span>
          <span>chighlandadvisory.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
