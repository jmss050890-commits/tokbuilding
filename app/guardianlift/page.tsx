"use client";

import React from "react";
import Link from "next/link";

export default function GuardianLiftPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-slate-800/70 border border-blue-700/40 rounded-xl shadow-2xl p-8 text-center">
        <h1 className="text-4xl font-extrabold text-blue-200 mb-4 tracking-tight drop-shadow-lg">
          The Guardians' Lift
        </h1>
        <p className="text-blue-100 text-lg mb-6">
          A world-class, private community shout-out arena for those advancing the KPA mission. Entry is by acceptance only—each nomination is reviewed personally by Jerome Sanders.
        </p>
        <div className="mb-8">
          <span className="inline-block bg-blue-900/60 text-blue-200 px-4 py-2 rounded-full text-sm font-semibold mb-2">
            Elite Security & Privacy
          </span>
          <p className="text-blue-300 text-sm">
            All submissions and member data are strictly confidential. Only accepted members can view or participate. Your privacy and safety are our highest priority.
          </p>
        </div>
        <Link href="/" className="inline-block mt-6 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg shadow transition">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
