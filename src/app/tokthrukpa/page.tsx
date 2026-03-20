'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { AGENTS } from '@/lib/agents';

const VoiceChat = dynamic(() => import('@/components/VoiceChat'), { ssr: false });

const ACCENT = '#EA580C';

export default function TokThruKPAPage() {
  const agent = AGENTS['HATATA'];

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-orange-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-orange-600 hover:text-orange-800 text-sm font-medium flex items-center gap-1">
              ← Hub
            </Link>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: ACCENT }}>🛡️</div>
              <div>
                <h1 className="font-bold text-gray-900 text-lg leading-tight">TokThru / KPA</h1>
                <p className="text-xs text-orange-600">Personal Safety &amp; Crisis Support</p>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              HATÄTA Active
            </span>
          </div>
        </div>
      </header>

      {/* Emergency Banner */}
      <div className="bg-red-600 text-white text-center py-2 px-4 text-xs font-medium">
        🚨 For life-threatening emergencies, always call 911 first. This AI provides support guidance only.
      </div>

      {/* Feature Pills */}
      <div className="bg-white border-b border-orange-100">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3 overflow-x-auto">
          {['🚨 Emergency Coaching', '🧘 De-escalation', '🛡️ Safety Planning', '📞 Crisis Resources', '💬 Peer Support'].map((f) => (
            <span key={f} className="flex-shrink-0 text-xs bg-orange-50 text-orange-700 border border-orange-200 rounded-full px-3 py-1">{f}</span>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6 flex gap-6">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col gap-4 w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-orange-100 p-5 shadow-sm">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3 mx-auto" style={{ backgroundColor: ACCENT }}>H</div>
            <h3 className="font-bold text-gray-900 text-center">HATÄTA</h3>
            <p className="text-xs text-gray-500 text-center mt-1">{agent.description}</p>
          </div>

          <div className="bg-white rounded-xl border border-orange-100 p-4 shadow-sm">
            <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Guidance Topics</h4>
            <div className="space-y-2">
              {[
                'I need help staying calm',
                'Safety planning guide',
                'De-escalation techniques',
                'Breathing exercises',
                'Emergency contacts list',
              ].map((topic) => (
                <button key={topic} className="w-full text-left text-xs text-orange-700 bg-orange-50 hover:bg-orange-100 rounded-lg px-3 py-2 transition-colors">
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-orange-600 rounded-xl p-4 text-white">
            <h4 className="font-semibold text-sm mb-2">📞 Crisis Lines</h4>
            <div className="space-y-1 text-xs text-orange-100">
              <p>988 Suicide &amp; Crisis Lifeline</p>
              <p>Crisis Text: Text HOME to 741741</p>
              <p>National DV Hotline: 1-800-799-7233</p>
            </div>
          </div>
        </aside>

        {/* Chat */}
        <div className="flex-1 bg-white rounded-xl border border-orange-100 shadow-sm overflow-hidden flex flex-col" style={{ minHeight: '600px' }}>
          <VoiceChat agent={agent} accentColor={ACCENT} placeholder="Speak with HATÄTA about safety, crisis support, de-escalation..." />
        </div>
      </main>
    </div>
  );
}
