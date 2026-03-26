'use client';

import Link from 'next/link';
import { useSiteCopy } from '@/app/components/SiteLanguageControl';

export default function KPA() {
  const copy = useSiteCopy();
  const pageCopy = copy.kpaPage;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur border-b border-green-800/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">❤️</span>
            <h1 className="text-2xl font-bold">{pageCopy.title}</h1>
          </div>
          <Link href="/" className="px-4 py-2 rounded-lg bg-green-800 hover:bg-green-700 transition">
            ← {copy.common?.back || 'Back'}
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
            {pageCopy.heroTitle}
          </h1>
          <p className="text-2xl text-green-300 mb-6">{pageCopy.heroSubtitle}</p>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            {pageCopy.missionStatement}
          </p>
        </div>

        {/* Core Purpose */}
        <div className="bg-slate-800/50 rounded-xl border border-green-700/30 p-12 mb-12">
          <h2 className="text-3xl font-bold mb-6">{pageCopy.corePurpose}</h2>
          <p className="text-lg text-slate-300">
            {pageCopy.missionStatement}
          </p>
        </div>

        {/* Four Pillars */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Four Pillars of KPA</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {pageCopy.fourPillars?.map((pillar: { title: string; description: string }, idx: number) => (
              <div key={idx} className={`bg-gradient-to-br ${idx % 2 === 0 ? 'from-green-900/30' : 'from-emerald-900/30'} to-slate-800/30 rounded-lg p-8 border ${idx % 2 === 0 ? 'border-green-700/20 hover:border-green-500/40' : 'border-emerald-700/20 hover:border-emerald-500/40'} transition`}>
                <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                <p className="text-slate-400">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Areas */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Areas of Impact</h2>
          <div className="space-y-4">
            {pageCopy.impactAreas?.map((area: string, idx: number) => (
              <div key={idx} className="bg-slate-800/50 rounded-lg p-6 border border-green-700/30 hover:border-green-500/60 transition">
                <h3 className="text-lg font-bold text-green-300 mb-2">• {area}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Related Initiatives */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Link href="/sanders-viopro-labs" className="bg-gradient-to-br from-purple-900/30 to-slate-800/30 rounded-lg p-8 border border-purple-700/30 hover:border-purple-500/60 transition">
            <h3 className="text-2xl font-bold mb-2">Sanders Viopro Labs</h3>
            <p className="text-slate-400">{pageCopy.relatedInitiatives}</p>
          </Link>

          <Link href="/think-speak-work" className="bg-gradient-to-br from-blue-900/30 to-slate-800/30 rounded-lg p-8 border border-blue-700/30 hover:border-blue-500/60 transition">
            <h3 className="text-2xl font-bold mb-2">#thinkspeakworkandwatchGodwork4U</h3>
            <p className="text-slate-400">Spiritual movement inspiring action and faith</p>
          </Link>
        </div>

        {/* CTA */}
        <div className="text-center mb-16">
          <Link href="/tokstore" className="inline-block px-8 py-3 rounded-lg bg-green-700 hover:bg-green-600 transition font-semibold">
            {pageCopy.exploreTokStore}
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 border-t border-slate-800 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <p className="text-slate-400 mb-4">{pageCopy.footer}</p>
        </div>
      </div>
    </div>
  );
}
