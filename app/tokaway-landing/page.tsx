'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TokAwayLanding() {
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const plans = [
    {
      name: 'TokAway Basic',
      price: 4.99,
      type: 'one-time',
      features: [
        'Fake call generator',
        'Custom contacts',
        'Call timer',
        'Call history',
      ],
    },
    {
      name: 'TokAway Pro',
      price: 9.99,
      type: 'lifetime',
      features: [
        'Everything in Basic',
        'SMS spoofing',
        'Scheduled calls',
        'Call scripts',
        'Lifetime updates',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur border-b border-blue-800/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚨</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              TokAway
            </h1>
          </div>
          <div className="flex gap-6">
            <a href="#features" className="hover:text-blue-400 transition">
              Features
            </a>
            <a href="#pricing" className="hover:text-blue-400 transition">
              Pricing
            </a>
            <a href="#contact" className="hover:text-blue-400 transition">
              Support
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-blue-900/40 border border-blue-700/60">
              <span className="text-sm text-blue-300">Safety First</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Discreet <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Escape Plan</span>
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Sometimes you need a polite way out. TokAway creates realistic fake calls, letting you safely exit uncomfortable or unsafe situations without awkwardness or confrontation.
            </p>
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setShowModal(true)}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 font-bold transition transform hover:scale-105"
              >
                Download Now
              </button>
              <a
                href="#features"
                className="px-8 py-3 rounded-lg border border-blue-600 hover:bg-blue-900/30 font-bold transition"
              >
                Learn More
              </a>
            </div>
            <div className="flex gap-6 text-sm text-slate-400">
              <div>⭐ 4.8 Rating</div>
              <div>📥 12K+ Downloads</div>
              <div>🔒 100% Private</div>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full h-96 bg-gradient-to-b from-blue-900/30 to-transparent rounded-3xl border border-blue-700/40 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">☎️</div>
                <p className="text-slate-300">Fake Call Active</p>
                <p className="text-2xl font-bold text-blue-400 mt-4">Mom Calling</p>
                <div className="mt-6 flex gap-3 justify-center">
                  <button className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 transition flex items-center justify-center">
                    ✕
                  </button>
                  <button className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 transition flex items-center justify-center">
                    ✓
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-blue-900/20 border-y border-blue-800/30 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center">How It Works</h2>
          <p className="text-center text-slate-300 mb-16 max-w-2xl mx-auto">
            TokAway is designed with your safety in mind. Quick, discreet, and completely under your control.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900/60 border border-blue-700/30 rounded-2xl p-8 hover:border-blue-600/60 transition">
              <div className="text-4xl mb-4">1️⃣</div>
              <h3 className="text-xl font-bold mb-3">Set Up Contacts</h3>
              <p className="text-slate-300">
                Add fake contact names (Mom, Boss, Friend) to your call list. Uses your real phone calendar data.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-blue-700/30 rounded-2xl p-8 hover:border-blue-600/60 transition">
              <div className="text-4xl mb-4">2️⃣</div>
              <h3 className="text-xl font-bold mb-3">Trigger When Needed</h3>
              <p className="text-slate-300">
                One tap from your home screen activates a realistic incoming call. No one will suspect it's fake.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-blue-700/30 rounded-2xl p-8 hover:border-blue-600/60 transition">
              <div className="text-4xl mb-4">3️⃣</div>
              <h3 className="text-xl font-bold mb-3">Exit Gracefully</h3>
              <p className="text-slate-300">
                Answer or decline the call. Answer to say "I have to take this," then politely excuse yourself.
              </p>
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900/60 border border-blue-700/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">🔒 Privacy First</h3>
              <ul className="space-y-3 text-slate-300">
                <li>✓ All data saved locally on your device</li>
                <li>✓ No cloud sync or tracking</li>
                <li>✓ Never shares your contacts</li>
                <li>✓ Works offline</li>
              </ul>
            </div>

            <div className="bg-slate-900/60 border border-blue-700/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">⚡ Smart Features</h3>
              <ul className="space-y-3 text-slate-300">
                <li>✓ Fully customizable call scripts (Pro)</li>
                <li>✓ Schedule calls in advance (Pro)</li>
                <li>✓ Call history and notes</li>
                <li>✓ SMS spoofing support (Pro)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-700/40 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Part of the KPA Mission</h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            <span className="text-blue-400 font-bold">K</span>eep
            <span className="text-blue-400 font-bold">P</span>eople
            <span className="text-blue-400 font-bold">A</span>live
          </p>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            TokAway is more than a convenience tool—it's a safety feature designed to help people escape genuinely uncomfortable or unsafe situations. Your wellbeing is our priority.
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-blue-900/20 border-y border-blue-800/30 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center">Simple Pricing</h2>
          <p className="text-center text-slate-300 mb-16">
            Choose the plan that fits your needs
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPlan(idx)}
                className={`rounded-2xl p-8 border-2 transition cursor-pointer ${
                  selectedPlan === idx
                    ? 'border-blue-500 bg-blue-900/30'
                    : 'border-slate-700 bg-slate-900/60 hover:border-blue-700'
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
                      <span className="text-blue-400">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setShowModal(true)}
                  className={`w-full py-3 rounded-lg font-bold transition ${
                    selectedPlan === idx
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  Choose Plan
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-400 text-sm">
            All plans include lifetime access to your data. No subscriptions.
          </p>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Trusted by Thousands</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">4.8★</div>
            <p className="text-slate-300">Average Rating (298 reviews)</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">12K+</div>
            <p className="text-slate-300">Downloads & Growing</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
            <p className="text-slate-300">Private & Offline</p>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-t border-blue-800/30 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get TokAway?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Download for free today. Choose your plan and start creating your escape routes.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 font-bold text-lg transition transform hover:scale-105"
          >
            Download TokAway Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4 text-blue-400">TokAway</h3>
              <p className="text-slate-400 text-sm">Your discreet escape plan.</p>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-slate-300">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#features" className="hover:text-blue-400">Features</a></li>
                <li><a href="#pricing" className="hover:text-blue-400">Pricing</a></li>
                <li><a href="/tokstore" className="hover:text-blue-400">Download</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-slate-300">Support</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="mailto:support@tokaway.app" className="hover:text-blue-400">Email Support</a></li>
                <li><a href="/tokaway-landing" className="hover:text-blue-400">FAQ</a></li>
                <li><a href="https://tokaway.app/privacy" className="hover:text-blue-400">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-slate-300">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="https://tokaway.app/privacy" className="hover:text-blue-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8">
            <p className="text-center text-slate-400 text-sm">
              © 2026 TokAway. Part of the KPA Mission - Keep People Alive.
            </p>
          </div>
        </div>
      </footer>

      {/* Download Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-blue-700/40">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Get TokAway</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-slate-300">Plan: <span className="font-bold text-blue-400">{plans[selectedPlan].name}</span></p>
              <p className="text-slate-300">Price: <span className="font-bold text-2xl">${plans[selectedPlan].price.toFixed(2)}</span></p>
            </div>

            <Link
              href="/tokstore"
              onClick={() => setShowModal(false)}
              className="w-full block text-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 font-bold transition mb-3"
            >
              Go to TokStore
            </Link>

            <button
              onClick={() => setShowModal(false)}
              className="w-full px-6 py-3 rounded-lg border border-blue-600 hover:bg-blue-900/30 font-bold transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
