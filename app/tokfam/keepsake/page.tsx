"use client";

import Link from "next/link";

const keepsakeBlessings = [
  "Miari, you are deeply loved.",
  "Your first year is covered in joy and protection.",
  "Your family celebrates your life with gratitude.",
  "You are part of a legacy built with love and purpose.",
];

export default function TokFamKeepsakePage() {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 print:bg-white">
      <main className="mx-auto max-w-4xl px-6 py-10 print:py-6">
        <div className="mb-6 flex flex-wrap gap-3 print:hidden">
          <Link
            href="/tokfam"
            className="rounded-full border border-slate-300 px-5 py-2 font-semibold text-slate-800 transition hover:bg-slate-100"
          >
            Back To TokFam
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-full bg-pink-600 px-5 py-2 font-semibold text-white transition hover:bg-pink-500"
          >
            Print Keepsake
          </button>
        </div>

        <section className="rounded-2xl border-4 border-pink-200 p-8 print:border-pink-300">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-pink-600">TokFam Keepsake</p>
          <h1 className="mt-3 text-center text-4xl font-black">Celebrating Miari</h1>
          <p className="mt-2 text-center text-lg text-slate-700">Great, great niece | Age 1</p>

          <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-slate-700">
            This keepsake honors Miari's first year with family love, celebration, and blessing.
            May this page be a memory marker for the journey ahead.
          </p>

          <div className="mt-8 grid gap-3">
            {keepsakeBlessings.map((line) => (
              <div key={line} className="rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 text-lg leading-8">
                {line}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Family Signature Space</p>
            <p className="mt-4">Name: __________________________________________</p>
            <p className="mt-3">Blessing: _______________________________________</p>
            <p className="mt-3">Date: __________________________________________</p>
          </div>

          <p className="mt-8 text-center text-sm uppercase tracking-[0.22em] text-slate-500">
            Printed on {today} | TokFam x KPA | Keep People Alive Through Family Love
          </p>
        </section>
      </main>
    </div>
  );
}
