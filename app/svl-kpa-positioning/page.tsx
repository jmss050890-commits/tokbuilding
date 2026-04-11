'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, BookOpen } from 'lucide-react';

const researchAlignment = [
  {
    concept: 'Barrier Integrity + Critical Controls',
    source: 'Shell/BHP models, ISO 31010',
    svlPosition: 'Core of modern fatality prevention – defines what must never fail',
    alignment: 'Core'
  },
  {
    concept: 'Execution Layer',
    source: 'HOP, Safety II, Resilience Engineering',
    svlPosition: 'What most systems lack: frontline behavior translation and real-time verification',
    alignment: 'Core'
  },
  {
    concept: 'Feedback Loop (Learning + Response)',
    source: 'Hollnagel (Safety II), Dekker (Human Factors)',
    svlPosition: 'Detect → Intervene → Recover → Learn cycles that prevent escalation',
    alignment: 'Core'
  },
];

const competitorComparison = [
  {
    dimension: 'Primary Focus',
    dupont: 'Behavior & compliance',
    hop: 'Systems & human performance',
    svlkpa: 'Fatality exposure + operational execution',
  },
  {
    dimension: 'Structural Strength',
    dupont: 'Discipline, hierarchy, structure',
    hop: 'Adaptive learning, systemic awareness',
    svlkpa: 'Operationalizes both + control integrity',
  },
  {
    dimension: 'Historical Weakness',
    dupont: 'Over-indexes on injury rates (TRIR) vs high-consequence events',
    hop: 'Can lack execution rigor; learning without verification',
    svlkpa: '—',
  },
  {
    dimension: 'Control Framework',
    dupont: 'Present but secondary to culture',
    hop: 'Emphasis on system conditions, not specific barriers',
    svlkpa: 'Critical control integrity is core (unbreakable barriers)',
  },
  {
    dimension: 'Key Metrics',
    dupont: 'TRIR, LTI, incident rates',
    hop: 'Learning indicators, variability, system resilience',
    svlkpa: 'Fatality exposure + control effectiveness + intervention cycles',
  },
  {
    dimension: 'Field Reality',
    dupont: 'Top-down hierarchy; supervisors execute policy',
    hop: 'Worker-centric; system variability expected',
    svlkpa: 'Supervisor-driven verification + response; structured variability oversight',
  },
];

const clientChallenges = [
  {
    question: '"How is this different from Critical Risk Management (CRM)?"',
    answer: 'CRM defines risks and controls. SVL-KPA ensures they are executed, verified, and acted on in real time. CRM is the design; SVL-KPA is the operation.',
    icon: '🎯',
  },
  {
    question: '"Is this just HOP with a new label?"',
    answer: 'HOP informs how we think about people and systems. SVL-KPA translates that thinking into measurable, field-level execution tied to fatality prevention outcomes. HOP is the science; SVL-KPA is the application.',
    icon: '🔬',
  },
  {
    question: '"Where is the proof?"',
    answer: 'Proof comes in three forms: (1) Deployment cases showing fatality-exposure reduction, (2) Measurable indicators beyond TRIR (control reliability, intervention speed), (3) Verified control effectiveness data from field audits and real-time monitoring.',
    icon: '📊',
  },
  {
    question: '"How does this scale beyond your company?"',
    answer: 'SVL-KPA is a proprietary operating system, but it is built on transferable frameworks (barrier models, HOP principles, resilience loops). We license the methodology + training to partners, not just the concept.',
    icon: '📈',
  },
];

const keyLiterature = [
  {
    citation: 'Hollnagel, E. (2014). Safety-I and Safety-II: The Past and Future of Safety Management. Ashgate Publishing.',
    applies: 'Feedback loops, learning culture, variability management',
  },
  {
    citation: 'Dekker, S. (2014). The Field Guide to Understanding Human Error (2nd ed.). CRC Press.',
    applies: 'Field execution reality, supervisor decision-making, system design',
  },
  {
    citation: 'Reason, J. (1997). Managing the Risks of Organizational Accidents. Ashgate Publishing.',
    applies: 'Barrier models, unbreakable controls, organizational resilience',
  },
  {
    citation: 'Shell Global Solutions. Critical Risk Management Framework (CRM) & Barrier Approach.',
    applies: 'Critical control identification, integrity assurance, field verification',
  },
  {
    citation: 'Rio Tinto / BHP Safety Management Standards.',
    applies: 'Fatality prevention systems, control effectiveness auditing, leadership accountability',
  },
  {
    citation: 'Hopkins, A. (2012). Disastrous Decisions: The Piper Alpha, Deepwater Horizon and other Shell Disasters. CCH Australia.',
    applies: 'Why execution and real-time response matter more than policies',
  },
];

