'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Edit2, Trash2, Plus, Lock, BarChart3, Users } from 'lucide-react';

interface Memorial {
  _id: string;
  name: string;
  relationship: string;
  dates: string;
  story: string;
  isPublic: boolean;
  createdAt: string;
}

interface TierInfo {
  tier: string;
  slotLimit: number;
  canInviteUsers: boolean;
  memorialsCount: number;
}

export default function MemorialDashboard() {
  const [memorials, setMemorials] = useState<Memorial[]>([]);
  const [tierInfo, setTierInfo] = useState<TierInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewForm, setShowNewForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    dates: '',
    story: '',
    svlConnection: '',
    verse: '',
    isPublic: false,
  });

  // Load user's memorials and tier info
  useEffect(() => {
    const loadData = async () => {
      try {
        // This would call your API
        // const res = await fetch('/api/memorials/user');
        // const data = await res.json();
        // setMemorials(data.memorials);
        // setTierInfo(data.tierInfo);
        
        // For now, mock data
        setMemorials([]);
        setTierInfo({
          tier: 'free',
          slotLimit: 1,
          canInviteUsers: false,
          memorialsCount: 0,
        });
      } catch (error) {
        console.error('Error loading memorials:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAddMemorial = async () => {
    if (!formData.name.trim() || !formData.story.trim()) {
      alert('Please include a name and story.');
      return;
    }

    try {
      // This would POST to /api/memorials/create
      // const res = await fetch('/api/memorials/create', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      // Mock: just add to local state
      const newMemorial: Memorial = {
        _id: Date.now().toString(),
        name: formData.name,
        relationship: formData.relationship,
        dates: formData.dates,
        story: formData.story,
        isPublic: formData.isPublic,
        createdAt: new Date().toISOString(),
      };

      setMemorials([...memorials, newMemorial]);
      setFormData({
        name: '',
        relationship: '',
        dates: '',
        story: '',
        svlConnection: '',
        verse: '',
        isPublic: false,
      });
      setShowNewForm(false);
    } catch (error) {
      console.error('Error adding memorial:', error);
      alert('Failed to save memorial.');
    }
  };

  const handleDeleteMemorial = async (id: string) => {
    if (!confirm('Delete this memorial? This cannot be undone.')) return;

    try {
      // This would DELETE to /api/memorials/[id]
      setMemorials(memorials.filter((m) => m._id !== id));
    } catch (error) {
      console.error('Error deleting memorial:', error);
    }
  };

  const canAddMore = tierInfo && memorials.length < tierInfo.slotLimit;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 z-40 w-full bg-slate-900/80 backdrop-blur border-b border-amber-800/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-amber-600" />
            <h1 className="text-xl font-bold text-amber-100">My Legacy Vault</h1>
          </div>
          <Link href="/memorials" className="text-amber-200 hover:text-amber-100 transition text-sm">
            Browse All
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Tier Overview */}
          {tierInfo && (
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* Tier Card */}
              <div className="bg-slate-800/40 border border-amber-700/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-amber-200 font-bold text-lg">Your Tier</h3>
                  <Lock className="w-5 h-5 text-amber-600" />
                </div>
                <p className="text-3xl font-bold text-amber-100 capitalize mb-2">
                  {tierInfo.tier}
                </p>
                <p className="text-amber-50/60 text-sm mb-4">
                  {tierInfo.tier === 'free'
                    ? 'Start here with 1 memorial'
                    : `${tierInfo.slotLimit} memorial slots`}
                </p>
                {tierInfo.tier !== 'platinum' && (
                  <Link
                    href="/memorials/membership"
                    className="text-amber-600 hover:text-amber-400 font-semibold text-sm transition"
                  >
                    Upgrade →
                  </Link>
                )}
              </div>

              {/* Slots Used */}
              <div className="bg-slate-800/40 border border-amber-700/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-amber-200 font-bold text-lg">Slots Used</h3>
                  <BarChart3 className="w-5 h-5 text-amber-600" />
                </div>
                <p className="text-3xl font-bold text-amber-100 mb-2">
                  {memorials.length} / {tierInfo.slotLimit}
                </p>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-amber-600 h-2 rounded-full transition"
                    style={{ width: `${(memorials.length / tierInfo.slotLimit) * 100}%` }}
                  />
                </div>
              </div>

              {/* Invitations (Platinum) */}
              {tierInfo.canInviteUsers && (
                <div className="bg-slate-800/40 border border-amber-700/30 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-amber-200 font-bold text-lg">Family Stewards</h3>
                    <Users className="w-5 h-5 text-amber-600" />
                  </div>
                  <p className="text-3xl font-bold text-amber-100 mb-2">0 / 2</p>
                  <button className="text-amber-600 hover:text-amber-400 font-semibold text-sm transition">
                    Invite Family →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Memorials Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-amber-100">Your Memorials</h2>
            {canAddMore && (
              <button
                onClick={() => setShowNewForm(!showNewForm)}
                className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition"
              >
                <Plus className="w-5 h-5" />
                Add Memorial
              </button>
            )}
          </div>

          {/* New Memorial Form */}
          {showNewForm && canAddMore && (
            <div className="bg-slate-800/40 border border-amber-700/30 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-amber-100 mb-6">Add a New Memorial</h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-amber-200 text-sm font-semibold mb-2">
                    Their Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800/60 border border-amber-700/30 rounded text-amber-50 placeholder-amber-900/50 focus:outline-none focus:border-amber-600"
                    placeholder="Name of the person"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-amber-200 text-sm font-semibold mb-2">
                      Your Relationship
                    </label>
                    <input
                      type="text"
                      value={formData.relationship}
                      onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-800/60 border border-amber-700/30 rounded text-amber-50 placeholder-amber-900/50 focus:outline-none focus:border-amber-600"
                      placeholder="Mother, Friend, Sister..."
                    />
                  </div>
                  <div>
                    <label className="block text-amber-200 text-sm font-semibold mb-2">
                      Dates (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.dates}
                      onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-800/60 border border-amber-700/30 rounded text-amber-50 placeholder-amber-900/50 focus:outline-none focus:border-amber-600"
                      placeholder="1950-2025"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-amber-200 text-sm font-semibold mb-2">
                    Their Story *
                  </label>
                  <textarea
                    value={formData.story}
                    onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 bg-slate-800/60 border border-amber-700/30 rounded text-amber-50 placeholder-amber-900/50 focus:outline-none focus:border-amber-600"
                    placeholder="Share their story, a memory, what they meant to you..."
                  />
                </div>

                <div>
                  <label className="block text-amber-200 text-sm font-semibold mb-2">
                    SVL Connection (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.svlConnection}
                    onChange={(e) => setFormData({ ...formData, svlConnection: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800/60 border border-amber-700/30 rounded text-amber-50 placeholder-amber-900/50 focus:outline-none focus:border-amber-600"
                    placeholder="How does their memory inspire Keep People Alive?"
                  />
                </div>

                <div>
                  <label className="block text-amber-200 text-sm font-semibold mb-2">
                    Scripture Verse (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.verse}
                    onChange={(e) => setFormData({ ...formData, verse: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800/60 border border-amber-700/30 rounded text-amber-50 placeholder-amber-900/50 focus:outline-none focus:border-amber-600"
                    placeholder="e.g., Psalm 23:4"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={formData.isPublic}
                    onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                    className="w-4 h-4 rounded border-amber-700 text-amber-600 focus:ring-amber-600"
                  />
                  <label htmlFor="isPublic" className="text-amber-200 text-sm">
                    Make this memorial visible on the community page
                  </label>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAddMemorial}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-slate-900 font-bold rounded-lg transition"
                  >
                    Save Memorial
                  </button>
                  <button
                    onClick={() => setShowNewForm(false)}
                    className="flex-1 py-3 px-4 border border-amber-600 text-amber-100 hover:bg-amber-900/30 font-bold rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Memorials List */}
          {memorials.length === 0 ? (
            <div className="text-center py-12 bg-slate-800/40 border border-amber-700/30 rounded-lg">
              <Heart className="w-12 h-12 text-amber-600/30 mx-auto mb-4" />
              <p className="text-amber-50/60 text-lg mb-4">
                {tierInfo?.tier === 'free' && "Start by creating your first memorial. You have 1 slot."}
                {tierInfo?.tier === 'silver' && "Build your memory space. You have 5 slots available."}
                {tierInfo?.tier === 'gold' && "Honor them all. You have 15 slots to remember."}
                {tierInfo?.tier === 'platinum' &&
                  "Create a family legacy. You have 15 slots plus 2 family stewards."}
              </p>
              {canAddMore && (
                <button
                  onClick={() => setShowNewForm(true)}
                  className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition"
                >
                  Create First Memorial
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-6">
              {memorials.map((memorial) => (
                <div
                  key={memorial._id}
                  className="bg-slate-800/40 border border-amber-700/30 rounded-lg p-6 hover:border-amber-600/60 transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-amber-100 mb-1">{memorial.name}</h3>
                      <p className="text-amber-200/70 text-sm">{memorial.relationship}</p>
                      <p className="text-amber-50/60 text-sm">{memorial.dates}</p>
                      {memorial.isPublic && (
                        <span className="inline-block mt-2 text-xs bg-green-900/40 text-green-300 px-2 py-1 rounded">
                          Public
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      {tierInfo?.tier !== 'free' && (
                        <a
                          href={`/memorials/${memorial._id}/guardian`}
                          className="p-2 hover:bg-amber-700/30 text-amber-400 rounded transition flex items-center gap-1"
                          title="Chat with their Guardian"
                        >
                          <Heart className="w-5 h-5" />
                        </a>
                      )}
                      <button
                        onClick={() => setEditingId(memorial._id)}
                        className="p-2 hover:bg-amber-900/30 text-amber-600 rounded transition"
                        title="Edit memorial"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteMemorial(memorial._id)}
                        className="p-2 hover:bg-red-900/30 text-red-600 rounded transition"
                        title="Delete memorial"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-amber-50/80 leading-relaxed">{memorial.story}</p>
                  {tierInfo?.tier !== 'free' && (
                    <div className="mt-4 pt-4 border-t border-amber-700/20">
                      <a
                        href={`/memorials/${memorial._id}/guardian`}
                        className="text-amber-400 hover:text-amber-300 text-sm font-semibold transition"
                      >
                        💬 Talk with {memorial.name}'s Guardian →
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
