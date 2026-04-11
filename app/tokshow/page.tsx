import Image from "next/image";
import Link from "next/link";

const launchDate = "April 5, 2026 (Easter Sunday)";

const characters = [
  {
    name: "Kysen",
    role: "Heart-First Builder",
    profile:
      "A curious 10-year-old who asks bold questions, keeps receipts, and believes every neighborhood can be safer when people work together.",
    voice: "Warm, observant, hopeful, practical.",
  },
  // #I #LOVE #BEING #A #CHILD #OF #GOD #AMEN
  {
    name: "Bam Bam",
    role: "Action-and-Protection Partner",
    profile:
      "Bam Bam is Kysen's little sister. Fast on her feet, funny under pressure, and always focused on helping people get home safe.",
    voice: "Playful, loyal, decisive, protective.",
  },
];

const seasonOne = [
  {
    episode: "Episode 01",
    title: "Easter Sunday: The Promise Route",
    summary:
      "Kysen and Bam Bam map a safer walk-home route after service when a storm knocks out streetlights. They rally neighbors, check on elders, and prove KPA starts with simple actions.",
    status: "Live Today",
    href: "/tokshow/episode-1",
    ctaLabel: "Open Script",
  },
  {
    episode: "Episode 02",
    title: "The Bus Stop Shield",
    summary:
      "The duo redesigns morning bus stop flow so younger kids are never waiting alone.",
    status: "Live",
    href: "/tokshow/episode-2",
    ctaLabel: "Open Episode 2",
  },
  {
    episode: "Episode 03",
    title: "Water, Lights, and Check-Ins",
    summary:
      "A heat-alert day becomes a community drill in hydration, wellness checks, and calm leadership.",
    status: "Storyboarding",
    href: null,
    ctaLabel: null,
  },
];

const trailerBeats = [
  "Church doors open. The neighborhood is smiling.",
  "Storm clouds roll in. Two blocks lose streetlights.",
  "Kysen sketches a safety route in real time.",
  "Bam Bam deploys corner teams and check-ins.",
  "Families cross safely. KPA wins the night.",
];

const shareMessage =
  "TokShow Episode 01 and Episode 02 are live now under Sanders Viopro Labs LLC. KPA in action for families and neighborhoods.";

const shareLinks = {
  facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://sandersvioprolabsllc.com/tokshow")}`,
  x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent("https://sandersvioprolabsllc.com/tokshow")}`,
  linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://sandersvioprolabsllc.com/tokshow")}`,
};

export default function TokShowPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_10%_10%,_rgba(56,189,248,0.18),_transparent_35%),radial-gradient(circle_at_80%_20%,_rgba(251,191,36,0.16),_transparent_30%),linear-gradient(180deg,_#0b1020_0%,_#111827_45%,_#120f2a_100%)] text-white">
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="rounded-3xl border border-cyan-300/25 bg-black/30 p-8 shadow-[0_26px_90px_rgba(0,0,0,0.45)]">
          <p className="inline-flex rounded-full border border-cyan-300/35 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
            SVL Original Series
          </p>
          <h1 className="mt-4 text-5xl font-black leading-tight sm:text-6xl">TokShow</h1>
          <p className="mt-3 max-w-4xl text-lg leading-8 text-cyan-100">
            A realistic cartoon series starring Kysen and Bam Bam. Mission: Keep People Alive (KPA)
            through courage, wisdom, and practical community action.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Brand</p>
              <p className="mt-1 text-lg font-bold">Sanders Viopro Labs LLC</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Launch</p>
              <p className="mt-1 text-lg font-bold">{launchDate}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Series Standard</p>
              <p className="mt-1 text-lg font-bold">KPA First, Every Episode</p>
            </div>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/sanders-viopro-labs" className="rounded-full bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-300">
              Back To SVL Home
            </Link>
            <Link href="/tokshow/episode-1" className="rounded-full border border-amber-300/40 bg-amber-400/10 px-6 py-3 font-semibold text-amber-100 transition hover:bg-amber-400/20">
              Open Episode 1 Script
            </Link>
            <Link href="/tokshow/immediate-income" className="rounded-full border border-green-300/40 bg-green-400/10 px-6 py-3 font-semibold text-green-100 transition hover:bg-green-400/20">
              Immediate Income Resources
            </Link>
          </div>
        </div>

        <section className="mt-8 rounded-3xl border border-pink-300/25 bg-black/25 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <p className="text-xs uppercase tracking-[0.2em] text-pink-200">Official Cover</p>
          <h2 className="mt-2 text-3xl font-black text-white">Bam Bam & Kysen</h2>
          <p className="mt-2 text-base leading-7 text-slate-200">
            Real family energy, real protection mission, real KPA standard.
          </p>
          <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
            <Image
              src="/tokshow/bam-bam-kysen-cover.jpg"
              alt="Bam Bam and Kysen TokShow cover"
              width={1200}
              height={675}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          {characters.map((character) => (
            <article key={character.name} className="rounded-3xl border border-white/10 bg-slate-950/55 p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-200">Character Profile</p>
              <h2 className="mt-2 text-3xl font-black text-white">{character.name}</h2>
              <p className="mt-1 text-sm font-semibold text-cyan-200">{character.role}</p>
              <p className="mt-4 text-base leading-8 text-slate-200">{character.profile}</p>
              <p className="mt-4 text-sm leading-7 text-amber-100">
                <span className="font-semibold">Voice:</span> {character.voice}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-3xl border border-emerald-300/20 bg-gradient-to-br from-emerald-500/10 to-transparent p-8">
          <h2 className="text-3xl font-black">Season One: Community Protection Arc</h2>
          <p className="mt-3 max-w-4xl text-lg leading-8 text-slate-100">
            Every story ends with one practical takeaway families can use immediately. Entertainment and real-life safety work together.
          </p>
          <div className="mt-6 space-y-4">
            {seasonOne.map((item) => (
              <article key={item.episode} className="rounded-2xl border border-white/10 bg-black/25 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">{item.episode}</p>
                  <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                    {item.status}
                  </span>
                </div>
                <h3 className="mt-2 text-2xl font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-base leading-7 text-slate-200">{item.summary}</p>
                {item.href && item.ctaLabel ? (
                  <div className="mt-4">
                    <Link
                      href={item.href}
                      className="inline-flex rounded-full border border-cyan-300/35 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
                    >
                      {item.ctaLabel}
                    </Link>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-cyan-300/20 bg-slate-950/55 p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">TokShow Trailer Board</p>
            <h2 className="mt-2 text-3xl font-black text-white">Official Trailer Beats</h2>
            <p className="mt-3 text-base leading-7 text-slate-200">
              Use this storyboard lane for short-form trailer edits and Sunday rollout clips.
            </p>
            <ol className="mt-5 list-decimal space-y-2 pl-6 text-base leading-8 text-slate-100">
              {trailerBeats.map((beat) => (
                <li key={beat}>{beat}</li>
              ))}
            </ol>
          </article>

          <article className="rounded-3xl border border-amber-300/25 bg-black/30 p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-200">Social Share</p>
            <h2 className="mt-2 text-3xl font-black text-white">Share TokShow Launch</h2>
            <p className="mt-3 text-base leading-7 text-slate-200">{shareMessage}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-blue-300/35 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-blue-100 transition hover:bg-blue-400/20"
              >
                Share To Facebook
              </a>
              <a
                href={shareLinks.x}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-slate-300/35 bg-slate-300/10 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-300/20"
              >
                Share To X
              </a>
              <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-cyan-300/35 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
              >
                Share To LinkedIn
              </a>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
