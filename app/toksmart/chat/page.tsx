'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  aiModel?: string;
  timestamp: Date;
}

export default function TokSmartChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedAI, setSelectedAI] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectAIModel = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    // Academic/Scholar GPT keywords
    if (
      lowerQuestion.includes('essay') ||
      lowerQuestion.includes('math') ||
      lowerQuestion.includes('history') ||
      lowerQuestion.includes('study') ||
      lowerQuestion.includes('homework') ||
      lowerQuestion.includes('assignment') ||
      lowerQuestion.includes('exam') ||
      lowerQuestion.includes('research paper') ||
      lowerQuestion.includes('cite')
    ) {
      return 'scholar-gpt';
    }

    // Claude for analysis/complex reasoning
    if (
      lowerQuestion.includes('explain') ||
      lowerQuestion.includes('analyze') ||
      lowerQuestion.includes('evaluate') ||
      lowerQuestion.includes('compare') ||
      lowerQuestion.includes('contrast') ||
      lowerQuestion.includes('why') ||
      lowerQuestion.includes('how does')
    ) {
      return 'claude';
    }

    // ChatGPT for creative/conversational
    if (
      lowerQuestion.includes('write') ||
      lowerQuestion.includes('creative') ||
      lowerQuestion.includes('story') ||
      lowerQuestion.includes('poem') ||
      lowerQuestion.includes('chat') ||
      lowerQuestion.includes('help me')
    ) {
      return 'chatgpt';
    }

    // Gemini for research/comprehensive
    if (
      lowerQuestion.includes('research') ||
      lowerQuestion.includes('find') ||
      lowerQuestion.includes('what is') ||
      lowerQuestion.includes('tell me about') ||
      lowerQuestion.includes('information')
    ) {
      return 'gemini';
    }

    // Default to Claude for general questions
    return 'claude';
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    // Detect AI model based on question
    const detectedAI = detectAIModel(inputValue);
    setSelectedAI(detectedAI);

    try {
      const response = await fetch('/api/toksmart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputValue,
          aiModel: detectedAI,
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'Sorry, I could not process that question.',
        aiModel: detectedAI,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, there was an error processing your question. Please try again.',
        aiModel: detectedAI,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const getAIDisplayName = (model: string | undefined): string => {
    const modelMap: Record<string, string> = {
      'scholar-gpt': '📖 Scholar GPT',
      'claude': '🧠 Claude',
      'chatgpt': '💬 ChatGPT',
      'gemini': '🔍 Gemini',
    };
    return modelMap[model || 'claude'] || 'AI Assistant';
  };

  const getAIColor = (model: string | undefined): string => {
    const colorMap: Record<string, string> = {
      'scholar-gpt': 'bg-blue-500/20 border-blue-400',
      'claude': 'bg-purple-500/20 border-purple-400',
      'chatgpt': 'bg-orange-500/20 border-orange-400',
      'gemini': 'bg-green-500/20 border-green-400',
    };
    return colorMap[model || 'claude'] || 'bg-purple-500/20 border-purple-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col">
      {/* Header */}
      <nav className="flex justify-between items-center p-6 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div>
          <h1 className="text-3xl font-bold text-white">TokSmart Chat</h1>
          {selectedAI && <p className="text-purple-200 text-sm">Current AI: {getAIDisplayName(selectedAI)}</p>}
        </div>
        <div className="space-x-4">
          <Link href="/toksmart" className="text-white hover:text-purple-200 transition">
            Back to Hub
          </Link>
        </div>
      </nav>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-4">Welcome to TokSmart!</h2>
              <p className="text-xl mb-6">Ask any question. I'll route it to the best AI model for your needs.</p>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6 inline-block">
                <p className="text-lg">Examples:</p>
                <ul className="text-left mt-4 space-y-2">
                  <li>📖 "Help me write an essay on climate change"</li>
                  <li>🧠 "Explain quantum mechanics"</li>
                  <li>💬 "Write a creative short story"</li>
                  <li>🔍 "Research the history of AI"</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xl rounded-lg p-4 ${
                message.role === 'user'
                  ? 'bg-white text-purple-900'
                  : `${getAIColor(message.aiModel)} border text-white`
              }`}
            >
              {message.role === 'assistant' && (
                <p className="text-xs font-semibold mb-2 opacity-75">{getAIDisplayName(message.aiModel)}</p>
              )}
              <p>{message.content}</p>
              <p className="text-xs opacity-50 mt-2">{message.timestamp.toLocaleTimeString()}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-white">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="bg-black/20 backdrop-blur-sm border-t border-white/10 p-6">
        <form onSubmit={handleSendMessage} className="flex gap-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything... (essay help, research, creative writing, analysis...)"
            disabled={loading}
            className="flex-1 bg-white/20 backdrop-blur border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !inputValue.trim()}
            className="bg-white text-purple-600 font-bold py-3 px-6 rounded-lg hover:bg-purple-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
