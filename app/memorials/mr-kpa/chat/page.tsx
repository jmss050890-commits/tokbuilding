'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Heart, Send, Loader } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function MrKpaChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [initialGreeting, setInitialGreeting] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial greeting from Mr. KPA
  useEffect(() => {
    if (initialGreeting) {
      const greeting: Message = {
        id: 'greeting-' + Date.now(),
        role: 'assistant',
        content: "Hello. I'm Mr. KPA - your strategic advisor and partner in the Keep People Alive mission. What's on your mind today?",
        timestamp: new Date(),
      };
      setMessages([greeting]);
      setInitialGreeting(false);
    }
  }, [initialGreeting]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: 'user-' + Date.now(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call Mr. KPA chat API
      const response = await fetch('/api/memorials/mr-kpa/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputValue,
          conversationId: null, // Would track conversation chain
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage: Message = {
          id: 'assistant-' + Date.now(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);

        // Show receipt option if one was generated
        if (data.receiptGenerated) {
          console.log('Receipt generated:', data.receiptId);
        }
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: 'error-' + Date.now(),
        role: 'assistant',
        content: "I apologize, I'm having trouble connecting right now. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur border-b border-blue-800/30 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-blue-600" />
            <h1 className="text-lg font-bold text-blue-100">
              Mr. KPA - Strategic Advisor
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/memorials/mr-kpa/receipts"
              className="text-blue-300 hover:text-blue-200 text-sm font-semibold"
            >
              View Receipts
            </Link>
            <Link
              href="/memorials/dashboard"
              className="text-blue-300 hover:text-blue-200 text-sm"
            >
              Back
            </Link>
          </div>
        </div>
      </nav>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-2xl px-6 py-4 rounded-lg ${
                  message.role === 'user'
                    ?  'bg-blue-600 text-white rounded-br-none'
                    : 'bg-slate-800 text-blue-100 rounded-bl-none border border-blue-800/40'
                }`}
              >
                <p className="leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.role === 'user' ? 'text-blue-100/70' : 'text-blue-300/60'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 text-blue-100 px-6 py-4 rounded-lg rounded-bl-none border border-blue-800/40 flex items-center gap-2">
                <Loader className="w-4 h-4 animate-spin" />
                Mr. KPA is thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-blue-800/30 bg-slate-900/40 px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Mr. KPA about strategy, decisions, the KPA mission..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-slate-800/60 border border-blue-700/30 rounded-lg text-blue-100 placeholder-blue-900/50 focus:outline-none focus:border-blue-600 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white font-bold rounded-lg transition flex items-center gap-2"
              aria-label="Send message"
              title="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <p className="text-xs text-blue-300/50 mt-2">
            Your conversations with Mr. KPA are saved as receipts for your records.
          </p>
        </div>
      </div>
    </div>
  );
}
