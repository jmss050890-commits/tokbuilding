'use client';

import Link from 'next/link';

export default function ThinkSpeakWork() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur border-b border-blue-800/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">✨</span>
            <h1 className="text-2xl font-bold">Think Speak Work</h1>
          </div>
          <Link href="/" className="px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition">
            ← Back Home
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Think Speak Work
          </h1>
          <p className="text-2xl text-blue-300 mb-6">#thinkspeakworkandwatchGodwork4U</p>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            A movement that combines thoughtful action, courageous communication, dedicated work, and spiritual faith to create meaningful change in the world.
          </p>
        </div>

        {/* Philosophy */}
        <div className="bg-slate-800/50 rounded-xl border border-blue-700/30 p-12 mb-12">
          <h2 className="text-3xl font-bold mb-6">Our Philosophy</h2>
          <p className="text-lg text-slate-300 mb-4">
            Think. Speak. Work. Believe. Watch God work for you.
          </p>
          <p className="text-lg text-slate-300 mb-4">
            This is more than a motto—it&apos;s a call to action. It&apos;s about engaging our minds to solve problems, using our voices to advocate for change, applying our hands to meaningful work, cultivating belief in what&apos;s possible, and maintaining faith that our efforts matter.
          </p>
          <p className="text-lg text-slate-300">
            In everything we do, we recognize that there&apos;s a force greater than ourselves guiding our path. When we think carefully, speak truth, work diligently, believe boldly, and trust in something bigger, amazing things happen.
          </p>
        </div>

        {/* Five Pillars */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">The Five Pillars</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-900/30 to-slate-800/30 rounded-lg p-8 border border-blue-700/20 hover:border-blue-500/40 transition lg:col-span-1">
              <div className="text-5xl mb-4">🧠</div>
              <h3 className="text-2xl font-bold mb-3 text-blue-300">Think</h3>
              <p className="text-slate-400 mb-4">
                Approach challenges with intention and wisdom. Think critically about problems, research solutions, and make informed decisions.
              </p>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>✓ Analyze complex situations</li>
                <li>✓ Seek understanding before action</li>
                <li>✓ Plan strategic approaches</li>
                <li>✓ Learn from experience</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/30 to-slate-800/30 rounded-lg p-8 border border-cyan-700/20 hover:border-cyan-500/40 transition lg:col-span-1">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-2xl font-bold mb-3 text-cyan-300">Speak</h3>
              <p className="text-slate-400 mb-4">
                Use your voice to advocate, educate, and inspire. Speak truth, speak up for others, and share your message with clarity and courage.
              </p>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>✓ Communicate authentically</li>
                <li>✓ Advocate for the voiceless</li>
                <li>✓ Share knowledge freely</li>
                <li>✓ Build understanding through dialogue</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-slate-800/30 rounded-lg p-8 border border-blue-700/20 hover:border-blue-500/40 transition lg:col-span-1">
              <div className="text-5xl mb-4">💪</div>
              <h3 className="text-2xl font-bold mb-3 text-blue-300">Work</h3>
              <p className="text-slate-400 mb-4">
                Put thought and speech into action. Roll up your sleeves, dedicate effort to meaningful pursuits, and don&apos;t shy away from hard work.
              </p>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>✓ Take consistent action</li>
                <li>✓ Build sustainable solutions</li>
                <li>✓ Collaborate with others</li>
                <li>✓ See projects through to completion</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-amber-900/30 to-slate-800/30 rounded-lg p-8 border border-amber-700/20 hover:border-amber-500/40 transition lg:col-span-1">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold mb-3 text-amber-300">Believe</h3>
              <p className="text-slate-400 mb-4">
                Have faith in your vision and in the power of what you&apos;ve started. Believe that your efforts matter, that change is possible, and in yourself.
              </p>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>✓ Trust your instincts</li>
                <li>✓ Maintain unwavering conviction</li>
                <li>✓ Envision the outcome</li>
                <li>✓ Show up with confidence</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/30 to-slate-800/30 rounded-lg p-8 border border-cyan-700/20 hover:border-cyan-500/40 transition lg:col-span-1">
              <div className="text-5xl mb-4">🙏</div>
              <h3 className="text-2xl font-bold mb-3 text-cyan-300">Watch God Work</h3>
              <p className="text-slate-400 mb-4">
                Maintain faith and trust in a higher power. When you&apos;ve thought, spoken, worked, and believed—watch as blessings and positive outcomes unfold in miraculous ways.
              </p>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>✓ Maintain faith and hope</li>
                <li>✓ Trust in higher purpose</li>
                <li>✓ Recognize blessings</li>
                <li>✓ Rest in knowing it matters</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How It Applies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Applied to Personal Safety</h2>
          <div className="bg-slate-800/50 rounded-lg p-8 border border-blue-700/30">
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-bold text-blue-300 mb-2">Think About Your Safety</h3>
                <p className="text-slate-400">
                  Identify potential risks in your environment. Consider different scenarios and develop strategies to stay safe. Use technology and resources available to you.
                </p>
              </div>

              <div className="border-l-4 border-cyan-500 pl-6">
                <h3 className="text-lg font-bold text-cyan-300 mb-2">Speak Up About Concerns</h3>
                <p className="text-slate-400">
                  Share your safety concerns with trusted friends, family, and authorities. Speak up if something feels wrong. Teach others about these tools and approaches.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-bold text-blue-300 mb-2">Work on Your Safety Plan</h3>
                <p className="text-slate-400">
                  Take action. Set up emergency contacts. Download safety apps. Practice drills. Build muscle memory around safety protocols. Invest in tools and training.
                </p>
              </div>

              <div className="border-l-4 border-amber-500 pl-6">
                <h3 className="text-lg font-bold text-amber-300 mb-2">Believe in Your Preparation</h3>
                <p className="text-slate-400">
                  Have faith that your planning, communication, and work will protect you. Believe that you have what you need. Trust in your preparation and your ability to respond.
                </p>
              </div>

              <div className="border-l-4 border-cyan-500 pl-6">
                <h3 className="text-lg font-bold text-cyan-300 mb-2">Watch Safety Happen</h3>
                <p className="text-slate-400">
                  When you&apos;ve prepared thoughtfully, when you&apos;ve built strong networks, when you&apos;ve invested time and energy—miracles of safety and protection unfold. Trust the process.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Initiatives */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Link href="/sanders-viopro-labs" className="bg-gradient-to-br from-purple-900/30 to-slate-800/30 rounded-lg p-8 border border-purple-700/30 hover:border-purple-500/60 transition">
            <h3 className="text-2xl font-bold mb-2">#Sandersvioprolabs</h3>
            <p className="text-slate-400">The technology lab where thinking and working converge to create solutions</p>
          </Link>

          <Link href="/kpa" className="bg-gradient-to-br from-green-900/30 to-slate-800/30 rounded-lg p-8 border border-green-700/30 hover:border-green-500/60 transition">
            <h3 className="text-2xl font-bold mb-2">#KPA-Keeppeoplealive</h3>
            <p className="text-slate-400">Movement putting these principles into action to save lives</p>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 border-t border-slate-800 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <p className="text-slate-400 mb-4">Think. Speak. Work. Believe. Watch God work for you.</p>
          <p className="text-xs text-slate-500">#thinkspeakworkandwatchGodwork4U | #KPA-Keeppeoplealive | #Sandersvioprolabs</p>
        </div>
      </div>
    </div>
  );
}
