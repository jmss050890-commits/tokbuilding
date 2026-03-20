'use client';

import Link from 'next/link';

export default function TokSmartHub() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
      {/* Header */}
      <nav className="flex justify-between items-center p-6 bg-black/20 backdrop-blur-sm">
        <h1 className="text-3xl font-bold">TokSmart</h1>
        <div className="space-x-4">
          <Link href="/" className="hover:text-purple-200 transition">Home</Link>
          <Link href="/vcc-hub" className="hover:text-purple-200 transition">VCC Hub</Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* McKenzie Dedication */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-12 border border-white/20">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">✨ Dedicated to McKenzie ✨</h2>
            <p className="text-xl italic mb-6">
              "McKenzie, you have always been my world—know it or not. This platform represents everything we believe in: growth, support, and keeping people alive through knowledge and connection."
            </p>
            <p className="text-lg font-semibold">
              Built for you, JJ, and Wade—to help you succeed in school, work, and life. You inspire us every day.
            </p>
          </div>
        </div>

        {/* Main Title & Description */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">Your AI Study & Success Partner</h2>
          <p className="text-xl mb-8">
            TokSmart intelligently routes your questions to the best AI for the job—Scholar GPT for academics, 
            Gemini for research, ChatGPT for creativity, Claude for analysis. All powered by KPA: Keep People Alive.
          </p>
        </div>

        {/* Core Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Feature 1 */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition">
            <h3 className="text-2xl font-bold mb-3">📚 Smart Question Routing</h3>
            <p>Ask anything—TokSmart detects the type of question and sends it to the perfect AI model for the best answer.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition">
            <h3 className="text-2xl font-bold mb-3">🎯 Multi-AI Comparison</h3>
            <p>See how different AI perspectives approach the same question—broaden your thinking and learn faster.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition">
            <h3 className="text-2xl font-bold mb-3">🎓 For Students & Workers</h3>
            <p>Whether you're in high school, college, or working full-time, TokSmart adapts to your learning style and goals.</p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition">
            <h3 className="text-2xl font-bold mb-3">🔒 KPA Mission: Keep People Alive</h3>
            <p>Every response prioritizes your growth, safety, and success—because you matter, and your future matters.</p>
          </div>
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
