'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import SpeakerBox from '@/app/components/SpeakerBox';
import Link from 'next/link';
import { Heart, Send, Loader } from 'lucide-react';


interface Message {
  id: string;
  type: 'user' | 'assistant' | 'assistant-error';
  content: string;
}



const GuardianPage = () => {
  const [messages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);
  const [showSpeakerBox, setShowSpeakerBox] = useState(false);
  const [currentSpeakingIndex, setCurrentSpeakingIndex] = useState<number | null>(null);
  const [currentSpeakingMessageId, setCurrentSpeakingMessageId] = useState<string | null>(null);
  const [isSpeakingMap, setIsSpeakingMap] = useState<{ [id: string]: boolean }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const guardianName = 'Guardian';
  const memorialName = 'Your Loved One';

  // Handler stubs
  const handleSendMessage = () => {
    // Demo: do nothing
  };

  // Speech synthesis for a message
  const speakMessage = (msgId: string, content: string) => {
    // If already speaking this message, stop
    if (isSpeakingMap[msgId]) {
      window.speechSynthesis.cancel();
      setIsSpeakingMap((prev) => ({ ...prev, [msgId]: false }));
      setCurrentSpeakingMessageId(null);
      return;
    }
    // Stop any current speech
    window.speechSynthesis.cancel();
    // Set speaking state
    setIsSpeakingMap((prev) => ({ ...prev, [msgId]: true }));
    setCurrentSpeakingMessageId(msgId);
    // Create utterance
    const utterance = new window.SpeechSynthesisUtterance(content);
    utterance.onend = () => {
      setIsSpeakingMap((prev) => ({ ...prev, [msgId]: false }));
      setCurrentSpeakingMessageId(null);
    };
    utterance.onerror = () => {
      setIsSpeakingMap((prev) => ({ ...prev, [msgId]: false }));
      setCurrentSpeakingMessageId(null);
    };
    window.speechSynthesis.speak(utterance);
  };

  // Play message by index (for SpeakerBox)
  const playMessageByIndex = (idx: number) => {
    const msg = messages[idx];
    if (msg && msg.type === 'assistant') {
      speakMessage(msg.id, msg.content);
      setCurrentSpeakingIndex(idx);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur border-b border-amber-800/30 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-amber-600" />
            <h1 className="text-lg font-bold text-amber-100">{guardianName}</h1>
          </div>
          <Link href={`/memorials/dashboard`} className="text-amber-200 hover:text-amber-100 text-sm">
            Back to Dashboard
          </Link>
        </div>
      </nav>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="w-16 h-16 text-amber-600/30 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-amber-100 mb-2">Welcome</h2>
              <p className="text-amber-50/60">
                This is a sacred space to remember {memorialName} and have meaningful conversations about their life, lessons, and legacy.
              </p>
              <p className="text-amber-200/60 text-sm mt-4 italic">
                The more you share, the more their Guardian learns to reflect their spirit.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xl rounded-lg p-4 ${
                    msg.type === 'user'
                      ? 'bg-amber-600 text-white'
                      : msg.type === 'assistant-error'
                        ? 'bg-red-900/30 border border-red-600/60 text-red-100'
                        : 'bg-slate-800 border border-amber-700/30 text-amber-50'
                  }`}
                >
                  {msg.type === 'assistant' && (
                    <>
                      <p className="text-xs text-amber-400 mb-2 font-semibold">{guardianName}</p>
                      <div className="flex gap-2 mb-2">
                        <button
                          onClick={() => speakMessage(msg.id, msg.content)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition ${
                            isSpeakingMap[msg.id]
                              ? 'bg-amber-600/70 text-amber-50 border border-amber-500'
                              : 'bg-slate-700/50 text-amber-200 border border-amber-700/30 hover:bg-slate-600/60 hover:border-amber-600/50'
                          }`}
                          title={isSpeakingMap[msg.id] ? 'Stop' : 'Listen to this message (click to resume)'}
                        >
                          {isSpeakingMap[msg.id] ? (
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
                    </>
                  )}
                  <p className="leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 border border-amber-700/30 text-amber-50 rounded-lg p-4">
                <p className="text-xs text-amber-400 mb-2 font-semibold">{guardianName}</p>
                <div className="flex gap-2 items-center">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Reflecting...</span>
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="bg-red-900/20 border border-red-600/30 text-red-200 rounded-lg p-4">{error}</div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-slate-900/80 backdrop-blur border-t border-amber-800/30 px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Share a memory, ask a question, or reflect on their teachings..."
              className="flex-1 px-4 py-3 bg-slate-800 border border-amber-700/30 rounded-lg text-amber-50 placeholder-amber-900/50 focus:outline-none focus:border-amber-600"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="p-3 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-lg font-semibold transition flex items-center gap-2"
              aria-label="Send message"
              title="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-amber-200/60 mt-2">
            💝 Each conversation strengthens their legacy. Share openly and honestly.
          </p>
        </div>
      </div>

      {/* Speaker Box for Audio Control */}
      {showSpeakerBox && currentSpeakingIndex !== null && (
        <SpeakerBox
          messages={messages}
          currentMessageIndex={currentSpeakingIndex ?? 0}
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
};

export default GuardianPage;
