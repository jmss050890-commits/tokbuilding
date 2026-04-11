'use client';

import { ArrowRight, Zap, DollarSign, TrendingUp, Book, Users, Code } from 'lucide-react';
import Link from 'next/link';

const sourceTrainingUrl = 'https://www.facebook.com/share/v/18ooDDKHNJ/';

const incomeStreams = [
  {
    icon: TrendingUp,
    title: 'Investment Strategy Coaching',
    description: 'Help others build wealth through personal finance and investment guidance',
    timeframe: 'Week 1',
    potential: '$500-2K/month',
    action: 'Start consulting',
    link: '/svl-ai-specialist',
  },
  {
    icon: Book,
    title: 'Wisdom Content Library',
    description: 'Package daily proverbs, reflections, and spiritual guidance as premium content',
    timeframe: 'Week 1-2',
    potential: '$300-1K/month',
    action: 'Create library',
    link: '/tokhealth',
  },
  {
    icon: Users,
    title: 'Community Membership',
    description: 'Exclusive access to daily wisdom, coaching calls, and peer network',
    timeframe: 'Week 2-3',
    potential: '$2K-5K/month',
    action: 'Design tiers',
    link: '/our-story',
    // #I #LOVE #BEING #A #CHILD #OF #GOD #AMEN
  },
  {
    icon: Code,
    title: 'Valuation Services',
    description: 'Use TokStrategy model to offer business valuation and analysis to entrepreneurs',
    timeframe: 'Week 1-2',
    potential: '$1K-3K per deal',
    action: 'Launch service',
    link: '/tokstrategy',
  },
  {
    icon: Zap,
    title: 'Quick Wins Training',
    description: 'Micro-courses on immediate income generation tactics (30 min lessons)',
    timeframe: 'Week 2',
    potential: '$10-50 per course',
    action: 'Create modules',
    link: '/primetime-academy',
  },
  {
    icon: DollarSign,
    title: 'Affiliate Partnerships',
    description: 'Partner with financial platforms, courses, and tools your audience uses',
    timeframe: 'Week 1',
    potential: '10-30% commission',
    action: 'Contact partners',
    link: '/media-hub',
  },
];

const quickActions = [
  {
    step: 1,
    title: 'Set Revenue Goal',
    description: 'Define target income (e.g., "$500/week to start")',
  },
  {
    step: 2,
    title: 'Choose 2-3 Streams',
    description: 'Pick highest-leverage opportunities from above',
  },
  {
    step: 3,
    title: 'Create Lead Magnet',
    description: 'Free resource to attract first customers (use wisdom content)',
  },
  {
    step: 4,
    title: 'Launch Offer',
    description: 'Start with 1 coaching call or course launch',
  },
  {
    step: 5,
    title: 'Systematize',
    description: 'Use MIIA weekly campaigns to promote consistently',
  },
];

const trainingLeverageSteps = [
  'Watch the training once and capture 3 usable lessons, 3 exact phrases, and 1 transformation promise.',
  'Turn those notes into a 30-minute paid workshop, a one-page checklist, and a short follow-up offer.',
  'Sell the workshop first as a live session, then reuse the replay as a low-ticket digital product.',
  'Use MIIA outreach to invite warm contacts, past supporters, and aligned operators into the first session.',
];

const trainingOffers = [
  {
    title: 'Same-Day Workshop',
    price: '$25-$49',
    description: 'Host a live 30-minute training with one clear outcome and a Q&A close.',
  },
  {
    title: 'Replay + Notes Bundle',
    price: '$9-$19',
    description: 'Package the replay, key takeaways, and your worksheet as a fast-buy resource.',
  },
  {
    title: 'Implementation Call',
    price: '$75-$150',
    description: 'Offer a 1:1 call for people who want help applying the training to their situation.',
  },
];

