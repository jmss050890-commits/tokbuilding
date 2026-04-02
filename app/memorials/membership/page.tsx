'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Check, Users, Lock } from 'lucide-react';
import { getMemorialProductConfig } from '@/lib/memorial-membership';

interface PricingTier {
  name: string;
  tierKey: string;
  slots: number;
  priceMonthly: number;
  priceYearly?: number;
  description: string;
  features: string[];
  additionalInfo?: string;
  cta: string;
  icon: string;
  highlight?: boolean;
}

const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Free',
    tierKey: 'free',
    slots: 1,
    priceMonthly: 0,
    description: 'One cherished memory',
    features: [
      '1 public memorial',
      'Visible to SVL community',
      'Scripture & stories included',
      'Basic editing',
    ],
    cta: 'Start Free',
    icon: '💝',
  },
  {
    name: 'Silver',
    tierKey: 'silver',
    slots: 5,
    priceMonthly: 1000,
    priceYearly: 10800,
    description: 'Personal sacred space',
    features: [
      '5 secure memorials',
      'Public or private per memorial',
      'Advanced editing & formatting',
      'Search within your memorials',
      'Email backup option',
    ],
    cta: 'Start Silver',
    icon: '🕯️',
    highlight: false,
  },
  {
    name: 'Gold',
    tierKey: 'gold',
    slots: 15,
    priceMonthly: 3000,
    priceYearly: 32400,
    description: 'Multi-generational legacy',
    features: [
      '15 secure memorials',
      'Public or private per memorial',
      'Custom memorial galleries',
      'Invite up to 3 family members to view',
      'Priority email support',
      'Automatic monthly backups',
    ],
    cta: 'Start Gold',
    icon: '👨‍👩‍👧‍👦',
    highlight: true,
  },
  {
    name: 'Platinum',
    tierKey: 'platinum',
    slots: 25,
    priceMonthly: 5500,
    priceYearly: 59400,
    description: 'Family stewardship',
    additionalInfo: '15 memorials + 2 invited users with 5 memorials each',
    features: [
      '15 personal memorials',
      '2 additional family members (5 memorials each)',
      'Shared memorial collections',
      'Family memorial timeline',
      'Unlimited view invitations',
      'Phone & email support',
      'Full backup & export options',
      'Legacy planning guidance',
    ],
    cta: 'Start Platinum',
    icon: '👑',
    highlight: false,
  },
];

