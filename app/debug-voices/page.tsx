'use client';

import { useEffect, useState } from 'react';

interface Voice {
  name: string;
  lang: string;
}

export default function DebugVoices() {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [testText, setTestText] = useState('Hello, I am Grace. This is my natural voice.');

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices as unknown as Voice[]);
      console.log('Available voices:', availableVoices);
    };

    // Voices might not be loaded initially
    if (window.speechSynthesis.getVoices().length > 0) {
      loadVoices();
    }

    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = (voiceIndex: number) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(testText);
    
    if (voices[voiceIndex]) {
      utterance.voice = voices[voiceIndex] as unknown as SpeechSynthesisVoice;
      console.log('Speaking with voice:', voices[voiceIndex].name);
    }

    utterance.pitch = 1.2;
    utterance.rate = 0.95;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">🎤 Available Voices Debug</h1>

        <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Test Message</h2>
          <textarea
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            className="w-full bg-black/30 border border-white/20 text-white p-3 rounded mb-4"
            rows={3}
          />
          <p className="text-white/50 text-sm">Total voices available: {voices.length}</p>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {voices.map((voice, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/20 rounded p-4 hover:bg-white/10 transition"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <p className="text-white font-semibold">{voice.name}</p>
                  <p className="text-white/60 text-sm">{voice.lang}</p>
                </div>
                <button
                  onClick={() => speak(index)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded whitespace-nowrap transition"
                >
                  Test Voice
                </button>
              </div>
            </div>
          ))}
        </div>

        {voices.length === 0 && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-6 rounded">
            <p className="font-bold mb-2">⚠️ No voices found</p>
            <p>Voices may not be available. Try refreshing the page or checking your browser settings.</p>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-bold text-white mb-4">💡 Next Steps</h2>
          <ol className="text-white/80 space-y-2">
            <li>1. Find female voices in the list (usually: Victoria, Samantha, Karen, Moira, Zira)</li>
            <li>2. Click "Test Voice" to hear each one</li>
            <li>3. Copy the exact voice name of the best female voice</li>
            <li>4. Update agents.ts with that voice name</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
