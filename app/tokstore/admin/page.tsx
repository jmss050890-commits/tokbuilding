'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TokApp } from '../types';

export default function TokStoreAdmin() {
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newApp, setNewApp] = useState({
    name: '',
    category: 'health',
    developer: '',
    description: '',
    longDescription: '',
    emoji: '📱',
    version: '1.0.0',
  });

  const handleLogin = () => {
    // In production, use proper authentication
    if (adminPassword === 'tok-admin-2026') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const handleCreateApp = async () => {
    try {
      const response = await fetch('/api/store/apps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminPassword,
        },
        body: JSON.stringify(newApp),
      });

      if (!response.ok) {
        throw new Error('Failed to create app');
      }

      alert('App created successfully!');
      setNewApp({
        name: '',
        category: 'health',
        developer: '',
        description: '',
        longDescription: '',
        emoji: '📱',
        version: '1.0.0',
      });
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 w-full max-w-md">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">🔐 Admin Panel</h1>
          <p className="text-slate-400 mb-6 text-center">Tok Store Management</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-2">Admin Password</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-500 focus:border-emerald-500"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full px-4 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition"
            >
              Login
            </button>
            <Link href="/tokstore" className="block text-center text-emerald-400 hover:text-emerald-300 text-sm">
              ← Back to Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">🛠️ Store Admin Panel</h1>
          <div className="flex gap-3">
            <Link href="/tokstore" className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition">
              ← Back to Store
            </Link>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Stats */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="text-3xl mb-2">📱</div>
              <p className="text-slate-400 text-sm">Total Apps</p>
              <p className="text-2xl font-bold">4</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="text-3xl mb-2">📥</div>
              <p className="text-slate-400 text-sm">Total Downloads</p>
              <p className="text-2xl font-bold">37,570</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="text-3xl mb-2">⭐</div>
              <p className="text-slate-400 text-sm">Avg Rating</p>
              <p className="text-2xl font-bold">4.85</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="text-3xl mb-2">💬</div>
              <p className="text-slate-400 text-sm">Total Reviews</p>
              <p className="text-2xl font-bold">731</p>
            </div>
          </div>

          {/* Create New App */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
              <h2 className="text-2xl font-bold mb-6">➕ Create New App</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-2">App Name *</label>
                  <input
                    type="text"
                    value={newApp.name}
                    onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
                    placeholder="e.g., TokGrow"
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-500 focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Emoji Icon</label>
                    <input
                      type="text"
                      value={newApp.emoji}
                      onChange={(e) => setNewApp({ ...newApp, emoji: e.target.value })}
                      placeholder="🚀"
                      className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-emerald-500"
                      maxLength={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Category</label>
                    <select
                      value={newApp.category}
                      onChange={(e) => setNewApp({ ...newApp, category: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-emerald-500"
                    >
                      <option value="health">Health & Wellness</option>
                      <option value="safety">Safety</option>
                      <option value="lifestyle">Lifestyle</option>
                      <option value="productivity">Productivity</option>
                      <option value="communication">Communication</option>
                      <option value="utilities">Utilities</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">Developer *</label>
                  <input
                    type="text"
                    value={newApp.developer}
                    onChange={(e) => setNewApp({ ...newApp, developer: e.target.value })}
                    placeholder="Your company name"
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">Short Description *</label>
                  <input
                    type="text"
                    value={newApp.description}
                    onChange={(e) => setNewApp({ ...newApp, description: e.target.value })}
                    placeholder="Brief one-liner"
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">Long Description *</label>
                  <textarea
                    value={newApp.longDescription}
                    onChange={(e) => setNewApp({ ...newApp, longDescription: e.target.value })}
                    placeholder="Detailed app description"
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-500 focus:border-emerald-500 h-24"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">Version</label>
                  <input
                    type="text"
                    value={newApp.version}
                    onChange={(e) => setNewApp({ ...newApp, version: e.target.value })}
                    placeholder="1.0.0"
                    className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-500 focus:border-emerald-500"
                  />
                </div>

                <button
                  onClick={handleCreateApp}
                  disabled={!newApp.name || !newApp.developer || !newApp.description}
                  className="w-full px-4 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create App
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="font-bold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm transition">
                  📊 Analytics
                </button>
                <button className="w-full px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm transition">
                  👥 User Reviews
                </button>
                <button className="w-full px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm transition">
                  📝 Moderation
                </button>
                <button className="w-full px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm transition">
                  ⚙️ Settings
                </button>
              </div>
            </div>

            <div className="bg-emerald-900 bg-opacity-20 rounded-lg p-6 border border-emerald-700">
              <h3 className="font-bold text-emerald-300 mb-2">💡 Tip</h3>
              <p className="text-sm text-emerald-200">
                Admin features like analytics, moderation, and detailed app management are available through the API.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
