'use client';

import { useState, useRef, useEffect } from 'react';
import { Heart, Send, BookOpen, Lightbulb, Loader2 } from 'lucide-react';
import Link from 'next/link';

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

export default function TokFaithAgent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'assistant',
      content:
        'Peace to you. I am TokFaith. When you have a question that touches your spirit—about faith, your struggles, your identity—bring it here. I will listen deeply and show you wisdom from both the Ethiopian Canon and the King James tradition.',
      perspective: 'intro',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPerspective, setCurrentPerspective] = useState('ethiopian-with-kjv-option');
  const [perspectiveHistory, setPerspectiveHistory] = useState({});
  const [promptIndex, setPromptIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const rotatablePrompts = [
    'Ask about your struggles...',
    'What does faith mean to you?',
    'Tell me about your identity...',
    'How can I find peace?',
    'Show me Ethiopian scripture wisdom...',
    'What does the King James say about...?',
    'I need guidance on...',
    'Help me understand...',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const promptInterval = setInterval(() => {
      setPromptIndex((prev) => (prev + 1) % rotatablePrompts.length);
    }, 4000); // Rotate every 4 seconds

    return () => clearInterval(promptInterval);
  }, [rotatablePrompts.length]);

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
      const response = await fetch('/api/tokfaith', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          forcePerspective: currentPerspective,
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
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-slate-950 fill-slate-950" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-amber-100">TokFaith</h1>
                <p className="text-amber-200/60 text-xs">The Wise Elder Who Listens</p>
              </div>
            </div>

            <div className="flex gap-3 text-sm">
              <Link
                href="/tokfaith"
                className="text-amber-200 hover:text-amber-100 transition"
              >
                Her Story
              </Link>
              <Link
                href="/agent"
                className="text-amber-200 hover:text-amber-100 transition"
              >
                All Agents
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
              className={`max-w-2xl rounded-2xl px-6 py-4 ${
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
                    {message.perspective || 'TokFaith'}
                  </p>
                  {message.description && (
                    <p className="text-xs text-amber-200/70 mt-1">{message.description}</p>
                  )}
                </div>
              )}

              <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>

              {message.type === 'assistant' && message.perspectives && (
                <div className="mt-4 pt-4 border-t border-amber-700/30">
                  <p className="text-xs text-amber-200/70 mb-2">See this wisdom in another light:</p>
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
                        {perspective === 'ethiopian' && '📖 Ethiopian Canon'}
                        {perspective === 'kjv' && '✨ King James'}
                        {perspective === 'ethiopian-with-kjv-option' && '🤲 Both Perspectives'}
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
            <div className="max-w-2xl rounded-2xl px-6 py-4 bg-slate-800/60 border border-amber-700/30">
              <div className="flex items-center gap-2 text-amber-200">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">TokFaith is listening...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-amber-800/30 bg-slate-900/80 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-3">
          {/* Perspective Selector */}
          <div className="flex gap-2 flex-wrap items-center text-xs">
            <span className="text-amber-200/70">Current perspective:</span>
            <select
              value={currentPerspective}
              onChange={(e) => setCurrentPerspective(e.target.value)}
              className="px-3 py-1.5 rounded bg-slate-800 border border-amber-700/50 text-amber-100 text-xs hover:border-amber-600/80 transition"
            >
              <option value="ethiopian">📖 Ethiopian Canon (88 books)</option>
              <option value="kjv">✨ King James Version</option>
              <option value="ethiopian-with-kjv-option">🤲 Both Perspectives</option>
            </select>
          </div>

          {/* Message Input */}
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={rotatablePrompts[promptIndex]}
              className="flex-1 px-4 py-3 bg-slate-800 border border-amber-700/50 text-amber-50 placeholder-amber-200/40 rounded-lg focus:outline-none focus:border-amber-600/80 focus:ring-1 focus:ring-amber-600/30 resize-none"
              rows={3}
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || loading}
              className="px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 disabled:from-slate-700 disabled:to-slate-700 text-slate-900 font-bold rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2 flex-shrink-0"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              Send
            </button>
          </div>

          <p className="text-xs text-amber-200/50 text-center">
            💝 TokFaith honors Shirley Whaley's "Amen" blessing • Part of Keep People Alive (KPA)
          </p>
        </div>
      </div>
    </div>
  );
}
