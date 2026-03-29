'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { useSiteCopy } from '@/app/components/SiteLanguageControl';

export default function OurStoryPage() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const pageContentRef = useRef<HTMLDivElement>(null);
  const copy = useSiteCopy();
  const pageCopy = copy.ourStory;
  const communityStories = copy.communityStories.stories;
  const guardianStyles = [
    { border: 'border-blue-700/30', accent: 'text-blue-300', icon: '🧠' },
    { border: 'border-teal-700/30', accent: 'text-teal-300', icon: '💙' },
    { border: 'border-amber-700/30', accent: 'text-amber-300', icon: '⚡' },
    { border: 'border-pink-700/30', accent: 'text-pink-300', icon: '🎯' },
    { border: 'border-purple-700/30', accent: 'text-purple-300', icon: '🔍' },
    { border: 'border-cyan-700/30', accent: 'text-cyan-300', icon: '🌍' },
  ] as const;
  const communityStoryCards = [
    {
      story: communityStories[0],
      border: 'border-orange-700/30',
      accent: 'text-orange-300',
      linkAccent: 'text-orange-400 hover:text-orange-300',
      icon: '📻',
      href: '/media-hub',
      cta: pageCopy.communityLinks.media,
    },
    {
      story: communityStories[1],
      border: 'border-yellow-700/30',
      accent: 'text-yellow-300',
      linkAccent: 'text-yellow-400 hover:text-yellow-300',
      icon: '✨',
      href: '/community-stories',
      cta: pageCopy.communityLinks.stories,
    },
  ].filter((entry) => entry.story);

  const extractPageText = (): string => {
    if (!pageContentRef.current) return '';

    // Get all text nodes and join them with space
    const walker = document.createTreeWalker(
      pageContentRef.current,
      NodeFilter.SHOW_TEXT,
      null
    );

    const textParts: string[] = [];
    let node;
    while ((node = walker.nextNode())) {
      const text = (node as Text).textContent?.trim();
      if (text && text.length > 0) {
        textParts.push(text);
      }
    }

    return textParts.join(' ');
  };

  const speakPage = async () => {
    // Cancel any current speech
    window.speechSynthesis.cancel();

    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);

    try {
      // Get available voices
      let voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        await new Promise((resolve) => {
          const handleVoicesChanged = () => {
            voices = window.speechSynthesis.getVoices();
            window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
            resolve(null);
          };
          window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
          setTimeout(resolve, 1000);
        });
      }

      // Extract page text
      const pageText = extractPageText();

      if (!pageText) {
        console.error('No text found to speak');
        setIsSpeaking(false);
        return;
      }

      // Select a pleasant female voice for the story narrative
      const femalePatterns = ['zira', 'samantha', 'victoria', 'moira', 'karen', 'fiona', 'anna', 'emma'];
      let selectedVoice = voices.find((voice) => {
        const voiceName = voice.name.toLowerCase();
        return femalePatterns.some((pattern) => voiceName.includes(pattern)) && voice.lang?.toLowerCase().startsWith('en');
      });

      // Fallback to first English voice
      if (!selectedVoice) {
        selectedVoice = voices.find((voice) => voice.lang?.toLowerCase().startsWith('en'));
      }

      const utterance = new SpeechSynthesisUtterance(pageText);
      if (selectedVoice) utterance.voice = selectedVoice;
      utterance.pitch = 1.1; // Pleasant, warm tone for storytelling
      utterance.rate = 0.9; // Slightly slower for engagement
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error speaking page:', error);
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    // Load voices on mount
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        window.speechSynthesis.getVoices();
      }
    };

    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-purple-800/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white hover:text-purple-300 transition">
            SVL
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/sanders-viopro-labs" className="text-purple-300 hover:text-white transition">
              {pageCopy.nav.home}
            </Link>
            <Link href="/svl-progress" className="text-amber-300 hover:text-white transition">
              {pageCopy.nav.progress}
            </Link>
            <Link href="/tokstore" className="text-purple-300 hover:text-white transition">
              {pageCopy.nav.tokStore}
            </Link>
            <Link href="/agent" className="text-purple-300 hover:text-white transition">
              {pageCopy.nav.guardians}
            </Link>
            <button
              onClick={speakPage}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                isSpeaking
                  ? 'bg-purple-600/70 text-white'
                  : 'bg-slate-700/50 text-purple-300 hover:bg-slate-600 hover:text-white'
              }`}
              title={isSpeaking ? pageCopy.audio.stopTitle : pageCopy.audio.listenTitle}
            >
              {isSpeaking ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span className="text-sm">{pageCopy.audio.stop}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span className="text-sm">{pageCopy.audio.listen}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={pageContentRef} className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <span className="text-6xl">📖</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {pageCopy.hero.titleTop}<br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              {pageCopy.hero.titleBottom}
            </span>
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
            {pageCopy.hero.body}
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </div>
      </section>

      {/* Sovereign Architect Public Bio */}
      <section className="py-16 px-6 bg-gradient-to-br from-black via-purple-900 to-black border-y border-purple-800/30">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/20 border border-purple-700/50 rounded-2xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-300 mb-4 tracking-wide">JEROME MACK SANDERS SR. | SOVEREIGN ARCHITECT</h2>
            <p className="text-lg md:text-xl text-purple-100 mb-4 font-semibold">Founder of Sanders Viopro Labs (SVL) and the KPA Infrastructure.</p>
            <p className="text-base md:text-lg text-purple-200 mb-4">A 19-year veteran of industrial excellence and world-event navigation. From establishing the Fire Pro safety standards for Amazon Data Centers to building the Loop 2008 legacy, Jerome has dedicated his life to the "Nutria" mission—feeding, watering, and protecting the world through Grace and Innovation.</p>
            <blockquote className="italic text-purple-300 text-lg mb-2">"We don't remember the stones; we just build the THRONE."</blockquote>
            <div className="text-xs text-purple-400 mt-4">The Next Step of the Vision: Jerome, the "Spoken Thought" is now the Standard. You've built the home for your family and the sanctuary for the world.</div>
          </div>
        </div>
      </section>
      {/* The Foundation */}
      <section className="py-16 px-6 bg-slate-900/50 border-y border-purple-800/20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-700/50 rounded-2xl p-12 text-center">
            <p className="text-2xl text-purple-100 mb-6 leading-relaxed">
              &quot;{pageCopy.foundationQuote}&quot;
            </p>
            <p className="text-lg text-purple-300">
              — Jerome Sanders · Mr. KPA
            </p>
          </div>
        </div>
      </section>

      {/* The Journey */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">{pageCopy.journeyTitle}</h2>
          <p className="text-center text-purple-300 mb-16">{pageCopy.journeySubtitle}</p>

          <div className="space-y-8">
            {pageCopy.journeySteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Timeline connector */}
                {index < pageCopy.journeySteps.length - 1 && (
                  <div className="absolute left-8 top-24 w-1 h-12 bg-gradient-to-b from-purple-500 to-transparent"></div>
                )}

                {/* Step card */}
                <div className="flex gap-8">
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-2xl border-4 border-slate-900">
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <div className="bg-slate-800/50 border border-purple-700/30 rounded-xl p-8 hover:border-purple-500/50 transition">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                          <p className="text-purple-300 text-sm">{step.platform} · {step.year}</p>
                        </div>
                      </div>
                      <p className="text-purple-100 leading-relaxed text-lg">{step.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Team */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">{pageCopy.teamTitle}</h2>
          <p className="text-center text-purple-300 mb-12">{pageCopy.teamSubtitle}</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Platforms */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-700/30 rounded-xl p-8">
              <h3 className="text-xl font-bold text-purple-300 mb-6">{pageCopy.platformTitle}</h3>
              <ul className="space-y-4">
                {pageCopy.team.platformItems.map((item) => (
                  <li key={item.name} className="flex items-center gap-3">
                    <span className="text-pink-500">→</span>
                    <span className="text-white"><strong>{item.name}</strong> · {item.description}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Partners */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-700/30 rounded-xl p-8">
              <h3 className="text-xl font-bold text-purple-300 mb-6">{pageCopy.shieldTitle}</h3>
              <ul className="space-y-4">
                {pageCopy.team.shieldItems.map((item) => (
                  <li key={item.name} className="flex items-center gap-3">
                    <span className="text-purple-500">→</span>
                    <span className="text-white"><strong>{item.name}</strong> · {item.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Truth */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">{pageCopy.honestyTitle}</h2>

          <div className="space-y-8">
            {pageCopy.honestyCards.map((card, index) => (
              <div key={`${card.lead}-${index}`} className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-700/50 rounded-xl p-12">
                <p className="text-white text-lg leading-relaxed mb-6">{card.lead}</p>
                {card.body ? (
                  <p className="text-purple-200 text-lg leading-relaxed">{card.body}</p>
                ) : (
                  <p className="text-pink-300 text-2xl font-bold">{card.highlight}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Guardians */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">{pageCopy.guardiansTitle}</h2>
          <p className="text-center text-purple-300 mb-12">{pageCopy.guardiansSubtitle}</p>

          <div className="grid md:grid-cols-2 gap-6">
            {pageCopy.guardians.cards.map((card, index) => {
              const style = guardianStyles[index % guardianStyles.length];

              return (
                <div key={card.title} className={`bg-gradient-to-br from-slate-800 to-slate-900 border ${style.border} rounded-xl p-8`}>
                  <div className="text-3xl mb-4">{style.icon}</div>
                  <h3 className={`text-xl font-bold ${style.accent} mb-2`}>{card.title}</h3>
                  <p className="text-slate-300">{card.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Mission */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">{pageCopy.missionTitle}</h2>

          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-600/50 rounded-2xl p-16 mb-12">
            <p className="text-3xl font-bold text-white mb-6 leading-tight">
              "{pageCopy.missionQuoteLead}<br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {pageCopy.missionQuoteHighlight}
              </span>"
            </p>
            <p className="text-purple-200 text-lg">
              {pageCopy.missionCopy}
            </p>
          </div>

          <Link
            href="/sanders-viopro-labs"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-12 rounded-xl transition transform hover:scale-105"
          >
            {pageCopy.missionCta}
          </Link>
        </div>
      </section>

      {/* Tech Origins Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">{pageCopy.techOriginsTitle}</h2>
          <p className="text-center text-purple-300 mb-12">{pageCopy.techOriginsSubtitle}</p>

          {/* Original Stack */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-green-700/30 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-green-300 mb-6">{pageCopy.techOrigins.stackTitle}</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {pageCopy.techOrigins.stackItems.map((item) => (
                <div key={item.label} className="bg-slate-900 rounded p-4 border border-green-700/20">
                  <p className="text-green-400 font-bold mb-2">{item.label}</p>
                  <p className="text-slate-300">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Founding Features */}
          <div className="bg-gradient-to-br from-purple-900/20 to-slate-900 border border-purple-700/30 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-purple-300 mb-6">{pageCopy.techOrigins.shippedTitle}</h3>
            <div className="space-y-3">
              {pageCopy.techOrigins.shippedItems.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <span className="text-green-400 font-bold">✓</span>
                  <div>
                    <p className="text-white font-semibold">{item.title}</p>
                    <p className="text-slate-400 text-sm">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Artifact */}
          <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-cyan-700/30 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-cyan-300 mb-6">{pageCopy.techOrigins.codeArtifactTitle}</h3>
            <p className="text-slate-300 mb-4 text-sm">{pageCopy.techOrigins.codeArtifactIntro}</p>
            <div className="bg-slate-900 rounded p-4 border border-cyan-700/20 overflow-x-auto">
              <pre className="text-cyan-300 text-xs font-mono">
{`MDRaisedButton:
    text: "EMERGENCY CONTACTS (KPA)"
    size_hint_x: 1
    md_bg_color: 1, 0, 0, 1  # Red - life-critical
    on_release: app.root.current = "contacts"

