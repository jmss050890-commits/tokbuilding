import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at top, rgba(245,200,66,0.22) 0%, rgba(245,200,66,0.06) 30%, #0d0d0f 80%)",
          color: "#f5c842",
          fontSize: 280,
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
