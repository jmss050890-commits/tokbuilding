'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { AGENTS } from '@/lib/agents';

const VoiceChat = dynamic(() => import('@/components/VoiceChat'), { ssr: false });

const ACCENT = '#0D9488';

export default function TokHealthPage() {
  const agent = AGENTS['Wisdom'];

  return (
    <div className="min-h-screen bg-teal-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-teal-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-teal-600 hover:text-teal-800 text-sm font-medium flex items-center gap-1">
              ← Hub
            </Link>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: ACCENT }}>🌿</div>
              <div>
                <h1 className="font-bold text-gray-900 text-lg leading-tight">TokHealth</h1>
                <p className="text-xs text-teal-600">AI Wellness Coaching Platform</p>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              Wisdom AI Active
            </span>
          </div>
        </div>
      </header>

      {/* Feature Pills */}
      <div className="bg-white border-b border-teal-100">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3 overflow-x-auto">
          {['🥗 Nutrition', '💪 Fitness', '🧘 Mindfulness', '😴 Sleep', '💬 Community Challenges'].map((f) => (
            <span key={f} className="flex-shrink-0 text-xs bg-teal-50 text-teal-700 border border-teal-200 rounded-full px-3 py-1">{f}</span>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6 flex gap-6">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col gap-4 w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-teal-100 p-5 shadow-sm">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3 mx-auto" style={{ backgroundColor: ACCENT }}>W</div>
            <h3 className="font-bold text-gray-900 text-center">Wisdom</h3>
            <p className="text-xs text-gray-500 text-center mt-1">{agent.description}</p>
          </div>

          <div className="bg-white rounded-xl border border-teal-100 p-4 shadow-sm">
            <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Topics to Explore</h4>
            <div className="space-y-2">
              {[
                'Create a meal plan for me',
                'Help with my fitness goals',
                'Stress management tips',
                'Improve my sleep quality',
                'Healthy recipe ideas',
              ].map((topic) => (
                <button key={topic} className="w-full text-left text-xs text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg px-3 py-2 transition-colors">
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-teal-600 rounded-xl p-4 text-white">
            <h4 className="font-semibold text-sm mb-1">🎯 Daily Challenge</h4>
            <p className="text-xs text-teal-100">Drink 8 glasses of water and take a 10-minute mindful walk today.</p>
          </div>
        </aside>

        {/* Chat */}
        <div className="flex-1 bg-white rounded-xl border border-teal-100 shadow-sm overflow-hidden flex flex-col" style={{ minHeight: '600px' }}>
          <VoiceChat agent={agent} accentColor={ACCENT} placeholder="Ask Wisdom about nutrition, health, wellness..." />
        </div>
      </main>
    </div>
  );
}
