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
        'Smart question routing',
        'Multi-AI comparison',
        'Chat history (7 days)',
        '4 AI model access (Scholar, Gemini, ChatGPT, Claude)',
        'Basic question analysis',
        'Study assist',
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
        'Personalized learning insights',
        'Research acceleration',
        'Integration with other Tok apps',
        'Vision & document analysis',
        'Real-time AI collaboration',
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
              <span className="text-sm text-orange-300">Smart Question Routing</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">AI Study Partner</span>
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Ask anything—TokSmart intelligently routes your question to the best AI for the job. Scholar GPT for academics, Gemini for research, ChatGPT for creativity, Claude for deep analysis. Get the right answer faster.
            </p>
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setShowModal(true)}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 font-bold transition transform hover:scale-105"
              >
                Start Learning
              </button>
              <a
                href="#features"
                className="px-8 py-3 rounded-lg border border-orange-600 hover:bg-orange-900/30 font-bold transition"
              >
                Learn More
              </a>
            </div>
            <div className="flex gap-6 text-sm text-slate-400">
              <div>⭐ 4 AI Models</div>
              <div>📚 For Students & Workers</div>
              <div>🚀 Learn Faster</div>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full h-96 bg-gradient-to-b from-orange-900/30 to-transparent rounded-3xl border border-orange-700/40 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🧠</div>
                <p className="text-slate-300">Ask & Get Smart Answers</p>
                <div className="mt-6 space-y-3">
                  <div className="bg-slate-800/60 rounded px-4 py-2 text-xs text-slate-400">
                    📚 "How does photosynthesis work?"
                  </div>
                  <div className="bg-orange-900/40 rounded px-4 py-2 text-xs text-orange-300 border border-orange-700/40">
                    → Scholar GPT: [Academic deep dive]
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
          <h2 className="text-4xl font-bold mb-4 text-center">Smart AI Question Routing</h2>
          <p className="text-center text-slate-300 mb-16 max-w-2xl mx-auto">
            Different questions need different AI minds. TokSmart knows which one to choose.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-900/60 border border-orange-700/30 rounded-2xl p-8 hover:border-orange-600/60 transition">
              <div className="text-4xl mb-4">🔀</div>
              <h3 className="text-xl font-bold mb-3">Smart Routing</h3>
              <p className="text-slate-300">Ask your question once. TokSmart automatically sends it to the best AI model for the job—no switching between apps needed.</p>
            </div>

            <div className="bg-slate-900/60 border border-orange-700/30 rounded-2xl p-8 hover:border-orange-600/60 transition">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-bold mb-3">Multi-AI Comparison</h3>
              <p className="text-slate-300">See how different AI perspectives approach the same question. Compare answers side-by-side and pick the best one.</p>
            </div>

            <div className="bg-slate-900/60 border border-orange-700/30 rounded-2xl p-8 hover:border-orange-600/60 transition">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">Learning Insights</h3>
              <p className="text-slate-300">TokSmart tracks your learning patterns and suggests which AI is best for your questions over time.</p>
            </div>
          </div>

          <div className="bg-slate-900/80 border-2 border-orange-700/40 rounded-3xl p-8 mb-12">
            <h3 className="text-2xl font-bold mb-6">Your AI Team</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-blue-500/30 backdrop-blur rounded-lg p-6 text-center border border-blue-400">
                <div className="text-4xl mb-2">📖</div>
                <h4 className="font-bold mb-2">Scholar GPT</h4>
                <p className="text-sm">Academic research & deep study</p>
              </div>
              <div className="bg-green-500/30 backdrop-blur rounded-lg p-6 text-center border border-green-400">
                <div className="text-4xl mb-2">🔍</div>
                <h4 className="font-bold mb-2">Gemini</h4>
                <p className="text-sm">Comprehensive research & insights</p>
              </div>
              <div className="bg-orange-500/30 backdrop-blur rounded-lg p-6 text-center border border-orange-400">
                <div className="text-4xl mb-2">💬</div>
                <h4 className="font-bold mb-2">ChatGPT</h4>
                <p className="text-sm">Conversation & creative writing</p>
              </div>
              <div className="bg-purple-500/30 backdrop-blur rounded-lg p-6 text-center border border-purple-400">
                <div className="text-4xl mb-2">🧠</div>
                <h4 className="font-bold mb-2">Claude</h4>
                <p className="text-sm">Deep analysis & complex reasoning</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900/60 border border-orange-700/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">💡 Smart Features</h3>
              <ul className="space-y-3 text-slate-300">
                <li>✓ Intelligent question classification</li>
                <li>✓ Auto-routing to best AI model</li>
                <li>✓ Side-by-side answer comparison</li>
                <li>✓ Learning pattern insights</li>
                <li>✓ Unlimited questions & chat</li>
              </ul>
            </div>

            <div className="bg-slate-900/60 border border-orange-700/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">🎓 For Students & Workers</h3>
              <ul className="space-y-3 text-slate-300">
                <li>✓ Homework help from the right AI</li>
                <li>✓ Research acceleration</li>
                <li>✓ Work problem solving</li>
                <li>✓ Project brainstorming</li>
                <li>✓ Personalized by your learning style</li>
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
            <h3 className="text-lg font-bold mb-3">Ask Your Question</h3>
            <p className="text-slate-300 text-sm">Type or describe what you want to know. TokSmart analyzes the question type instantly.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-orange-600/30 border-2 border-orange-600 flex items-center justify-center font-bold text-2xl mx-auto mb-4">2</div>
            <h3 className="text-lg font-bold mb-3">Smart Routing</h3>
            <p className="text-slate-300 text-sm">It routes to Scholar GPT for academics, Gemini for research, ChatGPT for creativity, or Claude for analysis.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-orange-600/30 border-2 border-orange-600 flex items-center justify-center font-bold text-2xl mx-auto mb-4">3</div>
            <h3 className="text-lg font-bold mb-3">Get Your Answer</h3>
            <p className="text-slate-300 text-sm">Get the best answer fast. Compare with other AIs if you want to see different perspectives.</p>
          </div>
        </div>

        <div className="bg-orange-900/30 border border-orange-700/40 rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-6">Use Cases</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-orange-600">
              <p className="font-bold text-orange-400 mb-2">Homework Help</p>
              <p className="text-slate-300 text-sm">Get help with any subject. Scholar GPT tackles the academic deep dive.</p>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-orange-600">
              <p className="font-bold text-orange-400 mb-2">Research Projects</p>
              <p className="text-slate-300 text-sm">Need to research a topic? Gemini finds comprehensive sources and insights.</p>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-orange-600">
              <p className="font-bold text-orange-400 mb-2">Creative Writing</p>
              <p className="text-slate-300 text-sm">ChatGPT is perfect for stories, essays, and creative ideas.</p>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-6 border-l-4 border-orange-600">
              <p className="font-bold text-orange-400 mb-2">Complex Analysis</p>
              <p className="text-slate-300 text-sm">Claude breaks down complex problems with deep reasoning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-orange-900/20 border-y border-orange-800/30 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center">Simple Pricing</h2>
          <p className="text-center text-slate-300 mb-16">Access all 4 AI models. Choose your plan.</p>

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
                <li><a href="mailto:support@sandersvioprolabs.com" className="hover:text-orange-400">Email Support</a></li>
                <li><a href="/legal-disclaimer.md" className="hover:text-orange-400">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-slate-300">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="/legal-disclaimer.md" className="hover:text-orange-400">Privacy Policy</a></li>
                <li><a href="/legal-disclaimer.md" className="hover:text-orange-400">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8">
            <p className="text-center text-slate-400 text-sm">
              © 2026 TokSmart. Your AI Safety Coach. Part of the KPA Mission.
            </p>
            <p className="text-center text-slate-400 text-sm mt-2">Sanders Viopro Labs LLC</p>
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
