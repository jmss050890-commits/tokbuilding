'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import SVLGuardian from './SVLGuardian';

interface PricingPlan {
  name: string;
  price: number;
  type: 'one-time' | 'subscription';
  description: string;
  features: string[];
}

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  borderClass: string;
  accentClass: string;
  features: string[];
  plans: PricingPlan[];
  landingUrl: string;
  experienceNote?: string;
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
}

const products: Product[] = [
  {
    id: 'tokaway',
    name: 'TokAway',
    tagline: 'Your Secret Escape Button',
    description: 'Create a fake incoming call to exit uncomfortable situations discreetly. Built to Keep People Alive.',
    icon: '🚨',
    borderClass: 'border-cyan-500/30 hover:border-cyan-500/60',
    accentClass: 'text-cyan-300',
    features: [
      'Fake incoming call feature',
      'Customizable contact names',
      'Timer for call duration',
      'Silent activation',
      'Local contact storage',
      'Safety exit option',
    ],
    plans: [
      {
        name: 'Basic',
        price: 4.99,
        type: 'one-time',
        description: 'Single fake call feature',
        features: ['Fake calls only', '5 preset greetings', 'Basic customization'],
      },
      {
        name: 'Pro',
        price: 9.99,
        type: 'one-time',
        description: 'Lifetime access with the full safety toolkit',
        features: ['Fake calls and text messages', 'Unlimited greetings', 'Custom voice recording', 'Priority support'],
      },
    ],
    landingUrl: '/tokaway-landing',
    testimonial: {
      quote: 'TokAway saved me from so many uncomfortable moments. It is like having backup on demand.',
      author: 'Sarah M.',
      role: 'College Student',
    },
  },
  {
    id: 'tokhealth',
    name: 'TokHealth',
    tagline: 'Original Health + Safety Challenge App',
    description: 'The original combined TokHealth experience: wellness tracking, safety-aware routines, and fun challenges built into one mobile-first app.',
    icon: '💚',
    borderClass: 'border-emerald-500/30 hover:border-emerald-500/60',
    accentClass: 'text-emerald-300',
    features: [
      'Original TokHealth and TokThru vision in one app',
      'Fun challenges to keep people engaged',
      'Wellness and safety routines',
      'Medical profile creation',
      'Medication tracking',
      'Allergy and intolerance recording',
      'Emergency contact management',
      'Family account access',
    ],
    plans: [
      {
        name: 'Starter',
        price: 3.99,
        type: 'one-time',
        description: 'Entry access to the original TokHealth mobile experience',
        features: ['Medical history', 'Medication list', 'One contact access', 'QR code sharing'],
      },
      {
        name: 'Pro',
        price: 8.99,
        type: 'one-time',
        description: 'Full original experience with safety and challenge layers',
        features: ['Full medical profile', 'Medication tracking', 'Emergency contact tools', 'Challenge-driven engagement'],
      },
    ],
    landingUrl: 'https://tokhealth.sandersvioprolabs.com',
    experienceNote: 'This opens the original TokHealth mobile build on the SVL TokHealth subdomain.',
    testimonial: {
      quote: 'The original TokHealth build feels alive because it blends wellness, safety, and daily challenges instead of acting like a flat tracker.',
      author: 'James T.',
      role: 'Parent and Caregiver',
    },
  },
  {
    id: 'tokthru',
    name: 'TokThru',
    tagline: 'Smart Safety Check-Ins',
    description: 'Set automatic check-in reminders during trips and share safety status with trusted contacts.',
    icon: '🚗',
    borderClass: 'border-fuchsia-500/30 hover:border-fuchsia-500/60',
    accentClass: 'text-fuchsia-300',
    features: [
      'Automatic check-in timers',
      'Reminder notifications',
      'Emergency contact system',
      'SOS button access',
      'De-escalation scripts',
      'Trip documentation',
    ],
    plans: [
      {
        name: 'Starter',
        price: 7.99,
        type: 'one-time',
        description: 'Essential safety features',
        features: ['Automatic check-ins', 'Emergency contacts', 'SOS button', 'Basic location sharing'],
      },
      {
        name: 'Pro',
        price: 16.99,
        type: 'one-time',
        description: 'Complete safety suite',
        features: ['Advanced GPS tracking', 'Driver verification', 'Safety reports', 'Route intelligence'],
      },
    ],
    landingUrl: '/tokthru-landing',
    testimonial: {
      quote: 'I feel more confident traveling late because my family can follow along.',
      author: 'Emma R.',
      role: 'Frequent Traveler',
    },
  },
  {
    id: 'toksmart',
    name: 'TokSmart',
    tagline: 'Your AI Study and Success Partner',
    description: 'Route every question to the right AI for school, research, writing, and deep analysis.',
    icon: '🧠',
    borderClass: 'border-violet-500/30 hover:border-violet-500/60',
    accentClass: 'text-violet-300',
    features: [
      'Smart AI model routing',
      'Scholar GPT for schoolwork',
      'Claude for deep analysis',
      'ChatGPT for creativity',
      'Gemini for broad research',
      'Voice input and spoken replies',
    ],
    plans: [
      {
        name: 'Scholar Pro',
        price: 7.99,
        type: 'subscription',
        description: 'Unlimited questions with all routed AI experiences',
        features: ['Unlimited questions', 'All 4 AI perspectives', 'Comparison workflow', 'Priority support'],
      },
      {
        name: 'Yearly Unlimited',
        price: 79.99,
        type: 'subscription',
        description: 'Best value for full-time learning and research',
        features: ['Unlimited everything', 'Priority routing', 'Export studies', 'Team-ready API access'],
      },
    ],
    landingUrl: '/toksmart',
    testimonial: {
      quote: 'TokSmart helps me get several strong answers without bouncing between tools all day.',
      author: 'McKenzie S.',
      role: 'Student and Researcher',
    },
  },
  {
    id: 'tokbuilding',
    name: 'TokBuilding',
    tagline: 'Create Your Own AI Agent',
    description: 'Build custom AI agents with your own personality, expertise, and voice. No coding required.',
    icon: '🤖',
    borderClass: 'border-indigo-500/30 hover:border-indigo-500/60',
    accentClass: 'text-indigo-300',
    features: [
      'Create custom AI agents',
      'Define personality and tone',
      'Set expertise and knowledge',
      'Instant deployment',
      'Brand your agent voice',
      'Advanced analytics',
    ],
    plans: [
      {
        name: 'Starter',
        price: 99,
        type: 'subscription',
        description: 'Build your first AI agent with chat',
        features: ['1 agent', 'Chat interface', 'Email notifications', 'Basic analytics'],
      },
      {
        name: 'Pro',
        price: 199,
        type: 'subscription',
        description: 'One agent with full business capabilities',
        features: ['Voice and chat', 'SMS notifications', 'Customer memory', 'Business branding'],
      },
      {
        name: 'Business',
        price: 299,
        type: 'subscription',
        description: 'Multiple agents for growing operations',
        features: ['3 agents', 'Priority support', 'Advanced analytics', 'Custom branding'],
      },
      {
        name: 'Enterprise',
        price: 0,
        type: 'subscription',
        description: 'Unlimited agents for large-scale deployment',
        features: ['Unlimited agents', 'White-label solution', 'API access', 'Dedicated support'],
      },
    ],
    landingUrl: '/tokbuilding',
    testimonial: {
      quote: 'TokBuilding let me launch an AI agent that actually sounds like my business.',
      author: 'Marcus L.',
      role: 'Business Owner',
    },
  },
  {
    id: 'svl-ai-specialist',
    name: 'SVL AI Specialist Coaching',
    tagline: 'Expert 1-on-1 Hybrid AI Training',
    description: 'Live coaching from SVL AI specialists plus pre-recorded courses and API access.',
    icon: '💼',
    borderClass: 'border-rose-500/30 hover:border-rose-500/60',
    accentClass: 'text-rose-300',
    features: [
      'Live 1-on-1 coaching sessions',
      'Pre-recorded training library',
      'SVL AI API access',
      'Implementation guidance',
      'Dedicated specialist support',
      'Project consultation',
    ],
    plans: [
      {
        name: 'Quick Session',
        price: 79.99,
        type: 'one-time',
        description: 'Single 1-hour coaching session',
        features: ['1 live session', 'Strategy consultation', 'Implementation tips', 'Resource package'],
      },
      {
        name: 'Growth Package',
        price: 199.99,
        type: 'one-time',
        description: '3 sessions plus resources',
        features: ['3 live sessions', 'Customized AI strategy', 'Priority email support', 'Monthly check-ins'],
      },
      {
        name: 'Pro Mastery',
        price: 299.99,
        type: 'subscription',
        description: 'Unlimited monthly coaching',
        features: ['Unlimited monthly sessions', 'Full API access', 'Weekly workshops', '24/7 chat support'],
      },
    ],
    landingUrl: '/svl-ai-specialist',
    testimonial: {
      quote: 'The coaching gave me a clear path instead of a pile of AI ideas.',
      author: 'Keisha P.',
      role: 'Tech Entrepreneur',
    },
  },
  {
    id: 'mr-kpa',
    name: 'Mr. KPA Mentorship Access',
    tagline: 'Founder Wisdom and Strategy',
    description: 'Chat with Mr. KPA directly for founder insight, mission clarity, and lived wisdom.',
    icon: '✨',
    borderClass: 'border-amber-500/30 hover:border-amber-500/60',
    accentClass: 'text-amber-300',
    features: [
      'Direct access to Mr. KPA',
      'Founder strategy insight',
      'Lived wisdom not theory',
      'Mission alignment guidance',
      'Real conversations',
      'Community connection',
    ],
    plans: [
      {
        name: 'Chat Access',
        price: 19.99,
        type: 'one-time',
        description: 'Unlock Mr. KPA chat access',
        features: ['Unlimited chat', 'Founder insights anytime', 'Life navigation questions', 'Community belonging'],
      },
      {
        name: 'Premium Access',
        price: 49.99,
        type: 'one-time',
        description: 'Priority founder access',
        features: ['Priority response', 'Deeper strategy sessions', 'Business mentoring', 'Lifetime access'],
      },
    ],
    landingUrl: '/agent/mr-kpa',
    testimonial: {
      quote: 'Jerome cut through the noise and helped me focus on what matters.',
      author: 'Diamond K.',
      role: 'SVL Community Member',
    },
  },
];

