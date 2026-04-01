import React from "react";

export default function SVLAISpecialist() {
  return (
    <main className="max-w-2xl mx-auto py-16 px-4 text-center">
      <h1 className="text-4xl font-bold mb-6 text-green-500">SVL AI Specialist</h1>
      <p className="text-lg mb-8 text-slate-200">
        Welcome to the SVL AI Specialist portal.<br />
        Here, you can discover how SVL's advanced AI solutions empower the Keep People Alive (KPA) mission.
      </p>
      <div className="rounded-2xl border border-green-700/40 bg-green-900/20 p-8 shadow-2xl shadow-green-900/30 my-8">
        <h2 className="text-2xl font-bold text-green-400 mb-4">What Makes SVL AI Different?</h2>
        <ul className="list-disc list-inside text-green-200 mb-2 text-left mx-auto max-w-lg">
          <li>Mission-driven: Every AI feature is built to support real lives and real outcomes.</li>
          <li>Transparent: No black boxes—just clear, honest technology.</li>
          <li>Safe: KPA guardrails are built-in, not bolted on.</li>
          <li>Human-centered: Designed to empower, not replace, human wisdom and care.</li>
        </ul>
      </div>
      <p className="mt-8 text-green-300 font-semibold">
        Want to learn more or partner with SVL?
        <br />
        <a href="/contact" className="underline text-green-400 hover:text-green-300">Contact SVL to Keep People Alive</a>
      </p>
    </main>
  );
}
