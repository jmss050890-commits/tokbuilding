'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TokThruLanding() {
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const plans = [
    {
      name: 'TokThru Basic',
      price: 4.99,
      type: 'one-time',
      features: [
        'De-escalation script library (5 guides)',
        'Check-in timer reminders',
        'Emergency hotline numbers',
        'Safe de-escalation techniques',
        'Self-calming methods',
        'Safety resources library',
      ],
    },
    {
      name: 'TokThru Pro',
      price: 9.99,
      type: 'lifetime',
      features: [
        'Everything in Basic',
        'Emergency contact integration',
        'Real-time check-in alerts',
        'Silent SOS activation',
        'De-escalation coaching mode',
        'Crisis response guides (5 detailed scenarios)',
        'Multi-person coordination',
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
            <span className="text-2xl">🧭</span>
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
              <span className="text-sm text-purple-300">De-Escalation + Safety Check-Ins</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Navigate <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Crisis Safely</span>
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Real-time de-escalation scripts, emergency guides, and check-in systems. TokThru teaches you how to stay calm, de-escalate threats, and access crisis support instantly. Keep People Alive through knowledge and connection.
            </p>
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setShowModal(true)}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold transition transform hover:scale-105"
              >
                Get TokThru
              </button>
              <a
                href="#features"
                className="px-8 py-3 rounded-lg border border-purple-600 hover:bg-purple-900/30 font-bold transition"
              >
                Learn More
              </a>
            </div>
            <div className="flex gap-6 text-sm text-slate-400">
              <div>🧠 5 De-escalation Scripts</div>
              <div>🆘 Emergency Guides</div>
              <div>✓ Safety Tools</div>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full h-96 bg-gradient-to-b from-purple-900/30 to-transparent rounded-3xl border border-purple-700/40 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🧭</div>
                <p className="text-slate-300">Navigate Difficult Situations</p>
                <div className="mt-6 space-y-3">
                  <div className="bg-slate-800/60 rounded px-4 py-2 text-xs text-slate-400">
                    📚 De-escalation coaching
                  </div>
                  <div className="bg-slate-800/60 rounded px-4 py-2 text-xs text-slate-400">
                    🧭 Crisis response guides
                  </div>
                  <div className="bg-slate-800/60 rounded px-4 py-2 text-xs text-slate-400">
                    ✓ Safety check-ins
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
          <h2 className="text-4xl font-bold mb-4 text-center">Master De-Escalation & Safety</h2>
          <p className="text-center text-slate-300 mb-16 max-w-2xl mx-auto">
            Real-world crisis response training in your pocket. Learn proven techniques from de-escalation experts.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-900/60 border border-purple-700/30 rounded-2xl p-8 hover:border-purple-600/60 transition">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-3">5 De-Escalation Scripts</h3>
              <p className="text-slate-300">Learn proven techniques: verbal de-escalation, self-calming, dangerous escapes, suicidal crisis response, and intimate partner violence protocols.</p>
            </div>

            <div className="bg-slate-900/60 border border-purple-700/30 rounded-2xl p-8 hover:border-purple-600/60 transition">
              <div className="text-4xl mb-4">🆘</div>
              <h3 className="text-xl font-bold mb-3">Emergency Guides</h3>
              <p className="text-slate-300">Detailed crisis response for medical emergencies, active threats, mental health crises, domestic violence, and child safety scenarios.</p>
            </div>

            <div className="bg-slate-900/60 border border-purple-700/30 rounded-2xl p-8 hover:border-purple-600/60 transition">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-xl font-bold mb-3">Check-In System</h3>
              <p className="text-slate-300">Real-time check-ins during dangerous or uncomfortable situations. Silent alerts, emergency contacts, and location sharing when needed.</p>
            </div>
          </div>

          <div className="bg-slate-900/80 border-2 border-purple-700/40 rounded-3xl p-8 mb-12">
            <h3 className="text-2xl font-bold mb-6">De-Escalation Scenarios Covered</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-purple-600">
                <p className="font-bold text-purple-400 mb-2">Verbal De-escalation - Angry Person</p>
                <p className="text-slate-300 text-sm mb-2">8-step process: calm your body, lower voice, acknowledge feelings, validate, use boundaries, offer solutions.</p>
              </div>
              <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-purple-600">
                <p className="font-bold text-purple-400 mb-2">Self-Calming Techniques</p>
                <p className="text-slate-300 text-sm mb-2">Box breathing, 5-4-3-2-1 grounding, progressive muscle relaxation, cold water method, positive self-talk.</p>
              </div>
              <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-purple-600">
                <p className="font-bold text-purple-400 mb-2">Escape from Unsafe Situation</p>
                <p className="text-slate-300 text-sm mb-2">Trust your gut, plan exits, keep devices charged, safe word protocols, drive to safety, call 911.</p>
              </div>
              <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-purple-600">
                <p className="font-bold text-purple-400 mb-2">De-escalating Suicidal Crisis</p>
                <p className="text-slate-300 text-sm mb-2">Never leave alone, listen without judgment, validate pain, understand plan, connect to 988, create safety plan.</p>
              </div>
              <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-purple-600">
                <p className="font-bold text-purple-400 mb-2">Intimate Partner Violence Response</p>
                <p className="text-slate-300 text-sm mb-2">Safety first, document abuse, make escape plan, call DV hotline (1-800-799-7233), use code words.</p>
              </div>
              <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-purple-600">
                <p className="font-bold text-purple-400 mb-2">Emergency Crisis Hotlines</p>
                <p className="text-slate-300 text-sm mb-2">Suicide & Crisis: 988 | National DV Hotline: 1-800-799-7233 | Available 24/7</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900/60 border border-purple-700/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">💡 Smart Features</h3>
              <ul className="space-y-3 text-slate-300">
                <li>✓ Step-by-step de-escalation coaching</li>
                <li>✓ Crisis response for 5 major scenarios</li>
                <li>✓ real-time check-in reminders</li>
                <li>✓ Emergency hotline numbers (always accessible)</li>
                <li>✓ Silent SOS activation</li>
              </ul>
            </div>

            <div className="bg-slate-900/60 border border-purple-700/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">🎯 KPA Mission Alignment</h3>
              <ul className="space-y-3 text-slate-300">
                <li>✓ Keep People Alive through knowledge</li>
                <li>✓ Teach crisis response skills</li>
                <li>✓ Connect to emergency support instantly</li>
                <li>✓ De-escalate violence before it happens</li>
                <li>✓ Save lives through preparation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">How TokThru Works</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-purple-600/30 border-2 border-purple-600 flex items-center justify-center font-bold text-2xl mx-auto mb-4">1</div>
            <h3 className="text-lg font-bold mb-3">Learn De-Escalation</h3>
            <p className="text-slate-300 text-sm">Study proven techniques for calming tense situations before they escalate.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-purple-600/30 border-2 border-purple-600 flex items-center justify-center font-bold text-2xl mx-auto mb-4">2</div>
            <h3 className="text-lg font-bold mb-3">Get Check-In Reminders</h3>
            <p className="text-slate-300 text-sm">Automatic alerts during dangerous situations keep you accountable and connected.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-purple-600/30 border-2 border-purple-600 flex items-center justify-center font-bold text-2xl mx-auto mb-4">3</div>
            <h3 className="text-lg font-bold mb-3">Access Emergency Support</h3>
            <p className="text-slate-300 text-sm">Find hotlines, crisis guides, and safety resources with one tap when you need help.</p>
          </div>
        </div>

        <div className="bg-purple-900/30 border border-purple-700/40 rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-6">Use Cases</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-purple-600">
              <p className="font-bold text-purple-400 mb-2">Domestic Safety</p>
              <p className="text-slate-300 text-sm">Know how to respond to intimate partner violence with proven escape and support strategies.</p>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-purple-600">
              <p className="font-bold text-purple-400 mb-2">Mental Health Crisis</p>
              <p className="text-slate-300 text-sm">Recognize suicide risk and de-escalate with compassion. Connect to 988 instantly.</p>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-purple-600">
              <p className="font-bold text-purple-400 mb-2">Workplace Conflict</p>
              <p className="text-slate-300 text-sm">Handle aggression and threats with de-escalation techniques designed for work environments.</p>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-purple-600">
              <p className="font-bold text-purple-400 mb-2">Emergency Preparedness</p>
              <p className="text-slate-300 text-sm">Learn immediate response for active threats, medical emergencies, and child safety.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-purple-900/20 border-y border-purple-800/30 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center">Simple Pricing</h2>
          <p className="text-center text-slate-300 mb-16">Access all de-escalation scripts and emergency guides. Choose your plan.</p>

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
                  Get Started
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-400 text-sm">
            All plans include access to emergency hotlines (24/7), de-escalation scripts, and crisis guides.
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
          <h2 className="text-3xl font-bold mb-4">Ready to Get TokThru?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Visit the TokStore to purchase and download TokThru on your device. De-escalation training starts immediately.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold text-lg transition transform hover:scale-105"
          >
            Get TokThru
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4 text-purple-400">TokThru</h3>
              <p className="text-slate-400 text-sm">De-escalation, crisis response, and safety check-ins. Keep People Alive.</p>
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
