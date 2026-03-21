'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TokThruLanding() {
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const plans = [
    {
      name: 'TokThru Basic',
      price: 2.99,
      type: 'one-time',
      features: [
        'Real-time trip tracking',
        'Share location with trusted contacts',
        '10-minute check-in alerts',
        'Route history logging',
        'Emergency SOS button',
        'Driver profile ratings',
      ],
    },
    {
      name: 'TokThru Pro',
      price: 7.99,
      type: 'lifetime',
      features: [
        'Everything in Basic',
        'Real-time driver screening',
        'Scheduled trip verification',
        'Safe word detection',
        'AI route safety analysis',
        'Ride-sharing network integration',
        'Group trip coordination',
        'Lifetime free updates',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur border-b border-purple-800/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚗</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              TokThru
            </h1>
          </div>
          <div className="flex gap-6">
            <a href="#features" className="hover:text-purple-400 transition">
              Features
            </a>
            <a href="#pricing" className="hover:text-purple-400 transition">
              Pricing
            </a>
            <a href="#contact" className="hover:text-purple-400 transition">
              Support
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-purple-900/40 border border-purple-700/60">
              <span className="text-sm text-purple-300">Ride Safe, Get Home Safe</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Every Ride Tracked, <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Every Trip Safe</span>
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Whether it's a rideshare, taxi, or transit, TokThru keeps your loved ones informed every step of your journey. Real-time tracking, automatic check-ins, and immediate emergency response.
            </p>
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setShowModal(true)}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold transition transform hover:scale-105"
              >
                Download Now
              </button>
              <a
                href="#features"
                className="px-8 py-3 rounded-lg border border-purple-600 hover:bg-purple-900/30 font-bold transition"
              >
                Learn More
              </a>
            </div>
            <div className="flex gap-6 text-sm text-slate-400">
              <div>⭐ 4.7 Rating</div>
              <div>📥 18K+ Downloads</div>
              <div>🗺️ Works Everywhere</div>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full h-96 bg-gradient-to-b from-purple-900/30 to-transparent rounded-3xl border border-purple-700/40 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-slate-300">Your Journey</p>
                <div className="mt-6 space-y-3">
                  <div className="bg-slate-800/60 rounded px-4 py-2 text-xs text-slate-400">
                    📍 Currently in transit
                  </div>
                  <div className="bg-slate-800/60 rounded px-4 py-2 text-xs text-slate-400">
                    👍 Contact notified
                  </div>
                  <div className="bg-slate-800/60 rounded px-4 py-2 text-xs text-slate-400">
                    ⏱️ ETA: 12 minutes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-purple-900/20 border-y border-purple-800/30 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center">Your Safety Network</h2>
          <p className="text-center text-slate-300 mb-16 max-w-2xl mx-auto">
            Real-time tracking and automatic alerts keep your loved ones informed throughout your journey.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-900/60 border border-purple-700/30 rounded-2xl p-8 hover:border-purple-600/60 transition">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-bold mb-3">Live Trip Tracking</h3>
              <p className="text-slate-300">Your emergency contacts see your real-time location and ETA. They know exactly where you are and when you'll arrive.</p>
            </div>

            <div className="bg-slate-900/60 border border-purple-700/30 rounded-2xl p-8 hover:border-purple-600/60 transition">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-xl font-bold mb-3">Auto Check-Ins</h3>
              <p className="text-slate-300">Get automatic check-in alerts every 10 minutes. Tap to confirm you're okay, or the system escalates to emergency contacts.</p>
            </div>

            <div className="bg-slate-900/60 border border-purple-700/30 rounded-2xl p-8 hover:border-purple-600/60 transition">
              <div className="text-4xl mb-4">🆘</div>
              <h3 className="text-xl font-bold mb-3">One-Tap Emergency</h3>
              <p className="text-slate-300">Feeling unsafe? Tap the SOS button. Your location, driver info, and status instantly go to emergency contacts and authorities.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900/60 border border-purple-700/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">🛡️ Driver & Vehicle Verification</h3>
              <ul className="space-y-3 text-slate-300">
                <li>✓ Real-time driver screening before pickup</li>
                <li>✓ License plate verification</li>
                <li>✓ Driver rating history</li>
                <li>✓ Vehicle photo confirmation</li>
                <li>✓ Ride cancellation if unsafe</li>
              </ul>
            </div>

            <div className="bg-slate-900/60 border border-purple-700/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">🌍 Journey Safety</h3>
              <ul className="space-y-3 text-slate-300">
                <li>✓ Route history logging</li>
                <li>✓ AI-powered route safety analysis</li>
                <li>✓ Transit alerts for high-risk areas</li>
                <li>✓ Automatic contact notification at destination</li>
                <li>✓ Trip receipts & evidence logs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-purple-600/30 border-2 border-purple-600 flex items-center justify-center font-bold text-2xl mx-auto mb-4">1</div>
            <h3 className="text-lg font-bold mb-3">Request Ride</h3>
            <p className="text-slate-300 text-sm">Order your rideshare or enter transit details in TokThru.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-purple-600/30 border-2 border-purple-600 flex items-center justify-center font-bold text-2xl mx-auto mb-4">2</div>
            <h3 className="text-lg font-bold mb-3">Share Your Trip</h3>
            <p className="text-slate-300 text-sm">One tap sends your live location to trusted contacts.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-purple-600/30 border-2 border-purple-600 flex items-center justify-center font-bold text-2xl mx-auto mb-4">3</div>
            <h3 className="text-lg font-bold mb-3">Automatic Check-Ins</h3>
            <p className="text-slate-300 text-sm">Every 10 minutes, tap to confirm you're safe.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-purple-600/30 border-2 border-purple-600 flex items-center justify-center font-bold text-2xl mx-auto mb-4">4</div>
            <h3 className="text-lg font-bold mb-3">Arrival Confirmation</h3>
            <p className="text-slate-300 text-sm">Contacts notified when you reach your destination.</p>
          </div>
        </div>

        <div className="bg-purple-900/30 border border-purple-700/40 rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-6">Who Uses TokThru</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-purple-600">
              <p className="font-bold text-purple-400 mb-2">Late Night Commuters</p>
              <p className="text-slate-300 text-sm">Rideshare users keeping family informed during late-night trips.</p>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-purple-600">
              <p className="font-bold text-purple-400 mb-2">Solo Travelers</p>
              <p className="text-slate-300 text-sm">Backpackers and travelers sharing their route with friends back home.</p>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-purple-600">
              <p className="font-bold text-purple-400 mb-2">Business Travel</p>
              <p className="text-slate-300 text-sm">Corporate employees staying connected during airport transfers and meetings.</p>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-purple-600">
              <p className="font-bold text-purple-400 mb-2">Parents &amp; Guardians</p>
              <p className="text-slate-300 text-sm">Monitor their teens' transit safely without being intrusive.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-purple-900/20 border-y border-purple-800/30 py-20">
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
                    ? 'border-purple-500 bg-purple-900/30'
                    : 'border-slate-700 bg-slate-900/60 hover:border-purple-700'
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
                      <span className="text-purple-400">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setShowModal(true)}
                  className={`w-full py-3 rounded-lg font-bold transition ${
                    selectedPlan === idx
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  Choose Plan
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-400 text-sm">
            All plans include lifetime trip history and emergency logs.
          </p>
        </div>
      </section>

      {/* Trust Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Trusted by Millions</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">4.7★</div>
            <p className="text-slate-300">Rider Safety Rating</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-400 mb-2">18K+</div>
            <p className="text-slate-300">Active Users & Growing</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
            <p className="text-slate-300">Emergency Response</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-t border-purple-800/30 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Ride Safer?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Your next ride is already safer. Download TokThru today and keep your loved ones informed every step of the way.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold text-lg transition transform hover:scale-105"
          >
            Download TokThru
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4 text-purple-400">TokThru</h3>
              <p className="text-slate-400 text-sm">Every ride. Every journey. Every step of the way.</p>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-slate-300">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#features" className="hover:text-purple-400">Features</a></li>
                <li><a href="#pricing" className="hover:text-purple-400">Pricing</a></li>
                <li><a href="/tokstore" className="hover:text-purple-400">Download</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-slate-300">Support</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="mailto:support@tokthru.app" className="hover:text-purple-400">Email Support</a></li>
                <li><a href="https://tokthru.app/privacy" className="hover:text-purple-400">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-slate-300">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="https://tokthru.app/privacy" className="hover:text-purple-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-400">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8">
            <p className="text-center text-slate-400 text-sm">
              © 2026 TokThru. Ride safe, get home safe. Part of the KPA Mission.
            </p>
          </div>
        </div>
      </footer>

      {/* Download Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-purple-700/40">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Get TokThru</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-slate-300">Plan: <span className="font-bold text-purple-400">{plans[selectedPlan].name}</span></p>
              <p className="text-slate-300">Price: <span className="font-bold text-2xl">${plans[selectedPlan].price.toFixed(2)}</span></p>
            </div>

            <Link
              href="/tokstore"
              onClick={() => setShowModal(false)}
              className="w-full block text-center px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold transition mb-3"
            >
              Go to TokStore
            </Link>

            <button
              onClick={() => setShowModal(false)}
              className="w-full px-6 py-3 rounded-lg border border-purple-600 hover:bg-purple-900/30 font-bold transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
