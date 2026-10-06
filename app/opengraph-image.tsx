import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.role}`;

/** Generated at build time, so a shared link never renders a build-tool logo. */
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
          background: "#fbfaf8",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 14, height: 14, background: "#b4531f" }} />
          <div style={{ fontSize: 28, color: "#6b6b63", letterSpacing: "0.08em" }}>
            {site.role.toUpperCase()}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 86,
              color: "#1b1b19",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {site.name}
          </div>
          <div style={{ fontSize: 34, color: "#6b6b63", lineHeight: 1.35, maxWidth: 900 }}>
            {site.tagline}
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#9a9a90" }}>
          medistan.co.kr · greenbazaar.cloud · keicoplus.com
        </div>
      </div>
    ),
    size,
  );
}
