'use client';

import Link from 'next/link';

export default function KPA() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur border-b border-green-800/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">❤️</span>
            <h1 className="text-2xl font-bold">KPA - Keep People Alive</h1>
          </div>
          <Link href="/" className="px-4 py-2 rounded-lg bg-green-800 hover:bg-green-700 transition">
            ← Back Home
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
            Keep People Alive
          </h1>
          <p className="text-2xl text-green-300 mb-6">#KPA-Keeppeoplealive</p>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            A global advocacy movement dedicated to saving lives through accessible safety technology, education, and community empowerment.
          </p>
        </div>

        {/* Core Purpose */}
        <div className="bg-slate-800/50 rounded-xl border border-green-700/30 p-12 mb-12">
          <h2 className="text-3xl font-bold mb-6">Our Purpose</h2>
          <p className="text-lg text-slate-300 mb-4">
            KPA (Keep People Alive) is more than a hashtag—it&apos;s a commitment to ensuring that everyone, everywhere has access to tools and resources that can save their life or the lives of those they love.
          </p>
          <p className="text-lg text-slate-300 mb-4">
            We believe that personal safety is a fundamental right. Through technology, education, and community action, we&apos;re building a world where no one faces danger alone.
          </p>
          <p className="text-lg text-slate-300">
            Every product we create, every initiative we support, and every person we reach is a step toward a safer, more connected world.
          </p>
        </div>

        {/* Four Pillars */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Four Pillars of KPA</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-900/30 to-slate-800/30 rounded-lg p-8 border border-green-700/20 hover:border-green-500/40 transition">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-3">Safety Technology</h3>
              <p className="text-slate-400">
                Developing and deploying innovative tools that provide real-time protection and enable rapid emergency response.
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-900/30 to-slate-800/30 rounded-lg p-8 border border-emerald-700/20 hover:border-emerald-500/40 transition">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-3">Education</h3>
              <p className="text-slate-400">
                Empowering communities with knowledge about safety, awareness, and prevention through accessible training programs.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-slate-800/30 rounded-lg p-8 border border-green-700/20 hover:border-green-500/40 transition">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p className="text-slate-400">
                Building networks of support where people can share experiences, resources, and strategies for staying safe.
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-900/30 to-slate-800/30 rounded-lg p-8 border border-emerald-700/20 hover:border-emerald-500/40 transition">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-3">Global Reach</h3>
              <p className="text-slate-400">
                Extending safety resources to underserved populations and regions where personal security is most critical.
              </p>
            </div>
          </div>
        </div>

        {/* Impact Areas */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Areas of Impact</h2>
          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-lg p-6 border border-green-700/30 hover:border-green-500/60 transition">
              <h3 className="text-lg font-bold text-green-300 mb-2">🚗 Travel Safety</h3>
              <p className="text-slate-400">Ensuring safe commutes, ridesharing, and solo travel through real-time tracking and SOS capabilities</p>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-6 border border-green-700/30 hover:border-green-500/60 transition">
              <h3 className="text-lg font-bold text-green-300 mb-2">👥 Social Safety</h3>
              <p className="text-slate-400">Providing tools to navigate uncomfortable social situations with dignity and discretion</p>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-6 border border-green-700/30 hover:border-green-500/60 transition">
              <h3 className="text-lg font-bold text-green-300 mb-2">🏥 Health Security</h3>
              <p className="text-slate-400">Ensuring critical medical information is accessible to emergency responders when seconds count</p>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-6 border border-green-700/30 hover:border-green-500/60 transition">
              <h3 className="text-lg font-bold text-green-300 mb-2">🧠 Threat Awareness</h3>
              <p className="text-slate-400">Providing intelligent guidance for assessing and responding to potential threats</p>
            </div>
          </div>
        </div>

        {/* Related Initiatives */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Link href="/sanders-viopro-labs" className="bg-gradient-to-br from-purple-900/30 to-slate-800/30 rounded-lg p-8 border border-purple-700/30 hover:border-purple-500/60 transition">
            <h3 className="text-2xl font-bold mb-2">#Sandersvioprolabs</h3>
            <p className="text-slate-400">Innovation lab creating the technology behind life-saving solutions</p>
          </Link>

          <Link href="/think-speak-work" className="bg-gradient-to-br from-blue-900/30 to-slate-800/30 rounded-lg p-8 border border-blue-700/30 hover:border-blue-500/60 transition">
            <h3 className="text-2xl font-bold mb-2">#thinkspeakworkandwatchGodwork4U</h3>
            <p className="text-slate-400">Spiritual and philosophical movement inspiring action and faith</p>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 border-t border-slate-800 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <p className="text-slate-400 mb-4">Keep People Alive - A Global Movement for Safety</p>
          <p className="text-xs text-slate-500">#KPA-Keeppeoplealive | #Sandersvioprolabs | #thinkspeakworkandwatchGodwork4U</p>
        </div>
      </div>
    </div>
  );
}
