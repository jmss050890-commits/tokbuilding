'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { TokApp, APP_CATEGORIES, FEATURED_APPS } from './types';

export default function TokStore() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'downloads' | 'newest'>('rating');
  const [selectedApp, setSelectedApp] = useState<TokApp | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Filter and sort apps
  const filteredApps = useMemo(() => {
    let apps = [...FEATURED_APPS];

    // Filter by category
    if (selectedCategory !== 'all') {
      apps = apps.filter(app => app.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      apps = apps.filter(app =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        apps.sort((a, b) => b.rating - a.rating);
        break;
      case 'downloads':
        apps.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'newest':
        apps.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        break;
    }

    return apps;
  }, [selectedCategory, searchQuery, sortBy]);

  const handleCheckout = async (tierIndex: number) => {
    if (!selectedApp) return;

    setCheckoutError(null);
    setIsCheckingOut(true);

    try {
      const response = await fetch('/api/store/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appId: selectedApp.id,
          pricingTierIndex: tierIndex,
          userEmail: userEmail || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setCheckoutError(data.error || 'Checkout failed');
        return;
      }

      // Redirect to Stripe checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (error) {
      setCheckoutError('Failed to initiate checkout');
      console.error('Checkout error:', error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🏪</span>
              <h1 className="text-3xl font-bold">Tok Store</h1>
            </div>
            <Link href="/vcc-hub" className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition">
              ← Back
            </Link>
          </div>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search apps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:outline-none text-white"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Category Filter */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-6">
              <h2 className="text-lg font-bold mb-4">Categories</h2>
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-4 py-2 rounded-lg mb-2 transition ${
                  selectedCategory === 'all'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-700 hover:bg-slate-600'
                }`}
              >
                All Apps
              </button>
              {APP_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg mb-2 transition flex items-center gap-2 ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h2 className="text-lg font-bold mb-4">Sort By</h2>
              {['rating', 'downloads', 'newest'].map(option => (
                <button
                  key={option}
                  onClick={() => setSortBy(option as any)}
                  className={`w-full text-left px-4 py-2 rounded-lg mb-2 transition ${
                    sortBy === option
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  {option === 'rating' && '⭐ Top Rated'}
                  {option === 'downloads' && '📥 Most Downloaded'}
                  {option === 'newest' && '🆕 Newest'}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedApp ? (
              // App Details View
              <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="mb-6 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
                >
                  ← Back to Store
                </button>

                <div className="flex items-start gap-6 mb-8">
                  <div className="text-6xl">{selectedApp.emoji}</div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{selectedApp.name}</h1>
                    <p className="text-slate-400 mb-3">{selectedApp.developer}</p>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <span>⭐</span>
                        <span className="font-bold">{selectedApp.rating}</span>
                        <span className="text-slate-400">({selectedApp.reviews} reviews)</span>
                      </div>
                      <div className="text-slate-400">📥 {(selectedApp.downloads / 1000).toFixed(1)}K downloads</div>
                    </div>
                    <p className="text-emerald-300 font-bold mb-4">v{selectedApp.version}</p>
                  </div>
                </div>

                {/* Pricing Section */}
                <div className="mb-8 pb-8 border-b border-slate-700">
                  <h2 className="text-xl font-bold mb-4">Pricing Options</h2>
                  
                  {!userEmail && (
                    <div className="mb-6">
                      <input
                        type="email"
                        placeholder="Enter your email (optional)"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:border-emerald-500 focus:outline-none text-white placeholder-slate-400"
                      />
                    </div>
                  )}

                  {checkoutError && (
                    <div className="mb-6 p-4 rounded-lg bg-red-900/30 border border-red-700 text-red-200">
                      {checkoutError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedApp.pricing.map((tier, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg p-6 border-2 border-slate-700 bg-slate-800 hover:border-emerald-500 transition"
                      >
                        <h3 className="text-lg font-bold mb-2">{tier.description}</h3>
                        <div className="mb-4">
                          <span className="text-3xl font-bold">
                            ${tier.price.toFixed(2)}
                          </span>
                          {tier.type === 'subscription' && (
                            <span className="text-slate-400 ml-2">
                              /{tier.interval === 'yearly' ? 'year' : 'month'}
                            </span>
                          )}
                        </div>

                        {/* Features */}
                        <ul className="space-y-2 mb-6">
                          {tier.features.map((feature, fidx) => (
                            <li key={fidx} className="text-sm text-slate-300">
                              ✓ {feature}
                            </li>
                          ))}
                        </ul>

                        <button
                          onClick={() => handleCheckout(idx)}
                          disabled={isCheckingOut || tier.type === 'free'}
                          className={`w-full py-2 rounded-lg font-bold transition ${
                            tier.type === 'free'
                              ? 'bg-slate-600 text-slate-300 cursor-not-allowed'
                              : isCheckingOut
                              ? 'bg-slate-600 text-slate-300'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          }`}
                        >
                          {tier.type === 'free' ? 'Free' : isCheckingOut ? 'Processing...' : 'Get Now'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8 pb-8 border-b border-slate-700">
                  <h2 className="text-xl font-bold mb-3">About</h2>
                  <p className="text-slate-300 whitespace-pre-wrap">{selectedApp.longDescription}</p>
                </div>

                {/* Update back button */}
                {selectedApp && (
                  <button
                    onClick={() => {
                      setSelectedApp(null);
                      setCheckoutError(null);
                    }}
                    className="mb-6 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition absolute top-4 left-4"
                  >
                    ← Back
                  </button>
                )}

                {/* Screenshots */}
                {selectedApp.screenshots.length > 0 && (
                  <div className="mb-8 pb-8 border-b border-slate-700">
                    <h2 className="text-xl font-bold mb-4">Screenshots</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedApp.screenshots.map((ss, i) => (
                        <img key={i} src={ss} alt={`Screenshot ${i + 1}`} className="rounded-lg w-full h-48 object-cover bg-slate-700" />
                      ))}
                    </div>
                  </div>
                )}

                {/* Technical Details */}
                <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-slate-700">
                  <div>
                    <h3 className="font-bold mb-3">Requirements</h3>
                    <ul className="space-y-1 text-slate-400 text-sm">
                      {selectedApp.requirements.map((req, i) => (
                        <li key={i}>✓ {req}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold mb-3">Permissions</h3>
                    <ul className="space-y-1 text-slate-400 text-sm">
                      {selectedApp.permissions.map((perm, i) => (
                        <li key={i}>🔐 {perm}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Version History */}
                <div className="mb-8 pb-8 border-b border-slate-700">
                  <h2 className="text-xl font-bold mb-4">What's New</h2>
                  <div className="space-y-4">
                    <div className="bg-slate-700 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold">v{selectedApp.latestVersion.version}</h3>
                        <span className="text-xs text-slate-400">{new Date(selectedApp.latestVersion.releaseDate).toLocaleDateString()}</span>
                      </div>
                      <p className="text-slate-300 text-sm">{selectedApp.latestVersion.changelog}</p>
                    </div>
                    {selectedApp.previousVersions.map((version, i) => (
                      <div key={i} className="bg-slate-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold">v{version.version}</h3>
                          <span className="text-xs text-slate-400">{new Date(version.releaseDate).toLocaleDateString()}</span>
                        </div>
                        <p className="text-slate-300 text-sm">{version.changelog}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Support */}
                <div className="bg-slate-700 rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Support</h2>
                  <div className="space-y-2 text-sm">
                    {selectedApp.support.email && (
                      <p>📧 <a href={`mailto:${selectedApp.support.email}`} className="text-emerald-400 hover:underline">{selectedApp.support.email}</a></p>
                    )}
                    {selectedApp.support.website && (
                      <p>🌐 <a href={selectedApp.support.website} target="_blank" className="text-emerald-400 hover:underline">Visit Website</a></p>
                    )}
                    {selectedApp.support.github && (
                      <p>🔗 <a href={selectedApp.support.github} target="_blank" className="text-emerald-400 hover:underline">GitHub</a></p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // App Grid View
              <>
                {/* Featured Section */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">⭐ Featured Apps</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {FEATURED_APPS.filter(app => app.featured).slice(0, 3).map(app => (
                      <button
                        key={app.id}
                        onClick={() => setSelectedApp(app)}
                        className="p-6 rounded-lg bg-gradient-to-r from-emerald-900 to-slate-800 border border-emerald-700 hover:border-emerald-500 hover:shadow-lg transition group text-left"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-4">
                            <span className="text-4xl">{app.emoji}</span>
                            <div>
                              <h3 className="text-lg font-bold group-hover:text-emerald-300 transition">{app.name}</h3>
                              <p className="text-sm text-slate-400">{app.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-yellow-400 font-bold">⭐ {app.rating}</div>
                            <div className="text-xs text-slate-400">{(app.downloads / 1000).toFixed(1)}K</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search Results or All Apps */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">
                    {searchQuery ? 'Search Results' : selectedCategory !== 'all' ? `${APP_CATEGORIES.find(c => c.id === selectedCategory)?.name} Apps` : 'All Apps'}
                  </h2>

                  {filteredApps.length === 0 ? (
                    <div className="text-center py-16 bg-slate-800 rounded-lg border border-slate-700">
                      <p className="text-2xl text-slate-400">No apps found</p>
                      <p className="text-slate-500 mt-2">Try adjusting your search or filters</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredApps.map(app => (
                        <button
                          key={app.id}
                          onClick={() => setSelectedApp(app)}
                          className="p-6 rounded-lg bg-slate-800 border border-slate-700 hover:border-emerald-500 hover:bg-slate-750 transition group text-left"
                        >
                          <div className="flex items-start gap-4">
                            <div className="text-4xl flex-shrink-0">{app.emoji}</div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold group-hover:text-emerald-300 transition truncate">{app.name}</h3>
                              <p className="text-xs text-slate-400 mb-3 line-clamp-2">{app.description}</p>
                              <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-4">
                                  <span className="text-yellow-400">⭐ {app.rating}</span>
                                  <span className="text-slate-500">📥 {(app.downloads / 1000).toFixed(1)}K</span>
                                </div>
                                <span className="text-slate-500">v{app.version}</span>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