export default function TokStore() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentProduct = useMemo(
    () => products.find((product) => product.id === selectedProductId) ?? null,
    [selectedProductId]
  );

  const currentPlan = currentProduct?.plans[selectedPlanIndex] ?? null;

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setSelectedPlanIndex(0);
    setShowCheckout(false);
    setError(null);
  };

  const handleCheckout = async () => {
    if (!userEmail) {
      setError('Please enter your email address.');
      return;
    }

    if (!currentProduct || !currentPlan) {
      setError('Please select a product and plan.');
      return;
    }

    if (currentPlan.price <= 0) {
      window.location.href = currentProduct.landingUrl;
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/store/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appId: currentProduct.id,
          pricingTierIndex: selectedPlanIndex,
          userEmail,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed');
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (err) {
      setError((err as Error).message || 'Failed to initiate checkout');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏪</span>
            <div>
              <h1 className="text-2xl font-bold">Sanders Viopro Labs Store</h1>
              <p className="text-xs text-slate-400">Official SVL products, agents, and learning tools</p>
            </div>
          </div>
          <Link
            href="/sanders-viopro-labs"
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm transition hover:bg-slate-700"
          >
            ← SVL Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-12">
          <SVLGuardian />
        </div>

        {!currentProduct ? (
          <>
            <section className="mb-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
                <p className="mb-2 text-sm uppercase tracking-[0.2em] text-slate-400">Store Focus</p>
                <h2 className="mb-3 text-3xl font-bold">Safety tools, AI agents, and learning products in one place.</h2>
                <p className="text-slate-300">
                  The original TokHealth build now sits in the store alongside TokSmart, the core VCC apps, and the SVL agent products.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
                <h3 className="mb-2 font-semibold">Secure checkout</h3>
                <p className="text-sm text-slate-400">Stripe handles payment processing for one-time purchases and subscriptions.</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
                <h3 className="mb-2 font-semibold">Flexible pricing</h3>
                <p className="text-sm text-slate-400">The catalog supports one-time tools, subscriptions, and enterprise follow-up flows.</p>
              </div>
            </section>

            <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleSelectProduct(product.id)}
                  className={`h-full rounded-2xl border-2 bg-slate-800/60 p-6 text-left transition hover:bg-slate-800 ${product.borderClass}`}
                >
                  <div className="mb-4 text-5xl">{product.icon}</div>
                  <h2 className="mb-1 text-xl font-bold">{product.name}</h2>
                  <p className={`mb-3 text-sm ${product.accentClass}`}>{product.tagline}</p>
                  <p className="mb-4 text-sm text-slate-400">{product.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.features.slice(0, 3).map((feature) => (
                      <span key={feature} className="rounded-full bg-slate-700 px-2 py-1 text-xs text-slate-200">
                        {feature}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </section>
          </>
        ) : (
          <section className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl">
            <button
              onClick={() => {
                setSelectedProductId(null);
                setShowCheckout(false);
                setError(null);
              }}
              className="mb-6 rounded-lg bg-slate-800 px-4 py-2 text-sm transition hover:bg-slate-700"
            >
              ← Back to Store
            </button>

            <div className="mb-8 flex flex-col gap-6 border-b border-slate-800 pb-8 md:flex-row md:items-start">
              <div className="text-6xl">{currentProduct.icon}</div>
              <div className="flex-1">
                <h2 className="mb-2 text-4xl font-bold">{currentProduct.name}</h2>
                <p className={`mb-4 text-lg ${currentProduct.accentClass}`}>{currentProduct.tagline}</p>
                <p className="max-w-3xl text-slate-300">{currentProduct.description}</p>
                {currentProduct.experienceNote && (
                  <p className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                    {currentProduct.experienceNote}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-8 grid gap-8 border-b border-slate-800 pb-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <h3 className="mb-4 text-2xl font-bold">What You Get</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {currentProduct.features.map((feature) => (
                    <div key={feature} className="rounded-xl border border-slate-800 bg-slate-800/70 px-4 py-3 text-sm text-slate-200">
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-6">
                <p className="mb-3 text-sm uppercase tracking-[0.2em] text-slate-500">Customer View</p>
                <p className="mb-4 text-lg italic text-slate-200">"{currentProduct.testimonial.quote}"</p>
                <p className="font-semibold">{currentProduct.testimonial.author}</p>
                <p className="text-sm text-slate-400">{currentProduct.testimonial.role}</p>
              </div>
            </div>

            <div className="mb-8 border-b border-slate-800 pb-8">
              <h3 className="mb-5 text-2xl font-bold">Choose Your Plan</h3>
              <div className="grid gap-4 lg:grid-cols-2">
                {currentProduct.plans.map((plan, index) => {
                  const isSelected = selectedPlanIndex === index;

                  return (
                    <button
                      key={`${currentProduct.id}-${plan.name}`}
                      onClick={() => {
                        setSelectedPlanIndex(index);
                        setShowCheckout(true);
                        setError(null);
                      }}
                      className={`rounded-2xl border-2 p-5 text-left transition ${
                        isSelected
                          ? 'border-emerald-500 bg-slate-800'
                          : 'border-slate-700 bg-slate-800/60 hover:border-slate-500'
                      }`}
                    >
                      <div className="mb-3 flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-xl font-bold">{plan.name}</h4>
                          <p className="mt-1 text-sm text-slate-400">{plan.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-emerald-400">
                            {plan.price > 0 ? `$${plan.price.toFixed(2)}` : 'Custom'}
                          </p>
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{plan.type}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-slate-300">
                        {plan.features.map((feature) => (
                          <p key={feature}>{feature}</p>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <button
                onClick={() => {
                  window.location.href = currentProduct.landingUrl;
                }}
                className="rounded-xl bg-slate-800 py-4 font-semibold transition hover:bg-slate-700"
              >
                Learn More →
              </button>
              <button
                onClick={() => {
                  if (!showCheckout) {
                    setShowCheckout(true);
                    setError(null);
                    return;
                  }
                  void handleCheckout();
                }}
                disabled={isLoading}
                className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 py-4 font-semibold transition hover:to-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading
                  ? 'Processing...'
                  : currentPlan && currentPlan.price <= 0
                    ? 'Talk to SVL About Enterprise'
                    : showCheckout && currentPlan
                      ? `Continue with ${currentPlan.name} →`
                      : 'Start Checkout'}
              </button>
            </div>

            {showCheckout && currentPlan && currentPlan.price > 0 && (
              <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-800/70 p-6">
                <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold">Checkout Summary</h3>
                    <p className="text-sm text-slate-400">
                      {currentProduct.name} · {currentPlan.name}
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-emerald-400">${currentPlan.price.toFixed(2)}</p>
                </div>

                <label className="mb-2 block text-sm font-semibold">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={userEmail}
                  onChange={(event) => setUserEmail(event.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
                />
                <p className="mt-3 text-xs text-slate-400">Secure checkout powered by Stripe.</p>
              </div>
            )}

            {error && (
              <div className="mt-6 rounded-xl border border-red-700 bg-red-950/40 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
