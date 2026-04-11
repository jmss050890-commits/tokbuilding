"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import TokFamAdminUploader from "./TokFamAdminUploader";

const ADMIN_AUTO_LOCK_MS = 3 * 60 * 1000;

const blessings = [
  "May Miari grow in joy, health, and wisdom.",
  "May her laughter stay loud and her heart stay gentle.",
  "May she be surrounded by love, protection, and purpose.",
  "May every year ahead be stronger than the year before.",
];

const milestoneIdeas = [
  "First words and favorite songs",
  "Favorite books and bedtime moments",
  "Family photos by month and birthday year",
  "Little wins and big memories",
];

const yearOneTimeline = [
  { month: "Month 1", note: "Welcome to the world, Miari. First cuddles, first smiles, first family photos." },
  { month: "Month 2", note: "Growing stronger every day. Tiny hands, bright eyes, and sweet routines." },
  { month: "Month 3", note: "More laughter and personality showing up in every moment." },
  { month: "Month 4", note: "Family rhythm getting stronger. Love and protection all around." },
  { month: "Month 5", note: "Curiosity rising. New expressions, new sounds, new joy." },
  { month: "Month 6", note: "Half-year celebration. A beautiful checkpoint of growth and blessing." },
  { month: "Month 7", note: "Playtime, bonding, and more moments worth saving forever." },
  { month: "Month 8", note: "So much learning in little ways. Big spirit in a small package." },
  { month: "Month 9", note: "Steady growth and strong family support through every season." },
  { month: "Month 10", note: "More confidence, more sparkle, more unforgettable moments." },
  { month: "Month 11", note: "Approaching year one with gratitude and proud family energy." },
  { month: "Month 12", note: "Happy first birthday, Miari. One year loved, protected, and celebrated." },
];

const galleryItems = [
  { caption: "Birthday smile and cake moment", src: "/tokfam/miari-01-birthday.jpg", fileName: "miari-01-birthday.jpg" },
  { caption: "Favorite outfit photo", src: "/tokfam/miari-02-outfit.jpg", fileName: "miari-02-outfit.jpg" },
  { caption: "Family hug picture", src: "/tokfam/miari-03-family-hug.jpg", fileName: "miari-03-family-hug.jpg" },
  { caption: "Playtime memory", src: "/tokfam/miari-04-playtime.jpg", fileName: "miari-04-playtime.jpg" },
  { caption: "Nap-time angel photo", src: "/tokfam/miari-05-naptime.jpg", fileName: "miari-05-naptime.jpg" },
  { caption: "First-year highlight shot", src: "/tokfam/miari-06-highlight.jpg", fileName: "miari-06-highlight.jpg" },
];