export default function MemorialMembershipPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async (tier: PricingTier) => {
    if (tier.tierKey === 'free') {
      // Free tier - just navigate to sign up
      window.location.href = '/memorials/dashboard';
      return;
    }

    setIsCheckingOut(true);
    try {
      // Create TokStore checkout session
      const productConfig = getMemorialProductConfig(tier.tierKey);

      if (!productConfig) {
        alert('Tier not found');
        setIsCheckingOut(false);
        return;
      }

      const price =
        billingCycle === 'yearly' && productConfig.priceYearly
          ? productConfig.priceYearly
          : productConfig.priceMonthly;

      const response = await fetch('/api/store/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appId: productConfig.appId,
          appName: productConfig.appName,
          priceAmount: price,
          pricingTierType: 'subscription',
          interval: billingCycle === 'yearly' ? 'yearly' : 'monthly',
        }),
      });

      const data = await response.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert('Unable to start checkout. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Unable to start checkout. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const displayPrice = (tier: PricingTier) => {
    if (tier.tierKey === 'free') return 'Free';
    const price =
      billingCycle === 'yearly' && tier.priceYearly
        ? tier.priceYearly
        : tier.priceMonthly;
    return `$${(price / 100).toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 z-40 w-full bg-slate-900/80 backdrop-blur border-b border-amber-800/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-amber-600" />
            <h1 className="text-xl font-bold text-amber-100">Legacy Vault Membership</h1>
          </div>
          <Link href="/memorials" className="text-amber-200 hover:text-amber-100 transition text-sm">
            Back to Memorials
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-amber-100 mb-6">
            SVL Legacy Vault Membership
          </h2>
          <p className="text-lg text-amber-50/80 mb-8">
            Create a private, secure space to honor and remember those who shaped your life.
            <br />
            <span className="text-amber-200 font-semibold">SVL-powered. Always encrypted. Forever yours.</span>
          </p>

          {/* Billing Toggle */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                billingCycle === 'monthly'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-800 text-amber-200 hover:bg-slate-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                billingCycle === 'yearly'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-800 text-amber-200 hover:bg-slate-700'
              }`}
            >
              Yearly <span className="text-xs ml-1">(Save 10%)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_TIERS.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-lg overflow-hidden border transition transform hover:scale-105 ${
                tier.highlight
                  ? 'border-amber-500 bg-gradient-to-b from-amber-900/30 to-slate-800/40 ring-2 ring-amber-600/50'
                  : 'border-amber-700/30 bg-slate-800/40 hover:border-amber-600/60'
              }`}
            >
              {/* Highlight Badge */}
              {tier.highlight && (
                <div className="bg-amber-600 text-white text-sm font-bold text-center py-2">
                  MOST POPULAR
                </div>
              )}

              {/* Tier Header */}
              <div className="p-6 text-center border-b border-amber-700/20">
                <div className="text-4xl mb-2">{tier.icon}</div>
                <h3 className="text-2xl font-bold text-amber-100 mb-2">{tier.name}</h3>
                <p className="text-amber-200/70 text-sm mb-4">{tier.description}</p>
                {tier.additionalInfo && (
                  <p className="text-amber-50/60 text-xs italic">{tier.additionalInfo}</p>
                )}
              </div>

              {/* Pricing */}
              <div className="p-6 text-center border-b border-amber-700/20">
                <div className="text-4xl font-bold text-amber-100 mb-1">
                  {displayPrice(tier)}
                </div>
                {tier.name !== 'Free' && (
                  <p className="text-amber-200/60 text-sm">
                    {billingCycle === 'yearly' ? 'per year' : 'per month'}
                  </p>
                )}
                <p className="text-amber-50/60 text-xs mt-2">
                  {tier.slots} memorial {tier.slots !== 1 ? 'slots' : 'slot'}
                </p>
              </div>

              {/* Features */}
              <div className="p-6 space-y-3 border-b border-amber-700/20 flex-1">
                {tier.features.map((feature, fidx) => (
                  <div key={fidx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-amber-50/80 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="p-6">
                <button
                  onClick={() => handleCheckout(tier)}
                  disabled={isCheckingOut}
                  className={`w-full py-3 px-4 rounded-lg font-bold transition ${
                    tier.highlight
                      ? 'bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-slate-900 disabled:opacity-50'
                      : 'border border-amber-600 text-amber-100 hover:bg-amber-900/30 disabled:opacity-50'
                  }`}
                >
                  {isCheckingOut ? 'Processing...' : tier.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security & Trust Section */}
      <div className="border-t border-amber-800/20 bg-slate-900/40 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-amber-100 text-center mb-12">
            Your Memorials, Fully Protected
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Lock className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h4 className="text-amber-200 font-bold mb-2">Bank-Level Security</h4>
              <p className="text-amber-50/60 text-sm">
                All memorials encrypted end-to-end. Your data never shared without consent.
              </p>
            </div>

            <div className="text-center">
              <Heart className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h4 className="text-amber-200 font-bold mb-2">Your Control</h4>
              <p className="text-amber-50/60 text-sm">
                Choose which memorials are public or private. Invite family to share.
              </p>
            </div>

            <div className="text-center">
              <Users className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h4 className="text-amber-200 font-bold mb-2">Forever Access</h4>
              <p className="text-amber-50/60 text-sm">
                Your memorials belong to you. Export, backup, or share as you wish.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold text-amber-100 text-center mb-12">
          Frequently Asked Questions
        </h3>

        <div className="space-y-6">
          <div>
            <h4 className="text-amber-200 font-bold mb-2">Can I change tiers later?</h4>
            <p className="text-amber-50/60">
              Yes. Upgrade or downgrade anytime. Your memorials stay safe during any transition.
            </p>
          </div>

          <div>
            <h4 className="text-amber-200 font-bold mb-2">
              What happens to my memorials if I cancel?
            </h4>
            <p className="text-amber-50/60">
              Your memorials stay with you for 30 days. You can download and export them anytime.
              After free tier is used, cancelled subscribers can still view their memorials.
            </p>
          </div>

          <div>
            <h4 className="text-amber-200 font-bold mb-2">
              What's included in "invited users" for Platinum?
            </h4>
            <p className="text-amber-50/60">
              You can invite 2 family members who each get 5 memorial slots. They contribute under
              your Platinum membership at no additional cost.
            </p>
          </div>

          <div>
            <h4 className="text-amber-200 font-bold mb-2">Is there a free trial?</h4>
            <p className="text-amber-50/60">
              Yes! Free tier gives 1 memorial slot forever. Try paid tiers risk-free for 14 days.
            </p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="border-t border-amber-800/20 bg-slate-900/40 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="text-amber-200 text-lg font-semibold">
            Ready to create your sacred memory space?
          </p>
          <p className="text-amber-50/60">
            Start free, upgrade anytime. Remembering love helps heal.
          </p>
          <p className="text-amber-100/80">Sanders Viopro Labs LLC</p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/memorials"
              className="px-6 py-3 border border-amber-600 text-amber-100 hover:bg-amber-900/30 rounded-lg font-semibold transition"
            >
              View Public Memorials
            </Link>
            <Link
              href="/memorials/dashboard"
              className="px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-slate-900 rounded-lg font-bold transition"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
