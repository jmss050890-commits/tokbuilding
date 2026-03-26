'use client';

import Link from 'next/link';
import { useSiteCopy } from '@/app/components/SiteLanguageControl';

export default function TokSmartHub() {
  const copy = useSiteCopy();
  const pageCopy = (copy as any).toksmartPage || {
    title: "TokSmart",
    subtitle: "Your AI Study & Success Partner",
    heroTitle: "TokSmart",
    dedicationTitle: "Dedicated to McKenzie",
    dedicationBody: "TokSmart is built to honor dedication and commitment to education and personal growth.",
    coreFeatures: []
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
      {/* Header */}
      <nav className="flex justify-between items-center p-6 bg-black/20 backdrop-blur-sm">
        <h1 className="text-3xl font-bold">{pageCopy.title}</h1>
        <div className="space-x-4">
          <Link href="/" className="hover:text-purple-200 transition">{copy.common?.back || 'Home'}</Link>
          <Link href="/vcc-hub" className="hover:text-purple-200 transition">VCC Hub</Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* McKenzie Dedication */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-12 border border-white/20">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">✨ {pageCopy.dedicationTitle} ✨</h2>
            <p className="text-xl italic mb-6">
              {pageCopy.dedicationBody}
            </p>
          </div>
        </div>

        {/* Main Title & Description */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">{pageCopy.subtitle}</h2>
          <p className="text-xl mb-8">
            {pageCopy.heroDescription}
          </p>
        </div>

        {/* Core Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {pageCopy.coreFeatures?.map((feature: any, idx: number) => (
            <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition">
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* AI Models Section */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-8">Your AI Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-500/30 backdrop-blur rounded-lg p-6 text-center border border-blue-400">
              <div className="text-4xl mb-2">📖</div>
              <h4 className="font-bold mb-2">Scholar GPT</h4>
              <p className="text-sm">Academic research & study help</p>
            </div>
            <div className="bg-green-500/30 backdrop-blur rounded-lg p-6 text-center border border-green-400">
              <div className="text-4xl mb-2">🔍</div>
              <h4 className="font-bold mb-2">Gemini</h4>
              <p className="text-sm">Comprehensive research & insights</p>
            </div>
            <div className="bg-orange-500/30 backdrop-blur rounded-lg p-6 text-center border border-orange-400">
              <div className="text-4xl mb-2">💬</div>
              <h4 className="font-bold mb-2">ChatGPT</h4>
              <p className="text-sm">Conversation & creative writing</p>
            </div>
            <div className="bg-purple-500/30 backdrop-blur rounded-lg p-6 text-center border border-purple-400">
              <div className="text-4xl mb-2">🧠</div>
              <h4 className="font-bold mb-2">Claude</h4>
              <p className="text-sm">Deep analysis & complex reasoning</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/toksmart/chat"
            className="inline-block bg-white text-purple-600 font-bold py-4 px-8 rounded-lg hover:bg-purple-50 transition text-lg"
          >
            Start Asking Questions →
          </Link>
        </div>
      </div>
    </div>
  );
}
