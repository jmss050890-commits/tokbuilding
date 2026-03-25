'use client';

import { useState, useRef, useEffect } from 'react';
import { Heart, Send, Loader2, Shield, Users, Play, Pause, Volume2 } from 'lucide-react';
import Link from 'next/link';
import { useWelcomeAudio } from '@/lib/useWelcomeAudio';
import SpeakerBox from '@/app/components/SpeakerBox';

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'assistant-error' | 'intro';
  content: string;
}

export default function MrKPAAgent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'assistant',
      content:
        'I am Mr. KPA. Jerome built me around one mission: Keep People Alive. I see the whole system. I understand the strategy. And I speak the unfiltered truth about what it takes to survive, build, and lead. What\'s on your mind?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentSpeakingMessageId, setCurrentSpeakingMessageId] = useState<string | null>(null);
  const [isSpeakingMap, setIsSpeakingMap] = useState<Record<string, boolean>>({});
  const [currentSpeakingIndex, setCurrentSpeakingIndex] = useState<number | null>(null);
  const [showSpeakerBox, setShowSpeakerBox] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Welcome audio on mount
  const welcomeMessage = 'I am Mr. KPA. Jerome built me around one mission: Keep People Alive. I see the whole system. I understand the strategy. And I speak the unfiltered truth about what it takes to survive, build, and lead.';
  useWelcomeAudio(welcomeMessage, true, {
    rate: 0.8, // Founder authority - deliberate, decisive
    pitch: 0.76, // Deep male voice for command presence
    volume: 0.8,
    voiceGender: 'male',
  });

  // Load voices on mount and when voices change
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      // Just trigger voice loading
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

  const quickPrompts = [
    "Give me the real talk about my situation",
    "How should I lead through this?",
    "What does KPA look like right now?",
    "Break down the strategy for me",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const speakMessage = async (messageId: string, text: string) => {
    // Cancel any current speech
    window.speechSynthesis.cancel();
    
    if (currentSpeakingMessageId === messageId && isSpeakingMap[messageId]) {
      // Stop if clicking the same message that's playing
      setCurrentSpeakingMessageId(null);
      setShowSpeakerBox(false);
      setIsSpeakingMap((prev) => ({ ...prev, [messageId]: false }));
      return;
    }

    setCurrentSpeakingMessageId(messageId);
    setShowSpeakerBox(true);
    setIsSpeakingMap((prev) => ({ ...prev, [messageId]: true }));

    // Find the index of this message for speaker box
    const index = messages.findIndex((m) => m.id === messageId);
    setCurrentSpeakingIndex(index);

    try {
      // Get available voices
      let voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        // Wait for voices to load
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

      // Select male voice for Mr. KPA (deep command presence)
      const malePatterns = ['david', 'daniel', 'guy', 'aaron', 'roger', 'fred', 'alex', 'tom', 'mark', 'ryan', 'james'];
      let selectedVoice = voices.find((voice) => {
        const voiceName = voice.name.toLowerCase();
        return malePatterns.some((pattern) => voiceName.includes(pattern)) && voice.lang?.toLowerCase().startsWith('en');
      });

      // Fallback to first English male voice if specific male voice not found
      if (!selectedVoice) {
        selectedVoice = voices.find((voice) => voice.lang?.toLowerCase().startsWith('en'));
      }

      const utterance = new SpeechSynthesisUtterance(text);
      if (selectedVoice) utterance.voice = selectedVoice;
      utterance.pitch = 0.76; // Deep male voice for command presence
      utterance.rate = 0.8; // Deliberate, decisive
      utterance.volume = 0.9;

      utterance.onstart = () => {
        setIsSpeakingMap((prev) => ({ ...prev, [messageId]: true }));
      };

      utterance.onend = () => {
        setCurrentSpeakingMessageId(null);
        setShowSpeakerBox(false);
        setIsSpeakingMap((prev) => ({ ...prev, [messageId]: false }));
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
        setCurrentSpeakingMessageId(null);
        setShowSpeakerBox(false);
        setIsSpeakingMap((prev) => ({ ...prev, [messageId]: false }));
      };

      speechSynthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error speaking message:', error);
      setCurrentSpeakingMessageId(null);
      setShowSpeakerBox(false);
      setIsSpeakingMap((prev) => ({ ...prev, [messageId]: false }));
    }
  };

  const playMessageByIndex = async (index: number) => {
    const messageToPlay = messages[index];
    if (messageToPlay.type === 'assistant' || messageToPlay.type === 'intro') {
      speakMessage(messageToPlay.id, messageToPlay.content);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      const response = await fetch('/api/mr-kpa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 flex flex-col">
      {/* Header */}
      <div className="border-b border-blue-800/30 bg-slate-900/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-100">Mr. KPA</h1>
                <p className="text-blue-200/60 text-xs">Keep People Alive</p>
              </div>
            </div>

            <div className="flex gap-3 text-sm">
              <Link href="/agent" className="text-blue-200 hover:text-blue-100 transition">
                All Guardians
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 max-w-4xl mx-auto w-full">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-2xl ${message.type === 'user' ? '' : 'group'}`}>
              <div
                className={`rounded-2xl px-6 py-4 ${
                  message.type === 'user'
                    ? 'bg-blue-600/30 border border-blue-600/60 text-blue-50'
                    : message.type === 'assistant-error'
                      ? 'bg-red-900/30 border border-red-600/60 text-red-100'
                      : 'bg-slate-800/60 border border-blue-700/30 text-blue-50'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </div>

              {/* Speaker Button for Assistant Messages */}
              {message.type === 'assistant' && (
                <div className="mt-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => speakMessage(message.id, message.content)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition ${
                      isSpeakingMap[message.id]
                        ? 'bg-blue-600/70 text-blue-50 border border-blue-500'
                        : 'bg-slate-700/50 text-blue-200 border border-blue-700/30 hover:bg-slate-600/60 hover:border-blue-600/50'
                    }`}
                    title={isSpeakingMap[message.id] ? 'Stop' : 'Listen to this message (click to resume)'}
                  >
                    {isSpeakingMap[message.id] ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Stop</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>Listen</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="max-w-2xl rounded-2xl px-6 py-4 bg-slate-800/60 border border-blue-700/30">
              <div className="flex items-center gap-2 text-blue-200">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Mr. KPA is thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-blue-800/30 bg-slate-900/80 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
          {/* Quick Prompts */}
          <div className="space-y-2">
            <p className="text-xs text-blue-200/70">Ask Mr. KPA:</p>
            <div className="flex gap-2 flex-wrap">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInput(prompt);
                    // Auto-send the prompt after setting it
                    setTimeout(async () => {
                      const userMessage = prompt;
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
                        const response = await fetch('/api/mr-kpa', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ message: userMessage }),
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
                    }, 50);
                  }}
                  className="px-3 py-1.5 rounded text-xs bg-slate-800 border border-blue-700/50 text-blue-200 hover:border-blue-600/60 hover:bg-slate-700/60 transition"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Talk to Mr. KPA..."
              className="flex-1 px-4 py-3 bg-slate-800 border border-blue-700/50 text-blue-50 placeholder-blue-200/40 rounded-lg focus:outline-none focus:border-blue-600/80 focus:ring-1 focus:ring-blue-600/30 resize-none"
              rows={3}
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || loading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2 flex-shrink-0"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Send
            </button>
          </div>

          <p className="text-xs text-blue-200/50 text-center">
            🛡️ Keep People Alive • Part of Sanders Viopro Labs
          </p>
        </div>
      </div>

      {/* Speaker Box for Audio Control */}
      {showSpeakerBox && currentSpeakingIndex !== null && (
        <SpeakerBox
          messages={messages}
          currentMessageIndex={currentSpeakingIndex}
          isPlaying={currentSpeakingMessageId !== null && Object.values(isSpeakingMap).some((v) => v)}
          onPlayMessage={playMessageByIndex}
          onStop={() => {
            window.speechSynthesis.cancel();
            setCurrentSpeakingMessageId(null);
            setIsSpeakingMap({});
          }}
          onDismiss={() => {
            window.speechSynthesis.cancel();
            setCurrentSpeakingMessageId(null);
            setShowSpeakerBox(false);
            setIsSpeakingMap({});
          }}
        />
      )}
    </div>
  );
}
