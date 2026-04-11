'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function TokHealthSignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
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
          email,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Signup failed');
        return;
      }
      // Redirect to TokHealth dashboard
      router.push('/tokhealth/dashboard');
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-slate-900 to-green-950 flex flex-col">
      {/* Header */}
      <nav className="fixed top-0 z-40 w-full bg-slate-900/80 backdrop-blur border-b border-green-800/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/tokhealth" className="flex items-center gap-3 hover:opacity-80 transition">
            <Heart className="w-6 h-6 text-green-600" />
            <h1 className="text-xl font-bold text-green-100">TokHealth</h1>
          </Link>
        </div>
      </nav>

      {/* Signup Form */}
      <div className="flex-1 flex items-center justify-center px-6 pt-24 pb-12">
        <div className="w-full max-w-md">
          <div className="bg-slate-800/60 backdrop-blur border border-green-800/30 rounded-lg p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-green-100 mb-2">Create Your TokHealth Account</h2>
              <p className="text-green-200/70">Sign up for a secure health profile</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-700/50 rounded text-red-200 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-green-100 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-2 bg-slate-700/50 border border-green-700/30 rounded text-green-50 placeholder-green-300/40 focus:outline-none focus:border-green-500/60 focus:ring-1 focus:ring-green-500/30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-green-100 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  className="w-full px-4 py-2 bg-slate-700/50 border border-green-700/30 rounded text-green-50 placeholder-green-300/40 focus:outline-none focus:border-green-500/60 focus:ring-1 focus:ring-green-500/30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-green-100 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repeat your password"
                  required
                  className="w-full px-4 py-2 bg-slate-700/50 border border-green-700/30 rounded text-green-50 placeholder-green-300/40 focus:outline-none focus:border-green-500/60 focus:ring-1 focus:ring-green-500/30"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 disabled:from-green-700 disabled:to-green-700 disabled:opacity-50 text-green-50 font-semibold rounded transition-all duration-200"
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-green-800/30 text-center">
              <p className="text-green-200/70 text-sm">
                Already have an account?{' '}
                <Link
                  href="/tokhealth/login"
                  className="text-green-300 hover:text-green-200 font-medium transition"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <div className="mt-6 p-4 bg-green-900/20 border border-green-700/30 rounded text-green-100 text-xs leading-relaxed">
              <p className="font-semibold mb-2">🔒 Safe & Secure</p>
              <p>Your TokHealth profile is protected by encrypted authentication. Only you and your authorized care team can access your health data.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
