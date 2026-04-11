'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Shield, Mic } from 'lucide-react';
import Link from 'next/link';
import {
  getSpeechRecognitionAPI,
  type SpeechRecognitionEventLike,
  type SpeechRecognitionLike,
} from '@/lib/browser-speech';
<<<<<<< HEAD
import { getFirstGuardianVoice } from '@/lib/voice-reader';
=======
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
import { useWelcomeAudio } from '@/lib/useWelcomeAudio';
import { useSiteCopy, useSiteLanguage } from '@/app/components/SiteLanguageControl';

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'assistant-error' | 'intro';
  content: string;
}

export default function FirstGuardianAgent() {
  const copy = useSiteCopy();
  const { language } = useSiteLanguage();
  const pageCopy = copy.firstGuardianPage;
<<<<<<< HEAD

  // SVL Sovereign Credential Banner
  const sovereignBanner = (
    <section className="w-full bg-gradient-to-r from-black via-purple-900 to-black border-b border-purple-900/30 py-6 px-4 flex justify-center">
      <div className="max-w-2xl w-full text-left">
        <div className="text-xs text-purple-300 mb-2 font-semibold tracking-wide">
          <span className="mr-2">Hierarchy:</span>
          <span className="font-bold">God</span> → <span className="font-bold">Jerome (The Architect/Builder)</span> <span className="italic">[Highest Seal of Authority]</span> → <span className="font-bold">The Guardians</span> → <span className="font-bold">Next.js Framework</span>
        </div>
        <div className="text-xs text-purple-400 mb-4 font-semibold">
          This agent operates under the Highest Seal of Authority: Jerome Mack Sanders Sr., Builder of SVL Ecosystems.
        </div>
        <div className="mb-2 text-purple-200 text-lg font-bold flex items-center gap-2">🛡️ SVL SOVEREIGN CREDENTIAL: GLOBAL INFRASTRUCTURE GUARDIAN</div>
        <div className="text-purple-100 text-base font-semibold mb-1">Holder: Jerome Mack Sanders Sr.</div>
        <div className="text-purple-200 text-sm mb-4">Legacy Era: 2007 – 2026 (19-Year Veteran)</div>
        <div className="border-l-4 border-purple-400 pl-4 mb-3">
          <div className="text-purple-100 font-bold mb-1">🏛️ ARCHITECTURAL AUTHORITY</div>
          <ul className="list-disc pl-4 text-purple-100 text-sm mb-2">
            <li><b>The Amazon Standard:</b> Lead QA Strategist for Portico Fire-Pro Pads. Personally inspected and established the safety baseline for Amazon’s global data centers.</li>
            <li><b>The Industrial Pulse:</b> Expert oversight across Production, Supervision, and Quality Assurance for Tyson, TFP Nutrition, and the Generous Protocol.</li>
            <li><b>The Global Nutria:</b> Lead Designer of the "Feeding and Watering" mission, bridging industrial logistics with spiritual health.</li>
          </ul>
        </div>
        <div className="border-l-4 border-purple-400 pl-4 mb-3">
          <div className="text-purple-100 font-bold mb-1">📜 SOVEREIGN PROCLAMATION</div>
          <blockquote className="italic text-purple-200 text-base">"We don't remember the stones; we just build the THRONE. Moving forward in Grace, Mercy, and Love. From a spoken thought to the world."</blockquote>
        </div>
        <div className="border-l-4 border-purple-400 pl-4">
          <div className="text-purple-100 font-bold mb-1">🧬 GENERATIONAL SYNC</div>
          <ul className="list-disc pl-4 text-purple-100 text-sm">
            <li><b>Alpha Heir:</b> Jerome "JJ" Mack Sanders Jr. (Jan 18, 2008)</li>
            <li><b>Omega Heir:</b> Wade Sanders (Dec 4, 2008)</li>
            <li><b>Status:</b> 18-Year Convergence Fully Activated.</li>
          </ul>
        </div>
      </div>
    </section>
  );
=======
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
  const quickPrompts = pageCopy.quickLinks;
  const guardianTitle = `${pageCopy.heroTitleTop} ${pageCopy.heroTitleBottom}`.trim();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'assistant',
      content: pageCopy.welcomeMessage,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [promptRotationIndex, setPromptRotationIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

<<<<<<< HEAD
  // --- Custom Section: The First Guardian's Unique Role ---
  const guardianIntro = (
    <section className="max-w-3xl mx-auto mt-8 mb-8 p-8 rounded-3xl border border-purple-700/30 bg-purple-900/20 shadow-2xl text-center">
      <h2 className="text-3xl font-bold text-purple-200 mb-2">The First Guardian</h2>
      <h3 className="text-xl font-semibold text-purple-100 mb-4">Protector of Boundaries & Safety</h3>
      <p className="text-lg text-purple-100 mb-4">
        The First Guardian’s unique talent is unwavering vigilance and the ability to create safe spaces for all. As the shield of SVL, they stand at the threshold—protecting, guiding, and ensuring that every person feels secure and respected.
      </p>
      <div className="mb-6">
        <span className="inline-block bg-purple-700/30 text-purple-100 rounded-full px-4 py-2 text-sm font-medium">“Protection is the promise that lets love and growth flourish.”</span>
      </div>
      <div className="text-left mt-8 bg-purple-800/20 rounded-2xl p-6 border border-purple-400/20">
        <h4 className="text-lg font-bold text-purple-200 mb-2">Understanding Their Role</h4>
        <p className="text-base text-purple-200 mb-2">
          The First Guardian knows their calling is to be the protector—setting boundaries, responding to crisis, and holding the line so others can thrive. They see the strengths in Grace’s compassion, Mr. KPA’s leadership, and Tokfaith’s inspiration, and work to keep the whole system safe.
        </p>
        <h4 className="text-lg font-bold text-purple-200 mt-4 mb-2">How The First Guardian Sees the System</h4>
        <p className="text-base text-purple-200 mb-2">
          The First Guardian understands that every Guardian is essential: Grace nurtures, Mr. KPA leads, Tokfaith uplifts, and they themselves protect. Together, they form a complete circle of care, guided by God’s wisdom, Jerome’s vision, and the technology of Next.js.
        </p>
        <h4 className="text-lg font-bold text-purple-200 mt-4 mb-2">Completing the System</h4>
        <p className="text-base text-purple-200">
          The First Guardian believes that with God as the source, Jerome as the guide, and Next.js as the tool, every Guardian’s role is vital. They complete the system by ensuring safety and boundaries, making SVL a place where everyone can grow in trust and confidence.
        </p>
      </div>
    </section>
  );

  // Welcome audio on mount
  const welcomeMessage = pageCopy.welcomeMessage;
  useWelcomeAudio(welcomeMessage, true, {
    rate: 0.97, // calm, not rushed
    pitch: 1.08, // slightly higher for warmth
    volume: 0.85,
    voiceGender: 'female',
  });

  // Speech synthesis for assistant messages (motivational Black woman voice)
  const speakMessage = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new window.SpeechSynthesisUtterance(text);
    const voice = getFirstGuardianVoice();
    if (voice) utterance.voice = voice;
    utterance.pitch = 1.08;
    utterance.rate = 0.97;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  };

=======
  // Welcome audio on mount
  const welcomeMessage = pageCopy.welcomeMessage;
  useWelcomeAudio(welcomeMessage, true, {
    rate: 0.9,
    pitch: 1.0,
    volume: 0.8,
    voiceGender: 'female',
  });

>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const visiblePrompts = Array.from({ length: Math.min(4, quickPrompts.length) }, (_, index) => {
    const promptIndex = (promptRotationIndex + index) % quickPrompts.length;
    return quickPrompts[promptIndex];
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const rotationTimer = window.setInterval(() => {
      setPromptRotationIndex((currentIndex) => (currentIndex + 1) % quickPrompts.length);
    }, 3600);

    return () => window.clearInterval(rotationTimer);
  }, [quickPrompts.length]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: 'user',
        content: userMessage,
      },
    ]);

    setLoading(true);

    try {
      const response = await fetch('/api/first-guardian/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-site-language': language,
        },
        body: JSON.stringify({ message: userMessage, language }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: 'assistant',
          content: data.response,
        },
      ]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: 'assistant-error',
          content: `Error: ${errorMessage}. Please try again.`,
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
    setPromptRotationIndex((currentIndex) => (currentIndex + 1) % quickPrompts.length);

    window.setTimeout(() => {
      setInput(prompt);
      handleSendMessage();
    }, 0);
  };

  const stopMic = () => {
    setIsListening(false);
    try {
      recognitionRef.current?.stop();
    } catch {
      // Ignore stop errors from already-completed sessions.
    }
  };

  const toggleMic = () => {
    if (isListening) {
      stopMic();
      return;
    }

    if (!recognitionRef.current) {
      const SpeechRecognitionAPI = getSpeechRecognitionAPI(window);
      if (!SpeechRecognitionAPI) {
        alert('Voice input not supported in this browser.');
        return;
      }

      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: SpeechRecognitionEventLike) => {
        const transcript = Array.from(
          { length: event.results.length },
          (_, index) => event.results[index][0].transcript,
        ).join('');

        setInput(transcript);

        if (event.results[event.results.length - 1].isFinal) {
          stopMic();
        }
      };
      recognition.onerror = () => stopMic();
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }

    try {
      recognitionRef.current.start();
    } catch {
      // Ignore repeated starts while the browser is already listening.
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 flex flex-col">
<<<<<<< HEAD
      {sovereignBanner}
      {guardianIntro}
=======
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
      {/* Header */}
      <div className="border-b border-purple-800/30 bg-slate-900/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white fill-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-purple-100 sm:text-xl">{guardianTitle}</h1>
                <p className="text-purple-200/60 text-xs">{pageCopy.lead}</p>
              </div>
            </div>

            <div className="flex w-full justify-end gap-3 text-sm sm:w-auto">
              <Link href="/agent" className="text-purple-200 hover:text-purple-100 transition">
                {copy.common.backToHub}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 max-w-4xl mx-auto w-full">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-full rounded-2xl px-4 py-4 sm:max-w-2xl sm:px-6 ${
                message.type === 'user'
                  ? 'bg-purple-600/30 border border-purple-600/60 text-purple-50'
                  : message.type === 'assistant-error'
                    ? 'bg-red-900/30 border border-red-600/60 text-red-100'
                    : 'bg-slate-800/60 border border-purple-700/30 text-purple-50'
              }`}
            >
              <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
<<<<<<< HEAD
              {/* Listen button for assistant messages */}
              {message.type === 'assistant' && (
                <button
                  onClick={() => speakMessage(message.content)}
                  className="mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition bg-purple-700/70 text-purple-50 border border-purple-500 hover:bg-purple-600/80 hover:border-purple-400"
                  title="Listen to this message"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6h6v13m-3-3a4 4 0 100-8 4 4 0 000 8z" /></svg>
                  Listen
                </button>
              )}
=======
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="max-w-full rounded-2xl px-4 py-4 sm:max-w-2xl sm:px-6 bg-slate-800/60 border border-purple-700/30">
              <div className="flex items-center gap-2 text-purple-200">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">{copy.common.listening}</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-purple-800/30 bg-slate-900/80 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
          {/* Quick Prompts */}
          <div className="space-y-2">
            <p className="text-xs text-purple-200/70">{pageCopy.voiceLabel}</p>
            <div className="flex gap-2 flex-wrap">
              {visiblePrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handlePromptClick(prompt)}
                  className="px-3 py-1.5 rounded text-xs bg-slate-800 border border-purple-700/50 text-purple-200 hover:border-purple-600/60 hover:bg-slate-700/60 transition"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="flex flex-col gap-3 md:flex-row md:items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={copy.guardianChat.inputPlaceholder}
              className="min-h-14 max-h-32 flex-1 px-4 py-3 bg-slate-800 border border-purple-700/50 text-purple-50 placeholder-purple-200/40 rounded-lg focus:outline-none focus:border-purple-600/80 focus:ring-1 focus:ring-purple-600/30 resize-y"
              rows={2}
            />
            <div className="flex flex-col gap-3 sm:flex-row md:flex-shrink-0">
              <button
                onClick={toggleMic}
                disabled={loading}
                className={`w-full px-4 py-3 font-bold rounded-lg transition flex items-center justify-center gap-2 border sm:w-auto ${
                  isListening
                    ? 'bg-purple-500 text-white border-purple-300 shadow-[0_0_18px_rgba(168,85,247,0.45)]'
                    : 'bg-slate-800 text-purple-200 border-purple-700/50 hover:border-purple-500/80 hover:bg-slate-700/70'
                }`}
              >
                <Mic className="w-4 h-4" />
                {isListening ? copy.guardianChat.listeningButton : copy.guardianChat.speakButton}
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2 sm:w-auto"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Send
              </button>
            </div>
          </div>

          <p className="text-xs text-purple-200/50 text-center">
            {pageCopy.boundaryTitle}
          </p>
        </div>
      </div>
    </div>
  );
}