export default function TokFamPage() {
  const [imageVersion, setImageVersion] = useState(() => Date.now());
  const [adminMode, setAdminMode] = useState(false);
  const [adminStatus, setAdminStatus] = useState("");
  const inactivityTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clearTimer = () => {
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
        inactivityTimeoutRef.current = null;
      }
    };

    if (!adminMode) {
      clearTimer();
      return;
    }

    const resetInactivityTimer = () => {
      clearTimer();
      inactivityTimeoutRef.current = setTimeout(() => {
        setAdminMode(false);
        setAdminStatus("Admin Mode auto-locked after 3 minutes of inactivity.");
      }, ADMIN_AUTO_LOCK_MS);
    };

    const activityEvents: Array<keyof WindowEventMap> = [
      "click",
      "keydown",
      "mousemove",
      "scroll",
      "touchstart",
    ];

    resetInactivityTimer();
    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, resetInactivityTimer, { passive: true });
    });

    return () => {
      clearTimer();
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, resetInactivityTimer);
      });
    };
  }, [adminMode]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.22),_transparent_26%),radial-gradient(circle_at_85%_15%,_rgba(34,211,238,0.2),_transparent_28%),linear-gradient(180deg,_#14061c_0%,_#1f1230_42%,_#111827_100%)] text-white">
      <main className="mx-auto max-w-6xl px-6 py-14">
        <section className="rounded-3xl border border-pink-300/25 bg-black/35 p-8 shadow-[0_28px_90px_rgba(0,0,0,0.45)]">
          <p className="inline-flex rounded-full border border-pink-300/35 bg-pink-400/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-pink-200">
            TokFam
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">
            Celebrating Miari
          </h1>
          <p className="mt-4 max-w-3xl text-xl text-pink-100">Great, great niece. One year old. Fully loved.</p>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-200">
            TokFam is a family honor page built to celebrate Miari at age 1. This is a space for joy,
            blessing, and memory keeping, with love at the center and legacy in view.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/sanders-viopro-labs" className="rounded-full bg-pink-500 px-6 py-3 font-bold text-white transition hover:bg-pink-400">
              Back To SVL Home
            </Link>
            <Link href="/sanders-viopro-labs/gifts" className="rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-pink-300 hover:text-pink-200">
              Open Gifts Archive
            </Link>
            <Link href="/tokfam/keepsake" className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-6 py-3 font-semibold text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-400/20 hover:text-white">
              Open Printable Keepsake
            </Link>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-cyan-300/20 bg-slate-950/55 p-7">
            <h2 className="text-2xl font-bold text-cyan-200">Blessings For Miari</h2>
            <ul className="mt-5 space-y-3 text-lg leading-8 text-slate-100">
              {blessings.map((blessing) => (
                <li key={blessing} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  {blessing}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-amber-300/20 bg-slate-950/55 p-7">
            <h2 className="text-2xl font-bold text-amber-200">Year One Memory Lane</h2>
            <p className="mt-4 text-base leading-8 text-slate-200">
              Use this page as a gentle family journal. Add moments over time so Miari can look back and see
              how deeply she was celebrated from the beginning.
            </p>
            <ul className="mt-5 space-y-3 text-base leading-8 text-slate-100">
              {milestoneIdeas.map((idea) => (
                <li key={idea} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  {idea}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-10 rounded-3xl border border-fuchsia-300/20 bg-gradient-to-br from-fuchsia-500/10 to-transparent p-8">
          <h2 className="text-3xl font-black text-white">Family Promise</h2>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-100">
            We celebrate Miari with protection, joy, and intentional love. We will keep showing up, speaking
            life, and building a family legacy she can stand on.
          </p>
          <p className="mt-5 text-sm uppercase tracking-[0.22em] text-fuchsia-200">
            TokFam x KPA | Keep People Alive Through Family Love
          </p>
        </section>

        <section className="mt-10 rounded-3xl border border-rose-300/20 bg-slate-950/50 p-8">
          <h2 className="text-3xl font-black text-white">Miari Photo Gallery</h2>
          <p className="mt-4 text-lg leading-8 text-slate-200">
            Upload photos into public/tokfam using the exact file names shown on each card. The gallery is now wired to real image paths.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item) => (
              <article key={item.fileName} className="rounded-2xl border border-white/10 bg-gradient-to-br from-pink-500/10 to-cyan-500/10 p-4">
                <div
                  className="h-40 rounded-xl border border-dashed border-white/25 bg-black/20 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.src}?v=${imageVersion})` }}
                  aria-label={item.caption}
                >
                  <div className="h-full w-full bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                </div>
                <p className="mt-3 text-sm font-semibold tracking-wide text-pink-100">{item.caption}</p>
                <p className="mt-1 text-xs text-cyan-200">File: {item.fileName}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-300">
            Upload location: public/tokfam
          </p>
        </section>

        <section className="mt-10 rounded-3xl border border-cyan-300/25 bg-slate-950/60 p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-white">Admin Mode</h2>
              <p className="mt-2 text-sm leading-7 text-slate-200">
                Uploader is hidden by default. Turn on Admin Mode to manage TokFam photos.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setAdminMode((current) => !current);
                setAdminStatus("");
              }}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                adminMode
                  ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                  : "border border-cyan-300/40 bg-cyan-400/10 text-cyan-100 hover:bg-cyan-400/20"
              }`}
            >
              {adminMode ? "Hide Admin Uploader" : "Show Admin Uploader"}
            </button>
          </div>
          {adminStatus ? <p className="mt-4 text-sm text-cyan-200">{adminStatus}</p> : null}
        </section>

        {adminMode ? <TokFamAdminUploader onUploadComplete={() => setImageVersion(Date.now())} /> : null}

        <section className="mt-10 rounded-3xl border border-emerald-300/20 bg-gradient-to-br from-emerald-500/10 to-transparent p-8">
          <h2 className="text-3xl font-black text-white">Miari Year One Timeline</h2>
          <p className="mt-4 text-lg leading-8 text-slate-200">
            Month-by-month milestones to honor her first year with love and intention.
          </p>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {yearOneTimeline.map((item) => (
              <article key={item.month} className="rounded-2xl border border-white/10 bg-black/25 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">{item.month}</p>
                <p className="mt-2 text-base leading-7 text-slate-100">{item.note}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
