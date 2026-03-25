'use client';

import { useState, useRef, useEffect } from 'react';
import { Heart, Send, Loader2, Mic } from 'lucide-react';
import Link from 'next/link';
import {
  getSpeechRecognitionAPI,
  type SpeechRecognitionEventLike,
  type SpeechRecognitionLike,
} from '@/lib/browser-speech';
import { useWelcomeAudio } from '@/lib/useWelcomeAudio';
import { useSiteCopy, useSiteLanguage } from '@/app/components/SiteLanguageControl';

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'assistant-error' | 'intro';
  content: string;
  perspective?: string;
  description?: string;
  perspectives?: {
    available: string[];
    current: string;
    canSwitch: boolean;
  };
}

function getPerspectiveLabel(
  perspective: string | undefined,
  routeCopy: ReturnType<typeof useSiteCopy>['tokfaithAgent'],
) {
  if (!perspective || perspective === 'intro') {
    return routeCopy.title;
  }

  if (perspective === 'ethiopian') {
    return routeCopy.perspectiveOptions.ethiopian;
  }

  if (perspective === 'kjv') {
    return routeCopy.perspectiveOptions.kjv;
  }

  if (perspective === 'ethiopian-with-kjv-option') {
    return routeCopy.perspectiveOptions.both;
  }

  return perspective;
}

