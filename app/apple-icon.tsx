import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 36,
          background:
            "linear-gradient(155deg, rgba(245,200,66,1) 0%, rgba(255,154,60,1) 45%, rgba(13,13,15,1) 140%)",
          color: "#0d0d0f",
          fontSize: 104,
          fontWeight: 700,
          letterSpacing: "-0.06em",
        }}
      >
        G
      </div>
    ),
    size,
  );
}
