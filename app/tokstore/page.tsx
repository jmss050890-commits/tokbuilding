'use client';

import { useState } from 'react';
import Link from 'next/link';

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
  color: string;
  grid: string;
  borderColor: string;
  gradient: string;
  features: string[];
  plans: PricingPlan[];
  landingUrl: string;
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
    color: 'blue',
    grid: 'col-span-1',
    borderColor: 'border-cyan-500/30 hover:border-cyan-500/60',
    gradient: 'from-blue-600 to-cyan-600',
    features: [
      'Fake incoming call feature',
      'Customizable contact names',
      'Timer for call duration',
      'Silent activation',
      'Local contact storage',
      'Easy to use interface',
      'No suspicious notifications',
      'Safety exit option'
    ],
    plans: [
      {
        name: 'Basic',
        price: 4.99,
        type: 'one-time',
        description: 'Single fake call feature',
        features: ['Fake calls only', '5 preset greetings', 'Basic customization']
      },
      {
        name: 'Pro',
        price: 9.99,
        type: 'one-time',
        description: 'Lifetime access, all features',
        features: ['Fake calls + text messages', 'Unlimited greetings', 'Custom voice recording', 'Physical triggers', 'Priority support']
      }
    ],
    landingUrl: '/tokaway-landing',
    testimonial: {
      quote: 'TokAway saved me from so many uncomfortable moments. It\'s like having a best friend who always knows when to call.',
      author: 'Sarah M.',
      role: 'College Student'
    }
  },
  {
    id: 'tokhealth',
    name: 'TokHealth',
    tagline: 'Your Health Profile Hub',
    description: 'Create and manage your complete health profile with medications, allergies, and emergency contacts in one place.',
    icon: '💚',
    color: 'green',
    grid: 'col-span-1',
    borderColor: 'border-emerald-500/30 hover:border-emerald-500/60',
    gradient: 'from-green-600 to-emerald-600',
    features: [
      'Medical profile creation',
      'Medication tracking',
      'Allergy & intolerance recording',
      'Emergency contact management',
      'Family account access',
      'Voice note recording',
      'Multi-language support',
      'Always accessible when needed'
    ],
    plans: [
      {
        name: 'Starter',
        price: 3.99,
        type: 'one-time',
        description: 'Basic medical profile',
        features: ['Medical history', 'Medications list', 'One contact access', 'QR code sharing']
      },
      {
        name: 'Pro',
        price: 8.99,
        type: 'one-time',
        description: 'Complete health management',
        features: ['Full medical profile', 'Medication tracking', 'Family portal', 'Hospital sync', 'AI medication alerts']
      }
    ],
    landingUrl: '/tokhealth-landing',
    testimonial: {
      quote: 'As a parent, knowing my teen\'s medical info is always accessible gives me peace of mind. Highly recommend!',
      author: 'James T.',
      role: 'Parent & Caregiver'
    }
  },
  {
    id: 'tokthru',
    name: 'TokThru',
    tagline: 'Smart Safety Check-Ins',
    description: 'Set automatic check-in reminders during trips and share safety status with trusted contacts.',
    icon: '🚗',
    color: 'purple',
    grid: 'col-span-1',
    borderColor: 'border-purple-500/30 hover:border-purple-500/60',
    gradient: 'from-purple-600 to-pink-600',
    features: [
      'Automatic check-in timers',
      'Reminder notifications',
      'Emergency contact system',
      'SOS button access',
      'De-escalation scripts',
      'Safety resource library',
      'Crisis hotline numbers',
      'Trip documentation'
    ],
    plans: [
      {
        name: 'Starter',
        price: 7.99,
        type: 'one-time',
        description: 'Essential safety features',
        features: ['Automatic check-ins', 'Emergency contacts', 'SOS button', 'Basic location sharing', 'Crisis hotlines']
      },
      {
        name: 'Pro',
        price: 16.99,
        type: 'one-time',
        description: 'Complete safety suite',
        features: ['Advanced GPS tracking', 'De-escalation scripts', 'Driver verification', 'Multi-contact sharing', 'Safety reports', 'Route intelligence']
      }
    ],
    landingUrl: '/tokthru-landing',
    testimonial: {
      quote: 'I feel confident boarding that late-night Uber. My family knows exactly where I am. TokThru is essential.',
      author: 'Emma R.',
      role: 'Frequent Traveler'
    }
  },
  {
    id: 'tokbuilding',
    name: 'TokBuilding',
    tagline: 'Create Your Own AI Agent',
    description: 'Build custom AI agents with your own personality, expertise, and voice. No coding required. Perfect for businesses, coaches, and creators.',
    icon: '🤖',
    color: 'indigo',
    grid: 'col-span-1',
    borderColor: 'border-indigo-500/30 hover:border-indigo-500/60',
    gradient: 'from-indigo-600 to-blue-600',
    features: [
      'Create custom AI agents',
      'Define personality & tone',
      'Set expertise & knowledge',
      'No coding required',
      'Instant deployment',
      'Brand your agent voice',
      'Integrate anywhere',
      'Lifetime updates'
    ],
    plans: [
      {
        name: 'Starter',
        price: 99,
        type: 'subscription',
        description: 'Build your first AI agent with chat',
        features: ['1 agent', 'Chat interface', 'Email notifications', 'Basic analytics', 'Agent dashboard', '8 template frameworks']
      },
      {
        name: 'Pro',
        price: 199,
        type: 'subscription',
        description: 'One agent with full capabilities for your business',
        features: ['1 agent', 'Voice + Chat', 'SMS notifications', 'Customer memory', 'Order history', 'Advanced analytics', 'Business branding']
      },
      {
        name: 'Business',
        price: 299,
        type: 'subscription',
        description: 'Multiple agents for growing operations',
        features: ['3 agents', 'Voice + Chat per agent', 'SMS + Email notifications', 'Customer memory & history', 'Priority support', 'Advanced analytics', 'Custom branding']
      },
      {
        name: 'Enterprise',
        price: 0,
        type: 'subscription',
        description: 'Unlimited agents for large-scale deployment',
        features: ['Unlimited agents', 'White label solution', 'API access', 'Dedicated support', 'Custom integrations', 'SLA guarantee']
      }
    ],
    landingUrl: '/tokbuilding',
    testimonial: {
      quote: 'TokBuilding let me create an AI agent that speaks with my voice and knows my business inside-out. No developers needed.',
      author: 'Marcus L.',
      role: 'Business Owner'
    }
  },
  {
    id: 'svl-ai-specialist',
    name: 'SVL AI Specialist Coaching',
    tagline: 'Expert 1-on-1 Hybrid AI Training',
    description: 'Live coaching from SVL AI specialists + pre-recorded courses + API access. Get personalized guidance on implementing AI solutions and building specialized agents for your business.',
    icon: '💼',
    color: 'rose',
    grid: 'col-span-1',
    borderColor: 'border-rose-500/30 hover:border-rose-500/60',
    gradient: 'from-rose-600 to-pink-600',
    features: [
      'Live 1-on-1 coaching sessions',
      'Pre-recorded training library',
      'SVL AI API access',
      'Custom agent strategy',
      'Implementation guidance',
      'Dedicated specialist support',
      'Project consultation',
      'KPA mission alignment'
    ],
    plans: [
      {
        name: 'Quick Session',
        price: 79.99,
        type: 'one-time',
        description: 'Single 1-hour coaching session',
        features: ['1 live session (1 hour)', 'Strategy consultation', 'Implementation tips', 'Email follow-up', 'Resource package']
      },
      {
        name: 'Growth Package',
        price: 199.99,
        type: 'one-time',
        description: '3 sessions + resources (save $40)',
        features: ['3 live sessions (1 hour each)', 'Customized AI strategy', 'Agent building support', 'API access (3 months)', 'Priority email support', 'Monthly check-ins']
      },
      {
        name: 'Pro Mastery',
        price: 299.99,
        type: 'subscription',
        description: 'Unlimited monthly coaching',
        features: ['Unlimited monthly sessions', 'Full API access', 'Pre-recorded course library', 'Weekly group workshops', '24/7 chat support', 'Custom agent projects', 'Business integration planning']
      }
    ],
    landingUrl: '/svl-ai-specialist',
    testimonial: {
      quote: 'The SVL AI coaching transformed how I think about AI. Live feedback + pre-recorded training = unstoppable growth. Worth every penny.',
      author: 'Keisha P.',
      role: 'Tech Entrepreneur'
    }
  },
  {
    id: 'mr-kpa',
    name: 'Mr. KPA Mentorship Access',
    tagline: 'Founder Wisdom & Strategy',
    description: 'Chat with Mr. KPA directly. Jerome Sanders shares founder insights, life strategy, and KPA mission wisdom. Built on lived experience.',
    icon: '✨',
    color: 'amber',
    grid: 'col-span-1',
    borderColor: 'border-amber-500/30 hover:border-amber-500/60',
    gradient: 'from-amber-600 to-yellow-500',
    features: [
      'Direct access to Mr. KPA',
      'Founder strategy insight',
      'Lived wisdom not theory',
      'Mission alignment guidance',
      'Verified SVL authority',
      'Real conversations',
      'KPA community connection',
      'Keep People Alive focus'
    ],
    plans: [
      {
        name: 'Chat Access',
        price: 19.99,
        type: 'one-time',
        description: 'Unlock Mr. KPA chat access',
        features: ['Unlimited chat with Mr. KPA', 'Founder insights anytime', 'Strategy guidance', 'Life navigation questions', 'KPA mission clarity', 'Community belonging']
      },
      {
        name: 'Premium Access',
        price: 49.99,
        type: 'one-time',
        description: 'Premium founder access',
        features: ['Priority response from Mr. KPA', 'Deeper strategy sessions', 'Business & life mentoring', 'Exclusive community', 'Direct messaging', 'Lifetime access']
      }
    ],
    landingUrl: '/agent/mr-kpa',
    testimonial: {
      quote: 'Jerome\'s guidance cut through the noise and showed me what I was actually capable of. His wisdom comes from surviving, not just studying.',
      author: 'Diamond K.',
      role: 'SVL Community Member'
    }
  }
];