const bestInClassInsight = `
Best-in-class companies (Shell, Rio Tinto, BHP, Alcoa under O'Neill) combine four elements:
1. Critical risk frameworks (what can kill)
2. Barrier verification (are controls actually working?)
3. Leadership accountability (does safety own real KPIs?)
4. Rapid response + learning (detect → intervene → learn → prevent escalation)

SVL-KPA sits exactly at this intersection. It is not an alternative to established frameworks—it is the execution layer that most organizations still lack.
`;

export default function SVLKPAPositioningPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 text-white">
      {/* Header */}
      <section className="px-6 py-12 md:py-16 max-w-6xl mx-auto">
        <div className="mb-6">
          <Link
            href="/sanders-viopro-labs"
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition"
          >
            ← Back to SVL Home
          </Link>
        </div>

        <div className="rounded-3xl border border-indigo-300/20 bg-black/30 p-8 shadow-[0_26px_90px_rgba(0,0,0,0.45)]">
          <p className="inline-flex rounded-full border border-indigo-300/35 bg-indigo-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-200">
            Research-Backed Positioning
          </p>
          <h1 className="mt-4 text-5xl font-black leading-tight">SVL-KPA: Keep People Alive</h1>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-indigo-50/90">
            Mission-led execution system for fatality prevention. Benchmarked against established safety science. Built for investor, partner, and client credibility.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#research-alignment"
              className="rounded-full border border-indigo-300/35 bg-indigo-400/10 px-6 py-3 font-semibold text-indigo-100 transition hover:bg-indigo-400/20"
            >
              Research Alignment
            </a>
            <a
              href="#pressure-test"
              className="rounded-full border border-cyan-300/35 bg-cyan-400/10 px-6 py-3 font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
            >
              vs. Competitors
            </a>
            <a
              href="#objection-handling"
              className="rounded-full border border-amber-300/35 bg-amber-400/10 px-6 py-3 font-semibold text-amber-100 transition hover:bg-amber-400/20"
            >
              Client Objections
            </a>
          </div>
        </div>
      </section>

      {/* Executive Position */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <div className="rounded-3xl border border-emerald-300/20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 p-8">
          <h2 className="text-3xl font-black text-white mb-4">The Bulletproof Position</h2>
          <blockquote className="text-xl leading-8 text-emerald-50 border-l-4 border-emerald-400 pl-6 italic">
            "SVL-KPA sits on top of established safety frameworks and focuses on what they often fail to deliver: consistent, measurable execution of fatality prevention in the field."
          </blockquote>
          <p className="mt-6 text-base leading-7 text-slate-200">
            This single sentence is defensible, research-aligned, and immediately actionable. Use it in investor decks, partner conversations, and client pitches.
          </p>
        </div>
      </section>

      {/* Research Alignment */}
      <section id="research-alignment" className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-black mb-8">1. How This Aligns with Safety Research</h2>
        <div className="space-y-4">
          {researchAlignment.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-slate-950/55 p-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <h3 className="text-lg font-bold text-white">{item.concept}</h3>
                    <span className="inline-flex rounded-full bg-indigo-400/10 px-3 py-1 text-xs font-semibold text-indigo-200">
                      {item.alignment}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-indigo-300 font-mono">Source: {item.source}</p>
                  <p className="mt-3 text-base leading-6 text-slate-200">{item.svlPosition}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best-in-Class Insight */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <div className="rounded-3xl border border-cyan-300/20 bg-black/25 p-8">
          <h3 className="text-2xl font-black text-white mb-4">🔍 Key Insight: Best-in-Class Leaders</h3>
          <p className="text-base leading-7 text-slate-200 whitespace-pre-line">{bestInClassInsight}</p>
        </div>
      </section>

      {/* Competitor Comparison Table */}
      <section id="pressure-test" className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-black mb-8">2. Side-by-Side Pressure Test: DuPont vs. HOP/Safety II vs. SVL-KPA</h2>
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/55">
          <table className="w-full text-sm">
            <thead className="bg-slate-800/60 border-b border-white/10">
              <tr>
                <th className="px-6 py-3 text-left font-bold text-white">Dimension</th>
                <th className="px-6 py-3 text-left font-semibold text-amber-200">DuPont (Traditional)</th>
                <th className="px-6 py-3 text-left font-semibold text-cyan-200">HOP / Safety II</th>
                <th className="px-6 py-3 text-left font-semibold text-emerald-200">SVL-KPA (Your Position)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {competitorComparison.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition">
                  <td className="px-6 py-4 font-semibold text-white">{row.dimension}</td>
                  <td className="px-6 py-4 text-slate-300">{row.dupont}</td>
                  <td className="px-6 py-4 text-slate-300">{row.hop}</td>
                  <td className="px-6 py-4 text-slate-300">
                    <span className="font-semibold text-emerald-300">{row.svlkpa}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-base leading-7 text-slate-300 max-w-4xl">
          <strong>Bottom line:</strong> DuPont systems traditionally over-index on injury metrics. HOP/Safety II corrects that philosophically but can lack execution rigor. SVL-KPA bridges both: it has DuPont's structure and accountability, combined with HOP's learning focus, plus critical control integrity at the core.
        </p>
      </section>

      {/* Client Objection Handling */}
      <section id="objection-handling" className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-black mb-8">3. Where Clients Will Challenge You (Get Ahead of It)</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {clientChallenges.map((challenge, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-slate-950/55 p-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">{challenge.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-3">{challenge.question}</h3>
                  <p className="text-base leading-6 text-slate-200">{challenge.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Literature Base */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-black mb-8">4. Literature & Standards Base</h2>
        <p className="text-base leading-7 text-slate-300 mb-6 max-w-4xl">
          SVL-KPA is not inventing concepts. It is operationalizing proven frameworks from the world's safest organizations and modern safety research. Here is what backs it:
        </p>
        <div className="space-y-4">
          {keyLiterature.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-indigo-300/15 bg-slate-950/55 p-6">
              <div className="flex items-start gap-4">
                <BookOpen className="w-5 h-5 text-indigo-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-mono text-indigo-300 mb-2">{item.citation}</p>
                  <p className="text-sm text-slate-200">
                    <span className="font-semibold text-slate-100">Applies to SVL-KPA: </span>{item.applies}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Implementation Readiness */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <div className="rounded-3xl border border-green-300/20 bg-gradient-to-br from-green-500/10 to-emerald-500/5 p-8">
          <h2 className="text-2xl font-black mb-4">Ready to Use Immediately</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-white">Investor conversations:</p>
                <p className="text-sm text-slate-200">Use the positioning statement + comparison table</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-white">Partner pitches:</p>
                <p className="text-sm text-slate-200">Lead with research alignment section + literature base</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-white">Client objections:</p>
                <p className="text-sm text-slate-200">Have answers pre-loaded from objection handling section</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-white">Tomorrow's 8:00 PM training:</p>
                <p className="text-sm text-slate-200">Reference this page as the scientific foundation for SVL-KPA methodology</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <div className="rounded-3xl border border-emerald-300/20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 p-8 text-center">
          <h2 className="text-3xl font-black mb-4">Ready to Discuss SVL-KPA?</h2>
          <p className="text-lg leading-8 text-slate-200 mb-8 max-w-3xl mx-auto">
            This positioning is built to hold up in boardrooms. If you have questions about how SVL-KPA applies to your operation, or you want to explore a pilot, let's talk.
          </p>
          <p className="text-base text-emerald-300 font-semibold mb-8">
            15-minute alignment call. No pitch, just clarity.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="mailto:contact@sandersvioprolabs.com?subject=SVL-KPA%20Positioning%20-%20Schedule%20Alignment%20Call&body=I%27m%20interested%20in%20discussing%20SVL-KPA%20and%20how%20it%20applies%20to%20our%20operation.%20Can%20we%20schedule%20a%2015-minute%20alignment%20call%3F"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-8 py-3 font-semibold transition"
            >
              Schedule Alignment Call <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/sanders-viopro-labs"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-300/35 bg-emerald-400/10 px-8 py-3 font-semibold text-emerald-100 transition hover:bg-emerald-400/20"
            >
              Back to SVL <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="px-6 py-8 max-w-6xl mx-auto border-t border-slate-800 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <Link href="/sanders-viopro-labs" className="hover:text-indigo-400 transition">
            ← Back to SVL Home
          </Link>
          <div className="text-xs">SVL-KPA Positioning | Research-Backed | Investor Ready</div>
          <Link href="/tokshow/immediate-income" className="hover:text-indigo-400 transition">
            Income Resources →
          </Link>
        </div>
      </section>
    </main>
  );
}
