import { ImageResponse } from "next/og";

// Next.js File-based Metadata API — generates a 32x32 PNG favicon
export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#04050a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 999,
            background: "#00d97e",
            boxShadow: "0 0 8px #00d97e",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
