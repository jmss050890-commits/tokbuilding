'use client';

import Link from 'next/link';

const creationStamp = 'Created 2026-04-07 05:31:30 AM -05:00';

const launchLanes = [
  {
    title: 'First Guardian Weekly',
    href: '/first-guardian',
    description: 'Community leadership, family protection, and real-life faith guidance.',
    tag: 'Community',
  },
  {
    title: 'Mr. KPA Weekly Training',
    href: '/agent/mr-kpa',
    description: 'Standards, structure, and live coaching for business, family, and purpose.',
    tag: 'Wisdom',
  },
  {
    title: 'TokShow Story Lane',
    href: '/tokshow',
    description: 'Kysen and Bam Bam storytelling for families, safety, and culture impact.',
    tag: 'Story',
  },
  {
    title: 'Amen Heartbeat',
    href: '/amen',
    description: 'Faith anchor, closing banner, and signature spiritual tone for every production.',
    tag: 'Faith',
  },
];

const readinessChecks = [
  'Banner locked: Amen. It is established.',
  'Mission locked: community, faith, and wisdom in real-life situations.',
  'Primary lanes staged: First Guardian, Mr. KPA, TokShow, Amen.',
  'Operator-ready links staged under SVL for immediate access.',
  'Approval gate active: no public launch action without Jerome approval.',
];

const operatorSequence = [
  'Review the green room and confirm which lane goes first.',
  'Open the selected live surface and verify language, CTA, and banner.',
  'Confirm launch approval verbally, then move from staging to public promotion.',
];

export default function SPLPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.16),_transparent_24%),radial-gradient(circle_at_82%_18%,_rgba(34,197,94,0.12),_transparent_24%),linear-gradient(180deg,_#081119_0%,_#0f172a_44%,_#1e1b4b_100%)] text-white">
      <main className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/sanders-viopro-labs"
            className="inline-flex items-center rounded-full border border-cyan-300/35 bg-cyan-400/10 px-5 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
          >
            Back To SVL Home
          </Link>
          <span className="rounded-full border border-amber-300/40 bg-amber-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-amber-100">
            Approval Required Before Launch
          </span>
        </div>
        <p className="mb-8 text-sm font-medium tracking-[0.18em] text-slate-300">
          {creationStamp}
        </p>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-200">SVL-KPA-SPL Green Room</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-black leading-tight text-white sm:text-6xl">
              Amen. It is established.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              SPL is staged as a soulful, community-centered launch system under Sanders Viopro Labs. The message is clear: faith first, wisdom applied, real-life service, and no live launch without your approval.
            </p>
            <div className="mt-8 rounded-[1.5rem] border border-emerald-300/20 bg-emerald-400/10 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">Master Banner</p>
              <p className="mt-3 text-3xl font-bold text-white">Amen. It is established.</p>
              <p className="mt-3 text-base text-emerald-100">Faith. Wisdom. Work. Provision.</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-50/90">{creationStamp}</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-amber-300/20 bg-black/30 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-200">Readiness Status</p>
            <div className="mt-5 rounded-3xl border border-amber-200/20 bg-amber-400/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-100">Gate State</p>
              <p className="mt-2 text-2xl font-bold text-white">Prepared, not publicly launched</p>
              <p className="mt-3 text-sm leading-7 text-slate-200">
                This page is the staging map. It prepares the lanes, the language, and the sequence while keeping the final launch under your direct approval.
              </p>
            </div>
            <div className="mt-6 space-y-3">
              {readinessChecks.map((item) => (
                <div key={item} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-slate-100">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-[2rem] border border-cyan-300/15 bg-slate-950/45 p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Launch Lanes</p>
                <h2 className="mt-2 text-3xl font-bold text-white">Open the exact surfaces, keep the public go-live separate.</h2>
              </div>
              <Link
                href="/vcc-hub"
                className="rounded-full border border-cyan-200/30 bg-cyan-400/10 px-5 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
              >
                Open VCC Hub
              </Link>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {launchLanes.map((lane) => (
                <Link
                  key={lane.title}
                  href={lane.href}
                  className="rounded-[1.5rem] border border-white/8 bg-white/5 p-5 transition hover:border-cyan-200/40 hover:bg-white/10"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-bold text-white">{lane.title}</h3>
                    <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
                      {lane.tag}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{lane.description}</p>
                  <p className="mt-4 text-sm font-semibold text-amber-200">Open lane for review</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-fuchsia-300/15 bg-fuchsia-950/10 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-fuchsia-200">Operator Sequence</p>
            <div className="mt-5 space-y-4">
              {operatorSequence.map((step, index) => (
                <div key={step} className="rounded-[1.5rem] border border-white/8 bg-black/20 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-100">Step {index + 1}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-200">{step}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[1.5rem] border border-amber-300/20 bg-amber-400/10 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-100">Approval Lock</p>
              <p className="mt-3 text-base leading-7 text-slate-100">
                No button on this page performs a public SPL launch. This is the staging and control room only. Final promotion and rollout stay manual until you say go.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}