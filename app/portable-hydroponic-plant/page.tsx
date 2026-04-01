import React from "react";

export default function PortableHydroponicPlant() {
  return (
    <main className="max-w-2xl mx-auto py-16 px-4 text-center">
      <div className="rounded-3xl border border-green-700/40 bg-green-900/20 p-8 shadow-2xl shadow-green-900/30 my-8">
        <h1 className="text-4xl font-bold mb-6 text-green-500">SVL Portable Hydroponic Plant</h1>
        <p className="text-lg mb-8 text-green-200">
          Welcome to the future of sustainable food and wellness.<br />
          The SVL Portable Hydroponic Plant is designed to empower you to grow fresh, healthy produce anywhere—no soil, no noise, no hassle.
        </p>
        <ul className="list-disc list-inside text-green-200 mb-2 text-left mx-auto max-w-lg">
          <li>Plug-and-grow: Simple setup, no green thumb required.</li>
          <li>Water-wise: Uses up to 90% less water than traditional gardening.</li>
          <li>Year-round harvest: Grow leafy greens, herbs, and more—any season, any climate.</li>
          <li>Safe and smart: Monitored by SVL KPA protocols for your health and safety.</li>
        </ul>
        <div className="mt-8 text-green-300 font-semibold">
          Ready to transform your space and your health?
          <br />
          <a href="/contact" className="underline text-green-400 hover:text-green-300">Contact SVL to Keep People Alive</a>
        </div>
      </div>
    </main>
  );
}