export default function ImmediateIncome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white">
      {/* Header */}
      <section className="px-6 py-12 md:py-16 max-w-5xl mx-auto">
        <div className="mb-6">
          <Link 
            href="/tokshow" 
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
          >
            ← Back to TokShow
          </Link>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Generate Income <span className="text-blue-400">This Week</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mb-8">
          Six proven income streams you can activate immediately using SVL infrastructure. No waiting for the "perfect moment". Start generating revenue today.
        </p>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="bg-blue-900/20 border border-blue-500/30 px-4 py-3 rounded">
            <div className="text-2xl font-bold text-blue-400">6</div>
            <div className="text-gray-300">Income Streams</div>
          </div>
          <div className="bg-green-900/20 border border-green-500/30 px-4 py-3 rounded">
            <div className="text-2xl font-bold text-green-400">Week 1</div>
            <div className="text-gray-300">Start Timeline</div>
          </div>
          <div className="bg-amber-900/20 border border-amber-500/30 px-4 py-3 rounded">
            <div className="text-2xl font-bold text-amber-400">$500+</div>
            <div className="text-gray-300">Weekly Potential</div>
          </div>
        </div>
      </section>

      {/* Quick Action Steps */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Your 5-Step Launch Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {quickActions.map((action, idx) => (
            <div key={idx} className="bg-slate-800/40 border border-slate-700/50 p-4 rounded">
              <div className="text-blue-400 font-bold text-lg mb-2">Step {action.step}</div>
              <h3 className="font-semibold mb-2">{action.title}</h3>
              <p className="text-sm text-gray-300">{action.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-12 max-w-5xl mx-auto">
        <div className="rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">Training Advantage</p>
              <h2 className="mt-2 text-2xl font-bold">Use This Facebook Training As Revenue Fuel</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-200">
                Do not just share the training. Repackage it into an offer ladder: one live workshop, one replay product, and one implementation call.
              </p>
            </div>
            <a
              href={sourceTrainingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-300/35 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/20"
            >
              Open Source Training <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
              <h3 className="text-lg font-bold text-white">Monetization Sprint</h3>
              <ol className="mt-4 space-y-3 pl-5 text-sm leading-7 text-slate-200 list-decimal">
                {trainingLeverageSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="space-y-4">
              {trainingOffers.map((offer) => (
                <div key={offer.title} className="rounded-2xl border border-emerald-300/15 bg-slate-950/55 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-bold text-white">{offer.title}</h3>
                    <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">{offer.price}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{offer.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-400/10 p-5 text-sm leading-7 text-amber-50">
            Revenue move: extract the lesson, name the outcome, charge for the shortcut, then upsell implementation.
          </div>
        </div>
      </section>

      {/* Income Streams */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Six Income Streams</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {incomeStreams.map((stream, idx) => {
            const Icon = stream.icon;
            return (
              <Link key={idx} href={stream.link}>
                <div className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-blue-500/50 p-6 rounded-lg transition cursor-pointer h-full">
                  <div className="flex items-start justify-between mb-4">
                    <Icon className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition" />
                    <span className="text-xs text-blue-400 font-mono bg-blue-900/30 px-2 py-1 rounded">
                      {stream.timeframe}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition">
                    {stream.title}
                  </h3>
                  <p className="text-sm text-gray-300 mb-4">{stream.description}</p>

                  <div className="mb-4 pb-4 border-t border-slate-700/50">
                    <div className="text-2xl font-bold text-green-400 mt-4">
                      {stream.potential}
                    </div>
                    <div className="text-xs text-gray-400">Monthly potential</div>
                  </div>

                  <div className="flex items-center gap-2 text-blue-400 group-hover:gap-4 transition">
                    <span className="text-sm font-semibold">{stream.action}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Implementation Guide</h2>
        
        <div className="bg-slate-800/30 border border-blue-500/20 p-8 rounded-lg space-y-6">
          <div>
            <h3 className="font-bold text-blue-400 mb-2 text-lg">📅 Week 1: Launch</h3>
            <ul className="space-y-2 text-gray-300 list-disc list-inside">
              <li>Define your revenue goal (be specific: "$500 by Friday")</li>
              <li>Pick ONE income stream to start (suggest: Coaching or Valuation)</li>
              <li>Create lead magnet (free resource that demonstrates value)</li>
              <li>Announce to your network (via MIIA email campaign)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-green-400 mb-2 text-lg">📈 Week 2-3: Scale</h3>
            <ul className="space-y-2 text-gray-300 list-disc list-inside">
              <li>Launch second income stream (pair coaching with content)</li>
              <li>Create feedback loop (what's working? what questions come up?)</li>
              <li>Package early wins into a case study or testimonial</li>
              <li>Set up automated email sequence via MIIA</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-amber-400 mb-2 text-lg">💰 Week 4+: Systematize</h3>
            <ul className="space-y-2 text-gray-300 list-disc list-inside">
              <li>Build membership or group coaching model (higher leverage)</li>
              <li>Document your best practices (create template/playbook)</li>
              <li>Integrate all streams into one "Revenue Dashboard"</li>
              <li>Track metrics: customer acquisition cost, lifetime value, profit margin</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Resource Links */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Core Resources</h2>
        
        <div className="space-y-4">
          <Link href="/tokstrategy" className="flex items-center gap-3 p-4 bg-slate-800/40 border border-slate-700/50 hover:border-blue-500/50 rounded transition group">
            <span className="text-2xl">📊</span>
            <div>
              <h4 className="font-bold group-hover:text-blue-400 transition">TokStrategy Market Valuation</h4>
              <p className="text-sm text-gray-400">Calculate and present business value to clients</p>
            </div>
          </Link>

          <Link href="/tokhealth/dashboard" className="flex items-center gap-3 p-4 bg-slate-800/40 border border-slate-700/50 hover:border-blue-500/50 rounded transition group">
            <span className="text-2xl">✨</span>
            <div>
              <h4 className="font-bold group-hover:text-blue-400 transition">Daily Wisdom Content</h4>
              <p className="text-sm text-gray-400">Package spiritual guidance as premium offerings</p>
            </div>
          </Link>

          <Link href="/tokshow/episode-1" className="flex items-center gap-3 p-4 bg-slate-800/40 border border-slate-700/50 hover:border-blue-500/50 rounded transition group">
            <span className="text-2xl">📢</span>
            <div>
              <h4 className="font-bold group-hover:text-blue-400 transition">MIIA Weekly Campaigns</h4>
              <p className="text-sm text-gray-400">Promote your services via email and Facebook</p>
            </div>
          </Link>

          <Link href="/svl-ai-specialist" className="flex items-center gap-3 p-4 bg-slate-800/40 border border-slate-700/50 hover:border-blue-500/50 rounded transition group">
            <span className="text-2xl">🤖</span>
            <div>
              <h4 className="font-bold group-hover:text-blue-400 transition">SVL AI Specialist Tools</h4>
              <p className="text-sm text-gray-400">Leverage AI for coaching and content creation</p>
            </div>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600/20 to-blue-950/20 border border-blue-500/30 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Pick ONE stream above. Spend 2 hours today creating your lead magnet. Send one email tomorrow. Measure results. Iterate.
          </p>
          <Link 
            href="/tokshow"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded font-semibold transition"
          >
            Go to Command Center <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="px-6 py-8 max-w-5xl mx-auto border-t border-slate-800 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <Link href="/tokshow" className="hover:text-blue-400 transition">← Back to TokShow</Link>
          <div className="text-xs">Updated April 6, 2026 • Ready to generate income</div>
          <Link href="/svl-progress" className="hover:text-blue-400 transition">SVL Progress →</Link>
        </div>
      </section>
    </div>
  );
}
