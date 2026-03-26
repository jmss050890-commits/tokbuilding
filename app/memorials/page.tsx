'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { useSiteCopy, useSiteLanguage } from '@/app/components/SiteLanguageControl';

// Curated memorials with SVL connection
const CURATED_MEMORIALS = [
  {
    name: "Dorothy Mae Tinner",
    englishName: "Mr. KPA's Mother",
    dates: "Cherished Memory",
    story: "She gave Jerome Sanders the strength to carry the Keep People Alive mission. A mother's love that shaped a builder.",
    svlConnection: "Foundation of Mr. KPA's mission to protect and serve",
    scripture: "Proverbs 31:8-9 - Speak up for those who cannot speak for themselves.",
  },
  {
    name: "Marvin Daniels",
    englishName: "A Father's Wisdom",
    dates: "Gift of Guidance",
    story: "Taught to look up when you make a mess in life. His lesson became strength for a generation.",
    svlConnection: "Core teaching: Recovery and growth through faith",
    scripture: "Proverbs 22:6 - Train up a child in the way they should go.",
  },
  {
    name: "John A. Jones",
    englishName: "Father - Teacher of Much",
    dates: "Forever Remembered",
    story: "Taught so much the lessons still echo. His wisdom lives in those he touched.",
    svlConnection: "Knowledge shared becomes knowledge that keeps people alive",
    scripture: "2 Timothy 2:2 - Pass on what you've learned to faithful people.",
  },
  {
    name: "Mason Sanders",
    englishName: "A Son's Legacy",
    dates: "God Called Home",
    story: "God called him home, but his presence remains in the father's mission to protect others.",
    svlConnection: "Every SVL Guardian carries his memory forward",
    scripture: "John 11:25-26 - I am the resurrection and the life.",
  },
  {
    name: "Kailah A. Daniels",
    englishName: "A Niece the World Wasn't Ready For",
    dates: "Too Soon, Too Loved",
    story: "The world wasn't ready for her. Her light reminds us to cherish those we love now.",
    svlConnection: "Why we build systems to Keep People Alive",
    scripture: "Matthew 19:14 - Let the little children come to me.",
  },
  {
    name: "Demarvin Daniels",
    englishName: "A Brother Called Home",
    dates: "Forever in Our Hearts",
    story: "God called him home. His memory strengthens the bonds of family and faith.",
    svlConnection: "Family is at the heart of keeping people alive",
    scripture: "1 John 3:1 - See what great love the Father has lavished on us.",
  },
  {
    name: "Aunt Maggie",
    englishName: "She Crowned Him Geronimo",
    dates: "A Blessing That Named",
    story: "A name given in love becomes an identity of strength. She saw who we could become.",
    svlConnection: "Blessing and naming others is how we build community",
    scripture: "Isaiah 43:1 - I have summoned you by name; you are mine.",
  },
  {
    name: "Bre Williams",
    englishName: "Remembered",
    dates: "In Our Hearts",
    story: "Left a footprint in our hearts that doesn't fade. Their love shaped who we are.",
    svlConnection: "Love leaves legacy",
    scripture: "1 Corinthians 13:8 - Love never fails.",
  },
  {
    name: "Bundy Smith",
    englishName: "A Life That Mattered",
    dates: "Forever Remembered",
    story: "Their presence made us better. Their absence reminds us of what we had.",
    svlConnection: "We honor by continuing their example",
    scripture: "Psalm 23:4 - Even though I walk through the darkest valley.",
  },
  {
    name: "Uncle James",
    englishName: "Family Bond",
    dates: "God's Care",
    story: "An uncle who loved his family. That love carries forward in all we do.",
    svlConnection: "Family strength becomes community strength",
    scripture: "Ecclesiastes 4:9-10 - Two are better than one.",
  },
  {
    name: "Uncle Willie T",
    englishName: "A Uncle's Love",
    dates: "Forever Family",
    story: "Family is the foundation. His memory in us keeps him alive in spirit.",
    svlConnection: "Keep People Alive starts with family",
    scripture: "1 Peter 1:3 - Praise be to the God and Father of our Lord Jesus Christ!",
  },
  {
    name: "Jagger",
    englishName: "Remembered Here",
    dates: "In Our Hearts",
    story: "Left a mark on those who knew them. That mark doesn't fade.",
    svlConnection: "Every life matters in the mission",
    scripture: "John 15:13 - Greater love has no one than this.",
  },
];

