'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSiteCopy } from '@/app/components/SiteLanguageControl';

export default function TokHealthLanding() {
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const copy = useSiteCopy();

  const plans = [
    {
      name: 'TokHealth Basic',
      price: 2.99,
      type: 'one-time',
      features: [
        'Medical profile creation',
        'Vital tracking (weight, BP, heart rate)',
        'Allergies & intolerances log',
        'Medical history entry',
        'Emergency contacts',
        'Access in 2 languages',
      ],
    },
    {
      name: 'TokHealth Pro',
      price: 7.99,
      type: 'lifetime',
      features: [
        'Everything in Basic',
        'Voice recording capability',
        'Full 10-language support',
        'Family account sharing',
        'Spiritual belief tracking',
        'Fitbit/Apple Health integration',
        'Medication tracking',
        'Lifetime free updates',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur border-b border-teal-800/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">❤️</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">
              TokHealth
            </h1>
          </div>
          <div className="flex gap-6">
            <a href="#features" className="hover:text-teal-400 transition">
              {copy.tokhealthLanding.nav.features}
            </a>
            <a href="#languages" className="hover:text-teal-400 transition">
              {copy.tokhealthLanding.nav.languages}
            </a>
            <a href="#pricing" className="hover:text-teal-400 transition">
              {copy.tokhealthLanding.nav.pricing}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-green-900/40 border border-green-700/60">
              <span className="text-sm text-green-300">{copy.tokhealthLanding.badge}</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {copy.tokhealthLanding.heroTitle}
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              {copy.tokhealthLanding.heroBody}
            </p>
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setShowModal(true)}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-bold transition transform hover:scale-105"
              >
                {copy.tokhealthLanding.primaryCta}
              </button>
              <a
                href="#features"
                className="px-8 py-3 rounded-lg border border-green-600 hover:bg-green-900/30 font-bold transition"
              >
                {copy.tokhealthLanding.secondaryCta}
              </a>
            </div>
            <div className="flex gap-6 text-sm text-slate-400">
              <div>⭐ {copy.tokhealthLanding.stats[0]}</div>
              <div>📥 {copy.tokhealthLanding.stats[1]}</div>
              <div>🔒 {copy.tokhealthLanding.stats[2]}</div>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full h-96 bg-gradient-to-b from-green-900/30 to-transparent rounded-3xl border border-green-700/40 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">💊</div>
                <p className="text-slate-300">Quick Medical Access</p>
                <p className="text-2xl font-bold text-green-400 mt-4">Your Health Profile</p>
                <div className="mt-6 space-y-2 text-sm text-slate-400">
                  <p>Blood Type: O+</p>
                  <p>Allergies: Penicillin</p>
                  <p>Current Meds: 3</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-green-900/20 border-y border-green-800/30 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center">{copy.tokhealthLanding.featuresTitle}</h2>
          <p className="text-center text-slate-300 mb-16 max-w-2xl mx-auto">
            {copy.tokhealthLanding.featuresBody}
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-900/60 border border-green-700/30 rounded-2xl p-8 hover:border-green-600/60 transition">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-xl font-bold mb-3">Hospital Integration</h3>
              <p className="text-slate-300">Emergency responders and hospitals can access your profile with your permission. One-tap authorization saves critical time.</p>
            </div>

            <div className="bg-slate-900/60 border border-green-700/30 rounded-2xl p-8 hover:border-green-600/60 transition">
              <div className="text-4xl mb-4">💊</div>
              <h3 className="text-xl font-bold mb-3">Medication Manager</h3>
              <p className="text-slate-300">Track prescriptions, refill dates, and interactions. AI alerts you to potential drug conflicts before they occur.</p>
            </div>

            <div className="bg-slate-900/60 border border-green-700/30 rounded-2xl p-8 hover:border-green-600/60 transition">
              <div className="text-4xl mb-4">🆘</div>
              <h3 className="text-xl font-bold mb-3">Emergency Voice SOS</h3>
              <p className="text-slate-300">Say &quot;Help&quot; or press the button. Your profile, medical history, and location instantly go to your emergency contacts and 911.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900/60 border border-green-700/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">🔒 Privacy & Security</h3>
              <ul className="space-y-3 text-slate-300">
                <li>✓ End-to-end encryption for all data</li>
                <li>✓ HIPAA-compliant storage</li>
                <li>✓ You control who sees what</li>
                <li>✓ Audit log of all data access</li>
                <li>✓ Local-first backup option</li>
              </ul>
            </div>

            <div className="bg-slate-900/60 border border-green-700/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">⚡ Smart Features</h3>
              <ul className="space-y-3 text-slate-300">
                <li>✓ Automatic allergy alerts</li>
                <li>✓ Drug interaction checking</li>
                <li>✓ Appointment reminders</li>
                <li>✓ Symptom tracking</li>
                <li>✓ Doctor notes sync</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">How It Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-600/30 border-2 border-green-600 flex items-center justify-center font-bold text-2xl mx-auto mb-4">1</div>
            <h3 className="text-xl font-bold mb-3">Set Up Your Profile</h3>
            <p className="text-slate-300">Add medical history, medications, allergies, and emergency contacts. Takes 5 minutes.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-600/30 border-2 border-green-600 flex items-center justify-center font-bold text-2xl mx-auto mb-4">2</div>
            <h3 className="text-xl font-bold mb-3">Grant Access</h3>
            <p className="text-slate-300">Choose who can see your medical data. Family, doctors, hospitals—you decide.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-600/30 border-2 border-green-600 flex items-center justify-center font-bold text-2xl mx-auto mb-4">3</div>
            <h3 className="text-xl font-bold mb-3">Emergency Access</h3>
            <p className="text-slate-300">In an emergency, responders can access your critical info instantly. Safe, secure, authorized.</p>
          </div>
        </div>

        <div className="bg-green-900/30 border border-green-700/40 rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-6">Use Cases</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-green-600">
              <p className="font-bold text-green-400 mb-2">Living with Chronic Conditions</p>
              <p className="text-slate-300 text-sm">Keep your health data organized and accessible for doctors and emergencies.</p>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-green-600">
              <p className="font-bold text-green-400 mb-2">Managing Multiple Medications</p>
              <p className="text-slate-300 text-sm">Never miss a dose. Get alerts for refills and drug interactions.</p>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-green-600">
              <p className="font-bold text-green-400 mb-2">Senior Care</p>
              <p className="text-slate-300 text-sm">Family can monitor health status and be notified of emergencies instantly.</p>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-green-600">
              <p className="font-bold text-green-400 mb-2">Traveling Safely</p>
              <p className="text-slate-300 text-sm">Have your medical history ready anywhere in the world. No paper forms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-green-900/20 border-y border-green-800/30 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center">{copy.tokhealthLanding.pricingTitle}</h2>
          <p className="text-center text-slate-300 mb-16">{copy.tokhealthLanding.pricingBody}</p>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPlan(idx)}
                className={`rounded-2xl p-8 border-2 transition cursor-pointer ${
                  selectedPlan === idx
                    ? 'border-green-500 bg-green-900/30'
                    : 'border-slate-700 bg-slate-900/60 hover:border-green-700'
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
                      <span className="text-green-400">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setShowModal(true)}
                  className={`w-full py-3 rounded-lg font-bold transition ${
                    selectedPlan === idx
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  {copy.tokhealthLanding.choosePlan}
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-400 text-sm">
            All plans include lifetime access to your medical data.
          </p>
        </div>
      </section>

      {/* Trust Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">{copy.tokhealthLanding.trustedTitle}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">4.9★</div>
            <p className="text-slate-300">From Medical Professionals</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-400 mb-2">25K+</div>
            <p className="text-slate-300">Active Users</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">HIPAA</div>
            <p className="text-slate-300">Compliant & Certified</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-t border-green-800/30 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">{copy.tokhealthLanding.finalTitle}</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            {copy.tokhealthLanding.finalBody}
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-bold text-lg transition transform hover:scale-105"
          >
            {copy.tokhealthLanding.downloadTokHealth}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4 text-green-400">TokHealth</h3>
              <p className="text-slate-400 text-sm">Your health data. Your control. Your life.</p>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-slate-300">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#features" className="hover:text-green-400">Features</a></li>
                <li><a href="#pricing" className="hover:text-green-400">Pricing</a></li>
                <li><a href="/tokstore" className="hover:text-green-400">Download</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-slate-300">Support</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="mailto:support@tokhealth.app" className="hover:text-green-400">Email Support</a></li>
                <li><a href="https://tokhealth.app/privacy" className="hover:text-green-400">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-slate-300">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="https://tokhealth.app/privacy" className="hover:text-green-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-green-400">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8">
            <p className="text-center text-slate-400 text-sm">
              © 2026 TokHealth. Save lives with better health data.
            </p>
          </div>
        </div>
      </footer>

      {/* Download Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-green-700/40">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">{copy.tokhealthLanding.getTokHealth}</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-slate-300">Plan: <span className="font-bold text-green-400">{plans[selectedPlan].name}</span></p>
              <p className="text-slate-300">Price: <span className="font-bold text-2xl">${plans[selectedPlan].price.toFixed(2)}</span></p>
            </div>

            <Link
              href="/tokstore"
              onClick={() => setShowModal(false)}
              className="w-full block text-center px-6 py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-bold transition mb-3"
            >
              {copy.tokhealthLanding.goToTokStore}
            </Link>

            <button
              onClick={() => setShowModal(false)}
              className="w-full px-6 py-3 rounded-lg border border-green-600 hover:bg-green-900/30 font-bold transition"
            >
              {copy.tokhealthLanding.cancel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
