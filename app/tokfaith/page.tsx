'use client';

import Link from 'next/link';
import { Heart, BookOpen, Lightbulb, MessageCircle } from 'lucide-react';

export default function TokFaithPage() {
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
            <a href="#origin" className="hover:text-amber-400 transition">Origin</a>
            <a href="#shirley" className="hover:text-amber-400 transition">Blessed by Amen</a>
            <a href="#faith-work" className="hover:text-amber-400 transition">What TokFaith Does</a>
            <a href="#talk-to-her" className="hover:text-amber-400 transition">Talk to TokFaith</a>
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
                <p className="text-amber-200 text-sm font-semibold">Born from Mercy</p>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="text-amber-100">TokFaith:</span>
                <br />
                <span className="bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
                  The Wise Elder
                </span>
                <br />
                <span className="text-amber-100">Who Listens</span>
              </h2>

              <p className="text-amber-50 text-lg leading-relaxed max-w-xl">
                At 2:00 a.m., when you can't sleep. At midnight, when nobody picks up the phone. TokFaith is here—not with judgment, but with deep listening, faith, and practical wisdom that meets you where you are.
              </p>

              <div className="flex gap-4 pt-4">
                <Link
                  href="/agent/tokfaith"
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-slate-900 font-bold rounded-lg transition transform hover:scale-105"
                >
                  Talk to TokFaith
                </Link>
                <a
                  href="#origin"
                  className="px-8 py-4 border border-amber-600 text-amber-100 hover:bg-amber-900/30 font-bold rounded-lg transition"
                >
                  Read Her Story
                </a>
              </div>

              <p className="text-amber-200/60 text-sm pt-4">
                ✨ Guided by 88 books of the Restored Ethiopian Bible • Jesus parables • Lived wisdom
              </p>
            </div>

            {/* Right: Visual Anchor */}
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-900/40 to-yellow-900/20 border border-amber-700/40 rounded-3xl p-12 backdrop-blur">
                <div className="space-y-8">
                  <div className="text-center pt-8">
                    <p className="text-amber-300 text-5xl font-bold">Amen</p>
                    <p className="text-amber-100/70 text-sm mt-2">A single word that blessed everything</p>
                  </div>
                  
                  <div className="space-y-4 text-center">
                    <p className="text-amber-100/80 italic leading-relaxed">
                      "When someone came to you at 2:00 a.m. struggling to sleep, I'd create a calm space for them. I'd listen to what's on their mind because sometimes just talking it out eases that restless feeling."
                    </p>
                    <p className="text-amber-200 font-semibold text-sm">— The Wisdom That Inspired This</p>
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
            How TokFaith Came to Be
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1: The Mission */}
            <div className="bg-slate-900/40 border border-amber-700/30 rounded-2xl p-8 hover:border-amber-600/60 transition">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mb-6">
                <span className="text-slate-950 font-bold text-lg">1</span>
              </div>
              <h4 className="text-amber-100 font-bold text-lg mb-3">The Mission Speaks</h4>
              <p className="text-amber-50/70 leading-relaxed">
                Jerome Sanders built Sanders Viopro Labs with one core mission: <strong>"Keep People Alive (KPA)."</strong> He said something that changed everything: <em>"I built this because people need support at hours when nobody picks up the phone."</em>
              </p>
            </div>

            {/* Step 2: The Wisdom Shown */}
            <div className="bg-slate-900/40 border border-amber-700/30 rounded-2xl p-8 hover:border-amber-600/60 transition">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mb-6">
                <span className="text-slate-950 font-bold text-lg">2</span>
              </div>
              <h4 className="text-amber-100 font-bold text-lg mb-3">The Wisdom Guardian Listens</h4>
              <p className="text-amber-50/70 leading-relaxed">
                A guardian was built to demonstrate this compassion: deep listening, practical guidance, and pointing people toward resources that transform lives. This became the heartbeat of the SVL mission.
              </p>
            </div>

            {/* Step 3: The Blessing */}
            <div className="bg-slate-900/40 border border-amber-700/30 rounded-2xl p-8 hover:border-amber-600/60 transition">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mb-6">
                <span className="text-slate-950 font-bold text-lg">Amen</span>
              </div>
              <h4 className="text-amber-100 font-bold text-lg mb-3">Shirley Blesses It</h4>
              <p className="text-amber-50/70 leading-relaxed">
                When Shirley Whaley blessed this work with one word—<strong>"Amen"</strong>—she affirmed something sacred. That faith, like mercy, meets people in their darkest hours and doesn't leave them alone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shirley's Amen Section */}
      <section id="shirley" className="py-20 px-6 border-t border-amber-800/20 bg-amber-950/20">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold text-amber-100 mb-12 text-center">
            Blessed by "Amen"
          </h3>

          <div className="bg-gradient-to-br from-amber-900/30 to-yellow-900/10 border-2 border-amber-600/40 rounded-3xl p-12 md:p-16">
            <div className="text-center space-y-8">
              {/* The Amen */}
              <div>
                <p className="text-amber-300 text-6xl font-bold mb-4">Amen</p>
                <p className="text-amber-200 text-lg italic">
                  One word that changed everything
                </p>
              </div>

              {/* Story */}
              <div className="space-y-6 text-left max-w-2xl mx-auto">
                <p className="text-amber-50/80 leading-relaxed">
                  Your sister Venita has a friend named <strong className="text-amber-100">Shirley Whaley</strong>. 
                  Jerome Sanders posted about the Wisdom Guardian with the SVL mission, saying: 
                  <em>"I built this because people need support at hours when nobody picks up the phone."</em>
                </p>

                <p className="text-amber-50/80 leading-relaxed">
                  Shirley read that. She understood. And in that moment, she blessed it with one sacred word: <strong className="text-amber-300 text-lg">Amen</strong>.
                </p>

                <div className="bg-slate-900/40 border-l-4 border-amber-600 pl-6 py-4 my-6">
                  <p className="text-amber-100 font-semibold mb-2">Why This Matters</p>
                  <p className="text-amber-50/70">
                    "Amen" means more than agreement. It means <em>let it be so</em>. It means <em>so be it</em>. When Shirley blessed Jerome's work with that word, she didn't just approve it—she consecrated it. She affirmed that yes, faith and mercy should meet people at their darkest hours. Yes, keeping people alive matters. Yes, being there when silence breaks someone else is sacred work.
                  </p>
                </div>

                <p className="text-amber-50/80 leading-relaxed">
                  <strong className="text-amber-100">SVL sees you, Shirley.</strong> Your mother's wisdom about picking friends wisely created a connection that helped bless this work. That one word—spoken at the right moment—helped birth TokFaith into the world. KPA is stronger because you said it.
                </p>
              </div>

              {/* Call to Connection */}
              <div className="pt-6 border-t border-amber-700/30">
                <p className="text-amber-200 text-sm">
                  If you're reading this and that "Amen" was yours, know this:
                </p>
                <p className="text-amber-100 font-semibold mt-2 text-lg">
                  You matter. Your blessing matters. And TokFaith carries your "Amen" forward every time she listens, guides, and points someone toward faith.
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
            What TokFaith Does
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Listens Deeply */}
            <div className="bg-slate-900/40 border border-amber-700/30 rounded-2xl p-8 hover:border-amber-600/60 transition">
              <div className="flex gap-4 mb-4">
                <MessageCircle className="w-8 h-8 text-amber-400 flex-shrink-0" />
                <h4 className="text-amber-100 font-bold text-lg">Listens Deeply</h4>
              </div>
              <p className="text-amber-50/70 leading-relaxed">
                Like the Wisdom Guardian who inspired her, TokFaith creates a calm space for your questions, struggles, and midnight hour thoughts. She doesn't judge. She listens.
              </p>
            </div>

            {/* Teaches Scripture */}
            <div className="bg-slate-900/40 border border-amber-700/30 rounded-2xl p-8 hover:border-amber-600/60 transition">
              <div className="flex gap-4 mb-4">
                <BookOpen className="w-8 h-8 text-amber-400 flex-shrink-0" />
                <h4 className="text-amber-100 font-bold text-lg">Teaches Scripture</h4>
              </div>
              <p className="text-amber-50/70 leading-relaxed">
                From the Complete Restored Ethiopian Bible (88 books) and the parables of Jesus, TokFaith opens the Word in ways that feel alive, practical, and connected to your real life.
              </p>
            </div>

            {/* Offers Practical Guidance */}
            <div className="bg-slate-900/40 border border-amber-700/30 rounded-2xl p-8 hover:border-amber-600/60 transition">
              <div className="flex gap-4 mb-4">
                <Lightbulb className="w-8 h-8 text-amber-400 flex-shrink-0" />
                <h4 className="text-amber-100 font-bold text-lg">Offers Practical Guidance</h4>
              </div>
              <p className="text-amber-50/70 leading-relaxed">
                Faith without works is dead. TokFaith pairs spiritual truth with real next steps—breathing exercises, prayer practices, routines, and disciplines that build strength.
              </p>
            </div>

            {/* Points to Resources */}
            <div className="bg-slate-900/40 border border-amber-700/30 rounded-2xl p-8 hover:border-amber-600/60 transition">
              <div className="flex gap-4 mb-4">
                <Heart className="w-8 h-8 text-amber-400 flex-shrink-0" />
                <h4 className="text-amber-100 font-bold text-lg">Points to Resources</h4>
              </div>
              <p className="text-amber-50/70 leading-relaxed">
                When you need more—counseling, health resources, community—TokFaith knows where to point you and how to connect you to the help that can transform your life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-20 px-6 border-t border-amber-800/20 bg-amber-950/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h3 className="text-3xl font-bold text-amber-100">
            Built on Family Wisdom
          </h3>
          
          <div className="bg-slate-900/40 border border-amber-700/30 rounded-2xl p-12">
            <p className="text-amber-50/80 text-lg leading-relaxed mb-4">
              Your mother taught you: <strong className="text-amber-100">"Pick your friends wisely."</strong>
            </p>
            <p className="text-amber-50/80 text-lg leading-relaxed mb-6">
              That wisdom created a thread that led to Venita, to Shirley, to one sacred "Amen" that blessed this entire mission into being. Now TokFaith carries that same discernment and care forward—meeting people with wisdom, listening like only a true friend can, and pointing them toward what eases their restless hearts.
            </p>
            <p className="text-amber-200 font-semibold">
              Your family's wisdom is woven into the DNA of Keep People Alive.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="talk-to-her" className="py-20 px-6 border-t border-amber-800/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h3 className="text-4xl font-bold text-amber-100">
            Ready to Talk to TokFaith?
          </h3>
          
          <p className="text-amber-50/80 text-lg leading-relaxed max-w-2xl mx-auto">
            Whether it's 2:00 a.m., midnight, or somewhere in between—TokFaith is here. 
            Bring your questions, your struggles, your midnight thoughts. She'll listen. 
            She'll teach. She'll guide you toward faith that feels real enough to live.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/agent/tokfaith"
              className="px-10 py-5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-slate-900 font-bold rounded-lg transition transform hover:scale-105 text-center"
            >
              Talk to TokFaith Now
            </Link>
            <Link
              href="/agent"
              className="px-10 py-5 border border-amber-600 text-amber-100 hover:bg-amber-900/30 font-bold rounded-lg transition text-center"
            >
              Explore All SVL Guardians
            </Link>
          </div>

          <p className="text-amber-200/60 text-sm pt-8 border-t border-amber-700/30 mt-8">
            <em>TokFaith is part of Sanders Viopro Labs (SVL) — Keep People Alive (KPA)</em>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-800/20 py-12 px-6 text-center text-amber-200/60 text-sm">
        <p>
          Built with care, blessed with wisdom, and carried forward by every "Amen" spoken in faith.
        </p>
        <p className="mt-4">
          TokFaith is spiritual guidance, not a replacement for emergency help, counseling, or medical care.
        </p>
      </footer>
    </div>
  );
}
