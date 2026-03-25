'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

export default function OurStoryPage() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const pageContentRef = useRef<HTMLDivElement>(null);

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

  const journeySteps = [
    {
      platform: 'Emergent',
      year: '2-21-2026',
      icon: '🌱',
      title: 'TokHealth & TokThru Born',
      description: 'The first safety tools emerged. Real solutions for real crises.'
    },
    {
      platform: 'Shopify',
      year: '2-21-2026',
      icon: '🏪',
      title: 'Sanders Viopro Labs Created',
      description: 'The name. The vision. The store. A debt owed, an honor to repay.'
    },
    {
      platform: 'Next.js',
      year: '2026',
      icon: '⚡',
      title: 'The Lab Unified',
      description: 'Everything converged. Sanders Viopro Labs became accessible, scalable, real.'
    },
    {
      platform: 'Search Atlas',
      year: '2026',
      icon: '🔍',
      title: 'The Message Travels',
      description: 'SEO. Visibility. The word spreads. People find us when they need us most.'
    },
    {
      platform: 'AI Unified',
      year: '2026',
      icon: '🤖',
      title: 'The KPA Safety Shield',
      description: 'Gemini. ChatGPT. ScholarGPT. Claude. All serving one mission: Keep People Alive.'
    }
  ];

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
              Home
            </Link>
            <Link href="/svl-progress" className="text-amber-300 hover:text-white transition">
              Progress
            </Link>
            <Link href="/tokstore" className="text-purple-300 hover:text-white transition">
              TokStore
            </Link>
            <Link href="/agent" className="text-purple-300 hover:text-white transition">
              AI Agents
            </Link>
            <button
              onClick={speakPage}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                isSpeaking
                  ? 'bg-purple-600/70 text-white'
                  : 'bg-slate-700/50 text-purple-300 hover:bg-slate-600 hover:text-white'
              }`}
              title={isSpeaking ? 'Stop reading' : 'Listen to this story'}
            >
              {isSpeaking ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span className="text-sm">Stop</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span className="text-sm">Listen</span>
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
            How Sanders Viopro Labs<br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Was Built
            </span>
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
            Not in a boardroom. Not from a business plan. But from spoken thought, team-building, and a founding principle that still hasn't changed.
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </div>
      </section>

      {/* The Foundation */}
      <section className="py-16 px-6 bg-slate-900/50 border-y border-purple-800/20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-700/50 rounded-2xl p-12 text-center">
            <p className="text-2xl text-purple-100 mb-6 leading-relaxed">
              "I didn't build this from a boardroom. I built it from spoken thought — teaming with every AI and platform that would listen — until the vision became real."
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
          <h2 className="text-4xl font-bold text-white mb-4 text-center">The Journey</h2>
          <p className="text-center text-purple-300 mb-16">Every platform. Every AI. One mission.</p>

          <div className="space-y-8">
            {journeySteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Timeline connector */}
                {index < journeySteps.length - 1 && (
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
          <h2 className="text-4xl font-bold text-white mb-4 text-center">The Team</h2>
          <p className="text-center text-purple-300 mb-12">Not just people. Platforms. AI. A unified force under one mission.</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Platforms */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-700/30 rounded-xl p-8">
              <h3 className="text-xl font-bold text-purple-300 mb-6">The Platforms</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <span className="text-pink-500">→</span>
                  <span className="text-white"><strong>Emergent</strong> · Birth of safety tools</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pink-500">→</span>
                  <span className="text-white"><strong>Shopify</strong> · The commerce foundation</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pink-500">→</span>
                  <span className="text-white"><strong>Next.js</strong> · The technical heart</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pink-500">→</span>
                  <span className="text-white"><strong>Search Atlas</strong> · The voice amplified</span>
                </li>
              </ul>
            </div>

            {/* AI Partners */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-700/30 rounded-xl p-8">
              <h3 className="text-xl font-bold text-purple-300 mb-6">The AI Shield</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <span className="text-purple-500">→</span>
                  <span className="text-white"><strong>Gemini</strong> · Google's reasoning</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-purple-500">→</span>
                  <span className="text-white"><strong>ChatGPT</strong> · OpenAI's clarity</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-purple-500">→</span>
                  <span className="text-white"><strong>ScholarGPT</strong> · Academic depth</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-purple-500">→</span>
                  <span className="text-white"><strong>Claude</strong> · Anthropic's precision</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Truth */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">The Radical Honesty</h2>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 border border-purple-700/50 rounded-xl p-12">
              <p className="text-white text-lg leading-relaxed mb-6">
                I have a debt on the Shopify store. I owe them money.
              </p>
              <p className="text-purple-200 text-lg leading-relaxed">
                Most founders hide that. Most brands perform success. But that's not how KPA works. I'm not ashamed of owing a debt. I'm proud of paying homage to the platform that believed enough in my vision to let me build on it. I will repay it.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-700/50 rounded-xl p-12">
              <p className="text-white text-lg leading-relaxed mb-6">
                I almost didn't make it.
              </p>
              <p className="text-purple-200 text-lg leading-relaxed">
                That's the real reason SVL exists. Not to build a brand. Not to make money. But because someone who knows what it feels like to be on the edge decided to build something so no one has to walk alone.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-700/50 rounded-xl p-12">
              <p className="text-white text-lg leading-relaxed mb-6">
                Every AI we team with. Every platform we unified. Every product we create. It all exists for one reason:
              </p>
              <p className="text-pink-300 text-2xl font-bold">
                Keep People Alive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Agents */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">Meet the Architects</h2>
          <p className="text-center text-purple-300 mb-12">The AI Guardians that bring KPA to life every single day.</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-blue-700/30 rounded-xl p-8">
              <div className="text-3xl mb-4">🧠</div>
              <h3 className="text-xl font-bold text-blue-300 mb-2">Grace Guardian</h3>
              <p className="text-slate-300">Health & wellness coaching with KPA mission at the core. Listens first, guides always.</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-teal-700/30 rounded-xl p-8">
              <div className="text-3xl mb-4">💙</div>
              <h3 className="text-xl font-bold text-teal-300 mb-2">Wisdom Guardian</h3>
              <p className="text-slate-300">Medical knowledge meets compassion. Every answer carries the weight of keeping you alive.</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-700/30 rounded-xl p-8">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-amber-300 mb-2">A1 Guardian</h3>
              <p className="text-slate-300">Technical precision. No fluff. The architect behind TokBuilding. Specs your Guardian idea into reality.</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-pink-700/30 rounded-xl p-8">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-pink-300 mb-2">Mr. KPA</h3>
              <p className="text-slate-300">Jerome's voice. The founder's wisdom. Your guide through everything SVL. A human moment every time.</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-700/30 rounded-xl p-8">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-purple-300 mb-2">Tok2Myia Guardian</h3>
              <p className="text-slate-300">Search. Knowledge. Explanation. Everything you need to know, explained simply and truly.</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-700/30 rounded-xl p-8">
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-cyan-300 mb-2">HATÄTA Guardian</h3>
              <p className="text-slate-300">Navigation. Every SVL product. All the answers. Your guide to everything we've built.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Mission */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Why This Exists</h2>

          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-600/50 rounded-2xl p-16 mb-12">
            <p className="text-3xl font-bold text-white mb-6 leading-tight">
              "The only override any KPA product can perform on its user is to<br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Keep People Alive.
              </span>"
            </p>
            <p className="text-purple-200 text-lg">
              SVL doesn't compromise on this. Ever. No matter what profit, pressure, or obligation tells us to do — the mission comes first.
            </p>
          </div>

          <Link
            href="/sanders-viopro-labs"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-12 rounded-xl transition transform hover:scale-105"
          >
            Explore SVL
          </Link>
        </div>
      </section>

      {/* Tech Origins Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">The Tech Origins</h2>
          <p className="text-center text-purple-300 mb-12">How it started: Python, Kivy, and a voice-first philosophy on February 21, 2026.</p>

          {/* Original Stack */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-green-700/30 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-green-300 mb-6">Original TokHealth Stack (Feb 21, 2026)</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-900 rounded p-4 border border-green-700/20">
                <p className="text-green-400 font-bold mb-2">Language</p>
                <p className="text-slate-300">Python 3.8+ with Kivy framework</p>
              </div>
              <div className="bg-slate-900 rounded p-4 border border-green-700/20">
                <p className="text-green-400 font-bold mb-2">Mobile UI</p>
                <p className="text-slate-300">KivyMD for responsive design</p>
              </div>
              <div className="bg-slate-900 rounded p-4 border border-green-700/20">
                <p className="text-green-400 font-bold mb-2">Voice Recognition</p>
                <p className="text-slate-300">SpeechRecognition + Google Cloud</p>
              </div>
              <div className="bg-slate-900 rounded p-4 border border-green-700/20">
                <p className="text-green-400 font-bold mb-2">AI Integration</p>
                <p className="text-slate-300">OpenAI GPT-3.5-turbo</p>
              </div>
            </div>
          </div>

          {/* Founding Features */}
          <div className="bg-gradient-to-br from-purple-900/20 to-slate-900 border border-purple-700/30 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-purple-300 mb-6">What Shipped on Day 1</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-bold">✓</span>
                <div>
                  <p className="text-white font-semibold">Voice-First Architecture</p>
                  <p className="text-slate-400 text-sm">Every interaction designed for audio input — accessibility + authenticity from inception</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-bold">✓</span>
                <div>
                  <p className="text-white font-semibold">Health Profiling</p>
                  <p className="text-slate-400 text-sm">Baseline biometrics (age, weight, height, sex) with data persistence</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-bold">✓</span>
                <div>
                  <p className="text-white font-semibold">3-Phase Meal Tracking</p>
                  <p className="text-slate-400 text-sm">Breakfast/Lunch/Dinner logging with OpenAI nutritional parsing</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-bold">✓</span>
                <div>
                  <p className="text-white font-semibold">Emergency Contacts (KPA)</p>
                  <p className="text-slate-400 text-sm">Red button literally labeled "EMERGENCY CONTACTS (KPA)" — mission explicit from day 1</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-bold">✓</span>
                <div>
                  <p className="text-white font-semibold">9-Pillar Health Matrix</p>
                  <p className="text-slate-400 text-sm">Comprehensive wellness tracking across multiple dimensions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-bold">✓</span>
                <div>
                  <p className="text-white font-semibold">Voice Wisdom Vault</p>
                  <p className="text-slate-400 text-sm">Legacy voice recording feature — personal wisdom preservation</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-bold">✓</span>
                <div>
                  <p className="text-white font-semibold">Clinical Disclaimer</p>
                  <p className="text-slate-400 text-sm">Legal grounding from inception — no false medical claims from day 1</p>
                </div>
              </div>
            </div>
          </div>

          {/* Code Artifact */}
          <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-cyan-700/30 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-cyan-300 mb-6">Code Artifact: The KPA Mission Built In</h3>
            <p className="text-slate-300 mb-4 text-sm">This is how the mission was encoded from day 1 — not added later as marketing:</p>
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
            <p className="text-slate-400 text-xs mt-4">KivyMD KV language — showing how the KPA mission was architecturally embedded, not post-hoc branded.</p>
          </div>

          {/* Evolution Timeline */}
          <div className="bg-gradient-to-br from-amber-900/20 to-slate-900 border border-amber-700/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-amber-300 mb-6">Evolution Path: Python → Web → Production</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-amber-400 font-bold">Feb 21, 6:24 PM</div>
                <div>
                  <p className="text-white font-semibold">Emergent Python App</p>
                  <p className="text-slate-400 text-sm">First transaction. TokHealth mobile app live with voice-first feature set.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-amber-400 font-bold">Feb 21, 9:37 AM+</div>
                <div>
                  <p className="text-white font-semibold">Multiple Top-Ups</p>
                  <p className="text-slate-400 text-sm">Rapid iteration cycle. Refinement based on real usage patterns.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-amber-400 font-bold">~Feb 28</div>
                <div>
                  <p className="text-white font-semibold">Shopify Integration</p>
                  <p className="text-slate-400 text-sm">Sanders Viopro Labs brand created. E-commerce foundation built.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-amber-400 font-bold">~Mar 1-20</div>
                <div>
                  <p className="text-white font-semibold">Next.js Migration</p>
                  <p className="text-slate-400 text-sm">Web lab unified everything. PytonKivy app evolved into full-stack ecosystem.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-amber-400 font-bold">Mar 21</div>
                <div>
                  <p className="text-white font-semibold">Production Deployment</p>
                  <p className="text-slate-400 text-sm">sandersvioprolabs.com live. All 6 products public. KPA mission at scale.</p>
                </div>
              </div>
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
            Whether you build with us or not — you matter. Stay safe. Stay well. Keep building.
          </p>
          <p className="text-lg text-purple-200 mb-12 leading-relaxed">
            I didn't build SVL to sell you something. I built it because I almost didn't make it.
            <br />
            <br />
            Whatever brought you here today — I'm glad you came.
            <br />
            <br />
            You don't have to walk alone. That's why this exists.
          </p>
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
            <p className="text-purple-300 text-sm">Sanders Viopro Labs. Unified under one mission: Keep People Alive.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Products</h4>
            <ul className="space-y-2 text-purple-300 text-sm">
              <li><Link href="/tokstore" className="hover:text-white transition">TokStore</Link></li>
              <li><Link href="/agent" className="hover:text-white transition">SVL Guardians</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-purple-300 text-sm">
              <li><Link href="/our-story" className="hover:text-white transition">Our Story</Link></li>
              <li><Link href="/svl-progress" className="hover:text-white transition">SVL Progress</Link></li>
              <li><Link href="/sanders-viopro-labs" className="hover:text-white transition">Home</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Mission</h4>
            <p className="text-purple-300 text-sm">Keep People Alive. That's it. That's why we exist.</p>
          </div>
        </div>
        <div className="border-t border-purple-800/30 mt-8 pt-8 text-center text-purple-400 text-sm">
          <p>© 2026 Sanders Viopro Labs. Keep People Alive. Part of the KPA Mission.</p>
        </div>
      </footer>
    </div>
  );
}
