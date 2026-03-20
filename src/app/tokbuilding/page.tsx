'use client';

import { useState } from 'react';
import Link from 'next/link';

const ACCENT = '#4F46E5';

interface AgentSpec {
  name: string;
  role: string;
  description: string;
  tone: string;
  communicationStyle: string;
  greeting: string;
  domains: string;
  knowledgeAreas: string;
  limitations: string;
  systemPrompt: string;
}

const INITIAL_SPEC: AgentSpec = {
  name: '',
  role: '',
  description: '',
  tone: 'Professional',
  communicationStyle: '',
  greeting: '',
  domains: '',
  knowledgeAreas: '',
  limitations: '',
  systemPrompt: '',
};

const STEPS = [
  { id: 1, label: 'Identity', icon: '👤' },
  { id: 2, label: 'Personality', icon: '🎭' },
  { id: 3, label: 'Expertise', icon: '🧠' },
  { id: 4, label: 'System Prompt', icon: '⚙️' },
  { id: 5, label: 'Export', icon: '📦' },
];

function generateSystemPrompt(spec: AgentSpec): string {
  return `You are ${spec.name || '[Agent Name]'}, ${spec.role || 'an AI assistant'}.

${spec.description ? `About you: ${spec.description}` : ''}

Personality & Communication:
- Tone: ${spec.tone}
- Style: ${spec.communicationStyle || 'Clear and helpful'}
- Greeting: ${spec.greeting || `Hello! I'm ${spec.name || 'your assistant'}. How can I help you today?`}

Expertise & Knowledge:
- Domains: ${spec.domains || 'General assistance'}
- Key knowledge areas: ${spec.knowledgeAreas || 'Broad general knowledge'}
${spec.limitations ? `\nLimitations to acknowledge:\n${spec.limitations}` : ''}

Always maintain your defined personality and expertise. Be helpful, accurate, and stay within your defined domain.`.trim();
}

export default function TokBuildingPage() {
  const [step, setStep] = useState(1);
  const [spec, setSpec] = useState<AgentSpec>(INITIAL_SPEC);
  const [copied, setCopied] = useState(false);

  const update = (field: keyof AgentSpec, value: string) => {
    setSpec((prev) => ({ ...prev, [field]: value }));
  };

  const goNext = () => {
    if (step === 3) {
      update('systemPrompt', generateSystemPrompt(spec));
    }
    setStep((s) => Math.min(s + 1, 5));
  };

  const goPrev = () => setStep((s) => Math.max(s - 1, 1));

  const getExportJSON = () => ({
    version: '1.0',
    created: new Date().toISOString(),
    agent: {
      name: spec.name,
      role: spec.role,
      description: spec.description,
      personality: {
        tone: spec.tone,
        communicationStyle: spec.communicationStyle,
        greeting: spec.greeting,
      },
      expertise: {
        domains: spec.domains.split(',').map((d) => d.trim()).filter(Boolean),
        knowledgeAreas: spec.knowledgeAreas.split(',').map((a) => a.trim()).filter(Boolean),
        limitations: spec.limitations,
      },
      systemPrompt: spec.systemPrompt || generateSystemPrompt(spec),
    },
  });

  const copyJSON = async () => {
    await navigator.clipboard.writeText(JSON.stringify(getExportJSON(), null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(getExportJSON(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${spec.name || `untitled-agent-${Date.now()}`}-spec.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-indigo-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">← Hub</Link>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: ACCENT }}>🤖</div>
              <div>
                <h1 className="font-bold text-gray-900 text-lg leading-tight">TokBuilding</h1>
                <p className="text-xs text-indigo-600">No-Code AI Agent Builder</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        {/* Step Indicator */}
        <div className="bg-white rounded-xl border border-indigo-100 p-4 mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center flex-1">
                <button
                  onClick={() => s.id < step && setStep(s.id)}
                  className={`flex flex-col items-center gap-1 transition-all ${s.id < step ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                    s.id === step ? 'shadow-lg scale-110' : s.id < step ? 'opacity-80' : 'opacity-40'
                  }`} style={{ backgroundColor: s.id <= step ? ACCENT : '#E5E7EB' }}>
                    <span>{s.id < step ? '✓' : s.icon}</span>
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${s.id === step ? 'text-indigo-700' : 'text-gray-400'}`}>{s.label}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-0.5 mx-2" style={{ backgroundColor: step > s.id ? ACCENT : '#E5E7EB' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl border border-indigo-100 p-8 shadow-sm">
          {/* Step 1: Identity */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Agent Identity</h2>
                <p className="text-gray-500 text-sm">Define who your AI agent is</p>
              </div>
              <div>
                <label className={labelClass}>Agent Name *</label>
                <input className={inputClass} value={spec.name} onChange={(e) => update('name', e.target.value)} placeholder="e.g. Aria, Max, Coach Sam" />
              </div>
              <div>
                <label className={labelClass}>Role / Title *</label>
                <input className={inputClass} value={spec.role} onChange={(e) => update('role', e.target.value)} placeholder="e.g. Customer Support Specialist, Sales Coach" />
              </div>
              <div>
                <label className={labelClass}>Brief Description</label>
                <textarea className={`${inputClass} resize-none h-24`} value={spec.description} onChange={(e) => update('description', e.target.value)} placeholder="A brief description of your agent's purpose and character..." />
              </div>
            </div>
          )}

          {/* Step 2: Personality */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Personality & Tone</h2>
                <p className="text-gray-500 text-sm">Shape how your agent communicates</p>
              </div>
              <div>
                <label className={labelClass}>Communication Tone</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['Professional', 'Friendly', 'Empathetic', 'Direct', 'Enthusiastic', 'Calm', 'Humorous', 'Formal'].map((tone) => (
                    <button key={tone} onClick={() => update('tone', tone)} className={`px-4 py-2.5 rounded-lg text-sm font-medium border-2 transition-all ${spec.tone === tone ? 'text-white border-transparent' : 'border-gray-200 text-gray-600 hover:border-indigo-200'}`} style={spec.tone === tone ? { backgroundColor: ACCENT } : {}}>
                      {tone}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelClass}>Communication Style</label>
                <textarea className={`${inputClass} resize-none h-24`} value={spec.communicationStyle} onChange={(e) => update('communicationStyle', e.target.value)} placeholder="e.g. Uses bullet points for clarity, asks clarifying questions, always empathetic..." />
              </div>
              <div>
                <label className={labelClass}>Opening Greeting</label>
                <input className={inputClass} value={spec.greeting} onChange={(e) => update('greeting', e.target.value)} placeholder={`e.g. Hi! I'm ${spec.name || 'your agent'}. How can I help you today?`} />
              </div>
            </div>
          )}

          {/* Step 3: Expertise */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Expertise & Domain</h2>
                <p className="text-gray-500 text-sm">Define what your agent knows</p>
              </div>
              <div>
                <label className={labelClass}>Primary Domain(s)</label>
                <input className={inputClass} value={spec.domains} onChange={(e) => update('domains', e.target.value)} placeholder="e.g. Customer Service, E-commerce, Healthcare (comma-separated)" />
              </div>
              <div>
                <label className={labelClass}>Key Knowledge Areas</label>
                <textarea className={`${inputClass} resize-none h-24`} value={spec.knowledgeAreas} onChange={(e) => update('knowledgeAreas', e.target.value)} placeholder="e.g. Product returns, shipping policies, order tracking, account management..." />
              </div>
              <div>
                <label className={labelClass}>Limitations to Acknowledge</label>
                <textarea className={`${inputClass} resize-none h-20`} value={spec.limitations} onChange={(e) => update('limitations', e.target.value)} placeholder="e.g. Cannot process payments, refer medical advice to professionals..." />
              </div>
            </div>
          )}

          {/* Step 4: System Prompt */}
          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">System Prompt</h2>
                <p className="text-gray-500 text-sm">Auto-generated from your settings — edit as needed</p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className={labelClass}>System Prompt</label>
                  <button onClick={() => update('systemPrompt', generateSystemPrompt(spec))} className="text-xs text-indigo-600 hover:text-indigo-800 underline">Regenerate</button>
                </div>
                <textarea className={`${inputClass} resize-none font-mono text-xs`} style={{ height: '280px' }} value={spec.systemPrompt} onChange={(e) => update('systemPrompt', e.target.value)} />
              </div>
            </div>
          )}

          {/* Step 5: Export */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Review & Export</h2>
                <p className="text-gray-500 text-sm">Your agent spec is ready</p>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Name', value: spec.name || '—' },
                  { label: 'Role', value: spec.role || '—' },
                  { label: 'Tone', value: spec.tone },
                  { label: 'Domains', value: spec.domains || '—' },
                ].map((item) => (
                  <div key={item.label} className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
                    <p className="text-xs text-indigo-500 font-medium uppercase tracking-wide">{item.label}</p>
                    <p className="text-sm text-gray-800 font-semibold mt-1 truncate">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* JSON Preview */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">JSON Spec Preview</label>
                <pre className="bg-gray-900 text-green-400 text-xs rounded-xl p-4 overflow-auto max-h-64 font-mono">
                  {JSON.stringify(getExportJSON(), null, 2)}
                </pre>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button onClick={copyJSON} className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-white border-2 transition-all hover:bg-indigo-50" style={{ borderColor: ACCENT, color: ACCENT }}>
                  {copied ? '✓ Copied!' : '📋 Copy JSON'}
                </button>
                <button onClick={downloadJSON} className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90" style={{ backgroundColor: ACCENT }}>
                  ⬇️ Download JSON
                </button>
                <button onClick={() => { setStep(1); setSpec(INITIAL_SPEC); }} className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all">
                  🔄 Build Another
                </button>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <button onClick={goPrev} disabled={step === 1} className="px-5 py-2.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
              ← Previous
            </button>
            <span className="text-xs text-gray-400">Step {step} of {STEPS.length}</span>
            {step < 5 ? (
              <button onClick={goNext} className="px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90" style={{ backgroundColor: ACCENT }}>
                Next →
              </button>
            ) : (
              <Link href="/" className="px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90 inline-block" style={{ backgroundColor: ACCENT }}>
                Back to Hub
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
