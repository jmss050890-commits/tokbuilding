import Link from 'next/link';

const readinessItems = [
  'LLC in place with current operating platform already deployed',
  'Pilot structure defined for one property with 60-90 day KPI window',
  'MIIA outbound command center active for email, Facebook, and weekly campaigns',
  'TokHealth wisdom layer and mission-centered wellness experience live in product',
];

const proofItems = [
  'Paid pilot framework with setup, management, training, and scale path defined',
  'Documented valuation model for recurring software, hardware revenue, and strategic premium',
  'Deployment-ready software routes for outreach, logging, and automation already in production',
  'Executive follow-up kit, objection handling, and KPI structure prepared for operator review',
];

const pilotMetrics = [
  'Resident safety engagement rate',
  'Check-in completion rate',
  'Escalation response timeliness',
  'Property team adoption and usability score',
  'Resident confidence and trust feedback',
];

const asks = [
  'Approve a 60-90 day paid pilot in one Cardone-managed property',
  'Confirm the operator or asset-management owner for pilot approval',
  'Lock a next-step decision call with named stakeholders before the meeting ends',
];

const evidenceStatus = [
  {
    label: 'Confirmed',
    color: 'emerald',
    points: [
      'MIIA outreach routes, Facebook bridge, weekly campaign route, and TokHealth wisdom features exist in the live codebase.',
      'Pilot structure, pricing ranges, and KPI checkpoints are documented in current internal materials.',
    ],
  },
  {
    label: 'Assumption-Based',
    color: 'amber',
    points: [
      'The valuation model is directional and depends on ARR, hardware revenue, and strategic premium assumptions.',
      'Commercial upside and expansion speed depend on adoption, operations fit, and execution quality.',
    ],
  },
  {
    label: 'Pending Validation',
    color: 'cyan',
    points: [
      'External partner approvals, pilot property selection, and signed commercial terms still require live confirmation.',
      'Any statement about market urgency, fit, or rollout timing should be framed as current belief pending stakeholder validation.',
    ],
  },
];

export default function ExecutiveBriefPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.14),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(251,191,36,0.14),_transparent_26%),linear-gradient(180deg,_#050816_0%,_#0b1220_48%,_#111827_100%)] text-white">
      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="rounded-3xl border border-cyan-300/20 bg-slate-950/65 p-8 shadow-[0_28px_100px_rgba(0,0,0,0.45)] sm:p-10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/90">
            <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1">SVL-KPA Executive Brief</span>
            <span className="rounded-full border border-amber-300/30 bg-amber-400/10 px-4 py-1 text-amber-100">Mission First</span>
            <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-1 text-emerald-100">Execution Ready</span>
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-400">Prepared for strategic review</p>
              <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl">
                Sanders Viopro Labs is presenting a contained KPA pilot with documented value, live infrastructure, and a clear scale path.
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
                This is not a theory pitch. It is a practical Keep People Alive system for resident safety, crisis support, and measurable operational trust,
                wrapped in a paid pilot structure that gives leadership a clean decision path.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/tokstrategy"
                  className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                >
                  Open Value Model
                </Link>
                <Link
                  href="/sanders-viopro-labs"
                  className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Back To SVL
                </Link>
              </div>
            </div>

            <aside className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">Call Objective</p>
              <p className="mt-3 text-lg leading-8 text-slate-100">
                Secure one clear commitment: a paid 60-90 day pilot in one Cardone-managed property, or a locked decision call with the right operators.
              </p>
              <div className="mt-6 space-y-3 text-sm leading-7 text-slate-200">
                <p><span className="font-semibold text-white">Founder:</span> Jerome Sanders</p>
                <p><span className="font-semibold text-white">Company:</span> Sanders Viopro Labs LLC</p>
                <p><span className="font-semibold text-white">Mission:</span> Keep People Alive</p>
                <p><span className="font-semibold text-white">Contact:</span> 803-665-8263</p>
                <p><span className="font-semibold text-white">Email:</span> Loop2008Tokhealth@outlook.com</p>
              </div>
            </aside>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-emerald-300/20 bg-emerald-500/10 p-6">
            <h2 className="text-xl font-black text-white">What Exists Now</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-emerald-50/95">
              {readinessItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-cyan-300/20 bg-cyan-500/10 p-6">
            <h2 className="text-xl font-black text-white">Proof Stack</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-cyan-50/95">
              {proofItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-amber-300/20 bg-amber-500/10 p-6">
            <h2 className="text-xl font-black text-white">What We Need</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-amber-50/95">
              {asks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
        </div>

        <section className="mt-8 rounded-2xl border border-white/10 bg-slate-950/55 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Evidence status</p>
          <h2 className="mt-2 text-2xl font-black text-white">Every claim should be easy to classify in the room.</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {evidenceStatus.map((group) => (
              <div
                key={group.label}
                className={`rounded-xl border p-4 ${
                  group.color === 'emerald'
                    ? 'border-emerald-300/20 bg-emerald-500/10'
                    : group.color === 'amber'
                      ? 'border-amber-300/20 bg-amber-500/10'
                      : 'border-cyan-300/20 bg-cyan-500/10'
                }`}
              >
                <p className="text-sm font-black uppercase tracking-[0.16em] text-white">{group.label}</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-100">
                  {group.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <section className="rounded-2xl border border-white/10 bg-slate-950/55 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Pilot structure</p>
            <h2 className="mt-2 text-2xl font-black text-white">One property. Paid. Metrics-tracked. Clean scale path.</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-cyan-200">Timeline</p>
                <p className="mt-2 text-base text-white">60-90 day pilot window</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-cyan-200">Commercial range</p>
                <p className="mt-2 text-base text-white">$15K-$35K setup plus $4K-$9K monthly management</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-cyan-200">Decision gates</p>
                <p className="mt-2 text-base text-white">Day 14, Day 30, Day 60 or 90 executive review</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-cyan-200">Scale path</p>
                <p className="mt-2 text-base text-white">Expand to 3-5 properties, then portfolio rollout by market</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-slate-950/55 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Value framing</p>
            <h2 className="mt-2 text-2xl font-black text-white">A documented model, not a hand-waved number.</h2>
            <p className="mt-4 text-base leading-8 text-slate-200">
              SVL has a directional valuation model grounded in recurring software revenue, hardware revenue, and strategic premium assumptions.
              That model is intended for planning and negotiations and is already documented in TokStrategy.
            </p>
            <div className="mt-5 rounded-xl border border-amber-300/20 bg-amber-500/10 p-4">
              <p className="text-sm leading-7 text-amber-50/95">
                Executive language: the model is assumptions-driven, transparent, and designed to be stress-tested live rather than defended emotionally.
              </p>
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-2xl border border-fuchsia-300/20 bg-fuchsia-500/10 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-fuchsia-200">Why this stands out</p>
          <h2 className="mt-2 text-2xl font-black text-white">The system already combines operations, outreach, reporting, and mission voice.</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {pilotMetrics.map((metric) => (
              <div key={metric} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-100">
                {metric}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-slate-950/65 p-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">One clear close</p>
          <h2 className="mt-3 text-3xl font-black text-white">Approve the pilot discovery session and lock the operator path forward.</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-200">
            If the pilot performs, scale becomes a low-friction operational decision. If it does not, leadership has a contained, measured exit.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/tokshow/episode-1"
              className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
            >
              Open Command Center
            </Link>
            <Link
              href="/tokstrategy"
              className="rounded-full border border-amber-300/30 bg-amber-400/10 px-6 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-400/20"
            >
              Review Value Model
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
