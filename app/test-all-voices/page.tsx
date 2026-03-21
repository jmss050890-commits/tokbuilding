'use client';

import { useState } from 'react';
import { AGENTS } from '@/lib/lib/lib/agents';

export default function TestAllVoices() {
  const [testMessage] = useState('Hi there, this is how I sound. I want you to know that I am here to support you.');
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);

  const speak = (agentSlug: string) => {
    const agent = AGENTS[agentSlug];
    if (!agent) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(testMessage);
    
    const voices = window.speechSynthesis.getVoices();
    console.log(`\n=== Testing ${agent.name} ===`);
    console.log(`Voice Name: ${agent.voiceName}`);
    console.log(`Voice Gender: ${agent.voiceGender}`);
    console.log(`Pitch: ${agent.voicePitch}`);
    console.log(`Rate: ${agent.voiceRate}`);
    console.log(`Available voices:`, voices.map(v => v.name).join(', '));

    let selectedVoice: SpeechSynthesisVoice | undefined;

    // Try explicit voice name first
    if (agent.voiceName) {
      selectedVoice = voices.find(voice => 
        voice.name.toLowerCase() === agent.voiceName?.toLowerCase()
      );
      console.log(`Exact match for "${agent.voiceName}": ${selectedVoice ? 'FOUND' : 'NOT FOUND'}`);
    }

    // Try common voice names
    if (!selectedVoice && agent.voiceGender) {
      if (agent.voiceGender === "female") {
        const femaleVoiceNames = [
          "Microsoft Zira",
          "Samantha",
          "Victoria",
          "Moira",
          "Karen",
          "Fiona",
        ];
        
        selectedVoice = femaleVoiceNames
          .map(name => {
            const found = voices.find(v => v.name.includes(name));
            if (found) console.log(`✓ Found female voice: ${found.name}`);
            return found;
          })
          .find(v => v);
      } else {
        const maleVoiceNames = [
          "Microsoft David",
          "Daniel",
          "Alex",
          "Aaron",
          "Tom",
        ];
        
        selectedVoice = maleVoiceNames
          .map(name => {
            const found = voices.find(v => v.name.includes(name));
            if (found) console.log(`✓ Found male voice: ${found.name}`);
            return found;
          })
          .find(v => v);
      }
    }

    // Final fallback
    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang?.includes("en-US"));
      console.log(`Fallback to: ${selectedVoice?.name}`);
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      console.log(`✅ Using voice: ${selectedVoice.name}`);
    } else {
      console.log(`❌ No voice found!`);
    }

    utterance.rate = agent.voiceRate || 1;
    utterance.pitch = agent.voicePitch || 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(agentSlug);
    utterance.onend = () => setIsSpeaking(null);
    utterance.onerror = () => setIsSpeaking(null);

    window.speechSynthesis.speak(utterance);
  };

  const agents = [
    { slug: 'grace', name: 'Grace', color: 'bg-pink-600' },
    { slug: 'a1', name: 'A1', color: 'bg-blue-600' },
    { slug: 'hatata', name: 'HATÄTA', color: 'bg-purple-600' },
    { slug: 'wisdom', name: 'Wisdom', color: 'bg-emerald-600' },
    { slug: 'coach-daniels', name: 'Coach Daniels', color: 'bg-orange-600' },
    { slug: 'tokseo', name: 'TokSEO', color: 'bg-indigo-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-2">🎤 Test All Agent Voices</h1>
        <p className="text-white/60 mb-8">Click each button to hear how agents sound. Check browser console (F12) for voice details.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map(agent => {
            const config = AGENTS[agent.slug];
            return (
              <div key={agent.slug} className="bg-white/5 border border-white/20 rounded-lg p-6 hover:bg-white/10 transition">
                <h2 className="text-2xl font-bold text-white mb-2">{config.name}</h2>
                <div className="space-y-2 mb-6 text-sm text-white/70">
                  <p><span className="text-white/90">Gender:</span> {config.voiceGender || 'unspecified'}</p>
                  <p><span className="text-white/90">Voice:</span> {config.voiceName || 'default'}</p>
                  <p><span className="text-white/90">Pitch:</span> {config.voicePitch || 1}</p>
                  <p><span className="text-white/90">Rate:</span> {config.voiceRate || 1}</p>
                </div>
                <button
                  onClick={() => speak(agent.slug)}
                  disabled={isSpeaking === agent.slug}
                  className={`w-full py-3 rounded-lg font-bold transition ${
                    isSpeaking === agent.slug
                      ? `${agent.color} opacity-60`
                      : `${agent.color} hover:opacity-90`
                  }`}
                >
                  {isSpeaking === agent.slug ? '🔊 Speaking...' : 'Test Voice'}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">💡 Troubleshooting</h3>
          <ol className="text-white/80 space-y-2">
            <li>1. <span className="text-white">Open browser console: Press F12</span></li>
            <li>2. Click each agent button and check console output</li>
            <li>3. Look for <span className="text-green-400">✓ FOUND</span> or <span className="text-red-400">NOT FOUND</span></li>
            <li>4. Copy the exact voice name that was found and used</li>
            <li>5. If Grace/Wisdom still sound male, the female voice isn't available on your system</li>
          </ol>
        </div>

        <div className="mt-8 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">⚠️ Common Issues</h3>
          <ul className="text-white/80 space-y-2">
            <li>• <span className="text-white">Microsoft Zira not found?</span> Your system may not have it installed. Check available voices in console.</li>
            <li>• <span className="text-white">Still hearing male voice?</span> Share console output and I'll find the right voice name for your system.</li>
            <li>• <span className="text-white">No voice at all?</span> Check browser permissions or try refreshing the page.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
