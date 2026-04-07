import Link from 'next/link';
import SVLGuardian from './SVLGuardian';

const products = [
  {
    id: 'tokaway',
    name: 'TokAway',
    tagline: 'Your Secret Escape Button',
    description: 'Create a fake incoming call to exit uncomfortable situations discreetly. Built to Keep People Alive.',
    icon: '🚨',
    borderClass: 'border-cyan-500/30 hover:border-cyan-500/60',
    accentClass: 'text-cyan-300',
    features: [
      'Fake incoming call feature',
      'Customizable contact names',
      'Timer for call duration',
      'Silent activation',
      'Local contact storage',
      'Safety exit option',
    ],
    landingUrl: '/tokaway-landing',
    testimonial: {
      quote: 'TokAway saved me from so many uncomfortable moments. It is like having backup on demand.',
      author: 'Sarah M.',
      role: 'College Student',
    },
  },
  {
    id: 'tokhealth',
    name: 'TokHealth',
    tagline: 'Original Health + Safety Challenge App',
    description: 'The original combined TokHealth experience: wellness tracking, safety-aware routines, and fun challenges built into one mobile-first app.',
    icon: '💚',
    borderClass: 'border-emerald-500/30 hover:border-emerald-500/60',
    accentClass: 'text-emerald-300',
    features: [
      'Original TokHealth and TokThru vision in one app',
      'Fun challenges to keep people engaged',
      'Wellness and safety routines',
      'Medical profile creation',
      'Medication tracking',
      'Allergy and intolerance recording',
      'Emergency contact management',
      'Family account access',
    ],
    landingUrl: 'https://tokhealth.sandersvioprolabsllc.com',
    experienceNote: 'This opens the original TokHealth mobile build on the SVL TokHealth subdomain.',
    testimonial: {
      quote: 'The original TokHealth build feels alive because it blends wellness, safety, and daily challenges instead of acting like a flat tracker.',
      author: 'James T.',
      role: 'Parent and Caregiver',
    },
  },
  {
    id: 'tokthru',
    name: 'TokThru',
    tagline: 'Smart Safety Check-Ins',
    description: 'Set automatic check-in reminders during trips and share safety status with trusted contacts.',
    icon: '🚗',
    borderClass: 'border-fuchsia-500/30 hover:border-fuchsia-500/60',
    accentClass: 'text-fuchsia-300',
    features: [
      'Automatic check-in timers',
      'Reminder notifications',
      'Emergency contact system',
      'SOS button access',
      'De-escalation scripts',
      'Trip documentation',
    ],
    landingUrl: '/tokthru-landing',
    testimonial: {
      quote: 'I feel more confident traveling late because my family can follow along.',
      author: 'Emma R.',
      role: 'Frequent Traveler',
    },
  },
  {
    id: 'toksmart',
    name: 'TokSmart',
    tagline: 'Your AI Study and Success Partner',
    description: 'Route every question to the right AI for school, research, writing, and deep analysis.',
    icon: '🧠',
    borderClass: 'border-violet-500/30 hover:border-violet-500/60',
    accentClass: 'text-violet-300',
    features: [
      'Smart AI model routing',
      'Scholar GPT for schoolwork',
      'Claude for deep analysis',
      'ChatGPT for creativity',
      'Gemini for broad research',
      'Voice input and spoken replies',
    ],
    landingUrl: '/toksmart',
    testimonial: {
      quote: 'TokSmart helps me get several strong answers without bouncing between tools all day.',
      author: 'McKenzie S.',
      role: 'Student and Researcher',
    },
  },
  {
    id: 'tokbuilding',
    name: 'TokBuilding',
    tagline: 'Create Your Own AI Agent',
    description: 'Build custom AI agents with your own personality, expertise, and voice. No coding required.',
    icon: '🤖',
    borderClass: 'border-indigo-500/30 hover:border-indigo-500/60',
    accentClass: 'text-indigo-300',
    features: [
      'Create custom AI agents',
      'Define personality and tone',
      'Set expertise and knowledge',
      'Instant deployment',
      'Brand your agent voice',
      'Advanced analytics',
    ],
    landingUrl: '/tokbuilding',
    testimonial: {
      quote: 'TokBuilding let me launch an AI agent that actually sounds like my business.',
      author: 'Marcus L.',
      role: 'Business Owner',
    },
  },
  {
    id: 'svl-ai-specialist',
    name: 'SVL AI Specialist Coaching',
    tagline: 'Expert 1-on-1 Hybrid AI Training',
    description: 'Live coaching from SVL AI specialists plus pre-recorded courses and API access.',
    icon: '💼',
    borderClass: 'border-rose-500/30 hover:border-rose-500/60',
    accentClass: 'text-rose-300',
    features: [
      'Live 1-on-1 coaching sessions',
      'Pre-recorded training library',
      'SVL AI API access',
      'Implementation guidance',
      'Dedicated specialist support',
      'Project consultation',
    ],
    landingUrl: '/svl-ai-specialist',
    testimonial: {
      quote: 'The coaching gave me a clear path instead of a pile of AI ideas.',
      author: 'Keisha P.',
      role: 'Tech Entrepreneur',
    },
  },
  {
    id: 'mr-kpa',
    name: 'Mr. KPA Mentorship Access',
    tagline: 'Founder Wisdom and Strategy',
    description: 'Chat with Mr. KPA directly for founder insight, mission clarity, and lived wisdom.',
    icon: '✨',
    borderClass: 'border-amber-500/30 hover:border-amber-500/60',
    accentClass: 'text-amber-300',
    features: [
      'Direct access to Mr. KPA',
      'Founder strategy insight',
      'Lived wisdom not theory',
      'Mission alignment guidance',
      'Real conversations',
      'Community connection',
    ],
    landingUrl: '/agent/mr-kpa',
    testimonial: {
      quote: 'Jerome cut through the noise and helped me focus on what matters.',
      author: 'Diamond K.',
      role: 'SVL Community Member',
    },
  },
];

