'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Shield, Mic } from 'lucide-react';
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
}

export default function FirstGuardianAgent() {
  const copy = useSiteCopy();
  const { language } = useSiteLanguage();
  const pageCopy = copy.firstGuardianPage;
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

  // Welcome audio on mount
  const welcomeMessage = pageCopy.welcomeMessage;
  useWelcomeAudio(welcomeMessage, true, {
    rate: 0.9,
    pitch: 1.0,
    volume: 0.8,
    voiceGender: 'female',
  });

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
