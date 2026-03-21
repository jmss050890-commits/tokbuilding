'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TokBuildingLanding() {
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const plans = [
    {
      name: 'TokBuilding Free',
      price: 0,
      type: 'forever',
      features: [
        'No-code agent builder (5-step wizard)',
        'Basic personality customization',
        'System prompt generation',
        'JSON export',
        'Save drafts locally',
        'Community templates',
      ],
    },
    {
      name: 'TokBuilding Pro',
      price: 4.99,
      type: 'one-time',
      features: [
        'Everything in Free',
        'Advanced personality customization',
        'Multi-agent orchestration',
        'API integration ready',
        'Custom knowledge bases',
        'Advanced analytics',
        'Priority support',
      ],
    },
  ];

  const features = [
    { icon: '🧠', title: 'No-Code Agent Builder', description: 'Create AI agents without writing a single line of code. Simple 5-step wizard guides you through the process.' },
    { icon: '⚙️', title: 'Personality Customization', description: 'Define your agent\'s tone, personality, and response style. Make it sound like your brand.' },
    { icon: '📋', title: 'System Prompt Generator', description: 'Automatically generate powerful system prompts aligned with KPA mission values.' },
    { icon: '💾', title: 'JSON Specification Export', description: 'Export full agent specifications as JSON. Deploy anywhere or share with your team.' },
    { icon: '🎯', title: 'Target Audience Definition', description: 'Specify who your agent serves and automatically optimize prompts for that audience.' },
    { icon: '📚', title: 'Knowledge Focus Area', description: 'Define the primary domain your agent specializes in—education, health, safety, business, or custom.' },
  ];

  const useCases = [
    { title: 'Customer Support Agents', description: 'Build customer service bots that understand your company tone and policies.' },
    { title: 'Educational Tutors', description: 'Create AI tutors customized for your subject matter and teaching style.' },
    { title: 'Safety Assistants', description: 'Build agents aligned with KPA mission that provide accurate safety guidance.' },
    { title: 'Business Consultants', description: 'Deploy internal AI advisors for specific business domains.' },
    { title: 'Health Coaches', description: 'Create health-focused agents that provide evidence-based wellness guidance.' },
    { title: 'Creative Collaborators', description: 'Build AI co-creators for content, design, and ideation tasks.' },
  ];

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
              Features
            </a>
            <a href="#usecases" className="hover:text-purple-400 transition">
              Use Cases
            </a>
            <a href="#pricing" className="hover:text-purple-400 transition">
              Pricing
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-purple-900/40 border border-purple-700/60">
              <span className="text-sm text-purple-300">No-Code AI Agent Builder</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Build Custom <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">AI Agents</span>
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Create powerful AI agents without coding. Define personality, knowledge focus, and target audience. TokBuilding generates deployment-ready JSON specifications aligned with KPA mission values. Keep People Alive through intelligent automation.
            </p>
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setShowModal(true)}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 font-bold transition transform hover:scale-105"
              >
                Build Now
              </button>
              <a
                href="#features"
                className="px-8 py-3 rounded-lg border border-purple-600 hover:bg-purple-900/30 font-bold transition"
              >
                Learn More
              </a>
            </div>
            <div className="flex gap-6 text-sm text-slate-400">
              <div>⚡ 5-Step Wizard</div>
              <div>📋 JSON Export</div>
              <div>🎯 KPA Aligned</div>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full h-96 bg-gradient-to-b from-purple-900/30 to-transparent rounded-3xl border border-purple-700/40 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🧠</div>
                <p className="text-slate-300">Agent Builder Wizard</p>
                <div className="mt-6 space-y-3">
                  <div className="bg-slate-800/60 rounded px-4 py-2 text-xs text-slate-400">
                    Step 1: Name & Purpose
                  </div>
                  <div className="bg-slate-800/60 rounded px-4 py-2 text-xs text-slate-400">
                    Step 2: Personality
                  </div>
                  <div className="bg-slate-800/60 rounded px-4 py-2 text-xs text-slate-400">
                    Step 3: Knowledge Area
                  </div>
                  <div className="bg-slate-800/60 rounded px-4 py-2 text-xs text-slate-400">
                    Step 4: Target Audience
                  </div>
                  <div className="bg-slate-800/60 rounded px-4 py-2 text-xs text-slate-400">
                    Step 5: Review & Export
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
          <h2 className="text-4xl font-bold mb-4 text-center">Powerful Agent Building Tools</h2>
          <p className="text-center text-slate-300 mb-16 max-w-2xl mx-auto">
            Everything you need to create, customize, and deploy AI agents. No coding required.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-purple-700/30 rounded-2xl p-8 hover:border-purple-600/60 transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-purple-900/30 border border-purple-700/40 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">KPA Mission Alignment Built-In</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-purple-600">
                <p className="font-bold text-purple-400 mb-2">Safety First</p>
                <p className="text-slate-300 text-sm">All agents are generated with safety guardrails. Prevent harmful outputs automatically.</p>
              </div>
              <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-purple-600">
                <p className="font-bold text-purple-400 mb-2">Truth & Accuracy</p>
                <p className="text-slate-300 text-sm">Define knowledge boundaries. Agents admit what they don't know rather than guess.</p>
              </div>
              <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-purple-600">
                <p className="font-bold text-purple-400 mb-2">Human-Centered</p>
                <p className="text-slate-300 text-sm">Agents augment human decision-making. They inform, never replace, human judgment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">Build Your Agent in 5 Steps</h2>
        <div className="grid md:grid-cols-5 gap-4 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-purple-600/30 border-2 border-purple-600 flex items-center justify-center font-bold text-2xl mx-auto mb-4">1</div>
            <h3 className="text-lg font-bold mb-2">Name & Purpose</h3>
            <p className="text-slate-300 text-sm">Give your agent a name and describe its primary mission.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-purple-600/30 border-2 border-purple-600 flex items-center justify-center font-bold text-2xl mx-auto mb-4">2</div>
            <h3 className="text-lg font-bold mb-2">Define Personality</h3>
            <p className="text-slate-300 text-sm">Choose tone, style, and communication approach.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-purple-600/30 border-2 border-purple-600 flex items-center justify-center font-bold text-2xl mx-auto mb-4">3</div>
            <h3 className="text-lg font-bold mb-2">Knowledge Area</h3>
            <p className="text-slate-300 text-sm">Define what your agent specializes in.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-purple-600/30 border-2 border-purple-600 flex items-center justify-center font-bold text-2xl mx-auto mb-4">4</div>
            <h3 className="text-lg font-bold mb-2">Target Audience</h3>
            <p className="text-slate-300 text-sm">Specify who the agent serves to optimize responses.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-purple-600/30 border-2 border-purple-600 flex items-center justify-center font-bold text-2xl mx-auto mb-4">5</div>
            <h3 className="text-lg font-bold mb-2">Review & Export</h3>
            <p className="text-slate-300 text-sm">Review generated JSON and export to deploy.</p>
          </div>
        </div>

        <div className="bg-purple-900/30 border border-purple-700/40 rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-6">Export Your Agent Specification</h3>
          <p className="text-slate-300 mb-6">TokBuilding generates a complete JSON specification that includes:</p>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-slate-800/60 rounded-lg p-4 border-l-4 border-purple-600">
              <p className="font-bold text-purple-400 text-sm">Agent Metadata</p>
              <p className="text-slate-300 text-xs mt-2">Name, version, author, purpose</p>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-4 border-l-4 border-purple-600">
              <p className="font-bold text-purple-400 text-sm">System Prompt</p>
              <p className="text-slate-300 text-xs mt-2">Custom-generated instructions</p>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-4 border-l-4 border-purple-600">
              <p className="font-bold text-purple-400 text-sm">Personality Config</p>
              <p className="text-slate-300 text-xs mt-2">Tone, response style, constraints</p>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-4 border-l-4 border-purple-600">
              <p className="font-bold text-purple-400 text-sm">Deployment Ready</p>
              <p className="text-slate-300 text-xs mt-2">Use with any LLM API</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="usecases" className="bg-purple-900/20 border-y border-purple-800/30 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center">Build Agents for Every Purpose</h2>
          <p className="text-center text-slate-300 mb-16 max-w-2xl mx-auto">
            From customer support to education to safety—TokBuilding has templates and tools for any domain.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-purple-700/30 rounded-lg p-6 hover:border-purple-600/60 transition">
                <h3 className="font-bold text-purple-400 mb-2">{useCase.title}</h3>
                <p className="text-slate-300 text-sm">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-purple-900/20 border-y border-purple-800/30 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center">Simple Pricing</h2>
          <p className="text-center text-slate-300 mb-16">Start free. Pro features available for power users.</p>

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
                  {plan.price === 0 ? (
                    <span className="text-4xl font-bold">Free</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold">${plan.price.toFixed(2)}</span>
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
                  {idx === 0 ? 'Get Started Free' : 'Upgrade to Pro'}
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-400 text-sm">
            All plans include the core 5-step builder, JSON export, and KPA mission alignment.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Keep People Alive</h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
          TokBuilding is created by Sanders Viopro Labs with a singular mission: <span className="text-purple-400 font-bold">Keep People Alive</span>. By making AI agent creation accessible to everyone, we enable safety-first automation that augments human decision-making. Build agents that inform, empower, and protect.
        </p>
        <Link
          href="/tokstore"
          className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition"
        >
          Explore Full SVL TokStore →
        </Link>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-lg p-8 max-w-md w-full border border-purple-700/30">
            <h3 className="text-2xl font-bold mb-4">Ready to Build Your Agent?</h3>
            <p className="text-slate-300 mb-6">Visit the TokStore to start building custom AI agents with the TokBuilding no-code wizard.</p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 rounded-lg border border-slate-600 hover:bg-slate-800 transition"
              >
                Close
              </button>
              <Link
                href="/tokstore"
                className="flex-1 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 font-bold text-center transition"
              >
                Go to TokStore
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
