'use client';

import Link from 'next/link';

export default function SandersVioProLabs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur border-b border-purple-800/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🥼</span>
            <h1 className="text-2xl font-bold">Sanders Viopro Labs</h1>
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/our-story" className="px-4 py-2 rounded-lg text-purple-300 hover:text-white transition">
              Our Story
            </Link>
            <Link href="/svl-progress" className="px-4 py-2 rounded-lg text-amber-300 hover:text-white transition">
              SVL Progress
            </Link>
            <Link href="/" className="px-4 py-2 rounded-lg bg-purple-800 hover:bg-purple-700 transition">
              ← Back Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Sanders Viopro Labs
          </h1>
          <p className="text-2xl text-purple-300 mb-6">#Sandersvioprolabs</p>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Innovation lab dedicated to advancing personal safety technology and creating life-saving solutions through cutting-edge research and development.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-slate-800/50 rounded-xl border border-purple-700/30 p-12 mb-12">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-slate-300 mb-4">
            Sanders Viopro Labs is at the intersection of technology and human safety. We develop innovative solutions that empower individuals to take control of their personal security and well-being.
          </p>
          <p className="text-lg text-slate-300">
            Through rigorous research, advanced engineering, and a deep commitment to user privacy, we create tools that make the world safer for everyone.
          </p>
        </div>

        {/* Focus Areas */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-purple-900/30 to-slate-800/30 rounded-lg p-8 border border-purple-700/20 hover:border-purple-500/40 transition">
            <div className="text-4xl mb-4">🔬</div>
            <h3 className="text-xl font-bold mb-3">Research</h3>
            <p className="text-slate-400">
              Investigating emerging threats and developing solutions based on real-world data and user feedback.
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-900/30 to-slate-800/30 rounded-lg p-8 border border-pink-700/20 hover:border-pink-500/40 transition">
            <div className="text-4xl mb-4">⚙️</div>
            <h3 className="text-xl font-bold mb-3">Development</h3>
            <p className="text-slate-400">
              Building robust, scalable applications with privacy-first architecture and enterprise-grade security.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-slate-800/30 rounded-lg p-8 border border-purple-700/20 hover:border-purple-500/40 transition">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-3">Innovation</h3>
            <p className="text-slate-400">
              Pushing boundaries with forward-thinking approaches to personal safety and emergency response.
            </p>
          </div>
        </div>

        {/* Founder Story Section */}
        <div className="mb-16">
          <Link href="/our-story" className="block bg-gradient-to-br from-purple-900/50 via-pink-900/30 to-slate-900/50 rounded-xl border-2 border-purple-600/50 hover:border-purple-400/80 p-12 transition transform hover:scale-105 cursor-pointer">
            <div className="text-center">
              <div className="text-5xl mb-6">📖</div>
              <h2 className="text-4xl font-bold text-white mb-4">How SVL Was Built</h2>
              <p className="text-xl text-purple-200 mb-6 max-w-2xl mx-auto">
                Not in a boardroom. From spoken thought. How Jerome unified every platform and AI under one mission: Keep People Alive.
              </p>
              <span className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition">
                Read Our Story →
              </span>
            </div>
          </Link>
        </div>

        <div className="mb-16">
          <Link href="/svl-progress" className="block bg-gradient-to-br from-amber-900/40 via-slate-900/40 to-black rounded-xl border-2 border-amber-500/40 hover:border-amber-300/80 p-12 transition transform hover:scale-105 cursor-pointer">
            <div className="text-center">
              <div className="text-5xl mb-6">△</div>
              <h2 className="text-4xl font-bold text-white mb-4">SVL Progress Map</h2>
              <p className="text-xl text-amber-100 mb-6 max-w-3xl mx-auto">
                See the current system structure, today's upgrades, active SVL Guardian roles, live routes, and how the whole SVL build fits together right now.
              </p>
              <span className="inline-block px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg transition">
                View Progress →
              </span>
            </div>
          </Link>
        </div>

        {/* Our Products */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Products</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Link href="/tokstore" className="bg-gradient-to-br from-amber-900/40 to-slate-800/40 hover:from-amber-800/50 hover:to-slate-700/50 rounded-lg p-8 border border-amber-600/60 hover:border-amber-400/80 transition">
              <div className="text-5xl mb-4">🛍️</div>
              <h3 className="text-2xl font-bold mb-3">TokStore</h3>
              <p className="text-slate-300 mb-4">Complete ecosystem of safety and wellness solutions. Browse, purchase, and activate all SVL products in one place.</p>
              <div className="inline-block px-4 py-2 bg-amber-600/50 hover:bg-amber-600/70 rounded-lg font-semibold transition">
                Shop Now →
              </div>
            </Link>

            <div className="bg-slate-800/50 rounded-lg p-8 border border-purple-700/30">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold mb-3">SVL AI Agents</h3>
              <p className="text-slate-300 mb-4">Meet our voice-first AI team: Grace, A1, HATÄTA, Wisdom, Coach Daniels, TokSEO, and Tok2Myia. Each trained for specialized support aligned with the KPA mission.</p>
              <Link href="/agent" className="inline-block px-4 py-2 bg-purple-600/50 hover:bg-purple-600/70 rounded-lg font-semibold transition">
                Meet the Agents →
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Link href="/tokaway-landing" className="bg-slate-800/50 hover:bg-slate-800 rounded-lg p-6 border border-purple-700/30 hover:border-cyan-500/60 transition">
              <div className="text-4xl mb-3">🚨</div>
              <h3 className="font-bold mb-2">TokAway</h3>
              <p className="text-sm text-slate-400">Discreet escape for uncomfortable situations</p>
            </Link>

            <Link href="/tokhealth" className="bg-slate-800/50 hover:bg-slate-800 rounded-lg p-6 border border-purple-700/30 hover:border-emerald-500/60 transition">
              <div className="text-4xl mb-3">💚</div>
              <h3 className="font-bold mb-2">TokHealth</h3>
              <p className="text-sm text-slate-400">Medical profile for emergencies</p>
            </Link>

            <Link href="/tokthru-landing" className="bg-slate-800/50 hover:bg-slate-800 rounded-lg p-6 border border-purple-700/30 hover:border-purple-500/60 transition">
              <div className="text-4xl mb-3">🚗</div>
              <h3 className="font-bold mb-2">TokThru</h3>
              <p className="text-sm text-slate-400">Safety tracking for travel</p>
            </Link>

            <Link href="/toksmart-landing" className="bg-slate-800/50 hover:bg-slate-800 rounded-lg p-6 border border-purple-700/30 hover:border-amber-500/60 transition">
              <div className="text-4xl mb-3">🧠</div>
              <h3 className="font-bold mb-2">TokSmart</h3>
              <p className="text-sm text-slate-400">AI coaching & threat assessment</p>
            </Link>
          </div>
        </div>

        {/* Related Initiatives */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Link href="/kpa" className="bg-gradient-to-br from-green-900/30 to-slate-800/30 rounded-lg p-8 border border-green-700/30 hover:border-green-500/60 transition">
            <h3 className="text-2xl font-bold mb-2">#KPA-Keeppeoplealive</h3>
            <p className="text-slate-400">Advocacy initiative focused on saving lives through technology and community awareness</p>
          </Link>

          <Link href="/think-speak-work" className="bg-gradient-to-br from-blue-900/30 to-slate-800/30 rounded-lg p-8 border border-blue-700/30 hover:border-blue-500/60 transition">
            <h3 className="text-2xl font-bold mb-2">#thinkspeakworkandwatchGodwork4U</h3>
            <p className="text-slate-400">Movement inspiring action, faith, and positive change in personal and community safety</p>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 border-t border-slate-800 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <p className="text-slate-400 mb-4">Sanders Viopro Labs - Innovation for Safety</p>
          <p className="text-sm text-slate-300 mb-4">The result of Next.JS meeting God's Vision Through SVL to KPA</p>
          <p className="text-xs text-slate-500">#Sandersvioprolabs | #KPA-Keeppeoplealive | #thinkspeakworkandwatchGodwork4U</p>
        </div>
      </div>
    </div>
  );
}