export default function TokStoreShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏪</span>
            <div>
              <h1 className="text-2xl font-bold">SVL Innovation Showcase</h1>
              <p className="text-xs text-slate-400">A gallery of mission-driven tools, agents, and learning experiences</p>
            </div>
          </div>
          <Link
            href="/sanders-viopro-labs"
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm transition hover:bg-slate-700"
          >
            ← SVL Home
          </Link>
        </div>
      </header>
      {/* TokHealth & TokThru Free Notice */}
      <div className="mx-auto max-w-3xl mt-8 mb-4 rounded-xl border-2 border-emerald-400/40 bg-emerald-900/30 p-6 text-center shadow-lg animate-fade-in">
        <h2 className="text-2xl font-bold text-emerald-300 mb-2">TokHealth + TokThru V1 are Now Free for All</h2>
        <p className="text-emerald-100 text-lg mb-2">
          Access the original <strong>TokHealth</strong> and <strong>TokThru</strong> V1 experience at
          <a href="https://tokhealth.sandersvioprolabsllc.com" className="underline text-emerald-200 hover:text-white ml-1" target="_blank" rel="noopener noreferrer">tokhealth.sandersvioprolabsllc.com</a>
        </p>
        <p className="text-emerald-200 text-sm">
          No subscription, no payment, no catch—just real wellness, safety, and check-ins for the community. This is the original V1 build that started it all. Share this with anyone who needs it!
        </p>
      </div>
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-12">
          <SVLGuardian />
        </div>
        <div className="mb-8 rounded-xl border border-amber-500/40 bg-amber-900/20 p-4 text-amber-200 text-center font-semibold shadow">
          <span className="text-amber-300">KPA STANDARDS:</span> All SVL products are verified and approved prior to build for quality, safety, and mission alignment.
        </div>
        <section className="mb-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <p className="mb-2 text-sm uppercase tracking-[0.2em] text-slate-400">Showcase Focus</p>
            <h2 className="mb-3 text-3xl font-bold">Mission tools, AI agents, and learning products for a safer, smarter world.</h2>
            <p className="text-slate-300">
              Explore the original TokHealth build, TokSmart, the core VCC apps, and the SVL agent products. All are designed to Keep People Alive and empower the community.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h3 className="mb-2 font-semibold">No Pricing, No Checkout</h3>
            <p className="text-sm text-slate-400">This is a showcase only. All financial needs are provided by God. No purchases or payments are required or accepted here.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h3 className="mb-2 font-semibold">Explore and Learn</h3>
            <p className="text-sm text-slate-400">Click any product to learn more, try the experience, or connect with the SVL team for guidance.</p>
          </div>
        </section>
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <a
              key={product.id}
              href={product.landingUrl}
              className={`h-full rounded-2xl border-2 bg-slate-800/60 p-6 text-left transition hover:bg-slate-800 ${product.borderClass}`}
              target="_blank" rel="noopener noreferrer"
            >
              <div className="mb-4 text-5xl">{product.icon}</div>
              <h2 className="mb-1 text-xl font-bold">{product.name}</h2>
              <p className={`mb-3 text-sm ${product.accentClass}`}>{product.tagline}</p>
              <p className="mb-4 text-sm text-slate-400">{product.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.features.slice(0, 3).map((feature) => (
                  <span key={feature} className="rounded-full bg-slate-700 px-2 py-1 text-xs text-slate-200">
                    {feature}
                  </span>
                ))}
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-xs text-slate-300 italic">
                "{product.testimonial.quote}"<br/>
                <span className="font-semibold not-italic">{product.testimonial.author}</span> &middot; {product.testimonial.role}
              </div>
            </a>
          ))}
        </section>
      </main>
    </div>
  );
}