export default function TokStore() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (!userEmail) {
      setError('Please enter your email address');
      return;
    }

    if (!selectedProduct) {
      setError('Please select a product');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const productId = selectedProduct === 'bundle' ? 'bundle' : selectedProduct;
      const planIndex = selectedProduct === 'bundle' ? 0 : selectedPlanIndex;

      const response = await fetch('/api/store/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          planIndex,
          userEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed');
      }

      // Redirect to Stripe checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (err) {
      setError((err as Error).message || 'Failed to initiate checkout');
    } finally {
      setIsLoading(false);
    }
  };

  const currentProduct = selectedProduct
    ? products.find(p => p.id === selectedProduct)
    : null;

  const bundlePrice = 26.99;
  // Bundle includes the 3 core safety/health apps (tokaway, tokhealth, tokthru Pro plans)
  // Subscription services (TokBuilding, SVL AI Specialist) and Mr. KPA sold separately
  const bundleProducts = products.filter(p => 
    p.id === 'tokaway' || p.id === 'tokhealth' || p.id === 'tokthru'
  );
  // TokAway Pro ($9.99) + TokHealth Pro ($8.99) + TokThru Pro ($16.99) = $35.97
  const individualTotal = 35.97;
  const bundleSavings = (individualTotal - bundlePrice).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏪</span>
            <div>
              <h1 className="text-2xl font-bold">Sanders Viopro Labs Store</h1>
              <p className="text-xs text-slate-400">Official SVL Products & Solutions</p>
            </div>
          </div>
          <Link href="/sanders-viopro-labs" className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-sm">
            ← SVL Home
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <p className="text-purple-400 mb-2 font-semibold">SANDERS VIOPRO LABS</p>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Complete Safety & Wellness Suite
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-2">
            Trusted by thousands. Aligned with our mission: Keep People Alive (KPA).
          </p>
          <p className="text-sm text-emerald-400 font-semibold">#KPA-Keeppeoplealive | #Sandersvioprolabs</p>
        </div>

        {/* Product Grid */}
        {!selectedProduct ? (
          <>
            {/* Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {products.map(product => (
                <button
                  key={product.id}
                  onClick={() => {
                    setSelectedProduct(product.id);
                    setSelectedPlanIndex(0);
                    setShowCheckout(false);
                  }}
                  className={`rounded-xl p-6 border-2 transition duration-300 h-full text-left hover:shadow-2xl ${product.borderColor} bg-slate-800/50 backdrop-blur hover:bg-slate-800`}
                >
                  <div className="text-5xl mb-3">{product.icon}</div>
                  <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                  <p className="text-sm text-slate-300 mb-4">{product.tagline}</p>
                  <p className="text-xs text-slate-400 mb-4 line-clamp-3">{product.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.features.slice(0, 3).map((feature, i) => (
                      <span key={i} className="text-xs bg-slate-700 px-2 py-1 rounded">
                        ✓ {feature}
                      </span>
                    ))}
                    {product.features.length > 3 && (
                      <span className="text-xs text-slate-400">+{product.features.length - 3} more</span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Bundle Offer */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-850 border-2 border-emerald-500/50 rounded-xl p-8 mb-12 hover:border-emerald-500 transition">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div>
                  <p className="text-slate-400 mb-2">SPECIAL OFFER</p>
                  <h2 className="text-3xl font-bold mb-2">Complete Creator Suite</h2>
                  <p className="text-slate-400">Get all 4 apps for one incredible price</p>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-emerald-400 mb-2">${bundlePrice}</div>
                  <p className="text-slate-400">Instead of ${individualTotal.toFixed(2)}</p>
                  <p className="text-lime-400 font-bold">Save ${bundleSavings}!</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedProduct('bundle');
                    setShowCheckout(true);
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:to-emerald-800 rounded-lg font-bold text-lg transition"
                >
                  Get All 4 Apps →
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 text-center">
                <div className="text-4xl mb-3">🔒</div>
                <h3 className="font-bold mb-2">256-Bit Encryption</h3>
                <p className="text-sm text-slate-400">Your data is always encrypted and protected</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 text-center">
                <div className="text-4xl mb-3">📱</div>
                <h3 className="font-bold mb-2">Instant Delivery</h3>
                <p className="text-sm text-slate-400">Get your license key immediately after purchase</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 text-center">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="font-bold mb-2">No Subscriptions</h3>
                <p className="text-sm text-slate-400">One-time purchase. Own it forever.</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 text-center">
                <div className="text-4xl mb-3">🆘</div>
                <h3 className="font-bold mb-2">24/7 Support</h3>
                <p className="text-sm text-slate-400">Help when you need it, any time of day</p>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                  <h3 className="font-bold mb-3 text-lg">📱 Can I use on multiple devices?</h3>
                  <p className="text-slate-400">Yes! Your license works on up to 3 devices simultaneously. Perfect for phone, tablet, and backup device.</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                  <h3 className="font-bold mb-3 text-lg">🔄 Can I reinstall after uninstalling?</h3>
                  <p className="text-slate-400">Absolutely. Your license never expires. Reinstall anytime without any additional costs or activation limits.</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                  <h3 className="font-bold mb-3 text-lg">💳 Is my payment information safe?</h3>
                  <p className="text-slate-400">We use Stripe for payment processing—the same secure system trusted by millions of businesses worldwide.</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                  <h3 className="font-bold mb-3 text-lg">↩️ What&rsquo;s your refund policy?</h3>
                  <p className="text-slate-400">30-day money-back guarantee if you&rsquo;re not satisfied. No questions asked. Your satisfaction is our priority.</p>
                </div>
              </div>
            </div>
          </>
        ) : selectedProduct === 'bundle' ? (
          // Bundle Checkout
          <div className="max-w-4xl mx-auto bg-slate-800 rounded-xl border border-slate-700 p-8">
            <button
              onClick={() => {
                setSelectedProduct(null);
                setShowCheckout(false);
              }}
              className="mb-6 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition text-sm"
            >
              ← Back to Store
            </button>

            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Complete Creator Suite Bundle</h1>
              <p className="text-slate-400">All 4 apps + tools for maximum impact</p>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6 mb-8 border border-slate-600">
              <h2 className="font-bold mb-4">Your Bundle Includes:</h2>
              <div className="grid md:grid-cols-4 gap-4">
                {bundleProducts.map(product => (
                  <div key={product.id} className="text-center">
                    <div className="text-3xl mb-2">{product.icon}</div>
                    <p className="font-bold text-sm">{product.name}</p>
                    <p className="text-xs text-slate-400">Pro Plan</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8 pb-8 border-b border-slate-600">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg">Combined Value:</span>
                <span className="text-2xl font-bold">${individualTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg">Bundle Price:</span>
                <span className="text-3xl font-bold text-emerald-400">${bundlePrice}</span>
              </div>
              <div className="flex justify-between items-center text-lime-400 font-bold">
                <span>You Save:</span>
                <span className="text-2xl">${bundleSavings}</span>
              </div>
            </div>

            {!userEmail && (
              <div className="mb-8">
                <label className="block text-sm font-bold mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 focus:border-emerald-500 focus:outline-none text-white placeholder-slate-400"
                />
              </div>
            )}

            {error && (
              <div className="mb-8 p-4 rounded-lg bg-red-900/30 border border-red-700 text-red-200">
                ⚠️ {error}
              </div>
            )}

            {showCheckout && (
              <div className="mb-8 p-4 rounded-lg bg-blue-900/30 border border-blue-700 text-blue-200">
                ℹ️ Click &quot;Continue to Stripe&quot; to complete your purchase securely
              </div>
            )}

            <button
              onClick={() => {
                if (!showCheckout) {
                  setShowCheckout(true);
                } else {
                  handleCheckout();
                }
              }}
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:to-emerald-800 rounded-lg font-bold text-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : (showCheckout ? 'Continue to Stripe →' : 'Proceed to Checkout')}
            </button>

            <p className="text-xs text-slate-400 text-center mt-4">🔒 Secure checkout powered by Stripe</p>
          </div>
        ) : (
          // Product Detail View
          <div className="max-w-4xl mx-auto bg-slate-800 rounded-xl border border-slate-700 p-8">
            <button
              onClick={() => {
                setSelectedProduct(null);
                setShowCheckout(false);
              }}
              className="mb-6 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition text-sm"
            >
              ← Back to Store
            </button>

            {currentProduct && (
              <>
                <div className="flex items-start gap-6 mb-8">
                  <div className="text-6xl">{currentProduct.icon}</div>
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-2">{currentProduct.name}</h1>
                    <p className="text-lg text-slate-300 mb-4">{currentProduct.tagline}</p>
                    <p className="text-slate-400 mb-6">{currentProduct.description}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8 pb-8 border-b border-slate-600">
                  <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {currentProduct.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-emerald-400 text-lg">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Plans */}
                <div className="mb-8 pb-8 border-b border-slate-600">
                  <h2 className="text-2xl font-bold mb-6">Choose Your Plan</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {currentProduct.plans.map((plan, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedPlanIndex(idx);
                          setShowCheckout(true);
                        }}
                        className={`rounded-lg p-6 border-2 transition text-left ${
                          selectedPlanIndex === idx && showCheckout
                            ? 'border-emerald-500 bg-slate-700'
                            : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
                        }`}
                      >
                        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                        <p className="text-3xl font-bold text-emerald-400 mb-2">${plan.price.toFixed(2)}</p>
                        <p className="text-sm text-slate-400 mb-4">{plan.description}</p>
                        <div className="space-y-2 mb-4">
                          {plan.features.map((feature, fi) => (
                            <div key={fi} className="flex items-center gap-2 text-sm">
                              <span className="text-emerald-400">✓</span>
                              <span className="text-slate-300">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <div className={`w-full py-2 rounded font-bold transition ${
                          selectedPlanIndex === idx && showCheckout
                            ? 'bg-emerald-600'
                            : 'bg-slate-600 hover:bg-slate-500'
                        }`}>
                          {selectedPlanIndex === idx && showCheckout ? '✓ Selected' : 'Select Plan'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="mb-8 pb-8 border-b border-slate-600">
                  <div className="bg-slate-700/50 rounded-lg p-6 border border-slate-600">
                    <p className="text-lg mb-4 italic text-slate-200">&quot;{currentProduct.testimonial.quote}&quot;</p>
                    <p className="font-bold">{currentProduct.testimonial.author}</p>
                    <p className="text-sm text-slate-400">{currentProduct.testimonial.role}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={() => window.location.href = currentProduct.landingUrl}
                    className="py-4 bg-slate-700 hover:bg-slate-600 rounded-lg font-bold transition"
                  >
                    Learn More →
                  </button>
                  <button
                    onClick={() => {
                      if (!showCheckout) {
                        setShowCheckout(true);
                      } else {
                        handleCheckout();
                      }
                    }}
                    disabled={isLoading}
                    className="py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:to-emerald-800 rounded-lg font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Processing...' : (showCheckout ? 'Continue to Stripe →' : `${currentProduct.plans[selectedPlanIndex].price.toFixed(2)} - Buy Now`)}
                  </button>
                </div>

                {!userEmail && showCheckout && (
                  <div className="mb-6">
                    <label className="block text-sm font-bold mb-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 focus:border-emerald-500 focus:outline-none text-white placeholder-slate-400"
                    />
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 rounded-lg bg-red-900/30 border border-red-700 text-red-200">
                    ⚠️ {error}
                  </div>
                )}

                {showCheckout && (
                  <div className="mt-8 p-4 rounded-lg bg-yellow-900/30 border border-yellow-700 text-yellow-200">
                    <p className="font-bold mb-2">🛒 Checkout Summary</p>
                    <p className="text-sm">
                      {currentProduct.name} - {currentProduct.plans[selectedPlanIndex].name}
                    </p>
                    <p className="font-bold mt-2">
                      Total: ${currentProduct.plans[selectedPlanIndex].price.toFixed(2)}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-slate-900 border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {products.map(product => (
              <div key={product.id}>
                <h3 className="font-bold mb-3">{product.name}</h3>
                <a href={product.landingUrl} className="text-sm text-slate-400 hover:text-slate-200 block mb-2">
                  Learn More
                </a>
              </div>
            ))}
            <div>
              <h3 className="font-bold mb-3">KPA</h3>
              <p className="text-sm text-slate-400">Building the world&rsquo;s most comprehensive personal safety platform.</p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            <p>© 2024 Kapa Personal Advocates. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