export default function TokFaithAgent() {
  const copy = useSiteCopy();
  const { language } = useSiteLanguage();
  const routeCopy = copy.tokfaithAgent;
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'assistant',
      content: routeCopy.welcomeMessage,
      perspective: 'intro',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPerspective, setCurrentPerspective] = useState('ethiopian-with-kjv-option');
  const [perspectiveHistory, setPerspectiveHistory] = useState({});
  const [voiceMode, setVoiceMode] = useState<'tokfaith' | 'jerome' | 'mrkpa'>('tokfaith');
  const [isListening, setIsListening] = useState(false);
  const [promptRotationIndex, setPromptRotationIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  // Welcome audio on mount
  const welcomeMessage = routeCopy.welcomeMessage;
  useWelcomeAudio(welcomeMessage, true, {
    rate: 0.9,
    pitch: 1.1, // Slightly higher for warm, spiritual tone
    volume: 0.8,
    voiceGender: 'female',
  });

  const jeromeWisdom = routeCopy.jeromeWisdom;
  const quickPrompts = routeCopy.quickPrompts;

  const visiblePrompts = Array.from({ length: Math.min(3, quickPrompts[voiceMode].length) }, (_, index) => {
    const promptIndex = (promptRotationIndex + index) % quickPrompts[voiceMode].length;
    return quickPrompts[voiceMode][promptIndex];
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setPromptRotationIndex(0);

    if (quickPrompts[voiceMode].length <= 3) {
      return;
    }

    const rotationTimer = window.setInterval(() => {
      setPromptRotationIndex((currentIndex) => (currentIndex + 1) % quickPrompts[voiceMode].length);
    }, 3600);

    return () => window.clearInterval(rotationTimer);
  }, [voiceMode]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');

    // Add user message
    const userMessageId = Date.now().toString();
    setMessages((prev) => [
      ...prev,
      {
        id: userMessageId,
        type: 'user',
        content: userMessage,
      } as Message,
    ]);

    setLoading(true);

    try {
      const systemContext = 
        voiceMode === 'jerome'
          ? 'You are TokFaith speaking with Jerome Sanders\'s fatherly wisdom. Be direct, honest, and compassionate. Use his philosophy: "Do not just ask what sounds good. Ask what keeps people alive." Answer with the kind of fatherly truth Jerome would give.'
          : voiceMode === 'mrkpa'
            ? 'You are Mr. KPA speaking to guide this person. Be a protective, strong big brother. Use fatherly wisdom combined with practical strategy. Help them see what decision keeps them alive.'
            : '';

      const response = await fetch('/api/tokfaith/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-site-language': language,
        },
        body: JSON.stringify({
          message: userMessage,
          language,
          forcePerspective: currentPerspective,
          systemContext,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response from TokFaith');
      }

      // Store perspective option for this message
      setPerspectiveHistory((prev) => ({
        ...prev,
        [userMessageId]: data.perspectives,
      }));

      // Add assistant response
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: 'assistant',
          content: data.response,
          perspective: data.perspective,
          description: data.description,
          perspectives: data.perspectives,
        } as Message,
      ]);

      setCurrentPerspective(data.perspectives.current);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: 'assistant-error',
          content: `I encountered an error: ${errorMessage}. Please try again.`,
        } as Message,
      ]);
    }

    setLoading(false);
  };

  const handlePerspectiveSwitch = async (perspective: string) => {
    if (!input.trim()) return;

    setCurrentPerspective(perspective);
    // The next message will use the new perspective
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
    setPromptRotationIndex((currentIndex) => (currentIndex + 1) % quickPrompts[voiceMode].length);

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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950 to-slate-950 flex flex-col">
      {/* Header */}
      <div className="border-b border-amber-800/30 bg-slate-900/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-slate-950 fill-slate-950" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-amber-100 sm:text-xl">{routeCopy.title}</h1>
                <p className="text-amber-200/60 text-xs">{routeCopy.subtitle}</p>
              </div>
            </div>

            <div className="flex w-full flex-wrap justify-end gap-3 text-sm sm:w-auto">
              <Link
                href="/tokfaith"
                className="text-amber-200 hover:text-amber-100 transition"
              >
                {copy.tokfaith.hero.secondaryCta}
              </Link>
              <Link
                href="/agent"
                className="text-amber-200 hover:text-amber-100 transition"
              >
                {copy.common.backToHub}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 max-w-4xl mx-auto w-full">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-full rounded-2xl px-4 py-4 sm:max-w-2xl sm:px-6 ${
                message.type === 'user'
                  ? 'bg-amber-600/30 border border-amber-600/60 text-amber-50'
                  : message.type === 'assistant-error'
                    ? 'bg-red-900/30 border border-red-600/60 text-red-100'
                    : 'bg-slate-800/60 border border-amber-700/30 text-amber-50'
              }`}
            >
              {message.type === 'assistant' && (
                <div className="mb-3 pb-3 border-b border-amber-700/30">
                  <p className="text-sm font-semibold text-amber-300">
                    {getPerspectiveLabel(message.perspective, routeCopy)}
                  </p>
                  {message.description && (
                    <p className="text-xs text-amber-200/70 mt-1">{message.description}</p>
                  )}
                </div>
              )}

              <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>

              {message.type === 'assistant' && message.perspectives && (
                <div className="mt-4 pt-4 border-t border-amber-700/30">
                  <p className="text-xs text-amber-200/70 mb-2">{routeCopy.perspectiveHelp}</p>
                  <div className="flex gap-2 flex-wrap">
                    {message.perspectives.available.map((perspective) => (
                      <button
                        key={perspective}
                        onClick={() => handlePerspectiveSwitch(perspective)}
                        className={`text-xs px-3 py-1 rounded border transition ${
                          message.perspectives?.current === perspective
                            ? 'bg-amber-600/40 border-amber-600/80 text-amber-100'
                            : 'bg-slate-700/40 border-amber-700/30 text-amber-200 hover:border-amber-600/60'
                        }`}
                      >
                        {perspective === 'ethiopian' && `📖 ${routeCopy.perspectiveOptions.ethiopian}`}
                        {perspective === 'kjv' && `✨ ${routeCopy.perspectiveOptions.kjv}`}
                        {perspective === 'ethiopian-with-kjv-option' && `🤲 ${routeCopy.perspectiveOptions.both}`}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="max-w-full rounded-2xl px-4 py-4 sm:max-w-2xl sm:px-6 bg-slate-800/60 border border-amber-700/30">
              <div className="flex items-center gap-2 text-amber-200">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">{routeCopy.loadingLabel}</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-amber-800/30 bg-slate-900/80 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
          {/* Voice Mode Selector */}
          <div className="flex gap-2 flex-wrap items-center">
            <span className="text-amber-200/70 text-xs">{routeCopy.voiceModeLabel}</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setVoiceMode('tokfaith')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition ${
                  voiceMode === 'tokfaith'
                    ? 'bg-amber-600/60 border border-amber-600/80 text-amber-100'
                    : 'bg-slate-800 border border-amber-700/50 text-amber-200 hover:border-amber-600/60'
                }`}
              >
                🤲 {routeCopy.voiceModes.tokfaith}
              </button>
              <button
                onClick={() => setVoiceMode('jerome')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition ${
                  voiceMode === 'jerome'
                    ? 'bg-amber-600/60 border border-amber-600/80 text-amber-100'
                    : 'bg-slate-800 border border-amber-700/50 text-amber-200 hover:border-amber-600/60'
                }`}
              >
                🙏 {routeCopy.voiceModes.jerome}
              </button>
              <button
                onClick={() => setVoiceMode('mrkpa')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition ${
                  voiceMode === 'mrkpa'
                    ? 'bg-amber-600/60 border border-amber-600/80 text-amber-100'
                    : 'bg-slate-800 border border-amber-700/50 text-amber-200 hover:border-amber-600/60'
                }`}
              >
                👨 {routeCopy.voiceModes.mrkpa}
              </button>
            </div>
          </div>

          {/* Jerome wisdom quote rotating */}
          {voiceMode === 'jerome' && (
            <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-3">
              <p className="text-xs text-amber-200/70 italic">
                "{jeromeWisdom[Math.floor(Math.random() * jeromeWisdom.length)]}"
              </p>
            </div>
          )}

          {/* Quick Prompt Buttons */}
          <div className="space-y-2">
            <p className="text-xs text-amber-200/70">{routeCopy.quickPromptsLabel}</p>
            <div className="flex gap-2 flex-wrap">
              {visiblePrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handlePromptClick(prompt)}
                  className="px-3 py-1.5 rounded text-xs bg-slate-800 border border-amber-700/50 text-amber-200 hover:border-amber-600/60 hover:bg-slate-700/60 transition"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Perspective Selector */}
          <div className="flex gap-2 flex-wrap items-center text-xs">
            <span className="text-amber-200/70">{routeCopy.perspectiveLabel}</span>
            <select
              value={currentPerspective}
              onChange={(e) => setCurrentPerspective(e.target.value)}
              title={routeCopy.perspectiveLabel}
              className="px-3 py-1.5 rounded bg-slate-800 border border-amber-700/50 text-amber-100 text-xs hover:border-amber-600/80 transition"
            >
              <option value="ethiopian">📖 {routeCopy.perspectiveOptions.ethiopian}</option>
              <option value="kjv">✨ {routeCopy.perspectiveOptions.kjv}</option>
              <option value="ethiopian-with-kjv-option">🤲 {routeCopy.perspectiveOptions.both}</option>
            </select>
          </div>

          {/* Message Input */}
          <div className="flex flex-col gap-3 md:flex-row md:items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={routeCopy.placeholder}
              className="min-h-14 max-h-32 flex-1 px-4 py-3 bg-slate-800 border border-amber-700/50 text-amber-50 placeholder-amber-200/40 rounded-lg focus:outline-none focus:border-amber-600/80 focus:ring-1 focus:ring-amber-600/30 resize-y"
              rows={2}
            />
            <div className="flex flex-col gap-3 sm:flex-row md:flex-shrink-0">
              <button
                onClick={toggleMic}
                disabled={loading}
                className={`w-full px-4 py-3 font-bold rounded-lg transition flex items-center justify-center gap-2 border sm:w-auto ${
                  isListening
                    ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-[0_0_18px_rgba(245,158,11,0.45)]'
                    : 'bg-slate-800 text-amber-200 border-amber-700/50 hover:border-amber-500/80 hover:bg-slate-700/70'
                }`}
              >
                <Mic className="w-4 h-4" />
                {isListening ? copy.guardianChat.listeningButton : copy.guardianChat.speakButton}
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 disabled:from-slate-700 disabled:to-slate-700 text-slate-900 font-bold rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2 sm:w-auto"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Send
              </button>
            </div>
          </div>

          <p className="text-xs text-amber-200/50 text-center">
            {routeCopy.footer}
          </p>
        </div>
      </div>
    </div>
  );
}
