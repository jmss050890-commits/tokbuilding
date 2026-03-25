'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Shield, Play, Pause, Mic } from 'lucide-react';
import Link from 'next/link';
import { useWelcomeAudio } from '@/lib/useWelcomeAudio';
import SpeakerBox from '@/app/components/SpeakerBox';
import { useSiteCopy, useSiteLanguage } from '@/app/components/SiteLanguageControl';
import {
  getSpeechRecognitionAPI,
  type SpeechRecognitionEventLike,
  type SpeechRecognitionLike,
} from '@/lib/browser-speech';

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'assistant-error' | 'intro';
  content: string;
}

export default function MrKPAAgent() {
  const copy = useSiteCopy();
  const { language } = useSiteLanguage();
  const routeCopy = copy.mrKpaAgent;
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'assistant',
      content: routeCopy.welcomeMessage,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentSpeakingMessageId, setCurrentSpeakingMessageId] = useState<string | null>(null);
  const [isSpeakingMap, setIsSpeakingMap] = useState<Record<string, boolean>>({});
  const [currentSpeakingIndex, setCurrentSpeakingIndex] = useState<number | null>(null);
  const [showSpeakerBox, setShowSpeakerBox] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [promptRotationIndex, setPromptRotationIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  // Welcome audio on mount
  const welcomeMessage = routeCopy.audioWelcome;
  useWelcomeAudio(welcomeMessage, true, {
    rate: 0.8, // Founder authority - deliberate, decisive
    pitch: 0.76, // Deep male voice for command presence
    volume: 0.8,
    voiceGender: 'male',
  });

  // Load voices on mount and when voices change
  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      return;
    }

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

  const quickPrompts = routeCopy.quickPrompts;

  const visiblePrompts = Array.from({ length: 3 }, (_, index) => {
    const promptIndex = (promptRotationIndex + index) % quickPrompts.length;
    return quickPrompts[promptIndex];
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const speakMessage = async (messageId: string, text: string) => {
    if (!("speechSynthesis" in window)) {
      return;
    }

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
      const response = await fetch('/api/mr-kpa/chat', {
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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 flex flex-col">
      {/* Header */}
      <div className="border-b border-blue-800/30 bg-slate-900/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white fill-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-blue-100 sm:text-xl">{routeCopy.title}</h1>
                <p className="text-blue-200/60 text-xs">{routeCopy.subtitle}</p>
              </div>
            </div>

            <div className="flex w-full justify-end gap-3 text-sm sm:w-auto">
              <Link href="/agent" className="text-blue-200 hover:text-blue-100 transition">
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
            <div className={`max-w-full sm:max-w-2xl ${message.type === 'user' ? '' : 'group'}`}>
              <div
                className={`rounded-2xl px-4 py-4 sm:px-6 ${
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
                <div className="mt-2 flex gap-2 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
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
            <div className="max-w-full rounded-2xl px-4 py-4 sm:max-w-2xl sm:px-6 bg-slate-800/60 border border-blue-700/30">
              <div className="flex items-center gap-2 text-blue-200">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">{routeCopy.loadingLabel}</span>
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
            <p className="text-xs text-blue-200/70">{routeCopy.quickPromptsLabel}</p>
            <div className="flex gap-2 flex-wrap">
              {visiblePrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handlePromptClick(prompt)}
                  className="px-3 py-1.5 rounded text-xs bg-slate-800 border border-blue-700/50 text-blue-200 hover:border-blue-600/60 hover:bg-slate-700/60 transition"
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
              placeholder={routeCopy.placeholder}
              className="min-h-14 max-h-32 flex-1 px-4 py-3 bg-slate-800 border border-blue-700/50 text-blue-50 placeholder-blue-200/40 rounded-lg focus:outline-none focus:border-blue-600/80 focus:ring-1 focus:ring-blue-600/30 resize-y"
              rows={2}
            />
            <div className="flex flex-col gap-3 sm:flex-row md:flex-shrink-0">
              <button
                onClick={toggleMic}
                disabled={loading}
                className={`w-full px-4 py-3 font-bold rounded-lg transition flex items-center justify-center gap-2 border sm:w-auto ${
                  isListening
                    ? 'bg-blue-500 text-white border-blue-300 shadow-[0_0_18px_rgba(59,130,246,0.45)]'
                    : 'bg-slate-800 text-blue-200 border-blue-700/50 hover:border-blue-500/80 hover:bg-slate-700/70'
                }`}
              >
                <Mic className="w-4 h-4" />
                {isListening ? copy.guardianChat.listeningButton : copy.guardianChat.speakButton}
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2 sm:w-auto"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Send
              </button>
            </div>
          </div>

          <p className="text-xs text-blue-200/50 text-center">
            {routeCopy.footer}
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
