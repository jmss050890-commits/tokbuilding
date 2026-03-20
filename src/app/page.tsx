import Link from 'next/link';

const products = [
  {
    id: 'tokhealth',
    name: 'TokHealth',
    tagline: 'AI Wellness Coaching Platform',
    description: 'Personalized nutrition guidance, holistic health coaching, and community wellness challenges powered by Wisdom AI coach.',
    color: '#0D9488',
    bgLight: '#F0FDFA',
    features: ['Nutrition Guidance', 'Health Coaching', 'Community Challenges', 'Voice Interaction'],
    agent: 'Wisdom',
    emoji: '🌿',
    href: '/tokhealth',
  },
  {
    id: 'tokthrukpa',
    name: 'TokThru / KPA',
    tagline: 'Personal Safety & Crisis Support',
    description: 'AI-guided emergency coaching, de-escalation techniques, and protected response system for your safety and wellbeing.',
    color: '#EA580C',
    bgLight: '#FFF7ED',
    features: ['Emergency Coaching', 'De-escalation', 'Crisis Support', 'Safety Protocols'],
    agent: 'HATÄTA',
    emoji: '🛡️',
    href: '/tokthrukpa',
  },
  {
    id: 'tokbuilding',
    name: 'TokBuilding',
    tagline: 'No-Code AI Agent Builder',
    description: 'Create custom AI agents with unique personalities, expertise domains, and system prompts — no coding required.',
    color: '#4F46E5',
    bgLight: '#EEF2FF',
    features: ['5-Step Wizard', 'Custom Personalities', 'JSON Export', 'Agent Testing'],
    agent: 'A1',
    emoji: '🤖',
    href: '/tokbuilding',
  },
];

export default function HubPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-indigo-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">VCC Hub</h1>
              <p className="text-slate-400 text-xs">Sanders Viopro Labs</p>
            </div>
          </div>
          <span className="text-slate-400 text-sm hidden sm:block">AI Voice Command Centers</span>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-slate-300 mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Powered by Claude Sonnet AI
        </div>
        <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
          Voice-Powered AI<br />
          <span className="bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Command Centers
          </span>
        </h2>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
          Three specialized AI platforms — wellness coaching, personal safety, and agent building — all with full voice interaction.
        </p>
      </section>

      {/* Product Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link key={product.id} href={product.href} className="group block">
              <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col">
                {/* Accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ backgroundColor: product.color }} />

                <div className="text-4xl mb-4">{product.emoji}</div>
                <h3 className="text-white font-bold text-2xl mb-1">{product.name}</h3>
                <p className="font-medium mb-4 text-sm" style={{ color: product.color }}>{product.tagline}</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{product.description}</p>

                <div className="space-y-2 mb-6">
                  {product.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: product.color }} />
                      {f}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    Agent: {product.agent}
                  </span>
                  <span
                    className="text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
                    style={{ color: product.color }}
                  >
                    Enter →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Agents Section */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h3 className="text-white font-bold text-xl mb-2 text-center">Meet Your AI Agents</h3>
          <p className="text-slate-400 text-sm text-center mb-8">Five specialized personas, each with unique expertise and voice</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { name: 'A1', role: 'General AI', color: '#4F46E5' },
              { name: 'Grace', role: 'Support', color: '#DB2777' },
              { name: 'Coach Daniels', role: 'Fitness', color: '#059669' },
              { name: 'HATÄTA', role: 'Safety', color: '#EA580C' },
              { name: 'Wisdom', role: 'Wellness', color: '#0D9488' },
            ].map((a) => (
              <div key={a.name} className="text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-2" style={{ backgroundColor: a.color }}>
                  {a.name[0]}
                </div>
                <p className="text-white text-sm font-medium">{a.name}</p>
                <p className="text-slate-500 text-xs">{a.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-slate-500 text-sm">
          <p>© 2025 Sanders Viopro Labs · VCC Hub – AI Voice Command Centers</p>
          <p className="mt-1 text-xs">Powered by Anthropic Claude Sonnet · Web Speech API</p>
        </div>
      </footer>
    </div>
  );
}
