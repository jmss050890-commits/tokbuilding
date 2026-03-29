'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heart, LogOut } from 'lucide-react';
import ProtectedRoute from '../protected/ProtectedRoute';


export default function TokHealthDashboard() {
  interface User {
    email?: string;
    // Add other user properties as needed
  }
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
          <div className="w-full max-w-2xl">
            <div className="bg-slate-800/60 backdrop-blur border border-green-800/30 rounded-lg p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-green-100 mb-4">Welcome, {user?.email || 'Member'}!</h2>
              <p className="text-green-200/80 mb-6">This is your secure TokHealth dashboard. Your health data is protected and private.</p>
              {/* Add TokHealth dashboard features here */}
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
