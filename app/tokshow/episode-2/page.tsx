import Link from "next/link";

const beats = [
  {
    title: "Act 1 - The Bus Stop Risk",
    points: [
      "A Monday rush leaves younger kids waiting without consistent adult coverage.",
      "Cars are doubling back in the same lane, creating blind crossing moments.",
      "Kysen and Bam Bam spot repeat near-misses before first period.",
    ],
  },
  {
    title: "Act 2 - The Shield Plan",
    points: [
      "Kysen maps a two-zone wait area with clear kid and parent lanes.",
      "Bam Bam coordinates a rotating watch list with five-minute handoff checks.",
      "They build one call-and-response rule so every child is visually confirmed.",
    ],
  },
  {
    title: "Act 3 - Safe Departures",
    points: [
      "Bus loading is calm, consistent, and visible from all angles.",
      "A late parent pickup is managed with check-in protocol instead of panic.",
      "The neighborhood adopts the shield plan for every school day.",
    ],
  },
];

const dialogue = [
  { speaker: "Kysen", line: "Structure beats stress. We set the lanes first." },
  { speaker: "Bam Bam", line: "I got the handoff watch. No kid waits unseen." },
  { speaker: "Kysen", line: "Say the name, confirm the face, log the move." },
  { speaker: "Bam Bam", line: "Bus stop shield is up. We run this every morning." },
];

const actionCard = [
  "Mark one safe waiting zone.",
  "Assign one adult handoff lead.",
  "Use one verbal check-in rule for every child.",
  "Post one backup contact list in the lane.",
];

export default function TokShowEpisodeTwoPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_12%_10%,_rgba(34,197,94,0.18),_transparent_32%),radial-gradient(circle_at_85%_18%,_rgba(56,189,248,0.14),_transparent_28%),linear-gradient(180deg,_#0a0f1e_0%,_#0f1f2e_45%,_#171229_100%)] text-white">
      <section className="mx-auto max-w-5xl px-6 py-14">
        <div className="rounded-3xl border border-emerald-300/25 bg-black/30 p-8 shadow-[0_26px_90px_rgba(0,0,0,0.45)]">
          <p className="inline-flex rounded-full border border-emerald-300/35 bg-emerald-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">
            TokShow Episode 02
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">The Bus Stop Shield</h1>
          <p className="mt-3 text-lg leading-8 text-emerald-100">
            Kysen and Bam Bam install a practical morning protection system so no child is left exposed at pickup.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/tokshow" className="rounded-full bg-emerald-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-300">
              Back To TokShow
            </Link>
            <Link href="/tokshow/episode-1" className="rounded-full border border-cyan-300/35 bg-cyan-400/10 px-6 py-3 font-semibold text-cyan-100 transition hover:bg-cyan-400/20">
              View Episode 1
            </Link>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          {beats.map((beat) => (
            <article key={beat.title} className="rounded-2xl border border-white/10 bg-slate-950/55 p-6">
              <h2 className="text-2xl font-black text-white">{beat.title}</h2>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-8 text-slate-200">
                {beat.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}

          <article className="rounded-2xl border border-white/10 bg-slate-950/55 p-6">
            <h2 className="text-2xl font-black text-white">Dialogue Highlights</h2>
            <div className="mt-4 space-y-3">
              {dialogue.map((line) => (
                <p key={`${line.speaker}-${line.line}`} className="rounded-xl border border-emerald-300/15 bg-emerald-400/5 px-4 py-3 text-base leading-8 text-slate-100">
                  <span className="font-bold text-emerald-200">{line.speaker}:</span> {line.line}
                </p>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-emerald-300/25 bg-gradient-to-br from-emerald-500/10 to-transparent p-6">
            <h2 className="text-2xl font-black text-white">KPA Action Step</h2>
            <p className="mt-3 text-lg leading-8 text-emerald-100">
              Build your Bus Stop Shield Card before the next school day.
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-6 text-base leading-8 text-slate-100">
              {actionCard.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </article>
        </div>
      </section>
    </main>
  );
}
