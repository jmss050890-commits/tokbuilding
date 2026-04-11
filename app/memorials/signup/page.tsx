'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function MemorialSignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate inputs
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'signup',
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Signup failed');
        return;
      }


      // Redirect to dashboard
      router.push('/memorials/dashboard');
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <nav className="fixed top-0 z-40 w-full bg-slate-900/80 backdrop-blur border-b border-amber-800/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/memorials" className="flex items-center gap-3 hover:opacity-80 transition">
            <Heart className="w-6 h-6 text-amber-600" />
            <h1 className="text-xl font-bold text-amber-100">SVL Legacy Vault</h1>
          </Link>
        </div>
      </nav>

      {/* Signup Form */}
      <div className="flex-1 flex items-center justify-center px-6 pt-24 pb-12">
        <div className="w-full max-w-md">
          <div className="bg-slate-800/60 backdrop-blur border border-amber-800/30 rounded-lg p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-amber-100 mb-2">Create Your Vault</h2>
              <p className="text-amber-200/70">Start preserving your legacy</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-700/50 rounded text-red-200 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-amber-100 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-2 bg-slate-700/50 border border-amber-700/30 rounded text-amber-50 placeholder-amber-300/40 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-100 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-2 bg-slate-700/50 border border-amber-700/30 rounded text-amber-50 placeholder-amber-300/40 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-100 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-2 bg-slate-700/50 border border-amber-700/30 rounded text-amber-50 placeholder-amber-300/40 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30"
                />
                <p className="text-xs text-amber-300/60 mt-1">At least 8 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-100 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-2 bg-slate-700/50 border border-amber-700/30 rounded text-amber-50 placeholder-amber-300/40 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 disabled:from-amber-700 disabled:to-amber-700 disabled:opacity-50 text-amber-50 font-semibold rounded transition-all duration-200"
              >
                {loading ? 'Creating Vault...' : 'Create Vault'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-amber-800/30 text-center">
              <p className="text-amber-200/70 text-sm">
                Already have a vault?{' '}
                <Link
                  href="/memorials/login"
                  className="text-amber-300 hover:text-amber-200 font-medium transition"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <div className="mt-6 p-4 bg-amber-900/20 border border-amber-700/30 rounded text-amber-100 text-xs leading-relaxed">
              <p className="font-semibold mb-2">🔒 Privacy Assured</p>
              <ul className="space-y-1 text-amber-100/80">
                <li>✓ Your data is encrypted</li>
                <li>✓ Only you control who sees your memorials</li>
                <li>✓ 7-day session security (auto-logout)</li>
                <li>✓ Compliant with memory access standards</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
