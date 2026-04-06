'use client';

'use client';

import Link from 'next/link';
import { useSiteCopy } from '@/app/components/SiteLanguageControl';
import FacebookPostEmbed from '@/app/components/FacebookPostEmbed';
import VoiceStyleSpeaker from '@/app/components/VoiceStyleSpeaker';

export default function SandersVioProLabs() {
  const copy = useSiteCopy();
  const pageCopy = copy.sandersVioproLabs;
  const svlPageSpeechText = [
    'Sanders Viopro Labs LLC.',
    '#Sandersvioprolabs.',
    pageCopy.heroBody,
    'Our Mission.',
    pageCopy.missionBody1,
    pageCopy.missionBody2,
    'Focus Areas.',
    pageCopy.focusAreas[0]?.title,
    pageCopy.focusAreas[0]?.body,
    pageCopy.focusAreas[1]?.title,
    pageCopy.focusAreas[1]?.body,
    pageCopy.focusAreas[2]?.title,
    pageCopy.focusAreas[2]?.body,
    'The result of Next.JS meeting God\'s Vision Through SVL to KPA.',
    "Chef's kiss SVL Lab, that's doing it global and exceeding SVL standards.",
  ].join(' ');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur border-b border-purple-800/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🥼</span>
            <h1 className="text-2xl font-bold">Sanders Viopro Labs LLC</h1>
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
            Sanders Viopro Labs LLC
          </h1>
          <p className="text-2xl text-purple-300 mb-6">#Sandersvioprolabs</p>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            {pageCopy.heroBody}
          </p>
          <div className="mt-6 flex justify-center">
            <VoiceStyleSpeaker
              text={svlPageSpeechText}
              speakLabel="Speak SVL Page"
              stopLabel="Stop SVL Page"
              speakTitle="Listen to SVL page"
              stopTitle="Stop SVL page"
            />
          </div>
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

        <div className="mb-16">
          <Link href="/sanders-viopro-labs/gifts" className="block bg-gradient-to-br from-amber-950/60 via-purple-950/40 to-slate-900 rounded-xl border-2 border-amber-400/35 hover:border-amber-200/70 p-12 transition transform hover:scale-105 cursor-pointer">
            <div className="text-center">
              <div className="text-5xl mb-6">🎁</div>
              <h2 className="text-4xl font-bold text-white mb-4">SVL Gifts</h2>
              <p className="text-xl text-amber-100 mb-6 max-w-3xl mx-auto">
                Revisit the living SVL gifts archive, including the Mahamantra collection, strategy reflection, and visual archive entries.
              </p>
              <span className="inline-block px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg transition">
                Open Gifts Archive
              </span>
            </div>
          </Link>
        </div>

        <div className="mb-16 grid gap-6 lg:grid-cols-2">
          <Link href="/sanders-viopro-labs/playbook" className="block bg-gradient-to-br from-fuchsia-950/70 via-slate-900 to-indigo-950/70 rounded-xl border-2 border-fuchsia-400/30 hover:border-fuchsia-200/70 p-12 transition transform hover:scale-[1.02] cursor-pointer">
            <div className="text-center">
              <div className="text-5xl mb-6">♜</div>
              <h2 className="text-4xl font-bold text-white mb-4">Sanders Family PlayBook</h2>
              <p className="text-xl text-fuchsia-100 mb-6 max-w-3xl mx-auto">
                An epic real-life game system with voice coaching, daily quests, family lanes, and legacy-building guidance.
              </p>
              <span className="inline-block px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-lg transition">
                Enter The PlayBook
              </span>
            </div>
          </Link>

          <Link href="/sanders-viopro-labs/games" className="block bg-gradient-to-br from-emerald-950/70 via-slate-900 to-cyan-950/70 rounded-xl border-2 border-emerald-400/30 hover:border-emerald-200/70 p-12 transition transform hover:scale-[1.02] cursor-pointer">
            <div className="text-center">
              <div className="text-5xl mb-6">🎮</div>
              <h2 className="text-4xl font-bold text-white mb-4">SVL Games</h2>
              <p className="text-xl text-emerald-100 mb-6 max-w-3xl mx-auto">
                A dedicated SVL home for your detective, logic, court, and academy game lanes, all anchored under one roof.
              </p>
              <span className="inline-block px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition">
                Open Games Hub
              </span>
            </div>
          </Link>
        </div>

        <div className="mb-16">
          <Link href="/amen" className="block bg-gradient-to-br from-amber-950/70 via-yellow-900/35 to-slate-900 rounded-xl border-2 border-amber-300/35 hover:border-amber-100/80 p-12 transition transform hover:scale-[1.02] cursor-pointer">
            <div className="text-center">
              <div className="text-5xl mb-6">✨</div>
              <h2 className="text-4xl font-bold text-white mb-4">Amen Heartbeat Page</h2>
              <p className="text-xl text-amber-100 mb-6 max-w-3xl mx-auto">
                A simple faith-and-gratitude lane anchored in the SVL mission. LLC standard, KPA purpose, and one clear word: Amen.
              </p>
              <span className="inline-block px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition">
                Open Amen
              </span>
            </div>
          </Link>
        </div>

        <div className="mb-16">
          <Link href="/tokfam" className="block bg-gradient-to-br from-pink-950/70 via-rose-950/40 to-slate-900 rounded-xl border-2 border-pink-400/35 hover:border-pink-200/80 p-12 transition transform hover:scale-[1.02] cursor-pointer">
            <div className="text-center">
              <div className="text-5xl mb-6">🧸</div>
              <h2 className="text-4xl font-bold text-white mb-4">TokFam: Miari's Celebration</h2>
              <p className="text-xl text-pink-100 mb-6 max-w-3xl mx-auto">
                A family love page made to celebrate Miari at age 1. A joyful lane for blessings, milestones, and legacy memories under the KPA mission.
              </p>
              <span className="inline-block px-6 py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-lg transition">
                Open TokFam
              </span>
            </div>
          </Link>
        </div>

        <div className="mb-16">
          <Link href="/tokshow" className="block bg-gradient-to-br from-cyan-950/70 via-slate-900 to-amber-950/40 rounded-xl border-2 border-cyan-300/35 hover:border-cyan-100/80 p-12 transition transform hover:scale-[1.02] cursor-pointer">
            <div className="text-center">
              <div className="text-5xl mb-6">📺</div>
              <h2 className="text-4xl font-bold text-white mb-4">TokShow: Kysen & Bam Bam</h2>
              <p className="text-xl text-cyan-100 mb-6 max-w-3xl mx-auto">
                A realistic cartoon series launching Easter Sunday under SVL and KPA, starring Kysen and his little sister Bam Bam. Community safety stories, practical action steps, and family-first mission energy.
              </p>
              <span className="inline-block px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition">
                Open TokShow
              </span>
            </div>
          </Link>
        </div>

        <div className="mb-16">
          <Link href="/sanders-viopro-labs/executive-brief" className="block bg-gradient-to-br from-slate-950 via-cyan-950/40 to-amber-950/35 rounded-xl border-2 border-cyan-200/30 hover:border-cyan-100/80 p-12 transition transform hover:scale-[1.02] cursor-pointer">
            <div className="text-center">
              <div className="text-5xl mb-6">📊</div>
              <h2 className="text-4xl font-bold text-white mb-4">SVL-KPA Executive Brief</h2>
              <p className="text-xl text-cyan-100 mb-6 max-w-3xl mx-auto">
                A concise operator-facing brief with pilot structure, proof stack, value framing, and the exact next ask for strategic partners.
              </p>
              <span className="inline-block px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-lg transition">
                Open Executive Brief
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
          <p className="text-slate-300 mb-4 font-semibold tracking-[0.18em]">Amen.</p>
          <p className="text-sm text-slate-300 mb-4">The result of Next.JS meeting God's Vision Through SVL to KPA</p>
          <p className="text-xs text-slate-500">#Sandersvioprolabs | #KPA-Keeppeoplealive | #thinkspeakworkandwatchGodwork4U</p>
        </div>
      </div>
    </div>
  );
}