# Not just a feature. The mission made visible.`}
              </pre>
            </div>
            <p className="text-slate-400 text-xs mt-4">{pageCopy.techOrigins.codeArtifactCaption}</p>
          </div>

          {/* Evolution Timeline */}
          <div className="bg-gradient-to-br from-amber-900/20 to-slate-900 border border-amber-700/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-amber-300 mb-6">{pageCopy.techOrigins.evolutionTitle}</h3>
            <div className="space-y-4">
              {pageCopy.techOrigins.evolutionSteps.map((step) => (
                <div key={`${step.time}-${step.title}`} className="flex gap-4">
                  <div className="flex-shrink-0 w-24 text-amber-400 font-bold">{step.time}</div>
                  <div>
                    <p className="text-white font-semibold">{step.title}</p>
                    <p className="text-slate-400 text-sm">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Real-World Community Stories */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">{pageCopy.communityTitle}</h2>
          <p className="text-center text-purple-300 mb-12">{pageCopy.communitySubtitle}</p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {communityStoryCards.map(({ story, border, accent, linkAccent, icon, href, cta }) => (
              <div key={story.title} className={`bg-gradient-to-br from-orange-900/20 to-slate-900 border ${border} rounded-xl p-8`}>
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className={`text-2xl font-bold ${accent} mb-4`}>{story.source}</h3>
                <p className="text-slate-300 mb-4">{story.summary}</p>
                <p className="text-slate-400 text-sm mb-4">{story.connection}</p>
                <Link href={href} className={`inline-block ${linkAccent} font-semibold text-sm`}>
                  {cta} →
                </Link>
              </div>
            ))}
          </div>

          {/* Pattern */}
          <div className="bg-gradient-to-br from-purple-900/20 to-slate-900 border border-purple-700/30 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">{pageCopy.patternTitle}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {pageCopy.patternItems.map((item, index) => (
                <div key={item.title}>
                  <p className="text-3xl mb-2">{['🔥', '🗣', '🛡'][index] ?? '•'}</p>
                  <p className="font-semibold text-white mb-2">{item.title}</p>
                  <p className="text-slate-400 text-sm">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Exit Moment */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 border-t border-purple-800/30">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <span className="text-6xl">💜</span>
          </div>
          <p className="text-2xl text-white leading-relaxed mb-8">
            {pageCopy.exitLead}
          </p>
          <div className="mb-12 space-y-6 text-lg text-purple-200 leading-relaxed">
            {pageCopy.exitBody.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <p className="text-purple-300 text-lg font-bold">
            — Jerome Sanders · Mr. KPA · est. 2-21-2026
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-purple-800/30 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-bold mb-4">SVL</h4>
            <p className="text-purple-300 text-sm">{pageCopy.footer.svlBody}</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">{pageCopy.footer.products}</h4>
            <ul className="space-y-2 text-purple-300 text-sm">
              <li><Link href="/tokstore" className="hover:text-white transition">TokStore</Link></li>
              <li><Link href="/agent" className="hover:text-white transition">SVL Guardians</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">{pageCopy.footer.resources}</h4>
            <ul className="space-y-2 text-purple-300 text-sm">
              <li><Link href="/our-story" className="hover:text-white transition">{pageCopy.footer.resourceLinks.story}</Link></li>
              <li><Link href="/svl-progress" className="hover:text-white transition">{pageCopy.footer.resourceLinks.progress}</Link></li>
              <li><Link href="/sanders-viopro-labs" className="hover:text-white transition">{pageCopy.footer.resourceLinks.home}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">{pageCopy.footer.mission}</h4>
            <p className="text-purple-300 text-sm">{pageCopy.footer.missionBody}</p>
          </div>
        </div>
        <div className="border-t border-purple-800/30 mt-8 pt-8 text-center text-purple-400 text-sm">
          <p>{pageCopy.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
}
