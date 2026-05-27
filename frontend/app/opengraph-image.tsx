/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

// Next.js File-based Metadata API
export const runtime = "edge";
export const alt = "Vaidy — Your AI Health Copilot, Built for India";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#04050a";
const FG = "#ffffff";
const ACCENT = "#00d97e";
const MUTED = "rgba(255,255,255,0.55)";
const SUBTLE = "rgba(255,255,255,0.30)";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Soft top-center light source */}
        <div
          style={{
            position: "absolute",
            top: -160,
            left: "50%",
            transform: "translateX(-50%)",
            width: 900,
            height: 500,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(0,217,126,0.18) 0%, rgba(0,217,126,0.04) 40%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Subtle bottom gradient for depth */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.55) 100%)",
            display: "flex",
          }}
        />

        {/* Top row — wordmark with accent dot */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            position: "relative",
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: ACCENT,
              boxShadow: `0 0 24px ${ACCENT}`,
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: FG,
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            Vaidy
          </div>
        </div>

        {/* Center — main composition */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            position: "relative",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: ACCENT,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            AI Health Copilot
          </div>

          {/* Headline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div
              style={{
                fontSize: 96,
                fontWeight: 800,
                color: FG,
                letterSpacing: "-0.035em",
                lineHeight: 1.02,
                display: "flex",
              }}
            >
              Your AI Health Copilot
            </div>
            <div
              style={{
                fontSize: 96,
                fontWeight: 800,
                letterSpacing: "-0.035em",
                lineHeight: 1.02,
                color: ACCENT,
                display: "flex",
              }}
            >
              Built for India.
            </div>
          </div>

          {/* Subline */}
          <div
            style={{
              fontSize: 26,
              color: MUTED,
              lineHeight: 1.4,
              maxWidth: 980,
              display: "flex",
            }}
          >
            Upload reports from Apollo, Thyrocare, or Lal Path Labs. Detect trends and
            understand biomarkers in Hindi or English.
          </div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: SUBTLE,
              letterSpacing: "0.04em",
              display: "flex",
            }}
          >
            vaidy.vercel.app
          </div>
          <div
            style={{
              fontSize: 20,
              color: SUBTLE,
              letterSpacing: "0.04em",
              display: "flex",
            }}
          >
            Apollo · Thyrocare · Lal Path Labs · SRL
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
