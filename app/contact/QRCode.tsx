import React from "react";
import { QRCodeSVG } from "qrcode.react";

export default function ContactQRCode() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h2 className="text-2xl font-bold mb-4 text-amber-200">Scan to Contact Sanders Viopro Labs</h2>
      <QRCodeSVG
        value="https://sandersvioprolabs.com/contact"
        size={192}
        bgColor="#18181b"
        fgColor="#fbbf24"
        level="H"
        includeMargin={true}
      />
      <p className="mt-4 text-slate-300 text-center text-sm">Point your camera here to open our contact page instantly.</p>
    </div>
  );
}
