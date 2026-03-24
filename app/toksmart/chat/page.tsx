'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  getSpeechRecognitionAPI,
  type SpeechRecognitionErrorEventLike,
  type SpeechRecognitionEventLike,
  type SpeechRecognitionLike,
} from '@/lib/browser-speech';

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
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isVoiceAvailable, setIsVoiceAvailable] = useState(false);
  const [showRouting, setShowRouting] = useState(false);
  const [routingMessage, setRoutingMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = getSpeechRecognitionAPI(window);
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: SpeechRecognitionEventLike) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            setInputValue((prev) => prev + transcript);
          }
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEventLike) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      setIsVoiceAvailable(true);
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setInputValue('');
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const speakMessage = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const reasonsForSelection = {
    'scholar-gpt': 'Scholar GPT selected because academic topics need structured learning guidance',
    'claude': 'Claude selected because this question requires deep reasoning and analysis',
    'chatgpt': 'ChatGPT selected because this needs creative, conversational thinking',
    'gemini': 'Gemini selected because this question needs comprehensive research & wide knowledge',
  };

  const getReasonForSelection = (model: string): string => {
    return reasonsForSelection[model as keyof typeof reasonsForSelection] || 'AI selected based on question type';
  };

  const otherAIs = {
    'scholar-gpt': ['claude', 'gemini'],
    'claude': ['scholar-gpt', 'chatgpt', 'gemini'],
    'chatgpt': ['claude', 'gemini'],
    'gemini': ['claude', 'scholar-gpt'],
  };

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

    const userQuestion = inputValue;
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userQuestion,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    // Detect AI model based on question
    const detectedAI = detectAIModel(userQuestion);
    setSelectedAI(detectedAI);

    // Show routing message with animation
    setShowRouting(true);
    setRoutingMessage(`Analyzing your question… Routing to ${getAIDisplayName(detectedAI)}`);

    // Wait 1 second to show the routing
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowRouting(false);

    try {
      const response = await fetch('/api/toksmart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userQuestion,
          aiModel: detectedAI,
        }),
      });

      const data = await response.json();
      const responseText = data.response || 'Sorry, I could not process that question.';

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        aiModel: detectedAI,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Speak the response
      if (voiceEnabled) {
        speakMessage(responseText);
      }
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

  const handleTryAlternative = async (alternativeAI: string) => {
    if (!messages.length) return;

    // Get the last user message
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (!lastUserMessage) return;

    setSelectedAI(alternativeAI);
    setLoading(true);

    // Show routing message
    setShowRouting(true);
    setRoutingMessage(`Getting another perspective from ${getAIDisplayName(alternativeAI)}`);

    await new Promise(resolve => setTimeout(resolve, 800));
    setShowRouting(false);

    try {
      const response = await fetch('/api/toksmart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: lastUserMessage.content,
          aiModel: alternativeAI,
        }),
      });

      const data = await response.json();
      const responseText = data.response || 'Sorry, I could not process that question.';

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        aiModel: alternativeAI,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (voiceEnabled) {
        speakMessage(responseText);
      }
    } catch (error) {
      console.error('Error:', error);
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
        <div className="flex items-center space-x-4">
          {isSpeaking && <span className="text-pink-300 text-sm animate-pulse">🔊 Speaking...</span>}
          {isVoiceAvailable && (
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                voiceEnabled
                  ? 'bg-pink-500 text-white hover:bg-pink-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {voiceEnabled ? '🔊 Voice ON' : '🔇 Voice OFF'}
            </button>
          )}
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

        {messages.map((message, index) => {
          const isLastMessage = index === messages.length - 1;
          const isAssistantMessage = message.role === 'assistant';
          const alternatives = isAssistantMessage && message.aiModel 
            ? otherAIs[message.aiModel as keyof typeof otherAIs] || []
            : [];

          return (
            <div key={message.id}>
              <div
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

              {/* Show reason for selection after assistant message */}
              {isAssistantMessage && message.aiModel && (
                <div className="flex justify-start mt-2">
                  <p className="text-xs text-white/70 italic px-4">
                    ✨ {getReasonForSelection(message.aiModel)}
                  </p>
                </div>
              )}

              {/* Show alternative perspective buttons after last assistant message */}
              {isLastMessage && isAssistantMessage && alternatives.length > 0 && (
                <div className="flex justify-start mt-3 gap-2 flex-wrap">
                  <p className="text-xs text-white/60 w-full">🚀 Want another perspective?</p>
                  {alternatives.map((alt) => (
                    <button
                      key={alt}
                      onClick={() => handleTryAlternative(alt)}
                      disabled={loading}
                      className="text-xs px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white transition disabled:opacity-50"
                    >
                      Try {getAIDisplayName(alt)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {showRouting && (
          <div className="flex justify-start">
            <div className="bg-pink-500/30 border border-pink-400 backdrop-blur rounded-lg p-4 text-white animate-pulse">
              <p className="text-sm font-semibold">{routingMessage}</p>
            </div>
          </div>
        )}

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
          {isVoiceAvailable && (
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              disabled={loading}
              className={`px-4 py-3 rounded-lg font-bold transition ${
                isListening
                  ? 'bg-red-500 text-white hover:bg-red-600 animate-pulse'
                  : 'bg-white/20 text-white hover:bg-white/30'
              } disabled:opacity-50`}
              title={isListening ? 'Stop listening' : 'Start listening'}
            >
              {isListening ? '🎤 Listening...' : '🎤'}
            </button>
          )}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything..."
            disabled={loading}
            className="flex-1 bg-white/20 backdrop-blur border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50 text-sm"
          />
          <button
            type="submit"
            disabled={loading || !inputValue.trim()}
            className="bg-white text-purple-600 font-bold py-3 px-4 rounded-lg hover:bg-purple-50 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            title="Send message"
          >
            ↪️
          </button>
        </form>
      </div>
    </div>
  );
}
