'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSiteCopy } from '@/app/components/SiteLanguageControl';
import { getSiteCopy } from '@/lib/site-copy';

export default function TokBuildingLanding() {
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const copy = useSiteCopy();
  const englishCopy = getSiteCopy('en');
  const landingCopy = copy.tokbuildingLanding;
  const plans = landingCopy.plans.length ? landingCopy.plans : englishCopy.tokbuildingLanding.plans;
  const featureIcons = ['🧠', '⚙️', '📋', '💾', '🎯', '📚'];
  const planPrices = [0, 4.99];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur border-b border-purple-800/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              TokBuilding
            </h1>
          </div>
          <div className="flex gap-6">
            <a href="#features" className="hover:text-purple-400 transition">
              {copy.tokbuildingLanding.nav.features}
            </a>
            <a href="#usecases" className="hover:text-purple-400 transition">
              {copy.tokbuildingLanding.nav.useCases}
            </a>
            <a href="#pricing" className="hover:text-purple-400 transition">
              {copy.tokbuildingLanding.nav.pricing}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-purple-900/40 border border-purple-700/60">
              <span className="text-sm text-purple-300">{copy.tokbuildingLanding.badge}</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {copy.tokbuildingLanding.heroTitle}
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              {copy.tokbuildingLanding.heroBody}
            </p>
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setShowModal(true)}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 font-bold transition transform hover:scale-105"
              >
                {copy.tokbuildingLanding.primaryCta}
              </button>
              <a
                href="#features"
                className="px-8 py-3 rounded-lg border border-purple-600 hover:bg-purple-900/30 font-bold transition"
              >
                {copy.tokbuildingLanding.secondaryCta}
              </a>
            </div>
            <div className="flex gap-6 text-sm text-slate-400">
              <div>⚡ {copy.tokbuildingLanding.stats[0]}</div>
              <div>📋 {copy.tokbuildingLanding.stats[1]}</div>
              <div>🎯 {copy.tokbuildingLanding.stats[2]}</div>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full h-96 bg-gradient-to-b from-purple-900/30 to-transparent rounded-3xl border border-purple-700/40 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🧠</div>
                <p className="text-slate-300">{landingCopy.heroWizardTitle}</p>
                <div className="mt-6 space-y-3">
                  {landingCopy.heroWizardSteps.map((step) => (
                    <div key={step} className="bg-slate-800/60 rounded px-4 py-2 text-xs text-slate-400">
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-purple-900/20 border-y border-purple-800/30 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center">{copy.tokbuildingLanding.featuresTitle}</h2>
          <p className="text-center text-slate-300 mb-16 max-w-2xl mx-auto">
            {copy.tokbuildingLanding.featuresBody}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {landingCopy.featureCards.map((feature, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-purple-700/30 rounded-2xl p-8 hover:border-purple-600/60 transition">
                <div className="text-4xl mb-4">{featureIcons[idx]}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-300">{feature.body}</p>
              </div>
            ))}
          </div>

          <div className="bg-purple-900/30 border border-purple-700/40 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">{landingCopy.missionAlignmentTitle}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {landingCopy.missionAlignmentCards.map((card) => (
                <div key={card.title} className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-purple-600">
                  <p className="font-bold text-purple-400 mb-2">{card.title}</p>
                  <p className="text-slate-300 text-sm">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">{landingCopy.buildStepsTitle}</h2>
        <div className="grid md:grid-cols-5 gap-4 mb-12">
          {landingCopy.buildSteps.map((step, index) => (
            <div key={step.title} className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-600/30 border-2 border-purple-600 flex items-center justify-center font-bold text-2xl mx-auto mb-4">{index + 1}</div>
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-slate-300 text-sm">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="bg-purple-900/30 border border-purple-700/40 rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-6">{landingCopy.exportSpecTitle}</h3>
          <p className="text-slate-300 mb-6">{landingCopy.exportSpecBody}</p>
          <div className="grid md:grid-cols-4 gap-4">
            {landingCopy.exportSpecCards.map((card) => (
              <div key={card.title} className="bg-slate-800/60 rounded-lg p-4 border-l-4 border-purple-600">
                <p className="font-bold text-purple-400 text-sm">{card.title}</p>
                <p className="text-slate-300 text-xs mt-2">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="usecases" className="bg-purple-900/20 border-y border-purple-800/30 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center">{copy.tokbuildingLanding.useCasesTitle}</h2>
          <p className="text-center text-slate-300 mb-16 max-w-2xl mx-auto">
            {copy.tokbuildingLanding.useCasesBody}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {landingCopy.useCases.map((useCase, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-purple-700/30 rounded-lg p-6 hover:border-purple-600/60 transition">
                <h3 className="font-bold text-purple-400 mb-2">{useCase.title}</h3>
                <p className="text-slate-300 text-sm">{useCase.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-purple-900/20 border-y border-purple-800/30 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center">{copy.tokbuildingLanding.pricingTitle}</h2>
          <p className="text-center text-slate-300 mb-16">{copy.tokbuildingLanding.pricingBody}</p>

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
                  {planPrices[idx] === 0 ? (
                    <span className="text-4xl font-bold">{plan.freeLabel}</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold">${planPrices[idx].toFixed(2)}</span>
                      <span className="text-slate-400 ml-2">{plan.type}</span>
                    </>
                  )}
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
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  {idx === 0 ? copy.tokbuildingLanding.freePlanCta : copy.tokbuildingLanding.proPlanCta}
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-400 text-sm">
            {landingCopy.pricingNote}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">{copy.tokbuildingLanding.missionTitle}</h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
          {landingCopy.missionBody}
        </p>
        <Link
          href="/tokstore"
          className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition"
        >
          {copy.tokbuildingLanding.missionStoreCta}
        </Link>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-lg p-8 max-w-md w-full border border-purple-700/30">
            <h3 className="text-2xl font-bold mb-4">{copy.tokbuildingLanding.modalTitle}</h3>
            <p className="text-slate-300 mb-6">{copy.tokbuildingLanding.modalBody}</p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 rounded-lg border border-slate-600 hover:bg-slate-800 transition"
              >
                {copy.tokbuildingLanding.close}
              </button>
              <Link
                href="/tokstore"
                className="flex-1 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 font-bold text-center transition"
              >
                {copy.tokbuildingLanding.goToTokStore}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
