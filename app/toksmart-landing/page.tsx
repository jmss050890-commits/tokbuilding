'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TokSmartLanding() {
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const plans = [
    {
      name: 'TokSmart Lite',
      price: 4.99,
      type: 'one-time',
      features: [
        'AI decision advisor',
        'Real-time safety analysis',
        'Situational guidance',
        'Emergency escalation',
        'Chat history (7 days)',
        'Basic situation assessment',
      ],
    },
    {
      name: 'TokSmart Pro',
      price: 9.99,
      type: 'lifetime',
      features: [
        'Everything in Lite',
        'Unlimited chat history',
        'Advanced AI patterns',
        'Personalized threat analysis',
        'Safe exit strategies',
        'Integration with other Tok apps',
        'Multi-person coordination',
        'Real-time coaching in situations',
        'Lifetime free updates',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur border-b border-orange-800/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              TokSmart
            </h1>
          </div>
          <div className="flex gap-6">
            <a href="#features" className="hover:text-orange-400 transition">
              Features
            </a>
            <a href="#pricing" className="hover:text-orange-400 transition">
              Pricing
            </a>
            <a href="#contact" className="hover:text-orange-400 transition">
              Support
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-orange-900/40 border border-orange-700/60">
              <span className="text-sm text-orange-300">AI-Powered Safety Coaching</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Personal <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Safety Coach</span>
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Real-time AI guidance for uncomfortable situations. Get instant advice on how to de-escalate, exit safely, or respond intelligently. Like having a trusted coach in your pocket.
            </p>
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setShowModal(true)}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 font-bold transition transform hover:scale-105"
              >
                Download Now
              </button>
              <a
                href="#features"
                className="px-8 py-3 rounded-lg border border-orange-600 hover:bg-orange-900/30 font-bold transition"
              >
                Learn More
              </a>
            </div>
            <div className="flex gap-6 text-sm text-slate-400">
              <div>⭐ 4.8 Rating</div>
              <div>📥 22K+ Downloads</div>
              <div>🤖 AI-Powered</div>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full h-96 bg-gradient-to-b from-orange-900/30 to-transparent rounded-3xl border border-orange-700/40 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <p className="text-slate-300">Get Smart Guidance</p>
                <div className="mt-6 space-y-3">
                  <div className="bg-slate-800/60 rounded px-4 py-2 text-xs text-slate-400">
                    🚨 &quot;Feeling unsafe—what do I do?&quot;
                  </div>
                  <div className="bg-orange-900/40 rounded px-4 py-2 text-xs text-orange-300 border border-orange-700/40">
                    → Use calm voice, create distance...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-orange-900/20 border-y border-orange-800/30 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center">Real-Time Safety Intelligence</h2>
          <p className="text-center text-slate-300 mb-16 max-w-2xl mx-auto">
            In the moment when you need help, TokSmart provides instant, intelligent guidance.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-900/60 border border-orange-700/30 rounded-2xl p-8 hover:border-orange-600/60 transition">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold mb-3">AI Decision Advisor</h3>
              <p className="text-slate-300">Describe your situation in plain language. TokSmart analyzes it and provides safe, intelligent responses tailored to your context.</p>
            </div>

            <div className="bg-slate-900/60 border border-orange-700/30 rounded-2xl p-8 hover:border-orange-600/60 transition">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3">Instant Guidance</h3>
              <p className="text-slate-300">De-escalation tactics, escape routes, communication strategies—all delivered in real-time while you're in the situation.</p>
            </div>

            <div className="bg-slate-900/60 border border-orange-700/30 rounded-2xl p-8 hover:border-orange-600/60 transition">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-3">Threat Assessment</h3>
              <p className="text-slate-300">Continuous situation analysis. TokSmart helps you evaluate how safe you are and when to escalate to emergency response.</p>
            </div>
          </div>

          <div className="bg-slate-900/80 border-2 border-orange-700/40 rounded-3xl p-8 mb-12">
            <h3 className="text-2xl font-bold mb-6">Chat Examples</h3>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-orange-600">
                  <p className="font-bold text-orange-400 mb-2">Uncomfortable Date</p>
                  <p className="text-slate-300 text-sm mb-4">&quot;He's being pushy and won't take no. What do I do?&quot;</p>
                  <p className="text-slate-400 text-xs italic">→ TokSmart: Set firm boundaries, use your pre-agreed safety code, trigger fake call...</p>
                </div>
                <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-orange-600">
                  <p className="font-bold text-orange-400 mb-2">Aggressive Situation</p>
                  <p className="text-slate-300 text-sm mb-4">&quot;Things are escalating fast. I'm scared.&quot;</p>
                  <p className="text-slate-400 text-xs italic">→ TokSmart: Prioritize de-escalation, maintain calm voice, create distance...</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-orange-600">
                  <p className="font-bold text-orange-400 mb-2">Post-Incident</p>
                  <p className="text-slate-300 text-sm mb-4">&quot;It's over but I don't feel safe yet. What next?&quot;</p>
                  <p className="text-slate-400 text-xs italic">→ TokSmart: Get to a safe location, contact authority, document events...</p>
                </div>
                <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-orange-600">
                  <p className="font-bold text-orange-400 mb-2">Coworker Conflict</p>
                  <p className="text-slate-300 text-sm mb-4">&quot;Manager is being inappropriate. How do I handle it?&quot;</p>
                  <p className="text-slate-400 text-xs italic">→ TokSmart: Document behavior, know your rights, escalate to HR...</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900/60 border border-orange-700/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">💡 Smart Features</h3>
              <ul className="space-y-3 text-slate-300">
                <li>✓ Natural language understanding</li>
                <li>✓ Context-aware responses</li>
                <li>✓ Personalized threat analysis</li>
                <li>✓ Safe exit strategy planning</li>
                <li>✓ De-escalation coaching</li>
              </ul>
            </div>

            <div className="bg-slate-900/60 border border-orange-700/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">🔐 Privacy Built-In</h3>
              <ul className="space-y-3 text-slate-300">
                <li>✓ All conversations private and encrypted</li>
                <li>✓ No data sold to third parties</li>
                <li>✓ Offline mode available</li>
                <li>✓ Delete history anytime</li>
                <li>✓ AI trained on safety, not engagement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">How TokSmart Works</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-orange-600/30 border-2 border-orange-600 flex items-center justify-center font-bold text-2xl mx-auto mb-4">1</div>
            <h3 className="text-lg font-bold mb-3">Describe Your Situation</h3>
            <p className="text-slate-300 text-sm">Type or speak what's happening. Be as specific as you can.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-orange-600/30 border-2 border-orange-600 flex items-center justify-center font-bold text-2xl mx-auto mb-4">2</div>
            <h3 className="text-lg font-bold mb-3">Get Instant Guidance</h3>
            <p className="text-slate-300 text-sm">AI analyzes and provides intelligent, tailored advice.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-orange-600/30 border-2 border-orange-600 flex items-center justify-center font-bold text-2xl mx-auto mb-4">3</div>
            <h3 className="text-lg font-bold mb-3">Act Safely</h3>
            <p className="text-slate-300 text-sm">Follow the guidance, escalate if needed, or trigger other Tok apps.</p>
          </div>
        </div>

        <div className="bg-orange-900/30 border border-orange-700/40 rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-6">Use Cases</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-orange-600">
              <p className="font-bold text-orange-400 mb-2">Dating & Relationships</p>
              <p className="text-slate-300 text-sm">Get real-time advice during uncomfortable dates or relationship conflicts.</p>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-orange-600">
              <p className="font-bold text-orange-400 mb-2">Workplace Safety</p>
              <p className="text-slate-300 text-sm">Handle harassment, aggression, or other workplace incidents intelligently.</p>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-orange-600">
              <p className="font-bold text-orange-400 mb-2">Personal Safety</p>
              <p className="text-slate-300 text-sm">De-escalation tactics, escape routes, and threat assessment in real-time.</p>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-orange-600">
              <p className="font-bold text-orange-400 mb-2">Post-Incident Support</p>
              <p className="text-slate-300 text-sm">Get guidance on next steps after something bad happens.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-orange-900/20 border-y border-orange-800/30 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center">Simple Pricing</h2>
          <p className="text-center text-slate-300 mb-16">Choose your plan</p>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPlan(idx)}
                className={`rounded-2xl p-8 border-2 transition cursor-pointer ${
                  selectedPlan === idx
                    ? 'border-orange-500 bg-orange-900/30'
                    : 'border-slate-700 bg-slate-900/60 hover:border-orange-700'
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price.toFixed(2)}</span>
                  <span className="text-slate-400 ml-2">{plan.type}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-3 text-slate-300">
                      <span className="text-orange-400">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setShowModal(true)}
                  className={`w-full py-3 rounded-lg font-bold transition ${
                    selectedPlan === idx
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700'
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  Choose Plan
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-400 text-sm">
            All plans include unlimited AI conversations and 24/7 access.
          </p>
        </div>
      </section>

      {/* Trust Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Trusted Safety Intelligence</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">4.8★</div>
            <p className="text-slate-300">Safety Guidance Rating</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-400 mb-2">22K+</div>
            <p className="text-slate-300">Active Users</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">500K+</div>
            <p className="text-slate-300">Conversations Coached</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-900/30 to-amber-900/30 border-t border-orange-800/30 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Your Smart Safety Coach Today</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Be prepared for uncomfortable situations. Download TokSmart and have an AI coach ready to help 24/7.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 font-bold text-lg transition transform hover:scale-105"
          >
            Download TokSmart
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4 text-orange-400">TokSmart</h3>
              <p className="text-slate-400 text-sm">Your AI safety coach. Always ready to help.</p>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-slate-300">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#features" className="hover:text-orange-400">Features</a></li>
                <li><a href="#pricing" className="hover:text-orange-400">Pricing</a></li>
                <li><a href="/tokstore" className="hover:text-orange-400">Download</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-slate-300">Support</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="mailto:support@toksmart.app" className="hover:text-orange-400">Email Support</a></li>
                <li><a href="https://toksmart.app/privacy" className="hover:text-orange-400">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-slate-300">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="https://toksmart.app/privacy" className="hover:text-orange-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-400">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8">
            <p className="text-center text-slate-400 text-sm">
              © 2026 TokSmart. Your AI Safety Coach. Part of the KPA Mission.
            </p>
          </div>
        </div>
      </footer>

      {/* Download Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-orange-700/40">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Get TokSmart</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-slate-300">Plan: <span className="font-bold text-orange-400">{plans[selectedPlan].name}</span></p>
              <p className="text-slate-300">Price: <span className="font-bold text-2xl">${plans[selectedPlan].price.toFixed(2)}</span></p>
            </div>

            <Link
              href="/tokstore"
              onClick={() => setShowModal(false)}
              className="w-full block text-center px-6 py-3 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 font-bold transition mb-3"
            >
              Go to TokStore
            </Link>

            <button
              onClick={() => setShowModal(false)}
              className="w-full px-6 py-3 rounded-lg border border-orange-600 hover:bg-orange-900/30 font-bold transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
