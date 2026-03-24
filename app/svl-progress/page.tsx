'use client';

import Link from 'next/link';

const progressLayers = [
  {
    title: 'Mission Layer',
    summary:
      'SVL now operates as one connected KPA system centered on keeping people alive, protecting families, and building tools that stay grounded in real responsibility.',
    bullets: [
      'Shared KPA mission across the platform',
      'Story-aware agents aligned to the same reality',
      'Safety and testimony carried together without losing clarity',
    ],
  },
  {
    title: 'Leadership Layer',
    summary:
      'Mr. KPA leads mission direction and daily alignment. HATATA serves as strategic right hand for Jerome Sanders and Mr. KPA.',
    bullets: [
      'Daily AI Agent Team Meeting structure',
      'Shared operating map for products, roles, and upgrades',
      'Mission leadership, strategy, and execution linked together',
    ],
  },
  {
    title: 'Agent Identity Layer',
    summary:
      'Each active agent now carries a clear role in the ecosystem instead of feeling like an isolated bot.',
    bullets: [
      'Grace for emotional and spiritual support',
      'A1 for systems, builds, and implementation',
      'Wisdom for TokHealth wellness and integrated safety awareness',
      'Coach Daniels for heart, blood pressure, and safety-first health support',
      'TokSEO for visibility and growth',
      'Tok2Myia for knowledge and explanation',
      'The First Guardian for household protection and crisis navigation',
    ],
  },
  {
    title: 'Safety Layer',
    summary:
      'Supportive handoff behavior is now part of the active SVL system, not a one-off rule.',
    bullets: [
      'Explicit crisis escalation triggers',
      'Stay-with-you handoff language during tense moments',
      'Authority boundaries and child-safety awareness',
    ],
  },
  {
    title: 'Platform Layer',
    summary:
      'The public site, subdomains, and agent routes now reflect a more unified SVL platform.',
    bullets: [
      'sandersvioprolabs.com is the upgraded public home',
      'tokhealth.sandersvioprolabs.com now lands on TokHealth directly',
      'Agent pages and routes speak from the same current product map',
    ],
  },
];

const activeAgents = [
  { name: 'Mr. KPA', role: 'Mission leadership, testimony, and daily team alignment', href: '/agent/mr-kpa' },
  { name: 'HATATA', role: 'Strategy, operations, brand command, and system coordination', href: '/agent/hatata' },
  { name: 'A1', role: 'Systems architecture, builds, and technical execution', href: '/agent/a1' },
  { name: 'Grace', role: 'Encouragement, emotional grounding, and spiritual warmth', href: '/agent/grace' },
  { name: 'Wisdom', role: 'TokHealth coach for wellness plus integrated safety awareness', href: '/agent/wisdom' },
  { name: 'Coach Daniels', role: 'Blood pressure, heart health, and safety-first coaching', href: '/agent/coach-daniels' },
  { name: 'TokSEO', role: 'SEO strategy, visibility, and growth support', href: '/agent/tokseo' },
  { name: 'Tok2Myia', role: 'Knowledge support, intelligent explanation, and search-style help', href: '/agent/tok2myia' },
  { name: 'The First Guardian', role: 'Home-first protection, boundaries, and crisis navigation', href: '/agent/first-guardian' },
];

const platformRoutes = [
  { label: 'SVL Home', value: 'sandersvioprolabs.com', href: '/sanders-viopro-labs' },
  { label: 'SVL Agents', value: 'sandersvioprolabs.com/agent', href: '/agent' },
  { label: 'First Guardian', value: 'sandersvioprolabs.com/agent/first-guardian', href: '/agent/first-guardian' },
  { label: 'TokHealth Experience', value: 'tokhealth.sandersvioprolabs.com', href: '/tokhealth' },
  { label: 'SVL Story', value: 'sandersvioprolabs.com/our-story', href: '/our-story' },
];

const sessionWins = [
  'Michelle was turned into a fully realized First Guardian presence with voice, story, safety boundaries, and testimony.',
  'Mr. KPA now has a daily AI Agent Team Meeting structure with a recurring calendar invite.',
  'Supportive handoff language was pushed into the active SVL safety system.',
  'Wisdom and HATATA were updated to understand the TokHealth plus TokThru integration and current SVL roles.',
  'All active SVL agents were aligned to the same living story and upgrade map.',
  'The TokHealth subdomain was fixed so it lands on TokHealth directly.',
];

