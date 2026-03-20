'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import VoiceControls from './VoiceControls';
import { Agent } from '@/lib/agents';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface VoiceChatProps {
  agent: Agent;
  accentColor: string;
  placeholder?: string;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: ((event: Event) => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition: new () => SpeechRecognitionInstance;
  }
}

export default function VoiceChat({ agent, accentColor, placeholder = 'Type a message...' }: VoiceChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakerEnabled, setSpeakerEnabled] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    const savedKey = localStorage.getItem('vcc_api_key');
    if (savedKey) setApiKey(savedKey);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speak = useCallback((text: string) => {
    if (!speakerEnabled || typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = agent.voice;
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, [speakerEnabled, agent.voice]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;
    if (!apiKey) {
      setError('Please enter your Anthropic API key to continue.');
      return;
    }

    const userMessage: Message = { role: 'user', content: content.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({ role: m.role, content: m.content })),
          systemPrompt: agent.systemPrompt,
          apiKey,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to get response');

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      speak(data.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  }, [messages, apiKey, agent.systemPrompt, isLoading, speak]);

  const startListening = useCallback(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      setError('Speech recognition is not supported in your browser.');
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      sendMessage(transcript);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [sendMessage]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const handleToggleMic = () => {
    if (isListening) stopListening();
    else startListening();
  };

  const handleToggleSpeaker = () => {
    if (isSpeaking) window.speechSynthesis.cancel();
    setSpeakerEnabled((prev) => !prev);
  };

  const saveApiKey = () => {
    localStorage.setItem('vcc_api_key', apiKey);
    setShowApiKey(false);
    setError('');
  };

  return (
    <div className="flex flex-col h-full">
      {/* API Key Bar */}
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 flex items-center gap-3">
        <span className="text-xs text-gray-500 font-medium">API Key:</span>
        {showApiKey ? (
          <div className="flex items-center gap-2 flex-1">
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-ant-..."
              className="flex-1 text-xs border border-gray-300 rounded px-2 py-1 font-mono focus:outline-none focus:ring-1"
            />
            <button
              onClick={saveApiKey}
              className="text-xs text-white px-3 py-1 rounded font-medium"
              style={{ backgroundColor: accentColor }}
            >
              Save
            </button>
            <button onClick={() => setShowApiKey(false)} className="text-xs text-gray-500 hover:text-gray-700">Cancel</button>
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-1">
            <span className="text-xs text-gray-700 font-mono">
              {apiKey ? `${apiKey.slice(0, 8)}...${apiKey.slice(-4)}` : 'Not set'}
            </span>
            <button
              onClick={() => setShowApiKey(true)}
              className="text-xs underline"
              style={{ color: accentColor }}
            >
              {apiKey ? 'Change' : 'Set Key'}
            </button>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 py-12">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white text-2xl font-bold" style={{ backgroundColor: accentColor }}>
              {agent.name[0]}
            </div>
            <p className="text-lg font-medium text-gray-600">Chat with {agent.name}</p>
            <p className="text-sm mt-1">{agent.description}</p>
            <p className="text-xs mt-4">Type a message or use the mic button to speak</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0 mt-1" style={{ backgroundColor: accentColor }}>
                {agent.name[0]}
              </div>
            )}
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'text-white rounded-br-sm'
                  : 'bg-gray-100 text-gray-800 rounded-bl-sm'
              }`}
              style={msg.role === 'user' ? { backgroundColor: accentColor } : {}}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0 mt-1" style={{ backgroundColor: accentColor }}>
              {agent.name[0]}
            </div>
            <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2 rounded-lg">
            {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <VoiceControls
            isListening={isListening}
            isSpeaking={isSpeaking}
            onToggleMic={handleToggleMic}
            onToggleSpeaker={handleToggleSpeaker}
            speakerEnabled={speakerEnabled}
            accentColor={accentColor}
          />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
            placeholder={placeholder}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={isLoading || !input.trim()}
            className="p-2 rounded-xl text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: accentColor }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
