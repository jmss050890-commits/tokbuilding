import Link from "next/link";

const launchChecklist = [
  "Use this deployment video as the anchor asset for outreach and follow-up.",
  "Add tomorrow's 8:00 PM training replay to this page after the live session.",
  "Drive traffic from MIIA email, Facebook, and your executive brief resources.",
];

const monetizationMoves = [
  {
    title: "Workshop Access",
    detail: "Offer live access plus Q&A as the first paid entry point.",
    price: "$25-$49",
  },
  {
    title: "Replay Bundle",
    detail: "Package the deployment video, session notes, and checklist into a digital product.",
    price: "$9-$29",
  },
  {
    title: "Implementation Session",
    detail: "Sell a 1:1 or small-group setup call for people ready to deploy their own system.",
    price: "$75-$250",
  },
];

const roadmapTargets = [
  "Year 1 SVL-KPA target: $250,000 gross revenue ($20,833 monthly run-rate baseline).",
  "Year 3 SVL-KPA target: $1,000,000 gross revenue through partner channels and proven delivery systems.",
  "Year 5 SVL-KPA target: $3,000,000 gross revenue with recurring mission services as the operational base.",
];

const executionPillars = [
  "Model: Keep every offer simple, outcome-driven, and mission aligned.",
  "Leads: Build automated follow-up for every inbound source so no opportunity is lost.",
  "Prioritize: Weekly operating order is traffic -> leads -> sales -> fulfillment.",
  "Grow: Track leading indicators weekly and correct rapidly with discipline.",
];

const svlNextActions = [
  "Finalize the SVL-KPA annual scoreboard and assign one accountable owner per metric.",
  "Launch one core offer funnel from TokShow and MIIA traffic this week.",
  "Deploy 7-touch follow-up automation across email and direct outreach lanes.",
  "Run Monday pipeline review and Friday close-rate review every week without fail.",
];

const monthlyCadence = [
  "Month 1-3: Build lead engine, validate message, and close the first repeatable wins.",
  "Month 4-6: Increase appointment volume and strengthen conversion performance.",
  "Month 7-9: Expand partnerships, grow referral channels, and raise average deal value.",
  "Month 10-12: Systemize execution, harden delivery quality, and lock Year 2 pipeline depth.",
];

const pipelineMath = [
  "SVL-KPA monthly revenue baseline: $20,833",
  "SVL-KPA average deal target: $1,500",
  "Deals required per month: 14",
  "Planning close-rate assumption: 20%",
  "Qualified calls required per month: 70",
  "Qualified calls required per week: 18",
];

export default function TrainingCenterPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_28%),linear-gradient(180deg,_#07130f_0%,_#0a1f19_42%,_#081311_100%)] text-white">
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="rounded-3xl border border-emerald-300/20 bg-black/30 p-8 shadow-[0_26px_90px_rgba(0,0,0,0.45)]">
          <p className="inline-flex rounded-full border border-emerald-300/35 bg-emerald-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">
            SVL Training Subdomain
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">Smart Hydroponic Garden Training Center</h1>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-emerald-50/90">
            Dedicated home for the deployment video now, with tomorrow's 8:00 PM training ready to drop into the same experience without crowding the main site.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/portable-hydroponic-plant" className="rounded-full bg-emerald-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-300">
              Portable Hydroponic Plant
            </Link>
            <Link href="/tokshow/immediate-income" className="rounded-full border border-cyan-300/35 bg-cyan-400/10 px-6 py-3 font-semibold text-cyan-100 transition hover:bg-cyan-400/20">
              Income Resource
            </Link>
          </div>
        </div>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
          <article className="rounded-3xl border border-white/10 bg-slate-950/55 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Deployment Video</p>
                <h2 className="mt-2 text-3xl font-black text-white">Current Training Asset</h2>
              </div>
              <a
                href="/training/smart-hydroponic-garden-deployment.mp4"
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Open MP4
              </a>
            </div>
            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
              <video
                className="h-auto w-full"
                controls
                preload="metadata"
                playsInline
                src="/training/smart-hydroponic-garden-deployment.mp4"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              This page is structured so tomorrow's training can be added as the next featured asset without redesigning anything.
            </p>
          </article>

          <aside className="space-y-6">
            <article className="rounded-3xl border border-amber-300/20 bg-amber-400/10 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-200">Tomorrow</p>
              <h2 className="mt-2 text-2xl font-black text-white">Training Drop Scheduled</h2>
              <p className="mt-3 text-base leading-7 text-amber-50">
                Tomorrow at 8:00 PM, add the new training and keep this page as the official replay hub.
              </p>
            </article>

            <article className="rounded-3xl border border-emerald-300/20 bg-emerald-500/10 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Launch Checklist</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-100">
                {launchChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </aside>
        </section>

        <section className="mt-10 rounded-3xl border border-emerald-300/25 bg-black/25 p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Workshop To Execution</p>
          <h2 className="mt-2 text-3xl font-black text-white">SVL-KPA Professional Roadmap</h2>
          <p className="mt-3 max-w-4xl text-base leading-7 text-emerald-50/90">
            This layer translates training into SVL-KPA operational moves so mission focus, delivery quality, and measurable outcomes stay aligned.
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <article className="rounded-2xl border border-white/10 bg-slate-950/55 p-5">
              <h3 className="text-lg font-bold text-white">Targets</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-200">
                {roadmapTargets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-white/10 bg-slate-950/55 p-5">
              <h3 className="text-lg font-bold text-white">Execution Pillars</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-200">
                {executionPillars.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-white/10 bg-slate-950/55 p-5">
              <h3 className="text-lg font-bold text-white">Next 7-Day Actions</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-200">
                {svlNextActions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-cyan-300/20 bg-cyan-950/20 p-5">
              <h3 className="text-lg font-bold text-white">12-Month Execution Cadence</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-cyan-50">
                {monthlyCadence.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-amber-300/20 bg-amber-950/20 p-5">
              <h3 className="text-lg font-bold text-white">Pipeline Math (SVL-KPA Baseline)</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-amber-50">
                {pipelineMath.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-cyan-300/20 bg-black/25 p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Revenue Layer</p>
          <h2 className="mt-2 text-3xl font-black text-white">Monetize The Training</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {monetizationMoves.map((move) => (
              <article key={move.title} className="rounded-2xl border border-white/10 bg-slate-950/55 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-white">{move.title}</h3>
                  <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-100">{move.price}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{move.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}