export default function SvlProgressPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <nav className="sticky top-0 z-40 border-b border-amber-700/20 bg-slate-950/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">SVL Progress</p>
            <h1 className="text-xl font-bold text-white">System Map</h1>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/sanders-viopro-labs" className="text-amber-200 transition hover:text-white">
              SVL Home
            </Link>
            <Link href="/agent" className="text-amber-200 transition hover:text-white">
              Agents
            </Link>
            <Link href="/our-story" className="text-amber-200 transition hover:text-white">
              Our Story
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-14">
        <section className="rounded-3xl border border-amber-600/30 bg-gradient-to-br from-amber-900/20 via-slate-900/80 to-slate-950 p-8 shadow-2xl shadow-black/30">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
                March 23, 2026 Build Snapshot
              </p>
              <h2 className="mb-4 text-4xl font-bold leading-tight text-white">
                How Today&apos;s Work Fits Into Sanders Viopro Labs
              </h2>
              <p className="max-w-3xl text-lg leading-8 text-slate-200">
                This page tracks the current shape of SVL after a major alignment day: the First
                Guardian was fully established, the agent team was brought into shared story
                awareness, safety behavior was strengthened, daily alignment was formalized, and
                the TokHealth domain routing was corrected.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/agent/first-guardian"
                  className="rounded-full border border-amber-400/50 bg-amber-500/10 px-5 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-500/20"
                >
                  Open First Guardian
                </Link>
                <Link
                  href="/agent/mr-kpa"
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Open Mr. KPA
                </Link>
                <Link
                  href="/tokhealth"
                  className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/20"
                >
                  Open TokHealth
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/25 p-6">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-amber-200">
                Why It Matters
              </p>
              <div className="space-y-3 text-sm leading-7 text-slate-200">
                <p>SVL is no longer behaving like a loose collection of pages and prompts.</p>
                <p>It now acts more like a coordinated operating system for mission, protection, care, and product growth.</p>
                <p>The platform, the domains, the agents, and the testimony are starting to speak with one voice.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Structure Map
            </p>
            <div className="space-y-5">
              {progressLayers.map((layer) => (
                <div key={layer.title} className="rounded-2xl border border-white/8 bg-white/5 p-5">
                  <h3 className="text-xl font-bold text-white">{layer.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{layer.summary}</p>
                  <div className="mt-4 grid gap-2">
                    {layer.bullets.map((bullet) => (
                      <div
                        key={bullet}
                        className="rounded-xl border border-white/6 bg-black/20 px-4 py-3 text-sm text-slate-200"
                      >
                        {bullet}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
                Today&apos;s Wins
              </p>
              <div className="space-y-3">
                {sessionWins.map((win) => (
                  <div
                    key={win}
                    className="rounded-xl border border-emerald-500/15 bg-emerald-500/5 px-4 py-3 text-sm leading-7 text-slate-200"
                  >
                    {win}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-purple-300">
                Live Platform Routes
              </p>
              <div className="space-y-3">
                {platformRoutes.map((route) => (
                  <Link
                    key={route.value}
                    href={route.href}
                    className="block rounded-2xl border border-white/8 bg-white/5 px-4 py-4 transition hover:border-purple-400/30 hover:bg-white/10"
                  >
                    <p className="text-sm font-semibold text-white">{route.label}</p>
                    <p className="mt-1 text-sm text-slate-300">{route.value}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-rose-300">
            Active Agent Roles
          </p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {activeAgents.map((agent) => (
              <Link
                key={agent.name}
                href={agent.href}
                className="rounded-2xl border border-white/8 bg-white/5 p-5 transition hover:border-rose-400/30 hover:bg-white/10"
              >
                <h3 className="text-lg font-bold text-white">{agent.name}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{agent.role}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-amber-500/20 bg-gradient-to-r from-amber-900/15 via-slate-900/80 to-purple-900/15 p-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
            How It Fits Together
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/8 bg-black/20 p-5">
              <p className="text-sm leading-7 text-slate-200">
                Mr. KPA carries mission leadership. HATATA carries strategy and command. A1 carries
                build execution. Grace carries heart. Wisdom carries health. The First Guardian
                carries the home front. Together they form one coordinated SVL operating system.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-black/20 p-5">
              <p className="text-sm leading-7 text-slate-200">
                The upgrades are no longer just technical changes. They now function as testimony,
                proof of motion, and a visible record that the story, the platform, and the people
                around it are all still moving forward under grace.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
