'use client';

import { Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { getSiteCopy } from '@/lib/site-copy';

const SITE_COPY = getSiteCopy('en');
const COMMUNITY_MEMORIALS = SITE_COPY.memorials.curated;

export default function CommunityMemorialsPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 z-40 w-full bg-slate-900/80 backdrop-blur border-b border-amber-800/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-amber-600" />
            <h1 className="text-xl font-bold text-amber-100">SVL Legacy Vault - Community</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/memorials/login" className="text-amber-200 hover:text-amber-100 text-sm font-semibold transition">
              Sign In
            </Link>
            <Link href="/memorials/signup" className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-900 font-semibold rounded transition text-sm">
              Start Your Legacy
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-amber-100 mb-6">
              SVL Legacy Vault
            </h2>
            <p className="text-xl text-amber-100/80 mb-4">
              {SITE_COPY.memorials.subtitle}
            </p>
            <p className="text-lg text-slate-400">
              These memorials shape our mission. Their lives remind us why we Keep People Alive.
            </p>
          </div>

          {/* Memorial Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {COMMUNITY_MEMORIALS.map((memorial, idx) => (
              <div
                key={idx}
                className="bg-slate-800/40 border border-amber-800/30 rounded-xl p-6 hover:bg-slate-800/60 transition-all cursor-pointer"
                onClick={() => setExpandedId(expandedId === idx ? null : idx)}
              >
                {/* Header */}
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-amber-100">
                        {memorial.name}
                      </h3>
                      <p className="text-sm text-amber-600 font-semibold">
                        {memorial.description}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 italic">
                    {memorial.dates}
                  </p>
                </div>

                {/* Story - Collapsible */}
                <div className="space-y-4">
                  <div>
                    <p className="text-amber-100/90 text-sm leading-relaxed">
                      {memorial.story}
                    </p>
                  </div>

                  {/* Expanded Content */}
                  {expandedId === idx && (
                    <div className="pt-4 border-t border-amber-800/30 space-y-4 animate-in fade-in duration-300">
                      <div>
                        <h4 className="text-sm font-semibold text-amber-600 mb-2">
                          Part of Our Mission
                        </h4>
                        <p className="text-sm text-amber-100/70">
                          {memorial.svlConnection}
                        </p>
                      </div>

                      <div className="flex items-start gap-2 pt-2">
                        <div className="w-1 h-full bg-amber-600/30 rounded-full mt-1" />
                        <div>
                          <p className="text-xs font-semibold text-amber-500/80 mb-1">
                            Scripture
                          </p>
                          <p className="text-xs text-amber-100/60 italic">
                            {memorial.verse}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Expand Indicator */}
                  <p className="text-xs text-amber-600/60 font-semibold">
                    {expandedId === idx ? '— Click to collapse' : '↓ Click to read more'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Community Message & CTA */}
          <div className="bg-gradient-to-r from-amber-900/20 to-amber-800/10 border border-amber-800/40 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-amber-100 mb-3">
              Your Legacy Matters
            </h3>
            <p className="text-amber-100/80 mb-6">
              These 13 souls shaped the Keep People Alive mission. When you add your loved ones, you become part of this sacred community. Your memorials inspire healing, and healing keeps people alive.
            </p>
            <Link
              href="/memorials/membership"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-slate-950 font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
            >
              Start Your Legacy Vault
            </Link>
          </div>

          {/* Footer */}
          <div className="text-center pt-12 border-t border-amber-800/20">
            <p className="text-sm text-slate-400 mb-2">
              {SITE_COPY.memorials.footerNote}
            </p>
            <p className="text-xs text-amber-600/70 italic">
              {SITE_COPY.memorials.footerVerse}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
