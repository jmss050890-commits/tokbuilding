'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpenText, Heart, LogOut, Music2 } from 'lucide-react';
import ProtectedRoute from '../protected/ProtectedRoute';

const wisdomFeed = [
  {
    title: 'Wisdom For Calm Decisions',
    proverb: 'Proverbs 3:5-6',
    verse: 'Trust in the Lord with all your heart and lean not on your own understanding.',
    reflection: 'Before major health decisions, slow down, breathe, and choose clarity over panic.',
  },
  {
    title: 'Wisdom For Self-Control',
    proverb: 'Proverbs 25:28',
    verse: 'Like a city whose walls are broken through is a person who lacks self-control.',
    reflection: 'Healthy routines are spiritual walls. Protect your sleep, nutrition, and movement.',
  },
  {
    title: 'Wisdom For Gentle Speech',
    proverb: 'Proverbs 15:1',
    verse: 'A gentle answer turns away wrath, but a harsh word stirs up anger.',
    reflection: 'Healing is relational. Speak softly to yourself and your care circle today.',
  },
];

function getDailyWisdomIndex(total: number) {
  if (total <= 0) {
    return 0;
  }

  const today = new Date();
  const daySeed =
    today.getUTCFullYear() * 1000 +
    (today.getUTCMonth() + 1) * 50 +
    today.getUTCDate();
  return daySeed % total;
}

const proverbsRnbPlayerUrl =
  process.env.NEXT_PUBLIC_TOKHEALTH_WISDOM_PLAYER_URL ||
  'https://open.spotify.com/embed/playlist/37i9dQZF1DX4WYpdgoIcn6?utm_source=generator';


export default function TokHealthDashboard() {
  interface User {
    email?: string;
    // Add other user properties as needed
  }
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dailyWisdom = wisdomFeed[getDailyWisdomIndex(wisdomFeed.length)];

  useEffect(() => {
    // Fetch user info (auth already checked by ProtectedRoute)
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch {
        setError('Failed to load user.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
      router.replace('/tokhealth/login');
    } catch {
      setError('Logout failed.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-green-200 text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-red-200 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      {/* Dashboard content below */}
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-slate-900 to-green-950 flex flex-col">
        {/* Header */}
        <nav className="fixed top-0 z-40 w-full bg-slate-900/80 backdrop-blur border-b border-green-800/30">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/tokhealth" className="flex items-center gap-3 hover:opacity-80 transition">
              <Heart className="w-6 h-6 text-green-600" />
              <h1 className="text-xl font-bold text-green-100">TokHealth</h1>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-green-800/60 hover:bg-green-700/80 text-green-100 rounded transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </nav>

        {/* Dashboard Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-12">
          <div className="w-full max-w-5xl">
            <div className="bg-slate-800/60 backdrop-blur border border-green-800/30 rounded-lg p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-green-100 mb-4">Welcome, {user?.email || 'Member'}!</h2>
              <p className="text-green-200/80 mb-6">This is your secure TokHealth dashboard. Your health data is protected and private.</p>

              <div className="grid gap-6 lg:grid-cols-2">
                <section className="rounded-xl border border-emerald-700/35 bg-emerald-950/20 p-5">
                  <div className="flex items-center gap-3">
                    <BookOpenText className="h-5 w-5 text-emerald-300" />
                    <h3 className="text-lg font-bold text-emerald-100">Wisdom Feed</h3>
                  </div>
                  <p className="mt-2 text-sm text-emerald-200/85">
                    Proverbs in the heart of SVL-KPA for daily health, peace, and right action.
                  </p>

                  <article className="mt-4 rounded-lg border border-emerald-500/50 bg-emerald-900/30 p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-emerald-200">Daily Wisdom Spotlight</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.12em] text-emerald-300">{dailyWisdom.proverb}</p>
                    <h4 className="mt-1 text-base font-semibold text-emerald-100">{dailyWisdom.title}</h4>
                    <p className="mt-2 text-sm text-slate-100">{dailyWisdom.verse}</p>
                    <p className="mt-2 text-xs text-emerald-100/90">Practice Today: {dailyWisdom.reflection}</p>
                  </article>

                  <div className="mt-4 space-y-3">
                    {wisdomFeed.map((item) => (
                      <article key={item.proverb} className="rounded-lg border border-emerald-700/30 bg-slate-900/40 p-4">
                        <p className="text-xs uppercase tracking-[0.14em] text-emerald-300">{item.proverb}</p>
                        <h4 className="mt-1 text-sm font-semibold text-emerald-100">{item.title}</h4>
                        <p className="mt-2 text-sm text-slate-200">{item.verse}</p>
                        <p className="mt-2 text-xs text-emerald-200/90">Action: {item.reflection}</p>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="rounded-xl border border-fuchsia-700/35 bg-fuchsia-950/20 p-5">
                  <div className="flex items-center gap-3">
                    <Music2 className="h-5 w-5 text-fuchsia-300" />
                    <h3 className="text-lg font-bold text-fuchsia-100">Proverbs In R&B Player</h3>
                  </div>
                  <p className="mt-2 text-sm text-fuchsia-200/90">
                    Soul-centered audio to keep wisdom present while members track their health journey.
                  </p>

                  <div className="mt-4 overflow-hidden rounded-lg border border-fuchsia-700/30 bg-slate-900/40">
                    <iframe
                      title="TokHealth Proverbs In R&B"
                      src={proverbsRnbPlayerUrl}
                      width="100%"
                      height="352"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="w-full"
                    />
                  </div>

                  <p className="mt-3 text-xs text-fuchsia-200/90">
                    To customize this player, set NEXT_PUBLIC_TOKHEALTH_WISDOM_PLAYER_URL in your environment.
                  </p>
                </section>
              </div>

              <div className="mt-8 p-4 bg-green-900/20 border border-green-700/30 rounded text-green-100 text-xs leading-relaxed">
                <p className="font-semibold mb-2">🔒 Safe & Secure</p>
                <p>Your TokHealth profile is protected by encrypted authentication. Only you and your authorized care team can access your health data.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