interface MemorialFormData {
  name: string;
  relationship: string;
  dates: string;
  story: string;
  svlConnection: string;
}

export default function MemorialsPage() {
  const copy = useSiteCopy();
  const { language } = useSiteLanguage();
  
  const [memorials, setMemorials] = useState(CURATED_MEMORIALS);
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [formData, setFormData] = useState<MemorialFormData>({
    name: '',
    relationship: '',
    dates: '',
    story: '',
    svlConnection: '',
  });
  const [submitStatus, setSubmitStatus] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!formData.name.trim() || !formData.story.trim()) {
      setSubmitStatus('Please include a name and remembrance story.');
      return;
    }

    try {
      // In production, this would POST to /api/memorials
      // For now, add to local state
      const newMemorial = {
        name: formData.name,
        englishName: formData.relationship || 'Cherished Memory',
        dates: formData.dates || 'Forever Remembered',
        story: formData.story,
        svlConnection: formData.svlConnection || '',
        scripture: 'Psalm 23:4 - Even though I walk through the darkest valley.',
      };

      setMemorials([...memorials, newMemorial]);
      setFormData({
        name: '',
        relationship: '',
        dates: '',
        story: '',
        svlConnection: '',
      });
      setShowForm(false);
      setSubmitStatus('Memorial added. Their memory will inspire healing.');
    } catch (error) {
      setSubmitStatus('Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 z-40 w-full bg-slate-900/80 backdrop-blur border-b border-amber-800/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-amber-600" />
            <h1 className="text-xl font-bold text-amber-100">Memorials</h1>
          </div>
          <Link
            href="/agent"
            className="text-amber-200 hover:text-amber-100 transition text-sm"
          >
            Back to Hub
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-amber-100 mb-6">
            Those We Remember
          </h2>
          <p className="text-lg text-amber-50/80 mb-4">
            Remembering love helps heal. Healing brings peace.
            <br />
            <span className="text-amber-200 font-semibold">And that helps Keep People Alive.</span>
          </p>
          <p className="text-sm text-amber-200/60 italic">
            "The righteous live on in memory" — Proverbs 10:7
          </p>
        </div>
      </div>

      {/* Memorials Grid */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid gap-6">
          {memorials.map((memorial, idx) => (
            <div
              key={idx}
              className="bg-slate-800/40 border border-amber-700/30 rounded-lg overflow-hidden hover:border-amber-600/60 transition"
            >
              <button
                onClick={() => setExpandedId(expandedId === idx ? null : idx)}
                className="w-full p-6 text-left hover:bg-slate-800/60 transition flex items-start justify-between"
              >
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-amber-100 mb-1">
                    {memorial.name}
                  </h3>
                  <p className="text-amber-200/70 text-sm mb-2">
                    {memorial.englishName}
                  </p>
                  <p className="text-amber-50/60 text-sm">
                    {memorial.dates}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0 text-amber-600">
                  {expandedId === idx ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </div>
              </button>

              {expandedId === idx && (
                <div className="px-6 pb-6 border-t border-amber-700/20 space-y-4">
                  <div>
                    <h4 className="text-amber-200 font-semibold mb-2">Their Story</h4>
                    <p className="text-amber-50/80 leading-relaxed">
                      {memorial.story}
                    </p>
                  </div>

                  {memorial.svlConnection && (
                    <div>
                      <h4 className="text-amber-200 font-semibold mb-2">
                        Part of Our Mission
                      </h4>
                      <p className="text-amber-50/80 text-sm">
                        {memorial.svlConnection}
                      </p>
                    </div>
                  )}

                  <div className="bg-slate-900/80 border-l-4 border-amber-600 pl-4 py-3">
                    <p className="text-amber-100 text-sm italic">
                      "{memorial.scripture}"
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Memorial Section */}
        <div className="mt-12 border-t border-amber-700/30 pt-12">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full py-4 px-6 bg-gradient-to-r from-amber-700/40 to-yellow-700/40 border border-amber-600/60 hover:from-amber-700/60 hover:to-yellow-700/60 text-amber-100 font-semibold rounded-lg transition flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Add a Memorial
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-2xl font-bold text-amber-100">
                Share a Remembrance
              </h3>

              <div>
                <label className="block text-amber-200 text-sm font-semibold mb-2">
                  Their Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-slate-800/60 border border-amber-700/30 rounded text-amber-50 placeholder-amber-900/50 focus:outline-none focus:border-amber-600"
                  placeholder="Name of person"
                />
              </div>

              <div>
                <label className="block text-amber-200 text-sm font-semibold mb-2">
                  Your Relationship (Optional)
                </label>
                <input
                  type="text"
                  value={formData.relationship}
                  onChange={(e) =>
                    setFormData({ ...formData, relationship: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-slate-800/60 border border-amber-700/30 rounded text-amber-50 placeholder-amber-900/50 focus:outline-none focus:border-amber-600"
                  placeholder="e.g., Mother, Friend, Brother"
                />
              </div>

              <div>
                <label className="block text-amber-200 text-sm font-semibold mb-2">
                  Dates (Optional)
                </label>
                <input
                  type="text"
                  value={formData.dates}
                  onChange={(e) =>
                    setFormData({ ...formData, dates: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-slate-800/60 border border-amber-700/30 rounded text-amber-50 placeholder-amber-900/50 focus:outline-none focus:border-amber-600"
                  placeholder="e.g., 1950-2025"
                />
              </div>

              <div>
                <label className="block text-amber-200 text-sm font-semibold mb-2">
                  Remembrance Story *
                </label>
                <textarea
                  value={formData.story}
                  onChange={(e) =>
                    setFormData({ ...formData, story: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 bg-slate-800/60 border border-amber-700/30 rounded text-amber-50 placeholder-amber-900/50 focus:outline-none focus:border-amber-600"
                  placeholder="Share your remembrance, a favorite memory, or what they meant to you..."
                />
              </div>

              <div>
                <label className="block text-amber-200 text-sm font-semibold mb-2">
                  Connection to SVL Mission (Optional)
                </label>
                <input
                  type="text"
                  value={formData.svlConnection}
                  onChange={(e) =>
                    setFormData({ ...formData, svlConnection: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-slate-800/60 border border-amber-700/30 rounded text-amber-50 placeholder-amber-900/50 focus:outline-none focus:border-amber-600"
                  placeholder="How does their memory inspire the Keep People Alive mission?"
                />
              </div>

              {submitStatus && (
                <p
                  className={`text-sm ${
                    submitStatus.includes('added')
                      ? 'text-green-300'
                      : 'text-amber-200'
                  }`}
                >
                  {submitStatus}
                </p>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-slate-900 font-bold rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Add Memorial
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 px-6 border border-amber-600 text-amber-100 hover:bg-amber-900/30 font-bold rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-amber-800/20 bg-slate-900/40 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="text-amber-200 text-sm">
            This page honors those who shaped our hearts and lives.
          </p>
          <p className="text-amber-50/60 text-sm">
            Their footprints in our hearts don't fade. Their love becomes the healing that keeps us alive.
          </p>
          <p className="text-amber-200/60 text-xs pt-4">
            "Blessed are those who mourn, for they will be comforted." — Matthew 5:4
          </p>
        </div>
      </div>
    </div>
  );
}
