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
    description: 'Create a fake incoming call or message to exit uncomfortable situations discreetly.',
    icon: '🚨',
    color: 'blue',
    grid: 'col-span-1',
    borderColor: 'border-cyan-500/30 hover:border-cyan-500/60',
    gradient: 'from-blue-600 to-cyan-600',
    features: [
      'Fake call or text message',
      'Physical trigger buttons',
      'Pre-recorded voice messages',
      'Silent activation',
      'Customizable contact names',
      'Works offline',
      'No suspicious notifications',
      'Discreet escape option'
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
    tagline: 'Your Medical Profile Guardian',
    description: 'Emergency responders can access your health history and medications instantly.',
    icon: '💚',
    color: 'green',
    grid: 'col-span-1',
    borderColor: 'border-emerald-500/30 hover:border-emerald-500/60',
    gradient: 'from-green-600 to-emerald-600',
    features: [
      'Medical profile creation',
      'Medication tracking',
      'Allergy warnings',
      'Hospital integration',
      'Family portal access',
      'HIPAA compliant',
      'Emergency QR code',
      '24/7 availability'
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
    tagline: 'Real-Time Safety Tracking',
    description: 'Share your location and trip details with trusted contacts automatically.',
    icon: '🚗',
    color: 'purple',
    grid: 'col-span-1',
    borderColor: 'border-purple-500/30 hover:border-purple-500/60',
    gradient: 'from-purple-600 to-pink-600',
    features: [
      'Live GPS tracking',
      'Driver verification',
      'Auto check-ins',
      'Emergency SOS button',
      'Route safety analysis',
      'Vehicle photo confirmation',
      'Smart notifications',
      'Trip history'
    ],
    plans: [
      {
        name: 'Basic',
        price: 2.99,
        type: 'one-time',
        description: 'Essential tracking',
        features: ['Live GPS tracking', 'Auto check-ins', 'One trusted contact', 'SOS button']
      },
      {
        name: 'Pro',
        price: 7.99,
        type: 'one-time',
        description: 'Full safety suite',
        features: ['Advanced GPS tracking', 'Driver verification', 'Multi-contact sharing', 'Route intelligence', 'Safety reports']
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
    id: 'toksmart',
    name: 'TokSmart',
    tagline: 'Your AI Safety Advisor',
    description: 'Chat with an AI that helps you navigate uncomfortable and threatening situations.',
    icon: '🧠',
    color: 'orange',
    grid: 'col-span-1',
    borderColor: 'border-orange-500/30 hover:border-orange-500/60',
    gradient: 'from-orange-600 to-amber-600',
    features: [
      'AI safety advisor',
      'Threat assessment',
      'De-escalation tactics',
      'Real-time guidance',
      'Chat history',
      'Personalized responses',
      'Multi-person coordination',
      'Evidence documentation'
    ],
    plans: [
      {
        name: 'Lite',
        price: 4.99,
        type: 'one-time',
        description: 'Basic AI coaching',
        features: ['AI safety advisor', 'Threat assessment', '7-day chat history', 'De-escalation tips']
      },
      {
        name: 'Pro',
        price: 9.99,
        type: 'one-time',
        description: 'Advanced guidance',
        features: ['Advanced AI advisor', 'Unlimited history', 'Priority responses', 'Group coordination', 'Evidence tools']
      }
    ],
    landingUrl: '/toksmart-landing',
    testimonial: {
      quote: 'When I didn\'t know how to handle a sketch situation, TokSmart was like having a trained crisis advisor in my pocket.',
      author: 'Marcus D.',
      role: 'Safety Professional'
    }
  }
];

export default function TokStore() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(0);
  const [showCheckout, setShowCheckout] = useState(false);


  const currentProduct = selectedProduct
    ? products.find(p => p.id === selectedProduct)
    : null;

  const bundlePrice = 28.99;
  const individualTotal = products.reduce((sum, p) => sum + p.plans[1].price, 0);
  const bundleSavings = (individualTotal - bundlePrice).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏪</span>
            <div>
              <h1 className="text-2xl font-bold">TokStore</h1>
              <p className="text-xs text-slate-400">Your Complete Safety Suite</p>
            </div>
          </div>
          <Link href="/vcc-hub" className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-sm">
            ← Back to Hub
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Your Complete Safety Suite
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Four powerful apps designed to keep you safe in any situation. Get all four apps at an unbeatable price.
          </p>
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
                  <h2 className="text-3xl font-bold mb-2">Complete Safety Suite</h2>
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
                  <h3 className="font-bold mb-3 text-lg">↩️ What's your refund policy?</h3>
                  <p className="text-slate-400">30-day money-back guarantee if you're not satisfied. No questions asked. Your satisfaction is our priority.</p>
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
              <h1 className="text-3xl font-bold mb-2">Complete Safety Suite Bundle</h1>
              <p className="text-slate-400">All 4 apps for maximum protection</p>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6 mb-8 border border-slate-600">
              <h2 className="font-bold mb-4">Your Bundle Includes:</h2>
              <div className="grid md:grid-cols-4 gap-4">
                {products.map(product => (
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

            {showCheckout && (
              <div className="mb-8 p-4 rounded-lg bg-blue-900/30 border border-blue-700 text-blue-200">
                ℹ️ Click "Continue to Stripe" to complete your purchase securely
              </div>
            )}

            <button
              onClick={() => {
                setShowCheckout(!showCheckout);
              }}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:to-emerald-800 rounded-lg font-bold text-lg transition"
            >
              Continue to Stripe →
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
                    <p className="text-lg mb-4 italic text-slate-200">"{currentProduct.testimonial.quote}"</p>
                    <p className="font-bold">{currentProduct.testimonial.author}</p>
                    <p className="text-sm text-slate-400">{currentProduct.testimonial.role}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => window.location.href = currentProduct.landingUrl}
                    className="py-4 bg-slate-700 hover:bg-slate-600 rounded-lg font-bold transition"
                  >
                    Learn More →
                  </button>
                  {showCheckout ? (
                    <button
                      className="py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:to-emerald-800 rounded-lg font-bold transition"
                    >
                      Continue to Stripe →
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowCheckout(true)}
                      className="py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:to-emerald-800 rounded-lg font-bold transition"
                    >
                      ${currentProduct.plans[selectedPlanIndex].price.toFixed(2)} - Buy Now
                    </button>
                  )}
                </div>

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
              <p className="text-sm text-slate-400">Building the world's most comprehensive personal safety platform.</p>
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
