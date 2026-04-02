'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Users, Lock, Sparkles, ArrowRight } from 'lucide-react';

export default function MemorialsLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 z-40 w-full bg-slate-900/80 backdrop-blur border-b border-amber-800/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          <Heart className="w-6 h-6 text-amber-600" />
          <h1 className="text-xl font-bold text-amber-100">SVL Legacy Vault</h1>
        </div>
      </nav>

      {/* Hero */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-amber-100 mb-6">
            SVL Legacy Vault
          </h2>
          <p className="text-2xl text-amber-100/80 mb-4">
            Sacred space to honor those who shaped your heart
          </p>
          <p className="text-lg text-slate-400 mb-12">
            Remember. Reflect. Grow. Keep them alive in your heart.
          </p>
        </div>
      </div>

      {/* Two Paths */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Path 1: Community Memorials */}
          <Link
            href="/memorials/community"
            className="group relative bg-gradient-to-br from-slate-800/60 to-slate-800/30 border border-amber-800/30 rounded-2xl p-8 hover:border-amber-600/50 transition-all hover:shadow-xl hover:shadow-amber-900/20"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-900/0 to-amber-900/5 group-hover:from-amber-900/10 group-hover:to-amber-900/10 transition-all" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-10 h-10 text-amber-600" />
                <ArrowRight className="w-5 h-5 text-amber-600/0 group-hover:text-amber-600 transition-colors" />
              </div>

              <h3 className="text-3xl font-bold text-amber-100 mb-3">
                Community Memorials
              </h3>

              <p className="text-amber-100/70 mb-6 leading-relaxed">
                Explore the 13 souls who shaped the Keep People Alive mission. Their stories inspire healing and remind us why we serve.
              </p>

              <ul className="space-y-2 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                  13 curated memorials
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                  Free exploration
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                  Inspire your own vault
                </li>
              </ul>

              <span className="inline-block bg-amber-600/20 text-amber-300 font-semibold py-2 px-4 rounded-lg group-hover:bg-amber-600/30 transition-colors">
                Explore Community →
              </span>
            </div>
          </Link>

          {/* Path 2: Your Personal Vault */}
          <Link
            href="/memorials/membership"
            className="group relative bg-gradient-to-br from-amber-900/40 to-amber-900/10 border border-amber-600/50 rounded-2xl p-8 hover:border-amber-500 transition-all hover:shadow-xl hover:shadow-amber-900/30"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-900/20 to-amber-900/5 group-hover:from-amber-900/30 group-hover:to-amber-900/15 transition-all" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <Lock className="w-10 h-10 text-amber-500" />
                <ArrowRight className="w-5 h-5 text-amber-500" />
              </div>

              <h3 className="text-3xl font-bold text-amber-50 mb-3">
                Your Legacy Vault
              </h3>

              <p className="text-amber-50/90 mb-6 leading-relaxed">
                Create a sacred space to preserve memories of those you love. Store, cherish, and connect with guardians who remember.
              </p>

              <ul className="space-y-2 text-sm text-amber-100/80 mb-8">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Start free with 1 memorial
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Talk to Legacy Guardians
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Upgrade for more slots
                </li>
              </ul>

              <span className="inline-block bg-amber-500 text-slate-950 font-bold py-2 px-4 rounded-lg group-hover:bg-amber-400 transition-colors">
                Create Your Vault →
              </span>
            </div>
          </Link>
        </div>

        {/* Features Highlight */}
        <div className="bg-slate-800/40 border border-amber-800/30 rounded-2xl p-8 mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Sparkles className="w-8 h-8 text-amber-600 mb-3" />
              <h4 className="font-bold text-amber-100 mb-2">Legacy Guardians</h4>
              <p className="text-sm text-slate-400">
                Talk to AI Guardians who embody the wisdom and love of those you remember.
              </p>
            </div>

            <div>
              <Heart className="w-8 h-8 text-amber-600 mb-3" />
              <h4 className="font-bold text-amber-100 mb-2">Sacred Preservation</h4>
              <p className="text-sm text-slate-400">
                Keep memories alive with encrypted storage and family sharing options.
              </p>
            </div>

            <div>
              <Users className="w-8 h-8 text-amber-600 mb-3" />
              <h4 className="font-bold text-amber-100 mb-2">Community Connection</h4>
              <p className="text-sm text-slate-400">
                Part of a healing community where remembering helps keep people alive.
              </p>
            </div>
          </div>
        </div>

        {/* CTA for Authenticated Users */}
        <div className="text-center">
          <p className="text-slate-400 mb-6">
            Already a member? 
            <Link href="/memorials/dashboard" className="text-amber-500 hover:text-amber-400 font-semibold ml-2">
              Go to Your Vault
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-amber-800/20 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-slate-400">
          <p className="mb-2">
            "Blessed are those who mourn, for they will be comforted." — Matthew 5:4
          </p>
          <p>
            SVL Legacy Vault is powered by Keep People Alive mission
          </p>
          <p className="mt-2 text-slate-300">Sanders Viopro Labs LLC</p>
        </div>
      </div>
    </div>
  );
}


