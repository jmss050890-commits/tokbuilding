'use client';

'use client';

import Link from 'next/link';
import { useSiteCopy } from '@/app/components/SiteLanguageControl';
import FacebookPostEmbed from '@/app/components/FacebookPostEmbed';

export default function SandersVioProLabs() {
  const copy = useSiteCopy();
  const pageCopy = copy.sandersVioproLabs;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur border-b border-purple-800/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🥼</span>
            <h1 className="text-2xl font-bold">Sanders Viopro Labs</h1>
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/our-story" className="px-4 py-2 rounded-lg text-purple-300 hover:text-white transition">
              {pageCopy.nav.ourStory}
            </Link>
            <Link href="/svl-progress" className="px-4 py-2 rounded-lg text-amber-300 hover:text-white transition">
              {pageCopy.nav.progress}
            </Link>
            <Link href="/" className="px-4 py-2 rounded-lg bg-purple-800 hover:bg-purple-700 transition">
              ← {pageCopy.nav.backHome}
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Sanders Viopro Labs
          </h1>
          <p className="text-2xl text-purple-300 mb-6">#Sandersvioprolabs</p>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            {pageCopy.heroBody}
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-slate-800/50 rounded-xl border border-purple-700/30 p-12 mb-12">
          <h2 className="text-3xl font-bold mb-6">{pageCopy.missionTitle}</h2>
          <p className="text-lg text-slate-300 mb-4">
            {pageCopy.missionBody1}
          </p>
          <p className="text-lg text-slate-300">
            {pageCopy.missionBody2}
          </p>
        </div>

        {/* Focus Areas */}
        <h2 className="text-3xl font-bold mb-8 text-center">{pageCopy.focusAreasTitle}</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-purple-900/30 to-slate-800/30 rounded-lg p-8 border border-purple-700/20 hover:border-purple-500/40 transition">
            <div className="text-4xl mb-4">🔬</div>
            <h3 className="text-xl font-bold mb-3">{pageCopy.focusAreas[0]?.title}</h3>
            <p className="text-slate-400">
              {pageCopy.focusAreas[0]?.body}
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-900/30 to-slate-800/30 rounded-lg p-8 border border-pink-700/20 hover:border-pink-500/40 transition">
            <div className="text-4xl mb-4">⚙️</div>
            <h3 className="text-xl font-bold mb-3">{pageCopy.focusAreas[1]?.title}</h3>
            <p className="text-slate-400">
              {pageCopy.focusAreas[1]?.body}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-slate-800/30 rounded-lg p-8 border border-purple-700/20 hover:border-purple-500/40 transition">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-3">{pageCopy.focusAreas[2]?.title}</h3>
            <p className="text-slate-400">
              {pageCopy.focusAreas[2]?.body}
            </p>
          </div>
        </div>

        {/* Founder Story Section */}
        <div className="mb-16">
          <Link href="/our-story" className="block bg-gradient-to-br from-purple-900/50 via-pink-900/30 to-slate-900/50 rounded-xl border-2 border-purple-600/50 hover:border-purple-400/80 p-12 transition transform hover:scale-105 cursor-pointer">
            <div className="text-center">
              <div className="text-5xl mb-6">📖</div>
              <h2 className="text-4xl font-bold text-white mb-4">{pageCopy.storyTitle}</h2>
              <p className="text-xl text-purple-200 mb-6 max-w-2xl mx-auto">
                {pageCopy.storyBody}
              </p>
              <span className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition">
                {pageCopy.storyCta}
              </span>
            </div>
          </Link>
        </div>

        <div className="mb-16">
          <Link href="/svl-progress" className="block bg-gradient-to-br from-amber-900/40 via-slate-900/40 to-black rounded-xl border-2 border-amber-500/40 hover:border-amber-300/80 p-12 transition transform hover:scale-105 cursor-pointer">
            <div className="text-center">
              <div className="text-5xl mb-6">△</div>
              <h2 className="text-4xl font-bold text-white mb-4">{pageCopy.progressTitle}</h2>
              <p className="text-xl text-amber-100 mb-6 max-w-3xl mx-auto">
                {pageCopy.progressBody}
              </p>
              <span className="inline-block px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg transition">
                {pageCopy.progressCta}
              </span>
            </div>
          </Link>
        </div>

        {/* Our Products */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{pageCopy.productsTitle}</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Link href="/tokstore" className="bg-gradient-to-br from-amber-900/40 to-slate-800/40 hover:from-amber-800/50 hover:to-slate-700/50 rounded-lg p-8 border border-amber-600/60 hover:border-amber-400/80 transition">
              <div className="text-5xl mb-4">🛍️</div>
              <h3 className="text-2xl font-bold mb-3">TokStore</h3>
              <p className="text-slate-300 mb-4">{pageCopy.tokStoreBody}</p>
              <div className="inline-block px-4 py-2 bg-amber-600/50 hover:bg-amber-600/70 rounded-lg font-semibold transition">
                {pageCopy.shopNow}
              </div>
            </Link>

            <div className="bg-slate-800/50 rounded-lg p-8 border border-purple-700/30">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold mb-3">SVL Guardians</h3>
              <p className="text-slate-300 mb-4">{pageCopy.guardiansBody}</p>
              <Link href="/agent" className="inline-block px-4 py-2 bg-purple-600/50 hover:bg-purple-600/70 rounded-lg font-semibold transition">
                {pageCopy.meetGuardians}
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Link href="/tokaway-landing" className="bg-slate-800/50 hover:bg-slate-800 rounded-lg p-6 border border-purple-700/30 hover:border-cyan-500/60 transition">
              <div className="text-4xl mb-3">🚨</div>
              <h3 className="font-bold mb-2">TokAway</h3>
              <p className="text-sm text-slate-400">{pageCopy.productCards.tokaway}</p>
            </Link>

            <Link href="/tokhealth" className="bg-slate-800/50 hover:bg-slate-800 rounded-lg p-6 border border-purple-700/30 hover:border-emerald-500/60 transition">
              <div className="text-4xl mb-3">💚</div>
              <h3 className="font-bold mb-2">TokHealth</h3>
              <p className="text-sm text-slate-400">{pageCopy.productCards.tokhealth}</p>
            </Link>

            <Link href="/tokthru-landing" className="bg-slate-800/50 hover:bg-slate-800 rounded-lg p-6 border border-purple-700/30 hover:border-purple-500/60 transition">
              <div className="text-4xl mb-3">🚗</div>
              <h3 className="font-bold mb-2">TokThru</h3>
              <p className="text-sm text-slate-400">{pageCopy.productCards.tokthru}</p>
            </Link>

            <Link href="/toksmart-landing" className="bg-slate-800/50 hover:bg-slate-800 rounded-lg p-6 border border-purple-700/30 hover:border-amber-500/60 transition">
              <div className="text-4xl mb-3">🧠</div>
              <h3 className="font-bold mb-2">TokSmart</h3>
              <p className="text-sm text-slate-400">{pageCopy.productCards.toksmart}</p>
            </Link>
          </div>
        </div>

        {/* Related Initiatives */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Link href="/kpa" className="bg-gradient-to-br from-green-900/30 to-slate-800/30 rounded-lg p-8 border border-green-700/30 hover:border-green-500/60 transition">
            <h3 className="text-2xl font-bold mb-2">#KPA-Keeppeoplealive</h3>
            <p className="text-slate-400">{pageCopy.initiatives.kpa}</p>
          </Link>

          <Link href="/think-speak-work" className="bg-gradient-to-br from-blue-900/30 to-slate-800/30 rounded-lg p-8 border border-blue-700/30 hover:border-blue-500/60 transition">
            <h3 className="text-2xl font-bold mb-2">#thinkspeakworkandwatchGodwork4U</h3>
            <p className="text-slate-400">{pageCopy.initiatives.thinkSpeakWork}</p>
          </Link>
        </div>

        {/* Facebook Post Embed */}
        <div className="mb-16 bg-slate-900/60 rounded-xl border border-purple-700/30 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Latest TokHealth KPA Post</h2>
          <p className="text-slate-300 mb-6">Community updates from our official Facebook page.</p>
          <FacebookPostEmbed
            postUrl="https://www.facebook.com/photo/?fbid=122106758763230551&set=a.122094869259230551"
            permalinkUrl="https://www.facebook.com/permalink.php?story_fbid=122106758763230551&id=61586916537316&substory_index=1412421604251535"
            pageUrl="https://www.facebook.com/people/TokHealth-KPA/61586916537316/"
            pageName="TokHealth KPA"
            postedLabel="Wednesday, April 1, 2026"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 border-t border-slate-800 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <p className="text-slate-400 mb-4">{pageCopy.footerLine1}</p>
          <p className="text-slate-300 mb-4">Sanders Viopro Labs LLC</p>
          <p className="text-sm text-slate-300 mb-4">The result of Next.JS meeting God's Vision Through SVL to KPA</p>
          <p className="text-xs text-slate-500">#Sandersvioprolabs | #KPA-Keeppeoplealive | #thinkspeakworkandwatchGodwork4U</p>
        </div>
      </div>
    </div>
  );
}
