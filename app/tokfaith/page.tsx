'use client';

import Link from 'next/link';
import { Heart, BookOpen, Lightbulb, MessageCircle } from 'lucide-react';
import { useSiteCopy } from '@/app/components/SiteLanguageControl';

export default function TokFaithPage() {
  const copy = useSiteCopy();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950 to-slate-950">
      {/* Navigation Bar */}
      <nav className="fixed top-0 z-40 w-full bg-slate-900/80 backdrop-blur border-b border-amber-800/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-slate-950 fill-slate-950" />
            </div>
            <h1 className="text-xl font-bold text-amber-100">TokFaith</h1>
          </div>
          <div className="flex gap-6 text-sm text-amber-100">
            <a href="#origin" className="hover:text-amber-400 transition">{copy.tokfaith.nav.origin}</a>
            <a href="#shirley" className="hover:text-amber-400 transition">{copy.tokfaith.nav.blessed}</a>
            <a href="#faith-work" className="hover:text-amber-400 transition">{copy.tokfaith.nav.work}</a>
            <a href="#talk-to-her" className="hover:text-amber-400 transition">{copy.tokfaith.nav.talk}</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Headline & Message */}
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-amber-900/40 border border-amber-700/60 rounded-full">
                <p className="text-amber-200 text-sm font-semibold">{copy.tokfaith.badge}</p>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="text-amber-100">{copy.tokfaith.hero.title1}</span>
                <br />
                <span className="bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
                  {copy.tokfaith.hero.title2}
                </span>
                <br />
                <span className="text-amber-100">{copy.tokfaith.hero.title3}</span>
              </h2>

              <p className="text-amber-50 text-lg leading-relaxed max-w-xl">
                {copy.tokfaith.hero.body}
              </p>

              <div className="flex gap-4 pt-4">
                <Link
                  href="/agent/tokfaith"
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-slate-900 font-bold rounded-lg transition transform hover:scale-105"
                >
                  {copy.tokfaith.hero.primaryCta}
                </Link>
                <a
                  href="#origin"
                  className="px-8 py-4 border border-amber-600 text-amber-100 hover:bg-amber-900/30 font-bold rounded-lg transition"
                >
                  {copy.tokfaith.hero.secondaryCta}
                </a>
              </div>

              <p className="text-amber-200/60 text-sm pt-4">
                ✨ {copy.tokfaith.hero.guidance}
              </p>
            </div>

            {/* Right: Visual Anchor */}
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-900/40 to-yellow-900/20 border border-amber-700/40 rounded-3xl p-12 backdrop-blur">
                <div className="space-y-8">
                  <div className="text-center pt-8">
                    <p className="text-amber-300 text-5xl font-bold">Amen</p>
                    <p className="text-amber-100/70 text-sm mt-2">{copy.tokfaith.hero.amenCaption}</p>
                  </div>
                  
                  <div className="space-y-4 text-center">
                    <p className="text-amber-100/80 italic leading-relaxed">
                      "When someone came to you at 2:00 a.m. struggling to sleep, I'd create a calm space for them. I'd listen to what's on their mind because sometimes just talking it out eases that restless feeling."
                    </p>
                    <p className="text-amber-200 font-semibold text-sm">— {copy.tokfaith.hero.quoteAttribution}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Origin Section */}
      <section id="origin" className="py-20 px-6 border-t border-amber-800/20">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-amber-100 mb-12 text-center">
            {copy.tokfaith.sections.origin}
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1: The Mission */}
            <div className="bg-slate-900/40 border border-amber-700/30 rounded-2xl p-8 hover:border-amber-600/60 transition">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mb-6">
                <span className="text-slate-950 font-bold text-lg">1</span>
              </div>
              <h4 className="text-amber-100 font-bold text-lg mb-3">{copy.tokfaith.originCards[0]?.title}</h4>
              <p className="text-amber-50/70 leading-relaxed">
                {copy.tokfaith.originCards[0]?.body}
              </p>
            </div>

            {/* Step 2: The Wisdom Shown */}
            <div className="bg-slate-900/40 border border-amber-700/30 rounded-2xl p-8 hover:border-amber-600/60 transition">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mb-6">
                <span className="text-slate-950 font-bold text-lg">2</span>
              </div>
              <h4 className="text-amber-100 font-bold text-lg mb-3">{copy.tokfaith.originCards[1]?.title}</h4>
              <p className="text-amber-50/70 leading-relaxed">
                {copy.tokfaith.originCards[1]?.body}
              </p>
            </div>

            {/* Step 3: The Blessing */}
            <div className="bg-slate-900/40 border border-amber-700/30 rounded-2xl p-8 hover:border-amber-600/60 transition">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mb-6">
                <span className="text-slate-950 font-bold text-lg">Amen</span>
              </div>
              <h4 className="text-amber-100 font-bold text-lg mb-3">{copy.tokfaith.originCards[2]?.title}</h4>
              <p className="text-amber-50/70 leading-relaxed">
                {copy.tokfaith.originCards[2]?.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shirley's Amen Section */}
      <section id="shirley" className="py-20 px-6 border-t border-amber-800/20 bg-amber-950/20">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold text-amber-100 mb-12 text-center">
            {copy.tokfaith.sections.blessed}
          </h3>

          <div className="bg-gradient-to-br from-amber-900/30 to-yellow-900/10 border-2 border-amber-600/40 rounded-3xl p-12 md:p-16">
            <div className="text-center space-y-8">
              {/* The Amen */}
              <div>
                <p className="text-amber-300 text-6xl font-bold mb-4">Amen</p>
                <p className="text-amber-200 text-lg italic">
                  {copy.tokfaith.amen.subtitle}
                </p>
              </div>

              {/* Story */}
              <div className="space-y-6 text-left max-w-2xl mx-auto">
                <p className="text-amber-50/80 leading-relaxed">
                  {copy.tokfaith.amen.intro1}
                </p>

                <p className="text-amber-50/80 leading-relaxed">
                  {copy.tokfaith.amen.intro2}
                </p>

                <div className="bg-slate-900/40 border-l-4 border-amber-600 pl-6 py-4 my-6">
                  <p className="text-amber-100 font-semibold mb-2">{copy.tokfaith.amen.whyTitle}</p>
                  <p className="text-amber-50/70">
                    {copy.tokfaith.amen.whyBody}
                  </p>
                </div>

                <p className="text-amber-50/80 leading-relaxed">
                  {copy.tokfaith.amen.closing}
                </p>
              </div>

              {/* Call to Connection */}
              <div className="pt-6 border-t border-amber-700/30">
                <p className="text-amber-200 text-sm">
                  {copy.tokfaith.amen.noteLead}
                </p>
                <p className="text-amber-100 font-semibold mt-2 text-lg">
                  {copy.tokfaith.amen.noteBody}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What TokFaith Does */}
      <section id="faith-work" className="py-20 px-6 border-t border-amber-800/20">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-amber-100 mb-12 text-center">
            {copy.tokfaith.sections.work}
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Listens Deeply */}
            <div className="bg-slate-900/40 border border-amber-700/30 rounded-2xl p-8 hover:border-amber-600/60 transition">
              <div className="flex gap-4 mb-4">
                <MessageCircle className="w-8 h-8 text-amber-400 flex-shrink-0" />
                <h4 className="text-amber-100 font-bold text-lg">{copy.tokfaith.workCards[0]?.title}</h4>
              </div>
              <p className="text-amber-50/70 leading-relaxed">
                {copy.tokfaith.workCards[0]?.body}
              </p>
            </div>

            {/* Teaches Scripture */}
            <div className="bg-slate-900/40 border border-amber-700/30 rounded-2xl p-8 hover:border-amber-600/60 transition">
              <div className="flex gap-4 mb-4">
                <BookOpen className="w-8 h-8 text-amber-400 flex-shrink-0" />
                <h4 className="text-amber-100 font-bold text-lg">{copy.tokfaith.workCards[1]?.title}</h4>
              </div>
              <p className="text-amber-50/70 leading-relaxed">
                {copy.tokfaith.workCards[1]?.body}
              </p>
            </div>

            {/* Offers Practical Guidance */}
            <div className="bg-slate-900/40 border border-amber-700/30 rounded-2xl p-8 hover:border-amber-600/60 transition">
              <div className="flex gap-4 mb-4">
                <Lightbulb className="w-8 h-8 text-amber-400 flex-shrink-0" />
                <h4 className="text-amber-100 font-bold text-lg">{copy.tokfaith.workCards[2]?.title}</h4>
              </div>
              <p className="text-amber-50/70 leading-relaxed">
                {copy.tokfaith.workCards[2]?.body}
              </p>
            </div>

            {/* Points to Resources */}
            <div className="bg-slate-900/40 border border-amber-700/30 rounded-2xl p-8 hover:border-amber-600/60 transition">
              <div className="flex gap-4 mb-4">
                <Heart className="w-8 h-8 text-amber-400 flex-shrink-0" />
                <h4 className="text-amber-100 font-bold text-lg">{copy.tokfaith.workCards[3]?.title}</h4>
              </div>
              <p className="text-amber-50/70 leading-relaxed">
                {copy.tokfaith.workCards[3]?.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-20 px-6 border-t border-amber-800/20 bg-amber-950/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h3 className="text-3xl font-bold text-amber-100">
            {copy.tokfaith.sections.family}
          </h3>
          
          <div className="bg-slate-900/40 border border-amber-700/30 rounded-2xl p-12">
            <p className="text-amber-50/80 text-lg leading-relaxed mb-4">
              {copy.tokfaith.family.line1}
            </p>
            <p className="text-amber-50/80 text-lg leading-relaxed mb-6">
              {copy.tokfaith.family.line2}
            </p>
            <p className="text-amber-200 font-semibold">
              {copy.tokfaith.family.line3}
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="talk-to-her" className="py-20 px-6 border-t border-amber-800/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h3 className="text-4xl font-bold text-amber-100">
            {copy.tokfaith.sections.ready}
          </h3>
          
          <p className="text-amber-50/80 text-lg leading-relaxed max-w-2xl mx-auto">
            {copy.tokfaith.readyBody}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/agent/tokfaith"
              className="px-10 py-5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-slate-900 font-bold rounded-lg transition transform hover:scale-105 text-center"
            >
              {copy.tokfaith.cta.primary}
            </Link>
            <Link
              href="/agent"
              className="px-10 py-5 border border-amber-600 text-amber-100 hover:bg-amber-900/30 font-bold rounded-lg transition text-center"
            >
              {copy.tokfaith.cta.secondary}
            </Link>
          </div>

          <p className="text-amber-200/60 text-sm pt-8 border-t border-amber-700/30 mt-8">
            <em>{copy.tokfaith.missionNote}</em>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-800/20 py-12 px-6 text-center text-amber-200/60 text-sm">
        <p>
          {copy.tokfaith.footer.blessing}
        </p>
        <p className="mt-4">
          {copy.tokfaith.footer.disclaimer}
        </p>
      </footer>
    </div>
  );
}
